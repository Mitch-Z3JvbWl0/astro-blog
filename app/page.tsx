"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Header } from "./site-header";

const projects = [
  {
    number: "01",
    type: "MSc research · 2026",
    title: "Predicting real-world vulnerability exploitation",
    description:
      "A strict temporal evaluation of CVSS, EPSS and machine-learning models against confirmed exploitation in CISA KEV.",
    tags: ["Python", "EPSS", "CISA KEV", "XGBoost"],
    href: "/research/exploit-prediction",
  },
  {
    number: "02",
    type: "Reference architecture · Designed",
    title: "Project Atlas: secure Azure SaaS architecture",
    description:
      "An industry-neutral SaaS scenario translating availability, identity, data and operational requirements into a secure, testable Azure target state.",
    tags: ["Azure", "Entra ID", "Private Link", "Architecture"],
    href: "/projects/azure-security-architecture",
  },
  {
    number: "03",
    type: "Threat-informed defence · Designed",
    title: "Scattered Spider-style identity intrusion",
    description:
      "An eight-stage attack path against Project Atlas, mapped to preventative controls, response actions and practical KQL detections.",
    tags: ["Threat modelling", "KQL", "MITRE ATT&CK", "Identity"],
    href: "/projects/threat-modelling",
  },
  {
    number: "04",
    type: "Security engineering · Lab implementation",
    title: "Vendor-agnostic security monitoring engineering",
    description:
      "A working telemetry pipeline covering collection, normalisation, enrichment, stream routing, tiered retention and detection validation.",
    tags: ["SIEM", "Telemetry", "Pipelines", "Detection"],
    href: "/projects/security-monitoring",
  },
];

export default function Home() {
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("revealed")),
      { threshold: 0.1 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="site">
      <Header />
      <main>
        <section className="hero shell">
          <div className="hero-copy" data-reveal>
            <p className="eyebrow">Grom-Lab notebook · Est. 2024</p>
            <h1>
              Security engineering,
              <br />
              <span>tested properly.</span>
            </h1>
            <p className="lead">
              I&apos;m Mitch, a Cyber Security Engineer. This is where I document Azure architecture,
              threat modelling, detection engineering and the research behind my MSc.
            </p>
            <div className="actions">
              <Link className="button primary" href="/projects/azure-security-architecture">
                View architecture work <span>↗</span>
              </Link>
              <Link className="button" href="/research/exploit-prediction">
                Read MSc research
              </Link>
              <a className="button" href="https://github.com/Mitch-Z3JvbWl0" target="_blank" rel="noreferrer">
                GitHub
              </a>
            </div>
          </div>

          <aside className="workbench" data-reveal aria-label="Grom-Lab project machine">
            <div className="machine-shadow" />
            <div className="machine">
              <div className="machine-top">
                <span className="antenna"><i /></span>
                <span className="machine-label">THE SECURITY-O-MATIC</span>
                <span className="warning-light" />
              </div>
              <div className="machine-screen">
                <span>NOW ANALYSING</span>
                <strong>AZURE + THREAT MODELS</strong>
                <i className="scan-line" />
              </div>
              <div className="machine-controls">
                <span className="dial" />
                <span className="switch"><i /></span>
                <span className="meter"><i /></span>
              </div>
              <div className="machine-feet"><span /><span /></div>
            </div>
            <img className="grom-hero" src="/grom-logo.png" alt="Grom, the Grom-Lab mascot" />
            <span className="floor-cable" />
          </aside>
        </section>

        <div className="status">
          <div className="shell">
            <span>MSc Cyber Security &amp; Digital Forensics</span><b>•</b>
            <span>SC-100 · AZ-500 · Security+</span><b>•</b>
            <span>Bristol, UK</span>
          </div>
        </div>

        <section className="research shell section" id="research">
          <div data-reveal>
            <p className="eyebrow">Experiment 001 · MSc final project</p>
            <h2>Can CVSS predict real-world exploitation?</h2>
          </div>
          <div data-reveal>
            <p className="lead">
              I tested CVSS, EPSS, logistic regression and XGBoost on 71,224 vulnerabilities
              published after the training period. EPSS identified substantially more confirmed
              exploits when patching capacity was limited.
            </p>
            <Link className="text-link" href="/research/exploit-prediction">
              Read the full project write-up →
            </Link>
          </div>
          <div className="facts">
            {[
              ["71,224", "CVEs in held-out test set"],
              ["0.136", "EPSS PR-AUC"],
              ["0.010", "CVSS PR-AUC"],
              ["34.1% vs 4.3%", "Exploits found at 5% capacity"],
            ].map(([value, label]) => (
              <article className="fact card" data-reveal key={label}>
                <strong>{value}</strong><span>{label}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="projects-section section" id="projects">
          <div className="shell">
            <div className="section-head" data-reveal>
              <div><p className="eyebrow">From the lab book</p><h2>Selected projects</h2></div>
            </div>
            <div className="project-grid">
              {projects.map((project) => (
                <Link className="project card" data-reveal href={project.href} key={project.title}>
                  <div className="project-top"><span>{project.number}</span><span>{project.type}</span></div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                  <span className="open-project">Open case study →</span>
                  <div className="project-line" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="experience shell section" id="about" data-reveal>
          <div><p className="eyebrow">About the engineer</p><h2>Designed, built and tested.</h2></div>
          <div className="copy">
            <p>
              My work covers cloud and identity architecture, network access control, detection
              engineering, vulnerability management and incident response. I have designed Azure
              controls around Zero Trust and the Cloud Adoption Framework, built monitoring and
              response workflows, and mapped technical controls to ISO 27001, NIST and business risk.
            </p>
            <p>
              The case studies on this site describe the engineering decisions and methods without
              publishing confidential employer designs.
            </p>
            <a className="text-link" href="https://www.linkedin.com/in/mitch-hart-cybersec/" target="_blank" rel="noreferrer">
              View LinkedIn profile →
            </a>
          </div>
        </section>
      </main>
      <footer><div className="shell"><span>© 2026 Mitch Hart</span><span>Made in Bristol · Powered by tea and threat models</span></div></footer>
    </div>
  );
}
