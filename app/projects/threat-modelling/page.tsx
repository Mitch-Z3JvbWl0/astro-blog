import type { Metadata } from "next";
import { CaseLayout } from "../../case-layout";

export const metadata: Metadata = { title: "Threat Modelling Security Solutions | Grom Lab" };

export default function ThreatModelling() {
  return (
    <CaseLayout>
      <header className="case-hero shell section">
        <p className="eyebrow">Architecture method · Applied experience</p>
        <h1>Threat modelling security solutions.</h1>
        <p className="lead">A vendor-agnostic way to find design risk before it becomes an operational incident.</p>
      </header>
      <section className="case-section shaded"><div className="shell">
        <p className="eyebrow">Working sequence</p><h2>Make the system and its assumptions visible.</h2>
        <div className="timeline">
          <div><span>01</span><strong>Scope</strong><b>Assets</b><p>Define the data, services and security objectives that matter.</p></div>
          <div><span>02</span><strong>Model</strong><b>Trust</b><p>Map data flows, actors, dependencies and trust boundaries.</p></div>
          <div><span>03</span><strong>Test</strong><b>Abuse</b><p>Use STRIDE and scenario-based analysis to challenge assumptions.</p></div>
          <div><span>04</span><strong>Treat</strong><b>Risk</b><p>Turn findings into requirements, owners and testable controls.</p></div>
        </div>
      </div></section>
      <section className="case-section shell two-col">
        <div><p className="eyebrow">How I use it</p><h2>Architecture is a set of decisions.</h2></div>
        <div className="copy"><p>I use threat modelling to question where identities are trusted, where data crosses boundaries, which components can act with privilege and what happens when a dependency or control fails.</p><p>The useful output is not simply a list of threats. It is a prioritised set of design changes, accepted risks, security requirements and validation tests that can follow the solution through delivery.</p></div>
      </section>
      <section className="case-section shell">
        <p className="eyebrow">Typical outputs</p>
        <div className="recommendations">
          <article className="card"><span>01</span><h3>Architecture decisions</h3><p>Record the chosen control, alternatives, assumptions and the risk the decision is intended to reduce.</p></article>
          <article className="card"><span>02</span><h3>Security requirements</h3><p>Write requirements that delivery teams can implement and testers can verify, without tying the outcome to one vendor.</p></article>
          <article className="card"><span>03</span><h3>Residual risk</h3><p>Give owners enough context to accept, transfer or further reduce risks that cannot be designed out.</p></article>
        </div>
      </section>
    </CaseLayout>
  );
}
