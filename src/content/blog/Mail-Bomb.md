---
title: "Defending Against Mail Bomb Attacks with KQL & Automation"
pubDate: 2025-06-19
description: "A collection of KQL queries, scripts, and automation tips to help detect and mitigate mail bomb attacks in Microsoft 365 environments."
tags: [KQL, Threat Hunting, Mail Bomb]
author: Mitch
heroImage: '../../assets/mail.jpg'
---

Mail bombs (email flooding attacks) are a simple but highly disruptive threat. Attackers send large volumes of email to one or more mailboxes to disrupt regular business communications, fill up quotas and delay legitimate email, conceal targeted phishing attempts and degrade mail server or security tool performance.

In this post, we’ll cover:

- Practical KQL queries to detect potential mail bombs
- How to tune alerts to reduce noise
- Power Automate and Defender recommendations for response
- Sample scripts and automation ideas
    

## Key Indicators of a Mail Bomb

Typical signs of mail bombing include:

- Sudden spike in emails to one recipient in a short window
- Large volumes from a single sender or domain
- Burst patterns (e.g. 100 emails in 5 minutes)
- Emails from "noreply" addresses
- Randomised sender addresses from the same IP range
    

### Query 1: Spike Detection - Single Recipient

```kql
EmailEvents
| where Timestamp > ago(30m)
| summarize EmailCount=count() by RecipientEmailAddress
| where EmailCount > 50
| project RecipientEmailAddress, EmailCount
```

### Query 2: Burst of Noreply Emails to a User (NRT-compatible)

```kql
EmailEvents
| where Timestamp > ago(15m) 
| where SenderFromAddress has "noreply" 
| summarize UniqueSenders=dcount(SenderFromAddress), TotalEmails=count() by RecipientEmailAddress 
| where TotalEmails > 20 
| project RecipientEmailAddress, TotalEmails, UniqueSenders, Timestamp
```

### Query 3: Domain-based Sender Spike

```kql
EmailEvents 
| extend SenderDomain = tostring(split(SenderFromAddress, "@")[1]) 
| where Timestamp > ago(1h) 
| summarize EmailsFromDomain=count() by SenderDomain, RecipientEmailAddress 
| where EmailsFromDomain > 100 
| project SenderDomain, RecipientEmailAddress, EmailsFromDomain
```

### Query 4 (Advanced): Sliding Window Spike Detection

```kql
let windowSize = 5m; EmailEvents 
| where Timestamp > ago(1h) 
| summarize EmailCount=count() by bin(Timestamp, windowSize), RecipientEmailAddress 
| order by RecipientEmailAddress asc, Timestamp asc 
| extend PreviousCount = prev(EmailCount, 1, 0) 
| extend SpikeDetected = EmailCount > (PreviousCount * 3) and EmailCount > 50 
| where SpikeDetected == true 
| project Timestamp, RecipientEmailAddress, EmailCount, PreviousCount
```

This detects sudden tripling of message volume per recipient across sliding 5-minute windows.  

## Response Recommendations

### Automated Alerting

- Use scheduled rules in Defender for Office 365 or Sentinel
- Tune thresholds by mailbox sensitivity (VIP users < general users < shared mailboxes)
- Whitelist internal tools and known systems
    
### Power Automate Ideas

- Auto-move detected mail bomb messages to Junk or Quarantine
- Throttle auto-forwarding
- Disable inbox rules temporarily
- Notify SOC team for deeper analysis
    
## Power Automate Flow Example

### Trigger:

**Microsoft Sentinel Alert** on mail bomb detection (from KQL-based Analytics Rule)

### Actions:

- Get alert details → Extract affected RecipientEmailAddress
- Call Microsoft Graph API to move messages to Junk
- Post notification to Teams SOC channel

### Pseudocode for Graph API action (Power Automate HTTP Request):
```http
POST /users/{user-id}/mailFolders/inbox/messages/{message-id}/move Body: { "destinationId": "junkemail" }
```

You can loop through detected messages with the Graph API connector.

## Part 2: Power Automate Flow Template (Outline)

You can create this flow in Power Automate Cloud.

**Trigger**: _When a Sentinel alert is triggered_ (Microsoft Sentinel → Alert Trigger)

**Variables**: - `RecipientEmailAddress` → extracted from alert - `Alert Time Window` → Timestamp of detection

**Actions**:

1️⃣ **Compose** — Set RecipientEmailAddress as a variable
2️⃣ **Search messages** using Graph API connector or "List messages" from Outlook: - Filter by RecipientEmailAddress - Filter Timestamp > Alert time window start
3️⃣ **Apply to Each** message: - **Move message** to Junk folder using "Move Email" action
4️⃣ **Post message to Teams** → SOC channel - "Mail Bomb Mitigation triggered for [RecipientEmailAddress]"
5️⃣ **(Optional)** Send an email to SOC / Admin for tracking ---

## Part 3: Advanced KQL Using Sliding Window

Here’s an optimized **sliding window burst detection** pattern:

```kql
let window = 5m; EmailEvents 
| where Timestamp > ago(2h) 
| summarize EmailCount=count() by bin(Timestamp, window), RecipientEmailAddress 
| order by RecipientEmailAddress asc, Timestamp asc 
| extend Prev1 = prev(EmailCount, 1, 0) 
| extend Prev2 = prev(EmailCount, 2, 0) 
| extend SpikeScore = iif(EmailCount > (Prev1 * 2) and EmailCount > 30, 1, 0) 
| where SpikeScore == 1 
| project Timestamp, RecipientEmailAddress, EmailCount, Prev1, Prev2
```

## Hardening Recommendations

- Block auto-forwarding externally (Defender / Transport Rules)
- Apply DMARC, SPF, DKIM strictly
- Implement inbound throttling per sender / IP
- Monitor for mailbox rule abuse (common in mail bombs)
- Educate VIP users to report any flood of unexpected emails
    

## Final Thoughts

Mail bombs are low-effort but can cause significant operational pain. Fortunately, with solid monitoring and automation, they are easily detected and mitigated.

If you’d like more advanced automation or templates, reach out to me via the [Grom Lab](https://www.grom-lab.com/) contact page!
