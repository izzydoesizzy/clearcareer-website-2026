---
name: counter-offer-response
description: Decision framework and scripts for responding to a current employer's counter-offer
allowed-tools: Read
---

# Counter-Offer Response

Decision framework and scripts for responding to a current employer's counter-offer

**Best with:** Claude Sonnet 4.6

**How to use:**
1. Invoke via `/counter-offer-response [client-slug]` in Claude Code
2. Client context is loaded automatically from the client's data directory

---

## Prompt

Full prompt instructions for Counter-Offer Response

```
### Document Structure

---

#### Header

```markdown
# Counter-Offer Response Guide: [CLIENT NAME]
**Generated**: [TODAY'S DATE]
**Current Employer**: [CURRENT COMPANY]
**New Offer From**: [NEW COMPANY or "Pending"]

> **Important**: A counter-offer is flattering, but flattery is not a strategy. This guide will help you evaluate the counter-offer objectively and respond professionally, whichever way you decide.
```

---

#### Section 1: The Counter-Offer Reality Check

Provide context and data to ground the decision:

```markdown
## The Counter-Offer Reality Check

Before evaluating the specifics, consider these well-documented patterns:

### The Data
- **50% of people who accept counter-offers leave within 12 months anyway** (Wall Street Journal, Harvard Business Review studies)
- **80% of people who accept counter-offers are gone within 18 months** -- either by choice or by the employer's decision
- **The most common reason counter-offers fail**: the underlying issues that drove the job search (growth, culture, management, purpose) are rarely resolved by money alone

### Why Employers Counter-Offer
Understanding your employer's motivation helps you evaluate sincerity:

| Reason | What It Looks Like | Red Flag Level |
|--------|-------------------|----------------|
| Genuine value | Immediate, substantial offer with structural changes (new role, new team, promotion) | Low |
| Replacement cost | Quick salary bump, no other changes | High |
| Project timing | "We need you for [project/quarter]" | High |
| Ego/control | Manager takes it personally, applies pressure | Very High |
| Culture of retention | Company has a track record of counter-offering and following through | Low |

### The Key Question
**Did they need to know you had another offer before they were willing to give you what you're worth?**

If the answer is yes, that tells you something important about how this organization values you when they're not at risk of losing you.
```

---

#### Section 2: Stay vs. Go Decision Matrix

A structured scoring framework personalized to the client:

```markdown
## Stay vs. Go Decision Matrix

Rate each factor 1-5 for both options. Be honest -- this is for your eyes only.

| Factor | Weight | Stay (Counter-Offer) | Go (New Offer) | Notes |
|--------|--------|---------------------|-----------------|-------|
| **Compensation** | | | | |
| Base salary | High | [COUNTER BASE] /5 | [NEW BASE] /5 | |
| Total compensation | High | [COUNTER TOTAL] /5 | [NEW TOTAL] /5 | |
| Equity / upside | Medium | /5 | /5 | |
| **Growth** | | | | |
| Career advancement path | High | /5 | /5 | |
| Skill development | High | /5 | /5 | |
| Title / responsibility | Medium | /5 | /5 | |
| **Culture & Relationships** | | | | |
| Manager relationship | High | /5 | /5 | |
| Team quality | Medium | /5 | /5 | |
| Company culture | High | /5 | /5 | |
| **Quality of Life** | | | | |
| Work-life balance | High | /5 | /5 | |
| Remote / flexibility | Medium | /5 | /5 | |
| Commute / location | Medium | /5 | /5 | |
| **Strategic** | | | | |
| Industry trajectory | Medium | /5 | /5 | |
| Resume value | Medium | /5 | /5 | |
| Network opportunities | Medium | /5 | /5 | |
| Trust & psychological safety | High | /5 | /5 | |
| **Weighted Total** | | **/X** | **/X** | |

### How to Interpret
- **Difference of 10+ points**: The answer is clear. Trust the data.
- **Difference of 5-9 points**: Lean toward the higher score, but weigh the "Trust & psychological safety" row heavily.
- **Difference of <5 points**: The options are genuinely close. In ties, [CLIENT-SPECIFIC ADVICE based on their stated career goals].
```

Personalize the "In ties" guidance based on:
- If the client said they wanted growth, lean toward the new opportunity
- If the client expressed deep loyalty or relationships at current company, acknowledge that pull
- If the client is risk-averse, note that staying is the lower-risk short-term choice but potentially higher-risk long-term

---

#### Section 3: Red Flags That the Counter-Offer Won't Work

```markdown
## Red Flags: Signs the Counter-Offer Won't Solve the Problem

Check any that apply to your situation:

- [ ] **The counter-offer is money only** -- no changes to role, reporting structure, team, or responsibilities. Money alone rarely fixes dissatisfaction.
- [ ] **Your manager seemed hurt or angry** when you resigned, and the counter-offer feels like a reaction rather than a plan.
- [ ] **The promotion/raise was "already in the works"** -- if it was, why did it take your resignation to make it happen?
- [ ] **You've been asked to keep the counter-offer confidential** -- this suggests the company doesn't want to set a precedent, which means the structural issues remain.
- [ ] **The counter-offer doesn't address the reasons you started looking** -- revisit your original motivations. Has anything actually changed?
- [ ] **Your trust is broken** -- you now know you had to threaten to leave to be valued. Can you unknow that?
- [ ] **You'll be seen differently** -- in some organizations, accepting a counter-offer marks you as a flight risk, which can affect future promotions and layoff decisions.
- [ ] **The timeline is vague** -- promises of "we'll look at a promotion in Q3" without specifics or written commitments are often forgotten.

**If 3 or more boxes are checked, the counter-offer is likely a short-term fix to a long-term problem.**
```

---

#### Section 4: Scripts for Declining the Counter-Offer

```markdown
## Scripts: Declining the Counter-Offer

### In-Person / Video Script

> "[MANAGER'S NAME], I really appreciate the counter-offer and the fact that the company wants me to stay. That means a lot to me, and this was not an easy decision.
>
> After careful thought, I've decided to move forward with the new opportunity. The decision isn't about money -- it's about [GROWTH / CHALLENGE / DIRECTION / INDUSTRY ALIGNMENT]. This is the right next step for where I want to take my career.
>
> I want to make sure the next [NOTICE PERIOD] is focused on a smooth transition. I care about this team and I want to leave things in great shape.
>
> Thank you for understanding, and I hope we can stay in touch."

**Key principles**:
- Be firm but warm. "I've decided" -- not "I'm leaning toward" or "I think I might."
- Don't apologize excessively. You're making a professional decision, not committing an offense.
- Redirect to transition. Moving the conversation to "how we handle the handoff" signals the decision is final.
- Don't reveal details about the new offer (salary, company, role) -- it invites negotiation.

### If They Push Back

> "I understand your perspective, and I'm grateful for the offer. I've thought about this carefully, and my decision is made. I'd rather focus my energy on making sure the transition goes well for the team."

### If They Get Emotional or Apply Pressure

> "I respect that this is disappointing, and I don't take it lightly. But I've made my decision and I'd like us to part on the best possible terms. How can I help make the next [NOTICE PERIOD] productive?"

### Email Template: Declining the Counter-Offer

```
Subject: Re: Retention Discussion

Dear [MANAGER'S NAME],

Thank you for taking the time to discuss the counter-offer. I genuinely appreciate the company's willingness to adjust, and it reinforces how much I've valued my time at [CURRENT COMPANY].

After careful consideration, I've decided to proceed with my resignation as originally communicated. This decision is about my long-term career direction, and I believe the new opportunity is the right fit for this stage of my professional growth.

I remain fully committed to ensuring a smooth transition during my remaining [NOTICE PERIOD]. I've already begun documenting my active projects and would welcome a conversation about how to best hand off my responsibilities.

Thank you again for everything, [MANAGER'S NAME]. I hope we'll stay connected.

Best regards,
[CLIENT NAME]
```
```

---

#### Section 5: Scripts for Accepting the Counter-Offer

```markdown
## Scripts: Accepting the Counter-Offer

> **Note**: If you decide to stay, do so with full commitment. Half-hearted acceptance creates a worse outcome than leaving.

### In-Person / Video Script

> "[MANAGER'S NAME], I've thought carefully about the counter-offer, and I've decided to stay. The changes you've proposed around [SPECIFIC CHANGES: role, compensation, reporting structure] address the concerns I had, and I'm excited about [SPECIFIC THING YOU'RE GENUINELY EXCITED ABOUT].
>
> I want to be fully transparent: I'm committing to this. I'd like to set up time to discuss the specifics in writing and agree on a timeline for [any promised changes like promotion, role shift, etc.].
>
> Thank you for working with me on this."

**Key principles**:
- Get the counter-offer terms in writing before formally withdrawing from the other company.
- If the counter-offer includes a promotion or role change, agree on a specific date and have it documented in an email or letter from HR.
- Withdraw from the other company gracefully and promptly (see email template below).

### Email Template: Withdrawing from the New Offer

```
Subject: Update on My Candidacy

Dear [NEW COMPANY HIRING MANAGER],

Thank you for the generous offer to join [NEW COMPANY] as [ROLE]. I've given this a great deal of thought, and after careful consideration, I've decided to remain in my current position at [CURRENT COMPANY].

This was not an easy decision -- I was genuinely impressed by the team, the mission, and the opportunity. I hope our paths cross again in the future.

Thank you for the time you and the team invested in the interview process. I wish [NEW COMPANY] continued success.

Warm regards,
[CLIENT NAME]
```

> **Warning**: Withdrawing from an accepted offer damages a bridge. Only accept the counter-offer if you are genuinely committed to staying for at least 18-24 months. If there's a realistic chance you'll be job searching again in 6 months, take the new offer now.
```

---

#### Section 6: Counter-Offer Retention Statistics

```markdown
## Counter-Offer Retention: What the Research Shows

| Timeframe | % Who Leave After Accepting Counter-Offer | Source |
|-----------|-------------------------------------------|--------|
| Within 6 months | ~30% | National Employment Association |
| Within 12 months | ~50% | Wall Street Journal / Multiple studies |
| Within 18 months | ~80% | Harvard Business Review composite |

### Why Counter-Offers Fail Long-Term

1. **The underlying issues persist**: If you left because of limited growth, a toxic manager, or misalignment with company direction, a salary bump doesn't fix any of those things.

2. **Trust erosion is mutual**: You now know your employer only valued you when threatened. Your employer now sees you as a retention risk. Neither party fully trusts the other.

3. **Peer dynamics shift**: If colleagues learn you got a raise by threatening to leave, it creates resentment. If they don't know, the secrecy creates distance.

4. **The "target" effect**: Some organizations quietly begin succession planning after a counter-offer is accepted. You may have unknowingly started a clock.

5. **Emotional rebound**: The relief and flattery of the counter-offer fades. Within 3-6 months, the same frustrations typically resurface -- but now the other offer is gone.

### When Counter-Offers DO Work

Counter-offers can succeed when:
- The employer addresses structural issues (new role, new manager, new team), not just compensation
- The counter-offer was proactive (the company was already planning changes) and your resignation accelerated the timeline
- You're genuinely staying for reasons beyond money (relationships, mission, equity vesting)
- The company has a documented track record of following through on counter-offer commitments
```

---

#### Section 7: Decision Timeline

```markdown
## Recommended Decision Timeline

| Step | Timing | Action |
|------|--------|--------|
| Receive counter-offer | Day 0 | Thank them, ask for it in writing, request 48-72 hours to consider |
| Evaluate | Days 1-2 | Complete the decision matrix above; discuss with coach and trusted advisors |
| Decide | Day 2-3 | Make your decision based on analysis, not emotion |
| Communicate | Day 3 | Inform your current employer of your decision |
| Follow through | Day 3+ | Either commit fully to staying OR confirm your resignation and new start date |

> **Do NOT**: Drag the decision out beyond 3-5 days. Extended deliberation signals indecisiveness and can cause the new offer to be withdrawn or the current employer to lose patience.
```

### Personalization Requirements

- Reference the client's stated reasons for job searching (from transcripts or preferences) in the red flags section and decision matrix
- If the client has discussed their relationship with their current manager in coaching calls, incorporate that context into the scripts
- Tailor the "growth" factors in the decision matrix to the client's specific career goals
- If the client has completed the Job Offer Evaluation (deliverable), reference that analysis and cross-link
- Adjust the tone of scripts based on the client's seniority -- an executive declining a counter-offer sounds different than a mid-career professional

### Tone

- Empathetic but honest. Counter-offers are emotionally complex -- acknowledge the difficulty while providing clarity.
- Data-driven. Use statistics and structured frameworks to counterbalance the emotional pull of flattery and familiarity.
- Non-judgmental. Neither accepting nor declining is the "wrong" answer. Present both paths with equal professionalism.
- Protective. The client's long-term interests come first. If the data suggests the counter-offer is a trap, say so -- gently but clearly.
```

**Variables to replace:** [CLIENT NAME], [CURRENT COMPANY], [CURRENT TITLE], [NEW COMPANY], [MANAGER'S NAME], [NOTICE PERIOD], [GROWTH / CHALLENGE / DIRECTION], [SPECIFIC CHANGES], [COUNTER BASE], [NEW BASE], [REASONS FOR SEARCHING]

