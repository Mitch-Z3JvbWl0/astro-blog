import type { Metadata } from "next";
import { CaseLayout } from "../../case-layout";

export const metadata: Metadata = { title: "Azure Security Architecture | Grom Lab" };

export default function AzureArchitecture() {
  return (
    <CaseLayout>
      <header className="case-hero shell section">
        <p className="eyebrow">Security architecture · Delivered experience</p>
        <h1>Azure security architecture and cloud migration.</h1>
        <p className="lead">How I approach secure Azure design across identity, network, data, monitoring and operational ownership.</p>
      </header>
      <section className="fact-band"><div className="shell facts">
        <div><strong>Zero Trust</strong><span>Access design</span></div>
        <div><strong>CAF</strong><span>Landing-zone structure</span></div>
        <div><strong>Entra ID</strong><span>Identity control plane</span></div>
        <div><strong>ISO · NIST</strong><span>Control mapping</span></div>
      </div></section>
      <section className="case-section shell two-col">
        <div><p className="eyebrow">Context</p><h2>The work</h2></div>
        <div className="copy"><p>I have architected Azure security controls and led security work within cloud migration programmes. The scope included landing-zone hardening, Zero Trust access patterns, Entra ID, Defender, Purview, central monitoring and alignment to regulatory needs and risk appetite.</p><p>This page describes the reusable architecture method. Employer-specific diagrams, configurations and control gaps are deliberately excluded.</p></div>
      </section>
      <section className="case-section shaded"><div className="shell">
        <p className="eyebrow">Architecture method</p><h2>Start with requirements, not products.</h2>
        <div className="architecture-flow card">
          <div className="flow-node"><span>01 · CONTEXT</span><strong>Business and risk</strong><small>Data · users · regulation · risk appetite</small></div>
          <span className="flow-arrow">→</span>
          <div className="flow-node"><span>02 · DESIGN</span><strong>Trust boundaries</strong><small>Identity · network · platform · data</small></div>
          <span className="flow-arrow">→</span>
          <div className="flow-node"><span>03 · OPERATE</span><strong>Detection and ownership</strong><small>Logs · alerts · response · assurance</small></div>
        </div>
      </div></section>
      <section className="case-section shell">
        <p className="eyebrow">Design areas</p><h2>Controls considered together</h2>
        <div className="recommendations">
          <article className="card"><span>01</span><h3>Identity</h3><p>Conditional Access, privileged administration, workload identities and clear separation between normal and elevated access.</p></article>
          <article className="card"><span>02</span><h3>Platform and data</h3><p>Secure landing-zone defaults, segmentation, policy guardrails, data classification and protection appropriate to the workload.</p></article>
          <article className="card"><span>03</span><h3>Operations</h3><p>Central logging, useful detections, defined response ownership and evidence that controls remain effective after go-live.</p></article>
        </div>
      </section>
      <section className="case-section shell two-col">
        <div><p className="eyebrow">Outcome</p><h2>What this demonstrates</h2></div>
        <div className="copy"><p>The architecture work is not limited to drawing a target state. It connects design choices to implementation, monitoring, ownership and assurance. That is the difference between a diagram and a security architecture that can be operated.</p></div>
      </section>
    </CaseLayout>
  );
}
