export interface BlogPost {
  slug: string;
  title: string;
  category: "AI" | "System Design" | "Architecture" | "Big Data" | "Research";
  abstract: string;
  readingTime: number; // minutes
  publishedAt: string; // ISO date
  sections: {
    executiveSummary: string;
    context: string;
    technicalDeepDive: string;
    architectureDecisions: string;
    codeSnippet?: string;
    codeLanguage?: string;
    tradeoffs: string;
    conclusion: string;
    keyInsights: string[];
  };
  keywords: string[];
}

export const posts: BlogPost[] = [
  {
    slug: "multi-tenant-data-isolation-nextjs",
    title: "Multi-Tenant Data Isolation: Architecture Patterns in Next.js",
    category: "System Design",
    abstract:
      "How to enforce strict per-tenant data boundaries at the API middleware layer in a Next.js application — without sacrificing query performance or developer experience.",
    readingTime: 9,
    publishedAt: "2026-02-18",
    keywords: ["multi-tenancy", "Next.js", "MongoDB", "JWT", "API design", "SaaS architecture"],
    sections: {
      executiveSummary:
        "Multi-tenancy is trivial to prototype and expensive to retrofit. The key decision is where in your stack you enforce tenant context — and getting that wrong early means rewriting your entire data access layer under production pressure. This article documents the approach I used at FreeFlow: tenant scoping at API middleware using JWT claims, with MongoDB collection-level isolation as the enforcement boundary.",
      context:
        "FreeFlow serves multiple B2B enterprise clients from a single deployment. Early in development, a naive implementation stored tenant IDs in each document and filtered by them at query time. This worked until we discovered that a missing filter clause in one endpoint could return cross-tenant data — a business-ending incident if it hit production. The core problem: query-level filtering is developer discipline, not architectural enforcement. It breaks silently.",
      technicalDeepDive:
        "The solution has three layers. First, JWT tokens issued at login contain a scoped claim: `{ tenantId, role, userId }`. Second, a Next.js middleware reads `x-forwarded-tenant` from the request and validates it against the decoded JWT claim — rejecting any mismatch before the request reaches a route handler. Third, each MongoDB query in the data layer has a required `tenantId` parameter typed as non-optional — making it impossible to accidentally execute a tenant-unscoped query. The type system becomes the first line of defense.",
      architectureDecisions:
        "We evaluated three approaches: (1) separate databases per tenant, (2) shared database with tenant prefix per collection, (3) shared collections with indexed `tenantId` fields. Separate databases gave perfect isolation but made schema migrations a coordination nightmare at scale. Collection prefixing was a maintenance antipattern. We chose shared collections with middleware-enforced scoping because it kept operational overhead minimal while making the trust boundary explicit. MongoDB's compound index on `(tenantId, _id)` meant zero query performance cost.",
      codeSnippet: `// middleware.ts — enforce tenant context on all API routes
import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT } from '@/lib/auth';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('session')?.value;
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const payload = await verifyJWT(token);
  const requestedTenant = req.headers.get('x-tenant-id');

  // Reject if tenant claim doesn't match request header
  if (payload.tenantId !== requestedTenant) {
    return NextResponse.json({ error: 'Tenant mismatch' }, { status: 403 });
  }

  // Forward verified tenant context to route handlers
  const headers = new Headers(req.headers);
  headers.set('x-verified-tenant', payload.tenantId);
  return NextResponse.next({ request: { headers } });
}

export const config = { matcher: ['/api/:path*'] };`,
      codeLanguage: "typescript",
      tradeoffs:
        "The main trade-off is added latency per request: JWT verification + header injection costs 1–3ms on average. We accepted this. The alternative — trusting client-side tenant claims — would have required extensive per-endpoint validation logic with no structural guarantee. We also deliberately chose not to use row-level security at the database layer (as PostgreSQL supports) because MongoDB doesn't have an equivalent, and abstracting RLS across two potential database engines would have added unjustified complexity.",
      conclusion:
        "Enforce tenant context architecturally, not conventionally. Middleware that validates the JWT claim against the request header — before any route handler executes — means a missing filter clause can't cause a data leak: it causes a type error or a 403, both of which are caught before production. The cost is a few milliseconds per request. The benefit is a security model you can reason about.",
      keyInsights: [
        "Query-level tenant filtering is developer discipline, not security. It breaks silently.",
        "Middleware-enforced JWT scoping makes cross-tenant access structurally impossible — not just unlikely.",
        "Type-safe data access functions with required tenantId parameters make omission a compile-time error.",
        "MongoDB compound index on (tenantId, _id) ensures isolation adds no query performance cost.",
        "Separate databases per tenant trades isolation perfection for operational complexity — usually not worth it below 100 tenants.",
      ],
    },
  },
  {
    slug: "government-digitization-at-scale",
    title: "Government Digitization at Scale: What I Learned Building for Public Sector",
    category: "Architecture",
    abstract:
      "Lessons from architecting a workflow system that digitized 12,450 government paper applications — where reliability, auditability, and user trust matter more than feature velocity.",
    readingTime: 7,
    publishedAt: "2026-01-24",
    keywords: ["workflow systems", "Next.js", "public sector", "PDF generation", "auditability", "state machines"],
    sections: {
      executiveSummary:
        "Building for government is unlike any other domain. The tolerance for ambiguity is zero. Every state transition must be auditable. The users are non-technical civil servants operating under institutional pressure. This article documents the architecture decisions behind a diploma equivalence processing platform that reduced case resolution time from 90+ days to 15 days — and the specific patterns that made reliability possible.",
      context:
        "The Public Service Inspectorate processed university diploma equivalence applications entirely on paper. Files were lost. Review timelines exceeded 90 days. There was no audit trail for disputes. The human cost was significant: applicants couldn't track their case, reviewers couldn't prioritize by urgency, and administrators had no visibility into bottlenecks. A digital system needed to replace every touchpoint simultaneously — partial digitization would have created worse confusion than the paper process.",
      technicalDeepDive:
        "The system is built as an explicit state machine. Each application moves through states: `SUBMITTED → UNDER_REVIEW → ADDITIONAL_DOCS_REQUESTED → APPROVED | REJECTED`. Every transition is logged with: who triggered it, from which state, at what timestamp, with what supporting documents. This log is immutable — append-only in the database. Role separation is enforced at the API layer: applicants can submit and view, reviewers can evaluate but not approve, admins can approve and audit. No role can skip a state.",
      architectureDecisions:
        "Server-side rendering for all document views was non-negotiable: sensitive data must never be exposed in client-side JavaScript bundles. We used Next.js App Router with full server components for document pages. PDF generation happens server-side using a custom template renderer — no third-party PDF services that would process government data externally. Email notifications use a transactional email queue (not inline send) so that email failure never blocks a state transition. The database schema uses event sourcing for the audit log, not a mutable `status` field.",
      codeSnippet: `// State machine transition — enforced at service layer
type ApplicationState =
  | 'SUBMITTED' | 'UNDER_REVIEW'
  | 'DOCS_REQUESTED' | 'APPROVED' | 'REJECTED';

const VALID_TRANSITIONS: Record<ApplicationState, ApplicationState[]> = {
  SUBMITTED:       ['UNDER_REVIEW'],
  UNDER_REVIEW:    ['DOCS_REQUESTED', 'APPROVED', 'REJECTED'],
  DOCS_REQUESTED:  ['UNDER_REVIEW'],
  APPROVED:        [], // terminal
  REJECTED:        [], // terminal
};

async function transitionApplication(
  id: string, to: ApplicationState, actor: { id: string; role: Role }
) {
  const app = await db.applications.findById(id);
  if (!VALID_TRANSITIONS[app.state].includes(to)) {
    throw new Error(\`Invalid transition: \${app.state} → \${to}\`);
  }
  await db.applicationEvents.insertOne({
    applicationId: id, from: app.state, to,
    actorId: actor.id, timestamp: new Date(),
  });
  await db.applications.updateOne({ _id: id }, { $set: { state: to } });
}`,
      codeLanguage: "typescript",
      tradeoffs:
        "Event sourcing for the audit log adds write volume (one event per transition vs. one status update). For 12,450 applications averaging 4 transitions each, that's ~50,000 audit events — trivial for MongoDB. The benefit — a complete, immutable history of every decision — is non-negotiable for a government system subject to legal review. We also chose to over-engineer the state machine validation rather than trust developers to write correct transition logic: an invalid state transition throwing a hard error is far preferable to silent corruption of application state.",
      conclusion:
        "Government systems have inverted priorities compared to most software projects. Auditability and trust come first; feature velocity comes last. The best investment we made was the state machine + event log before writing any UI code. It meant zero disputed case histories, zero lost applications after go-live, and zero data integrity incidents across the deployment lifetime.",
      keyInsights: [
        "Model government workflows as explicit state machines — not mutable status fields.",
        "Every state transition must be logged append-only: who, from where, when, with what.",
        "Server-side render all sensitive documents. Never expose government data in client bundles.",
        "Email failure should never block a state transition — use async queues.",
        "Role enforcement at the API layer is mandatory. Never trust the frontend to restrict actions.",
      ],
    },
  },
  {
    slug: "ai-integration-production-reliability",
    title: "AI Integration in Production: From Research to Reliable Inference",
    category: "AI",
    abstract:
      "The gap between an AI model that works in a notebook and one that holds under production load is larger than most teams expect. This is an architecture guide for crossing that gap reliably.",
    readingTime: 11,
    publishedAt: "2026-01-08",
    keywords: ["AI production", "inference APIs", "TensorFlow", "latency optimization", "model serving", "monitoring"],
    sections: {
      executiveSummary:
        "Integrating AI into a production system is a systems engineering problem, not a machine learning one. The model accuracy is table stakes. What determines success in production is inference latency, fallback behavior, observability, and the architecture of the surrounding system. This article documents the patterns I use when operationalizing AI features — separating what works in a notebook from what ships to users.",
      context:
        "Most AI integration failures I've observed don't fail on accuracy — they fail on reliability. The model works beautifully in evaluation; then it hits production with variable input data, concurrent requests, and network-dependent latency, and becomes the most fragile component of the stack. The root cause is treating AI integration as an ML task rather than a distributed systems problem. You need the same infrastructure discipline you'd apply to any external service: circuit breakers, caching, timeout handling, and graceful degradation.",
      technicalDeepDive:
        "The architecture I use decouples the AI inference path from the main application request path. A feature request reaches the application, which places an inference task on an async queue. A worker process executes the model and writes the result to a lightweight cache (Redis). The application returns a response immediately (with a pending state), and a client-side subscription receives the result when ready. For synchronous features where latency matters (e.g., smart autocomplete), I use a dedicated inference service with connection pooling, response streaming, and a circuit breaker that falls back to a deterministic rule-based system if the model times out.",
      architectureDecisions:
        "The critical decision was: synchronous vs. asynchronous inference per feature type. Long-running analysis tasks must be async — blocking a web request on 10-second model inference is never acceptable. Short-context completions (< 200ms P95) can be synchronous. We measure this in staging under load before choosing the path. For model serving, we chose to deploy models as separate services rather than embedding them in the application process — this allows independent scaling, independent deployment, and clear failure isolation.",
      codeSnippet: `// Inference service wrapper with circuit breaker + timeout
const inferenceClient = axios.create({
  baseURL: process.env.INFERENCE_SERVICE_URL,
  timeout: 3000, // 3s hard limit
});

const breaker = new CircuitBreaker(inferenceClient.post, {
  timeout: 3000,
  errorThresholdPercentage: 40,
  resetTimeout: 15000,
});

export async function classify(input: string): Promise<ClassificationResult> {
  try {
    const { data } = await breaker.fire('/classify', { input });
    return data;
  } catch (err) {
    // Graceful degradation: return deterministic fallback
    return fallbackClassifier(input);
  }
}`,
      codeLanguage: "typescript",
      tradeoffs:
        "Async inference improves perceived performance and decouples failure domains — but it introduces complexity: queue management, result delivery, and UX around pending states. Not every team has the infrastructure discipline to maintain this well. The synchronous path is simpler, but it makes your p99 latency hostage to model inference time. The right choice depends on feature type and user expectations. I default to async for any inference expected to take > 500ms, and synchronous with strict timeout + fallback for anything that must feel instant.",
      conclusion:
        "Treating AI integration as a distributed systems problem — not a data science problem — is the key mindset shift. Every AI feature needs a timeout, a fallback, observability instrumentation, and a rollback path. Build the surrounding system with the same discipline you'd apply to any external dependency. The model itself is just one component.",
      keyInsights: [
        "AI integration is a distributed systems problem. Design it accordingly.",
        "Separate synchronous (< 500ms) and asynchronous inference paths based on UX requirements.",
        "Every AI call needs a timeout and a graceful degradation fallback.",
        "Circuit breakers prevent a failing model from cascading into overall system failure.",
        "Deploy inference as a separate service — independent scaling and failure isolation are worth the operational overhead.",
        "Measure P95 inference latency under production-realistic load before choosing sync vs async architecture.",
      ],
    },
  },
  {
    slug: "mongodb-vs-postgresql-multi-tenant-saas",
    title: "Why I Chose MongoDB Over PostgreSQL for a Multi-Tenant SaaS",
    category: "System Design",
    abstract:
      "A real decision log: the specific constraints that made MongoDB the correct choice for FreeFlow, and the precise conditions under which that same decision would have been wrong.",
    readingTime: 6,
    publishedAt: "2025-12-15",
    keywords: ["MongoDB", "PostgreSQL", "database design", "multi-tenancy", "SaaS", "schema design"],
    sections: {
      executiveSummary:
        "This is not a MongoDB-vs-PostgreSQL think piece. It is a decision log for one specific system — FreeFlow, a multi-tenant B2B SaaS — documenting why MongoDB was the correct choice for our constraints, and the exact conditions under which I would have chosen PostgreSQL instead. The goal is to give engineers a framework for making the same decision in their own context, not a universal recommendation.",
      context:
        "FreeFlow's core data model is a content management system where the schema varies significantly between tenants. One client has a 12-field product structure; another has 40 custom fields with nested variants. A third has entirely different entity types. If we had chosen PostgreSQL, we would have faced a choice: JSONB columns (essentially MongoDB inside PostgreSQL, with worse developer ergonomics), EAV tables (a maintenance nightmare), or separate schemas per tenant (complex migration orchestration). None of these options is clean.",
      technicalDeepDive:
        "MongoDB's document model fit our variability requirement naturally: each tenant's collection documents its own schema, enforced by application-layer validation (Zod), not database-layer DDL. When a tenant's data model evolves, schema migrations are application code changes, not database DDL migrations requiring downtime and coordination. Additionally, MongoDB's aggregation pipeline handles the denormalized document queries our dashboard requires without complex JOIN chains — the data we query together is stored together.",
      architectureDecisions:
        "The decision matrix we used: (1) Is the data relational with complex JOIN requirements? PostgreSQL wins. (2) Does the schema vary significantly across entities or tenants? MongoDB is appropriate. (3) Do we require ACID transactions across multiple collections at scale? PostgreSQL wins. (4) Is the primary access pattern document retrieval by key? MongoDB wins. FreeFlow's access patterns are: retrieve tenant config, retrieve content documents by ID, aggregate dashboard metrics. None of these required complex cross-entity JOINs. MongoDB was the correct choice for this read/write pattern.",
      tradeoffs:
        "The trade-off we accepted: MongoDB's multi-document transaction support exists but is slower and more complex than PostgreSQL's. For FreeFlow, we restructured data to avoid cross-collection transactions in almost all cases. The one place we couldn't avoid it — onboarding a new tenant atomically — we handled with a two-phase approach and idempotent retries rather than a multi-document transaction. Had our business logic required frequent complex transactions, PostgreSQL would have been the correct choice regardless of schema flexibility.",
      conclusion:
        "The database choice is determined by your access patterns and data model variability — not by community preference or familiarity. For systems with fixed schemas and complex multi-table JOINs: PostgreSQL. For systems with variable schemas and document-centric access patterns: MongoDB. The mistake is choosing based on what you already know rather than what the system actually needs.",
      keyInsights: [
        "Schema variability across tenants is a strong signal for a document database.",
        "If your primary queries are document retrieval by key, not complex JOINs, MongoDB's model is simpler.",
        "MongoDB's multi-document transactions exist but add complexity — restructure data to avoid them where possible.",
        "PostgreSQL JSONB is MongoDB inside PostgreSQL with worse ergonomics — it's neither's strength.",
        "The decision matrix: access patterns + data model structure + transaction requirements. Not community preference.",
      ],
    },
  },
  {
    slug: "cross-platform-health-system-architecture",
    title: "Designing Cross-Platform Systems: Lessons from an Emergency Health App",
    category: "Architecture",
    abstract:
      "Building a system where mobile paramedics and hospital web dashboards share the same live data requires careful API design, real-time synchronization, and a clear contract between surfaces.",
    readingTime: 8,
    publishedAt: "2025-11-30",
    keywords: ["React Native", "Next.js", "real-time systems", "API design", "cross-platform", "health tech"],
    sections: {
      executiveSummary:
        "URGO is an emergency health coordination system where paramedics on mobile and hospital administrators on web need the same patient data simultaneously — before the ambulance arrives. The architecture challenge is: how do you share a live data API between two surfaces with different rendering environments, different network reliability profiles, and different interaction patterns, while keeping the API surface coherent and maintainable?",
      context:
        "Before URGO, emergency coordination happened primarily by phone. Paramedics called hospitals to check capacity; hospitals had no patient data until the ambulance arrived. The information gap between field and facility is where delays happen. A digital system needed to bridge this gap in real time — but the two surfaces have fundamentally different constraints. Mobile (React Native / Expo) runs on an intermittent 4G connection, must work offline partially, and needs a touch-optimized interaction model. Web (Next.js) has reliable connectivity and needs a data-dense dashboard with map integration.",
      technicalDeepDive:
        "The architecture uses a single Node.js API serving both surfaces with a shared data model. Patient intake events flow through a server-sent events (SSE) stream: the hospital dashboard subscribes to a tenant-scoped event channel and receives live updates as paramedics log patient data in the field. The mobile app writes to the API optimistically — logging locally and syncing when connected — using a conflict-free write strategy (last-write-wins on non-conflicting fields). The API response contract uses a versioned schema shared between the React Native client and the Next.js frontend as a TypeScript type package.",
      architectureDecisions:
        "The key decision was SSE vs. WebSocket for real-time delivery to the hospital dashboard. WebSockets require maintaining a persistent bidirectional connection — operationally complex on serverless infrastructure. SSE is unidirectional (server → client), works over standard HTTP/2, and requires no special server configuration. Since the hospital dashboard is read-only in real-time (it receives, doesn't send live events), SSE was the simpler and more reliable choice. Mobile write operations go through standard REST endpoints — no real-time write channel needed.",
      codeSnippet: `// SSE endpoint — hospital dashboard subscribes to patient events
export async function GET(req: Request) {
  const { tenantId } = await getVerifiedSession(req);
  const stream = new TransformStream();
  const writer = stream.writable.getWriter();
  const encoder = new TextEncoder();

  const unsubscribe = eventBus.subscribe(tenantId, async (event) => {
    const data = \`data: \${JSON.stringify(event)}\\n\\n\`;
    await writer.write(encoder.encode(data));
  });

  req.signal.addEventListener('abort', () => {
    unsubscribe();
    writer.close();
  });

  return new Response(stream.readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}`,
      codeLanguage: "typescript",
      tradeoffs:
        "The shared TypeScript type package between web and mobile is the biggest maintenance win — a breaking API change surfaces as a compile-time error in both clients simultaneously, not a runtime bug discovered after deployment. The trade-off is that you need a monorepo or package publishing setup. We used a local workspace package (npm workspaces) to avoid the latency of publishing to a registry on every change. The SSE approach trades bidirectional capability for operational simplicity — acceptable for a read-heavy dashboard, not acceptable if the web surface needed to send events to mobile.",
      conclusion:
        "Cross-platform systems are defined by their shared API contract, not by the surfaces themselves. Invest in the contract — type safety across clients, versioned schemas, and a clear event model — before investing in the surface implementations. SSE is dramatically simpler than WebSockets for unidirectional real-time delivery and is the correct default for dashboards that need to receive, not send.",
      keyInsights: [
        "A shared TypeScript type package between web and mobile makes breaking API changes a compile-time error.",
        "SSE is simpler than WebSockets for unidirectional real-time delivery — use WebSockets only when you need bidirectionality.",
        "Mobile apps need an offline-capable write strategy — optimistic logging with sync, not blocking writes.",
        "Different surfaces have different network reliability profiles — design your API error handling accordingly.",
        "The shared API contract is the most important investment in a cross-platform system — not the individual surface frameworks.",
      ],
    },
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getPostsByCategory(category: BlogPost["category"] | "All"): BlogPost[] {
  if (category === "All") return posts;
  return posts.filter((p) => p.category === category);
}
