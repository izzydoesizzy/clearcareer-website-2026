---
name: job-offer-evaluation
description: Analyze a job offer against client criteria with structured decision framework
allowed-tools: Read
---

# Job Offer Evaluation

Analyze a job offer against client criteria with structured decision framework

**Best with:** Claude Sonnet 4.6

**How to use:**
1. Invoke via `/job-offer-evaluation [client-slug]` in Claude Code
2. Client context is loaded automatically from the client's data directory

---

## Prompt

Full prompt instructions for Job Offer Evaluation

```
### Before Generating

Before writing the evaluation, you need offer details. Check if the client has an offer document or notes in their directory:
- `data/clients/$0/intake/offer-*.md` or similar files
- Recent transcript content discussing an offer

If no offer details are available, **prompt the user** to provide:
1. Company name and role title
2. Base salary
3. Bonus structure (annual, signing, performance)
4. Equity/stock (type, vesting schedule, estimated value)
5. Benefits highlights (health, 401k match, PTO, remote policy)
6. Start date
7. Any other notable terms (relocation, title, reporting structure)

### Evaluation Structure

---

#### Section 1: Offer Summary

```markdown
# Job Offer Evaluation: [CLIENT NAME]
**Date**: [TODAY'S DATE]
**Offer From**: [COMPANY NAME]
**Role**: [JOB TITLE]
**Offer Date**: [DATE RECEIVED]
**Decision Deadline**: [DEADLINE or "No stated deadline"]
```

---

#### Section 2: Total Compensation Breakdown

A detailed table breaking down every component of the offer into annualized value:

```markdown
## Total Compensation Breakdown

| Component | Offered | Annual Value | Notes |
|-----------|---------|-------------|-------|
| Base Salary | $[BASE] | $[BASE] | [NOTES: e.g., "Paid semi-monthly"] |
| Annual Bonus | [X]% target | $[ESTIMATED] | [NOTES: e.g., "Performance-dependent, 80-120% payout range"] |
| Signing Bonus | $[AMOUNT] | $[AMORTIZED over 1-2 years] | [NOTES: e.g., "Clawback if leaving within 12 months"] |
| Equity/RSUs | [SHARES/UNITS] | $[ESTIMATED ANNUAL] | [NOTES: vesting schedule, current stock price, liquidity] |
| 401(k) Match | [X]% match | $[VALUE] | [NOTES: vesting schedule for match] |
| Health Insurance | [PLAN TYPE] | $[EMPLOYER CONTRIBUTION] | [NOTES: deductible, family coverage] |
| PTO | [X] days | -- | [NOTES: Unlimited? Accrual? Rollover?] |
| Other Benefits | [LIST] | $[ESTIMATED] | [NOTES: education stipend, WFH allowance, etc.] |
| **Total Year 1** | | **$[TOTAL]** | |
| **Total Annual (Steady State)** | | **$[TOTAL]** | Excluding one-time bonuses |
```

Important notes for the compensation analysis:
- Always calculate Year 1 separately from steady-state (Years 2+), because signing bonuses and equity cliff vesting skew Year 1
- If equity is in a private company, note the valuation uncertainty explicitly
- Convert all benefits to dollar values where possible
- Flag any clawback provisions or conditions

---

#### Section 3: Market Comparison

Compare the offer against the client's salary research (Deliverable #9) and stated salary range:

```markdown
## Market Comparison

| Metric | This Offer | Client Target | Market Data (Deliverable #9) |
|--------|-----------|---------------|------|
| Base Salary | $[OFFERED] | $[MIN]-$[MAX] | [MARKET RANGE] |
| Total Comp | $[OFFERED TOTAL] | -- | [MARKET TOTAL COMP RANGE] |
| Position vs. Market | [PERCENTILE] | -- | Based on [DATA SOURCE] |

**Assessment**: This offer's base salary is [above/at/below] the client's target range and sits at approximately the [Xth] percentile of market data for [ROLE] in [LOCATION].
```

If Deliverable #9 doesn't exist, note this and provide general market commentary based on the role and location from the client's preferences.

---

#### Section 4: Must-Haves vs. Dealbreakers Checklist

Pull from the client's preferences and transcript discussions to create a personalized checklist:

```markdown
## Must-Haves & Dealbreakers

### Must-Haves
| Criteria | Met? | Details |
|----------|------|---------|
| Minimum salary of $[MIN] | Yes/No | Offered: $[BASE] |
| [REMOTE/HYBRID/ONSITE] work arrangement | Yes/No/Partial | [WHAT'S OFFERED] |
| Role in [TARGET INDUSTRY] | Yes/No | [COMPANY INDUSTRY] |
| [SPECIFIC MUST-HAVE from transcripts] | Yes/No | [DETAILS] |
| Management/IC track alignment | Yes/No | [DETAILS] |

### Dealbreakers
| Criteria | Triggered? | Details |
|----------|-----------|---------|
| Excessive travel (>X%) | Yes/No | [TRAVEL REQUIREMENTS] |
| Below $[ABSOLUTE MINIMUM] base | Yes/No | [COMPARISON] |
| [CLIENT-SPECIFIC DEALBREAKER] | Yes/No | [DETAILS] |

**Result**: [X of Y] must-haves are met. [0 or N] dealbreakers are triggered.
```

If the client's must-haves aren't documented, use common criteria and flag that these should be validated with the client.

---

#### Section 5: Culture & Growth Assessment

```markdown
## Culture & Growth Assessment

### Culture Fit
| Factor | Score (1-5) | Evidence |
|--------|------------|----------|
| Company values alignment | [X] | [HOW VALUES MATCH CLIENT'S STATED PRIORITIES] |
| Team/management style | [X] | [WHAT'S KNOWN FROM INTERVIEWS] |
| Work-life balance | [X] | [PTO, FLEXIBILITY, REPUTATION] |
| Diversity & inclusion | [X] | [WHAT'S OBSERVABLE] |
| Company stability | [X] | [FUNDING, REVENUE, MARKET POSITION] |

### Growth Potential
| Factor | Score (1-5) | Evidence |
|--------|------------|----------|
| Career advancement path | [X] | [WHAT THE ROLE LEADS TO] |
| Skill development opportunity | [X] | [NEW SKILLS, TECHNOLOGIES, DOMAINS] |
| Industry trajectory | [X] | [IS THIS INDUSTRY GROWING?] |
| Network building value | [X] | [CALIBER OF COLLEAGUES, BRAND VALUE] |
| Resume impact | [X] | [WILL THIS ROLE STRENGTHEN THE RESUME?] |

**Culture Score**: [X/25]
**Growth Score**: [X/25]
```

Scoring guidance:
- 5 = Exceptional, clearly exceeds expectations
- 4 = Strong, meets expectations with some standout elements
- 3 = Adequate, meets basic expectations
- 2 = Concerning, falls short in notable ways
- 1 = Poor, significant red flag

---

#### Section 6: Side-by-Side Comparison (Multiple Offers)

If the client has more than one offer, or is comparing the offer against staying at their current role:

```markdown
## Side-by-Side Comparison

| Factor | Offer A: [COMPANY A] | Offer B: [COMPANY B] | Current Role (if applicable) |
|--------|---------------------|---------------------|------------------------------|
| Base Salary | $[X] | $[Y] | $[Z] |
| Total Year 1 Comp | $[X] | $[Y] | $[Z] |
| Remote/Flexibility | [DETAILS] | [DETAILS] | [DETAILS] |
| Growth Potential | [HIGH/MED/LOW] | [HIGH/MED/LOW] | [HIGH/MED/LOW] |
| Culture Fit Score | [X/25] | [Y/25] | [Z/25] |
| Commute/Location | [DETAILS] | [DETAILS] | [DETAILS] |
| Must-Haves Met | [X/Y] | [X/Y] | [X/Y] |
| Dealbreakers | [NONE/LIST] | [NONE/LIST] | [NONE/LIST] |
```

---

#### Section 7: Recommendation

```markdown
## Recommendation

**Overall Assessment**: [STRONG ACCEPT / LEAN ACCEPT / NEGOTIATE FIRST / LEAN DECLINE / DECLINE]

### Rationale
[3-5 sentences explaining the recommendation. Reference specific data points from the analysis above. Be honest about trade-offs.]

### If Accepting
- [Key items to confirm before signing]
- [Anything to negotiate even after accepting: start date, title, etc.]
- [Recommended start date considerations]

### If Negotiating
- [Specific items to negotiate, in priority order]
- [Target numbers for each item with justification]
- [Reference Deliverable #21 (Salary Negotiation Framework) for scripts]

### If Declining
- [How to decline professionally]
- [Whether to keep the door open]
- [What this tells us about refining the job search criteria]
```

### Tone and Style

- Be analytical and evidence-based, not emotional
- Present trade-offs honestly -- do not cheerfully endorse a bad offer or unnecessarily disparage a good one
- Use precise dollar amounts and percentages, not vague qualifiers
- When data is missing or uncertain, say so explicitly rather than guessing
- Frame the recommendation as input for a decision, not the decision itself -- the client always has the final say
- Reference other deliverables (salary research, target companies) when relevant to show the value of the program's earlier work
```

**Variables to replace:** [CLIENT NAME], [COMPANY NAME], [JOB TITLE], [BASE], [TARGET MIN/MAX], [MARKET RANGE], [TARGET INDUSTRY], [REMOTE PREFERENCE], [CAREER GOALS], [CURRENT COMPANY/TITLE], [MUST-HAVES]

