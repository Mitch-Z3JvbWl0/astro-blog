import type { Metadata } from "next";
import { CaseLayout } from "../../case-layout";

export const metadata: Metadata = { title: "Security Monitoring and Response | Grom Lab" };

export default function Monitoring() {
  return (
    <CaseLayout>
      <header className="case-hero shell section">
        <p className="eyebrow">Security engineering · Delivered experience</p>
        <h1>Security monitoring and response engineering.</h1>
        <p className="lead">From getting the right telemetry into a SIEM to giving analysts a repeatable response path.</p>
      </header>
      <section className="fact-band"><div className="shell facts">
        <div><strong>SIEM</strong><span>Log onboarding and use cases</span></div>
        <div><strong>SOAR</strong><span>Playbooks and workflows</span></div>
        <div><strong>ATT&amp;CK</strong><span>Detection coverage</span></div>
        <div><strong>IR</strong><span>Coordination and recovery</span></div>
      </div></section>
      <section className="case-section shell two-col">
        <div><p className="eyebrow">Experience</p><h2>Detection has to be operable.</h2></div>
        <div className="copy"><p>I have built and run SIEM capabilities, onboarded and parsed custom security log sources, developed use cases across endpoint, email and perimeter controls, and mapped detection coverage to MITRE ATT&amp;CK.</p><p>I have also built SOAR playbooks and incident workflows to standardise analyst actions, and led response for high-severity incidents through containment, recovery and root-cause remediation.</p></div>
      </section>
      <section className="case-section shaded"><div className="shell recommendations">
        <article className="card"><span>01</span><h3>Telemetry</h3><p>Confirm the source produces the evidence needed, then monitor ingestion health as part of the control.</p></article>
        <article className="card"><span>02</span><h3>Detection</h3><p>Define the threat behaviour, logic, likely false positives, investigation evidence and success measure.</p></article>
        <article className="card"><span>03</span><h3>Response</h3><p>Give analysts clear enrichment, decision points, escalation criteria and safe automation boundaries.</p></article>
      </div></section>
    </CaseLayout>
  );
}
