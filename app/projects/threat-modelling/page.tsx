import type { Metadata } from "next";
import { CaseLayout } from "../../case-layout";

export const metadata: Metadata = {
  title: "Threat-Informed Defence: Scattered Spider | Grom Lab",
  description:
    "A threat model and KQL detection design for a Scattered Spider-style identity intrusion against the fictional Project Atlas platform.",
};

const mfaQuery = `let Window = 30m;
SigninLogs
| where TimeGenerated > ago(Window)
| summarize Attempts=count(),
    Failures=countif(ResultType != "0"),
    Apps=make_set(AppDisplayName, 5),
    IPs=make_set(IPAddress, 5)
  by UserPrincipalName, bin(TimeGenerated, 10m)
| where Attempts >= 8 and Failures >= 5
| order by Failures desc`;

const resetQuery = `let ResetWindow = 60m;
let resets = AuditLogs
| where TimeGenerated > ago(ResetWindow)
| where OperationName has_any ("Reset password", "Change password")
| project ResetTime=TimeGenerated,
    UserPrincipalName=tostring(TargetResources[0].userPrincipalName),
    ResetBy=tostring(InitiatedBy.user.userPrincipalName);
SigninLogs
| where TimeGenerated > ago(ResetWindow)
| where ResultType == "0"
| join kind=inner resets on UserPrincipalName
| where TimeGenerated between (ResetTime .. ResetTime + 30m)
| project TimeGenerated, UserPrincipalName, ResetBy,
    IPAddress, Location, AppDisplayName, DeviceDetail`;

const roleQuery = `AuditLogs
| where TimeGenerated > ago(1h)
| where OperationName has_any (
    "Add member to role",
    "Add eligible member to role"
  )
| extend Actor=tostring(InitiatedBy.user.userPrincipalName),
    Target=tostring(TargetResources[0].displayName),
    Role=tostring(TargetResources[0].modifiedProperties[1].newValue)
| project TimeGenerated, Actor, Target, Role, CorrelationId`;

