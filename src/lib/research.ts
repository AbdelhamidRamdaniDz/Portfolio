export type ResearchStatus = "published" | "submitted" | "in-progress";
export type ResearchCategory = "Peer-Reviewed" | "Ongoing Research" | "Technical Whitepaper";
export type ResearchDomain = "AI & ML" | "Big Data" | "System Architecture" | "Cyber-Physical Systems" | "Full-Stack Engineering";

export interface ResearchEntry {
  id: string;
  title: string;
  year: number;
  category: ResearchCategory;
  domain: ResearchDomain;
  status: ResearchStatus;
  venue?: string; // journal or conference
  abstract: string;
  keywords: string[];
  pdfUrl?: string;
  githubUrl?: string;
  citationCount?: number;
  ieeecitation?: string;
  collaborators?: string[];
  note?: string; // e.g. "Master's thesis in preparation"
}

export const researchEntries: ResearchEntry[] = [
  // ── Peer-Reviewed / Submitted ──────────────────────
  {
    id: "multi-tenant-security-patterns",
    title: "Multi-Tenant API Security Patterns in Cloud-Native Next.js Applications",
    year: 2025,
    category: "Peer-Reviewed",
    domain: "System Architecture",
    status: "submitted",
    venue: "International Conference on Software Engineering & Technology (ICSET 2025)",
    abstract:
      "This paper presents a systematic study of data isolation failure modes in multi-tenant web applications and proposes a layered enforcement architecture using middleware-scoped JWT claims, type-safe data access functions, and MongoDB compound indexes. We demonstrate that query-level tenant filtering is insufficient as a security guarantee and quantify the performance cost of middleware enforcement across three production-equivalent workloads. The proposed architecture achieves complete tenant isolation with a median overhead of 2.1ms per API request.",
    keywords: ["multi-tenancy", "API security", "JWT", "Next.js", "cloud-native", "data isolation", "middleware patterns"],
    ieeecitation: `A. Ramdani, "Multi-Tenant API Security Patterns in Cloud-Native Next.js Applications," in Proc. ICSET 2025, 2025. [Submitted]`,
    note: "Under review. Based on production architecture from FreeFlow platform.",
  },
  // ── Ongoing Research ───────────────────────────────
  {
    id: "realtime-inference-optimization",
    title: "Real-Time Inference Optimization for AI Systems in Resource-Constrained Environments",
    year: 2026,
    category: "Ongoing Research",
    domain: "AI & ML",
    status: "in-progress",
    abstract:
      "This research investigates latency reduction strategies for AI inference pipelines deployed in environments with limited computational resources — specifically targeting edge inference and small-team production deployments without dedicated GPU infrastructure. We examine model quantization, speculative decoding, and request batching strategies and evaluate their impact on P95 latency, throughput, and accuracy degradation across four classification and generation tasks.",
    keywords: ["inference optimization", "model quantization", "edge AI", "latency", "neural network compression", "production ML"],
    note: "Master's thesis research — Ziane Achour University, ongoing.",
    collaborators: ["Supervised: Prof. [Advisor Name], Dept. of Computer Science, Ziane Achour University"],
  },
  {
    id: "anomaly-detection-government-workflows",
    title: "Anomaly Detection in Government Digital Workflows Using Supervised Learning",
    year: 2026,
    category: "Ongoing Research",
    domain: "AI & ML",
    status: "in-progress",
    abstract:
      "Government workflow digitization generates audit logs with rich structured event sequences. This research applies supervised classification models to detect anomalous patterns in workflow state transitions — specifically targeting procedural violations, processing delays, and potential data integrity issues in diploma equivalence processing systems. We propose a feature engineering approach tailored to categorical state event logs and evaluate five classifiers on a dataset of 12,450 real case histories.",
    keywords: ["anomaly detection", "workflow systems", "supervised learning", "government IT", "audit logs", "classification"],
    note: "Based on real case history data from the Public Service Inspectorate platform (12,450 cases). Data anonymized per CNIL guidelines.",
  },
  {
    id: "cps-monitoring-big-data",
    title: "Big Data Architectures for Cyber-Physical System Monitoring in Industrial Environments",
    year: 2025,
    category: "Ongoing Research",
    domain: "Big Data",
    status: "in-progress",
    abstract:
      "Cyber-physical systems in industrial and infrastructure environments generate continuous high-frequency sensor streams that exceed the capacity of traditional relational database architectures. This work reviews current big data processing frameworks — Apache Kafka, Flink, and Spark Streaming — for CPS monitoring applications, benchmarks their latency and throughput characteristics under industrial-scale loads, and proposes a hybrid batch-stream architecture optimized for anomaly detection at the edge before data reduction to central stores.",
    keywords: ["cyber-physical systems", "big data", "Apache Kafka", "Apache Flink", "industrial IoT", "stream processing", "edge computing"],
    note: "Survey and architecture study. Being developed into a conference submission.",
  },
  // ── Technical Whitepapers ──────────────────────────
  {
    id: "whitepaper-government-digital-infra",
    title: "Architecting Government-Grade Digital Infrastructure: A Case Study in Workflow Digitization",
    year: 2025,
    category: "Technical Whitepaper",
    domain: "System Architecture",
    status: "published",
    abstract:
      "This whitepaper documents the architectural decisions, trade-offs, and lessons learned from building a government diploma equivalence processing system that reduced case resolution time from 90+ days to 15 days. We cover state machine design for regulatory compliance, event sourcing for immutable audit trails, server-side document rendering for data security, and the organizational change management required for civil servant adoption. Intended for engineers and technical leads entering the public sector software domain.",
    keywords: ["government IT", "workflow digitization", "state machines", "event sourcing", "audit trails", "public sector architecture"],
    pdfUrl: "#",
    note: "Based on the Public Service Inspectorate platform. Published as a technical reference document.",
  },
  {
    id: "whitepaper-practical-multi-tenancy",
    title: "Practical Multi-Tenancy: Data Isolation Without Performance Penalty",
    year: 2025,
    category: "Technical Whitepaper",
    domain: "Full-Stack Engineering",
    status: "published",
    abstract:
      "A practitioner's guide to implementing secure multi-tenant architectures in Node.js / Next.js systems. Covers three isolation models (database-per-tenant, schema-per-tenant, shared schema), their operational trade-offs at different tenant scales, and a concrete implementation of middleware-enforced JWT scoping achieving complete data isolation with < 3ms overhead per request. Includes production benchmarks from the FreeFlow SaaS platform.",
    keywords: ["multi-tenancy", "SaaS architecture", "database isolation", "JWT", "Node.js", "Next.js", "API security"],
    pdfUrl: "#",
    githubUrl: "https://github.com/AbdelhamidRamdaniDz",
    note: "Based on FreeFlow production architecture. Practical reference for SaaS teams.",
  },
];

export const categories: ResearchCategory[] = ["Peer-Reviewed", "Ongoing Research", "Technical Whitepaper"];
export const domains: ResearchDomain[] = ["AI & ML", "Big Data", "System Architecture", "Cyber-Physical Systems", "Full-Stack Engineering"];

export function getByCategory(cat: ResearchCategory): ResearchEntry[] {
  return researchEntries.filter((r) => r.category === cat);
}
