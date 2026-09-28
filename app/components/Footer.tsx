"use client";

export default function Footer() {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer style={{
      padding: "clamp(3rem, 5vh, 4rem) clamp(1.25rem, 5vw, 5rem)",
      borderTop: "1px solid #1a1a1a",
      backgroundColor: "#080808",
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "2rem" }}>
        <div className="footer-top" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "2rem", flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: "0.75rem", fontWeight: 900, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.35rem" }}>WINTER ARC</div>
            <p style={{ fontSize: "0.65rem", color: "#444", letterSpacing: "0.05em" }}>90 days. One transformation.</p>
          </div>
          <nav style={{ display: "flex", gap: "1.75rem", flexWrap: "wrap", alignItems: "center" }}>
            {[
              { label: "How It Works", action: () => scrollTo("how-it-works") },
              { label: "Your Arc", action: () => scrollTo("arc-tracker") },
              { label: "Pricing", action: () => scrollTo("founding-cohort") },
              { label: "FAQ", action: () => scrollTo("faq") },
            ].map(link => (
              <button
                key={link.label}
                onClick={link.action}
                style={{ background: "none", border: "none", color: "#444", fontSize: "0.68rem", cursor: "pointer", transition: "color 0.2s", letterSpacing: "0.05em", padding: 0 }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#444")}
              >
                {link.label}
              </button>
            ))}
            {[
              { label: "X / Twitter", href: "https://x.com/winterarc" },
              { label: "Instagram", href: "https://instagram.com/winterarc" },
              { label: "Privacy", href: "#" },
              { label: "Contact", href: "mailto:hello@winterarc.com" },
            ].map(link => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                style={{ color: "#444", fontSize: "0.68rem", textDecoration: "none", transition: "color 0.2s", letterSpacing: "0.05em" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#444")}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
        <div style={{ borderTop: "1px solid #141414", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem" }}>
          <p style={{ fontSize: "0.6rem", color: "#2a2a2a", letterSpacing: "0.05em" }}>&copy; 2026 Winter Arc. All rights reserved.</p>
          <p style={{ fontSize: "0.6rem", color: "#2a2a2a", letterSpacing: "0.05em" }}>Early access. Product in development.</p>
        </div>
      </div>
    </footer>
  );
}