export default function ThreatModelling() {
  return (
    <CaseLayout>
      <header className="case-hero shell section">
        <p className="eyebrow">Project Atlas · Threat-informed defence</p>
        <h1>Detecting an identity-led Scattered Spider-style intrusion.</h1>
        <p className="lead">A defensive case study connecting threat modelling, MITRE ATT&amp;CK coverage and practical KQL detections against the fictional Atlas platform.</p>
      </header>
      <section className="fact-band"><div className="shell facts">
        <div><strong>Identity first</strong><span>Help desk and MFA abuse</span></div>
        <div><strong>8-stage path</strong><span>Initial access to exfiltration</span></div>
        <div><strong>KQL</strong><span>Testable detection logic</span></div>
        <div><strong>Purple team</strong><span>Validation over assumptions</span></div>
      </div></section>

      <section className="case-section shell two-col">
        <div><p className="eyebrow">Threat scenario</p><h2>Attack the identity, inherit the trust.</h2></div>
        <div className="copy"><p>The model assumes a sophisticated, financially motivated actor targets Project Atlas through social engineering rather than exploiting the public application. The attacker impersonates a user to the help desk, resets credentials, registers or abuses MFA, and then uses legitimate access to move toward privileged roles and sensitive documents.</p><p>This is a Scattered Spider-style scenario, not an attribution claim or prediction. The behaviours are selected because they expose connected weaknesses across people, identity controls, SaaS access and cloud administration.</p></div>
      </section>

      <section className="case-section shaded"><div className="shell">
        <p className="eyebrow">Attack path</p><h2>Eight opportunities to prevent or detect</h2>
        <div className="attack-path">
          {[
            ["01", "Help-desk impersonation", "T1566 / social engineering"],
            ["02", "Password reset", "Valid account preparation"],
            ["03", "MFA change or fatigue", "T1621"],
            ["04", "New device sign-in", "T1078"],
            ["05", "Privilege escalation", "T1098 / T1136"],
            ["06", "Remote tooling", "T1219"],
            ["07", "Bulk document access", "Collection"],
            ["08", "Cloud exfiltration", "T1567.002"],
          ].map(([n, title, mapping]) => <div key={n}><span>{n}</span><strong>{title}</strong><small>{mapping}</small></div>)}
        </div>
      </div></section>

      <section className="case-section shell">
        <p className="eyebrow">Control strategy</p><h2>Layer friction, evidence and response.</h2>
        <div className="recommendations">
          <article className="card"><span>PREVENT</span><h3>Protect recovery paths</h3><p>Verified help-desk procedures, phishing-resistant MFA for privileged users, protected authentication changes, Conditional Access and PIM.</p></article>
          <article className="card"><span>DETECT</span><h3>Correlate identity change</h3><p>Join password resets, MFA changes, unfamiliar sign-ins, new devices and role assignments into a time-bounded identity story.</p></article>
          <article className="card"><span>RESPOND</span><h3>Contain the identity</h3><p>Revoke sessions, disable compromised factors, preserve identity audit evidence, remove persistence and assess data access before recovery.</p></article>
        </div>
      </section>

      <section className="case-section shaded"><div className="shell">
        <p className="eyebrow">Detection 01 · MFA pressure</p><h2>Repeated failures in a short window</h2>
        <div className="detection-meta"><span><b>Hypothesis</b>An attacker generates repeated prompts or failures before the user accepts one.</span><span><b>Data</b>SigninLogs</span><span><b>Schedule</b>Every 10 minutes · 30-minute lookback</span></div>
        <pre className="code-block"><code>{mfaQuery}</code></pre>
        <div className="detection-notes"><p><b>False positives:</b> stale mobile sessions, shared terminals and a legitimate user retrying a changed password.</p><p><b>Triage:</b> compare device, IP, location, application and authentication details; contact the user through a trusted channel.</p><p><b>Validation:</b> generate failed test sign-ins from a controlled account and confirm threshold, alert evidence and response routing.</p></div>
      </div></section>

      <section className="case-section shell">
        <p className="eyebrow">Detection 02 · Reset-to-login correlation</p><h2>Successful sign-in after password reset</h2>
        <div className="detection-meta"><span><b>Hypothesis</b>A social-engineered reset is quickly followed by attacker access.</span><span><b>Data</b>AuditLogs + SigninLogs</span><span><b>Lookback</b>60 minutes</span></div>
        <pre className="code-block"><code>{resetQuery}</code></pre>
        <div className="detection-notes"><p><b>False positives:</b> legitimate recovery naturally produces the same sequence. Risk comes from the sign-in context and reset actor.</p><p><b>Triage:</b> validate the help-desk record, reset initiator, device registration, IP reputation and subsequent resource access.</p><p><b>Blind spot:</b> operation names and nested audit fields can vary; the query must be validated against the tenant schema before production use.</p></div>
      </section>

      <section className="case-section shaded"><div className="shell">
        <p className="eyebrow">Detection 03 · Privilege persistence</p><h2>Role membership change</h2>
        <div className="detection-meta"><span><b>Hypothesis</b>A compromised identity adds persistent or eligible privileged access.</span><span><b>Data</b>AuditLogs</span><span><b>Priority</b>High for privileged roles</span></div>
        <pre className="code-block"><code>{roleQuery}</code></pre>
        <div className="detection-notes"><p><b>Triage:</b> validate the change ticket and approver, inspect the actor session, enumerate other changes sharing the correlation ID and remove unauthorised assignment.</p><p><b>Tuning:</b> maintain a privileged-role watchlist and suppress only known automation identities with tightly controlled change paths.</p></div>
      </div></section>

      <section className="case-section shell two-col">
        <div><p className="eyebrow">Coverage &amp; gaps</p><h2>A query is not a capability.</h2></div>
        <div className="copy"><p>These detections cover identity pressure, recovery abuse and privilege change, but they do not by themselves prove malicious intent. The next validation layer would simulate remote-support tooling, abnormal document enumeration and high-volume cloud transfers, then measure whether the complete attack chain is visible.</p><p>Known gaps include unavailable endpoint telemetry, attackers operating through trusted residential infrastructure, legitimate help-desk activity that resembles compromise, and schema differences between environments. Those gaps become backlog items with owners—not footnotes hidden after deployment.</p></div>
      </section>
    </CaseLayout>
  );
}
