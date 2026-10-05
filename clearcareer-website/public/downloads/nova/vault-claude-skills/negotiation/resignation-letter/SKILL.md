---
name: resignation-letter
description: Draft a professional resignation letter in three tone variants
allowed-tools: Read
---

# Resignation Letter

Draft a professional resignation letter in three tone variants

**Best with:** Claude Sonnet 4.6

**How to use:**
1. Invoke via `/resignation-letter [client-slug]` in Claude Code
2. Client context is loaded automatically from the client's data directory

---

## Prompt

Full prompt instructions for Resignation Letter

```
### Letter Generation Framework

Generate **three complete resignation letter variants** plus a practical guide section. Each letter should be ready to use with minimal editing -- the client should only need to fill in dates and any details marked with `[BRACKET]` variables.

---

#### Header (applies to all variants)

```markdown
# Resignation Letter: [CLIENT NAME]
**Generated**: [TODAY'S DATE]
**Current Employer**: [CURRENT COMPANY]
**Current Role**: [CURRENT TITLE]

> **Note to client**: Choose the variant that best fits your relationship with your manager and company. All three are professionally appropriate -- the difference is emotional warmth, not professionalism. When in doubt, go with Variant B (Neutral/Professional).
```

---

#### Variant A: Warm & Grateful

Use when: The client has a positive relationship with their manager and colleagues, values the experience they gained, and wants to leave the door wide open for future collaboration.

```markdown
## Variant A: Warm & Grateful

Dear [MANAGER'S NAME],

I'm writing to formally notify you of my resignation from my position as [CURRENT TITLE] at [CURRENT COMPANY], effective [LAST DAY DATE].

This was not an easy decision. Over the past [TENURE LENGTH], I've had the privilege of [SPECIFIC POSITIVE EXPERIENCE -- e.g., "working alongside an incredibly talented team," "contributing to projects that genuinely challenged me," "growing from a [JUNIOR ROLE] into the [CURRENT ROLE] I am today"]. The [SPECIFIC THING: mentorship, culture, opportunities] here have shaped my career in ways I'll always be grateful for.

I've accepted a new position that aligns with the next chapter of my professional growth, and I'm excited about the opportunity ahead. That said, leaving [CURRENT COMPANY] -- and especially this team -- is bittersweet.

I'm committed to making this transition as smooth as possible. During my remaining [NOTICE PERIOD], I'll [SPECIFIC TRANSITION COMMITMENTS -- e.g., "document all active projects," "complete the Q2 reporting cycle," "train [COLLEAGUE] on my current responsibilities"]. Please let me know how I can be most helpful.

Thank you for everything, [MANAGER'S NAME]. I hope we stay in touch.

Warm regards,
[CLIENT NAME]
```

#### Variant B: Neutral & Professional

Use when: The client has a standard professional relationship, wants to keep things clean and straightforward, or prefers not to be overly emotional.

```markdown
## Variant B: Neutral & Professional

Dear [MANAGER'S NAME],

Please accept this letter as formal notification of my resignation from the position of [CURRENT TITLE] at [CURRENT COMPANY]. My last day of work will be [LAST DAY DATE], providing [NOTICE PERIOD] notice as per [company policy / my employment agreement / standard practice].

I have valued my time at [CURRENT COMPANY] and appreciate the opportunities for professional development that the company has provided.

During the transition period, I am prepared to:
- Complete or hand off all active projects and responsibilities
- Document processes and key information for my successor
- Assist with the transition in any way that is helpful

Please let me know if there are specific priorities for the remaining [NOTICE PERIOD]. I want to ensure a professional and orderly transition.

Thank you for your support during my tenure.

Sincerely,
[CLIENT NAME]
```

#### Variant C: Brief & Direct

Use when: The client prefers minimal communication, has a difficult relationship with their employer, or simply wants to keep it short. Still professional -- just concise.

```markdown
## Variant C: Brief & Direct

Dear [MANAGER'S NAME],

I am writing to formally resign from my position as [CURRENT TITLE] at [CURRENT COMPANY], effective [LAST DAY DATE].

I will ensure an orderly transition of my responsibilities during the notice period. Please let me know how you'd like to handle the handoff.

Thank you for the opportunity.

Regards,
[CLIENT NAME]
```

---

#### Section: Practical Guide

After the three variants, include a practical guide:

```markdown
## Resignation Guide: Dos and Don'ts

### Before You Resign
- [ ] **Confirm your new offer in writing** -- never resign before you have a signed offer letter
- [ ] **Review your employment agreement** -- check for non-compete clauses, notice period requirements, IP assignment provisions, and any clawback provisions (signing bonus, tuition reimbursement, relocation)
- [ ] **Know your benefits timeline** -- when does health insurance end? What happens to unvested equity? Is there a 401(k) match vesting cliff?
- [ ] **Save personal files and contacts** -- remove any personal documents from company devices BEFORE resigning. After you resign, you may lose access quickly.
- [ ] **Calculate your final paycheck** -- accrued PTO payout, prorated bonus, expense reimbursements

### The Resignation Conversation
1. **Tell your manager first, in person (or video if remote)** -- not via email, not via HR, not via Slack. Your manager should not be surprised.
2. **Keep it brief and positive** -- you don't owe a lengthy explanation. "I've accepted an opportunity that's the right next step for me" is sufficient.
3. **Don't be talked into staying in the moment** -- if a counter-offer comes, ask for time to think. See the Counter-Offer Response guide if applicable.
4. **Follow the conversation with the written letter** -- hand it to your manager or email it immediately after.
5. **Don't trash-talk** -- even if you're leaving because of problems, the resignation moment is not the time. Be gracious.

### After You Resign
- [ ] Agree on a communication plan -- when and how will the team be told?
- [ ] Offer to help with the transition -- but set boundaries on workload
- [ ] Request a reference or LinkedIn recommendation before you leave (while goodwill is high)
- [ ] Send a thoughtful goodbye email on your last day (keep it brief, positive, and include your personal contact info)
- [ ] Return all company property (laptop, badge, etc.) and document that you did
- [ ] Update your LinkedIn after your start date at the new company, not on your last day at the old one

### Notice Period Best Practices
| Situation | Recommended Notice |
|-----------|-------------------|
| Standard corporate role | 2 weeks (10 business days) |
| Senior/leadership position | 3-4 weeks |
| Contractual requirement | Whatever the contract states |
| Hostile environment | Minimum required (often 2 weeks) |
| They ask you to leave immediately | This is their choice -- ensure you're paid through the notice period |

### Common Mistakes to Avoid
1. **Resigning verbally without a written letter** -- always put it in writing for your records
2. **Giving too much detail about the new role** -- you don't need to share the company name, salary, or title
3. **Apologizing excessively** -- leaving a job is a normal professional action, not a betrayal
4. **Negotiating after you've already resigned** -- if you're open to staying, negotiate BEFORE submitting the letter
5. **Checking out during the notice period** -- your reputation follows you; finish strong
6. **Posting on social media before telling your employer** -- don't let them find out through LinkedIn
```

---

#### Section: Email Delivery Template

For clients who need to deliver the resignation via email (remote workers, etc.):

```markdown
## Email Delivery Template

**Subject**: Resignation - [CLIENT NAME], [CURRENT TITLE]

[PASTE CHOSEN LETTER VARIANT HERE]

---
Attachment: Resignation_Letter_[CLIENT_NAME]_[DATE].pdf
```

Suggest the client also send a calendar invite for a brief 1:1 with their manager before or immediately after sending the email.

### Personalization Requirements

- Use the client's actual company name, title, and tenure length (calculate from enrollment or resume data if available)
- If transcripts reveal specific positive experiences at the current employer, reference those in Variant A
- If the client is in a leadership role, adjust the transition commitments to reflect delegation and succession planning rather than just documentation
- Adjust notice period recommendations based on the client's seniority and industry norms
- If the client is in a regulated industry (finance, healthcare), include a note about compliance-specific resignation procedures

### Tone

- Professional throughout -- even Variant C should never be curt or rude
- Variant A should feel genuinely warm, not performatively so
- The practical guide should be direct, actionable, and slightly protective (looking out for the client's interests)
- Never include bitterness, passive-aggression, or criticism of the employer in any variant
```

**Variables to replace:** [CLIENT NAME], [CURRENT COMPANY], [CURRENT TITLE], [MANAGER'S NAME], [LAST DAY DATE], [NOTICE PERIOD], [TENURE LENGTH], [SPECIFIC POSITIVE EXPERIENCE], [TRANSITION COMMITMENTS]

