import type { Metadata } from "next";
import { CaseLayout } from "../../case-layout";

export const metadata: Metadata = {
  title: "Vendor-Agnostic Security Monitoring Engineering | Grom Lab",
  description:
    "A vendor-agnostic security monitoring architecture covering collection, normalisation, enrichment, routing, retention and detection validation.",
};

export default function Monitoring() {
  return (
    <CaseLayout>
      <header className="case-hero shell section">
        <p className="eyebrow">Security engineering · Lab implementation</p>
        <h1>Building an operable security monitoring platform.</h1>
        <p className="lead">A vendor-agnostic monitoring architecture designed around useful telemetry, predictable routing and detections analysts can actually investigate.</p>
      </header>
      <section className="fact-band"><div className="shell facts">
        <div><strong>5 source families</strong><span>Cloud, identity, endpoint, network, SaaS</span></div>
        <div><strong>3 pipeline stages</strong><span>Normalise · enrich · route</span></div>
        <div><strong>Tiered retention</strong><span>Use case and risk driven</span></div>
        <div><strong>Portable</strong><span>Technology-independent design</span></div>
      </div></section>

      <section className="case-section shell two-col">
        <div><p className="eyebrow">Problem</p><h2>Collection is not visibility.</h2></div>
        <div className="copy"><p>The lab represents a hybrid organisation with productivity-suite audit logs, cloud control-plane and identity telemetry, network security events, endpoint alerts and API-fed SaaS activity. The constraint is realistic: limited storage and analyst capacity mean every log cannot be retained forever or treated as equally valuable.</p><p>The architecture therefore starts with detection and investigation requirements. Collection, processing, schemas, storage and response remain separable capabilities, allowing each component to be replaced without redesigning the whole monitoring service.</p></div>
      </section>

      <section className="case-section shaded"><div className="shell">
        <p className="eyebrow">Diagram 01 · Telemetry lifecycle</p><h2>From source event to analyst decision</h2>
        <div className="system-diagram telemetry-architecture" role="img" aria-label="Vendor-agnostic security monitoring telemetry architecture">
          <div className="diagram-boundary source-boundary">
            <b>TELEMETRY SOURCES</b>
            <div className="source-grid">
              {["Identity", "Cloud", "Endpoint", "Network", "SaaS"].map((source) => <span key={source}>{source}</span>)}
            </div>
          </div>
          <div className="flow-connector"><span>API · SYSLOG · AGENT</span></div>
          <div className="diagram-boundary processing-boundary">
            <b>PROCESSING PLANE</b>
            <div className="process-chain">
              <span><i>01</i>Collect</span><span><i>02</i>Normalise</span><span><i>03</i>Enrich</span><span><i>04</i>Route</span>
            </div>
          </div>
          <div className="flow-connector"><span>CANONICAL EVENTS</span></div>
          <div className="diagram-boundary operations-boundary">
            <b>SECURITY OPERATIONS</b>
            <div className="source-grid"><span>Detect</span><span>Search</span><span>Investigate</span><span>Respond</span></div>
          </div>
          <div className="health-rail"><b>CONTROL HEALTH</b><span>Source heartbeat</span><span>Pipeline failures</span><span>Storage capacity</span><span>Alert delivery</span></div>
        </div>
      </div></section>

      <section className="case-section shell">
        <p className="eyebrow">Engineering detail</p><h2>The pipeline is the control plane.</h2>
        <div className="decision-grid three">
          <article className="card decision-card"><span>01</span><h3>Normalise</h3><p>Parse vendor payloads into stable fields for actor, source IP, action, target, outcome and event category. Preserve the original event for investigation.</p><b>Test:</b><small>Known samples must parse without field loss or timestamp drift.</small></article>
          <article className="card decision-card"><span>02</span><h3>Enrich</h3><p>Add asset criticality, environment, identity context and network ownership. Enrichment failure is observable and never silently drops the source event.</p><b>Test:</b><small>Controlled events resolve to the expected asset and identity context.</small></article>
          <article className="card decision-card"><span>03</span><h3>Route</h3><p>Streams separate security, platform and compliance use cases. Rules route events to indexes with the correct access, retention and performance profile.</p><b>Test:</b><small>Each fixture reaches one intended stream with no duplicate indexing.</small></article>
        </div>
      </section>

      <section className="case-section shaded"><div className="shell">
        <p className="eyebrow">Diagram 02 · Storage design</p><h2>Retention follows value, not habit.</h2>
        <div className="retention-map">
          <article className="retention-card hot"><span>HOT · 30 DAYS</span><strong>Active detection</strong><p>Identity, endpoint and high-signal security events optimised for search and alerting.</p></article>
          <div className="diagram-arrow">→</div>
          <article className="retention-card warm"><span>WARM · 90 DAYS</span><strong>Investigation</strong><p>Broader cloud, SaaS and network telemetry used for correlation and retrospective analysis.</p></article>
          <div className="diagram-arrow">→</div>
          <article className="retention-card archive"><span>ARCHIVE · POLICY</span><strong>Evidence</strong><p>Selected audit records retained according to business, legal and assurance requirements.</p></article>
        </div>
      </div></section>

      <section className="case-section shell two-col">
        <div><p className="eyebrow">Operational safeguards</p><h2>Monitor the monitor.</h2></div>
        <div className="copy"><p>Source heartbeat alerts identify silent collectors, delayed APIs and falling event volume. Journal utilisation, processing failures, extractor errors, index health and disk capacity are treated as security control health—not merely infrastructure metrics.</p><p>Access is role-based, transport is encrypted, service credentials are scoped, and administrative activity is audited. A detection is only promoted after a known event triggers it, the alert contains enough evidence to triage, and failure conditions are understood.</p></div>
      </section>

      <section className="case-section shell">
        <p className="eyebrow">Validation record</p>
        <div className="validation-grid">
          <article className="card"><b>01</b><h3>Ingestion</h3><p>Replay representative source events and confirm timestamps, encoding and delivery.</p><span>Pass: searchable within the agreed delay</span></article>
          <article className="card"><b>02</b><h3>Schema</h3><p>Compare parsed fields with the original payload and canonical field contract.</p><span>Pass: required fields populated</span></article>
          <article className="card"><b>03</b><h3>Routing</h3><p>Assert stream membership, index selection, access control and retention.</p><span>Pass: no loss or unintended duplication</span></article>
          <article className="card"><b>04</b><h3>Detection</h3><p>Generate a controlled behaviour and follow the alert through analyst triage.</p><span>Pass: actionable evidence and owner</span></article>
        </div>
      </section>
    </CaseLayout>
  );
}
