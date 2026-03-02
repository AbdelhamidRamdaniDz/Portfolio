"use client";

import React from "react";

const GitHubIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.1-.472-.149-.672.149-.198.297-.771.967-.946 1.165-.174.198-.348.223-.645.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.654-2.059-.174-.297-.018-.458.131-.606.135-.134.297-.348.446-.522.149-.174.198-.298.297-.497.1-.198.05-.372-.025-.522-.075-.149-.672-1.616-.921-2.217-.243-.583-.49-.504-.672-.513l-.573-.01c-.198 0-.522.074-.796.372-.273.297-1.04 1.016-1.04 2.479s1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.08 4.487.709.306 1.262.489 1.693.626.712.227 1.36.195 1.871.118.571-.085 1.758-.718 2.006-1.412.248-.695.248-1.29.174-1.412-.074-.123-.272-.198-.57-.347zm-5.421 7.403h-.003a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.861 9.861 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.887-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.001 5.45-4.436 9.885-9.885 9.885zm8.413-18.297A11.815 11.815 0 0012.05.001C5.495 0 .16 5.335.158 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.86 11.86 0 005.683 1.45h.005c6.554 0 11.89-5.335 11.893-11.892a11.821 11.821 0 00-3.474-8.366z" />
  </svg>
);

const socials = [
  { href: "https://github.com/AbdelhamidRamdaniDz", Icon: GitHubIcon, label: "GitHub" },
  { href: "https://www.linkedin.com/in/abdelhamid-ramdani/", Icon: LinkedInIcon, label: "LinkedIn" },
  { href: "https://wa.me/213666564435", Icon: WhatsAppIcon, label: "WhatsApp" },
];

const ContactSection: React.FC = () => (
  <section
    id="contact"
    className="section"
    style={{ background: "var(--color-surface-2)" }}
    aria-labelledby="contact-heading"
  >
    <div className="container">
      <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-start">

        {/* Left — positioning & headline */}
        <div>
          <span className="section-label animate-in">Contact</span>

          <h2
            id="contact-heading"
            className="text-h1 animate-in mb-6"
            style={{ transitionDelay: "80ms" }}
          >
            Ready to build something real?
          </h2>

          <p
            className="text-body-lg animate-in mb-6 max-w-lg"
            style={{ transitionDelay: "160ms" }}
          >
            Whether you need a full system built from scratch, an architecture review,
            or technical leadership for your team — tell me about your project.
          </p>

          {/* Trust metrics */}
          <div
            className="animate-in grid grid-cols-3 gap-6 py-6 mb-8 max-w-sm"
            style={{
              transitionDelay: "240ms",
              borderTop: "1px solid var(--color-border)",
              borderBottom: "1px solid var(--color-border)",
            }}
          >
            {[
              { v: "< 24h", l: "Response time" },
              { v: "2–3",   l: "Projects / quarter" },
              { v: "100%",  l: "Remote capable" },
            ].map((m) => (
              <div key={m.l}>
                <div
                  className="font-black leading-none mb-1"
                  style={{ fontSize: "22px", color: "var(--color-text-primary)" }}
                >
                  {m.v}
                </div>
                <div className="text-caption">{m.l}</div>
              </div>
            ))}
          </div>

          {/* Social links */}
          <div
            className="animate-in flex items-center gap-4"
            style={{ transitionDelay: "300ms" }}
          >
            {socials.map(({ href, Icon, label }) => (
              <a
                key={href}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-150"
                style={{
                  color: "var(--color-text-secondary)",
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--color-text-primary)";
                  e.currentTarget.style.color = "#fff";
                  e.currentTarget.style.borderColor = "var(--color-text-primary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--color-surface)";
                  e.currentTarget.style.color = "var(--color-text-secondary)";
                  e.currentTarget.style.borderColor = "var(--color-border)";
                }}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Right — contact card */}
        <div className="animate-in" style={{ transitionDelay: "200ms" }}>
          <div
            className="card"
            style={{ minWidth: "300px", maxWidth: "360px" }}
          >
            <h3 className="text-h3 mb-5">Start a conversation</h3>

            <a
              href="mailto:abdelhamidramdani17@gmail.com"
              className="btn-primary w-full justify-center mb-3"
              style={{ display: "flex" }}
            >
              Send an Email
            </a>

            <a
              href="https://wa.me/213666564435"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost w-full justify-center"
              style={{ display: "flex" }}
            >
              Message on WhatsApp
            </a>

            <p
              className="text-caption text-center mt-4"
              style={{ color: "var(--color-text-tertiary)" }}
            >
              abdelhamidramdani17@gmail.com
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Schema */}
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Abdelhamid Ramdani",
          jobTitle: "Technical Product Architect & CTO",
          email: "abdelhamidramdani17@gmail.com",
          url: "https://abdelhamidramdani.vercel.app",
          sameAs: [
            "https://github.com/AbdelhamidRamdaniDz",
            "https://www.linkedin.com/in/abdelhamid-ramdani/",
          ],
          address: { "@type": "PostalAddress", addressLocality: "Djelfa", addressCountry: "Algeria" },
          knowsAbout: ["System Architecture", "Full-Stack Engineering", "AI Integration", "Next.js", "Node.js"],
        }),
      }}
    />

    <span className="sr-only">
      Contact Abdelhamid Ramdani — Technical Product Architect &amp; CTO. Email: abdelhamidramdani17@gmail.com
    </span>
  </section>
);

export default ContactSection;