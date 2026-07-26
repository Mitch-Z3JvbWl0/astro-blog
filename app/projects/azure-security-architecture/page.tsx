import type { Metadata } from "next";
import { CaseLayout } from "../../case-layout";

export const metadata: Metadata = {
  title: "Project Atlas: Azure Security Architecture | Grom Lab",
  description:
    "A fictional Azure SaaS reference architecture covering identity, network segmentation, private access, monitoring, resilience and residual risk.",
};

export default function AzureArchitecture() {
  return (
    <CaseLayout>
      <header className="case-hero shell section">
        <p className="eyebrow">Project Atlas · Reference architecture</p>
        <h1>Designing a secure, operable Azure SaaS platform.</h1>
        <p className="lead">
          A fictional, industry-neutral architecture exercise showing how I turn business
          requirements and credible threats into design decisions that teams can build and operate.
        </p>
      </header>

      <section className="fact-band"><div className="shell facts">
        <div><strong>99.9%</strong><span>Availability target</span></div>
        <div><strong>15 min</strong><span>Recovery point objective</span></div>
        <div><strong>2 hours</strong><span>Recovery time objective</span></div>
        <div><strong>Zero Trust</strong><span>Identity-led access</span></div>
      </div></section>

      <section className="case-section shell two-col">
        <div><p className="eyebrow">Scenario</p><h2>What Atlas has to protect</h2></div>
        <div className="copy">
          <p>Project Atlas is a fictional multi-tenant SaaS platform used by organisations to manage sensitive documents, workflows and partner integrations. Customers use a public web application; partners integrate through an API; administrators use a separate privileged interface.</p>
          <p>The design assumes an Azure PaaS-first delivery model, Entra ID for the workforce, OAuth client credentials for partner integrations, infrastructure as code and GitHub Actions for deployment. No design, hostname, process or control state represents a real employer.</p>
        </div>
      </section>

      <section className="case-section shaded"><div className="shell">
        <p className="eyebrow">Diagram 01 · Target state</p>
        <h2>High-level reference architecture</h2>
        <div className="system-diagram atlas-architecture" role="img" aria-label="Project Atlas high-level Azure reference architecture">
          <div className="atlas-users">
            <div className="architecture-component"><small>PUBLIC</small><strong>Customers</strong><span>Browser sessions</span></div>
            <div className="architecture-component"><small>B2B</small><strong>Partners</strong><span>OAuth clients</span></div>
            <div className="architecture-component privileged"><small>PRIVILEGED</small><strong>Administrators</strong><span>PAW + PIM</span></div>
          </div>
          <div className="vertical-connector"><span>TLS + IDENTITY</span></div>
          <div className="cloud-boundary">
            <b>AZURE TENANT · PROJECT ATLAS</b>
            <div className="architecture-layer edge-layer"><em>EDGE</em><div><strong>Front Door + WAF</strong><span>TLS termination · rate limiting · bot controls</span></div><div><strong>Entra ID</strong><span>Conditional Access · workload identities</span></div></div>
            <div className="layer-connector">↓ authenticated + authorised requests</div>
            <div className="architecture-layer app-layer"><em>APPLICATION</em><div><strong>Web application</strong><span>Managed App Service</span></div><div><strong>Partner API</strong><span>Scoped application roles</span></div><div><strong>Admin portal</strong><span>Separate access path</span></div></div>
            <div className="layer-connector">↓ managed identity over Private Link</div>
            <div className="architecture-layer data-layer"><em>PRIVATE DATA</em><div><strong>Azure SQL</strong><span>Tenant data</span></div><div><strong>Blob Storage</strong><span>Documents + backups</span></div><div><strong>Key Vault</strong><span>Keys + certificates</span></div></div>
          </div>
          <div className="architecture-rail"><b>CROSS-CUTTING CONTROLS</b><span>Policy + posture</span><span>Central monitoring</span><span>IaC + gated CI/CD</span><span>Backup + recovery</span></div>
        </div>
        <p className="note">Trust boundaries are deliberate: public traffic terminates at the edge, workloads reach data services privately, and identities—not network location alone—authorise each action.</p>
      </div></section>

      <section className="case-section shell">
        <p className="eyebrow">Architecture decisions</p><h2>Controls chosen for a reason</h2>
        <div className="decision-grid">
          <article className="card decision-card"><span>ADR-01</span><h3>Separate the admin plane</h3><p>The privileged interface uses a distinct hostname, Conditional Access policy and access path. Eligible roles activate through PIM rather than remaining permanently assigned.</p><b>Reduces:</b><small>Session theft, privilege persistence and accidental administration.</small></article>
          <article className="card decision-card"><span>ADR-02</span><h3>Remove public data access</h3><p>SQL, Blob Storage and Key Vault use private endpoints. Application managed identities replace embedded secrets and shared connection credentials.</p><b>Reduces:</b><small>Internet exposure, credential leakage and uncontrolled data-plane access.</small></article>
          <article className="card decision-card"><span>ADR-03</span><h3>Make delivery a control</h3><p>Infrastructure changes are peer-reviewed, scanned and deployed through short-lived federated credentials. Production changes require approval and create auditable evidence.</p><b>Reduces:</b><small>Configuration drift, long-lived secrets and unreviewed change.</small></article>
          <article className="card decision-card"><span>ADR-04</span><h3>Design for investigation</h3><p>Identity, WAF, application, control-plane and data-access telemetry are routed centrally with health monitoring, retention and named response ownership.</p><b>Reduces:</b><small>Detection blind spots and slow, evidence-poor response.</small></article>
        </div>
      </section>

      <section className="case-section shaded"><div className="shell">
        <p className="eyebrow">Diagram 02 · Trust boundaries</p><h2>Management and data paths stay separate.</h2>
        <div className="system-diagram trust-architecture" role="img" aria-label="Project Atlas trust boundaries and access paths">
          <div className="trust-lane customer-lane"><b>RUNTIME PATH</b><span>Internet</span><i>WAF inspection</i><span>Application identity</span><i>Private endpoint</i><span>Data services</span></div>
          <div className="trust-lane admin-lane"><b>ADMIN PATH</b><span>Privileged workstation</span><i>CA + PIM</i><span>Management plane</span><i>Policy gate</i><span>Approved change</span></div>
          <div className="trust-lane telemetry-lane"><b>EVIDENCE PATH</b><span>Identity + edge</span><i>Encrypted export</i><span>Central monitoring</span><i>Restricted access</i><span>Audit archive</span></div>
          <div className="boundary-legend"><span><i className="boundary-dot external"></i>External trust</span><span><i className="boundary-dot workload"></i>Workload trust</span><span><i className="boundary-dot privileged-dot"></i>Privileged trust</span></div>
        </div>
      </div></section>

      <section className="case-section shell two-col">
        <div><p className="eyebrow">Resilience &amp; assurance</p><h2>Secure has to remain available.</h2></div>
        <div className="copy">
          <p>Zone-redundant services are used where the service tier supports them. Database point-in-time restore and geo-redundant storage are tested against the 15-minute RPO and two-hour RTO rather than treated as configuration claims.</p>
          <p>Release evidence includes policy compliance, external exposure checks, identity-path tests, backup restoration and confirmation that critical telemetry reaches monitoring. Exceptions have owners and expiry dates.</p>
        </div>
      </section>

      <section className="case-section shell">
        <p className="eyebrow">Residual risk register</p>
        <div className="risk-table card">
          <div className="risk-row risk-head"><span>Risk</span><span>Treatment</span><span>Residual</span></div>
          <div className="risk-row"><strong>Compromised customer session</strong><p>Short sessions, anomaly detection and step-up authentication for sensitive actions.</p><b className="risk-medium">Medium</b></div>
          <div className="risk-row"><strong>Malicious privileged user</strong><p>PIM, approval, segregation of duties and immutable audit export reduce—but cannot eliminate—insider risk.</p><b className="risk-medium">Medium</b></div>
          <div className="risk-row"><strong>Regional Azure failure</strong><p>Backups are geo-redundant; full active-active operation is rejected as disproportionate to the stated availability target.</p><b className="risk-low">Low</b></div>
        </div>
      </section>
    </CaseLayout>
  );
}
