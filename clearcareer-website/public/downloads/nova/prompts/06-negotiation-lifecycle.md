# Negotiation & Career Transitions

Negotiate your offer, evaluate opportunities, and navigate career transitions.

---

## Salary Negotiation Scripts

**What it does:** Generate a comprehensive salary negotiation framework with scripts, email templates, and practice scenarios

**Best with:** Claude Sonnet 4.6

**How to use:**
1. Invoke via `/salary-negotiation-scripts [client-slug]` in Claude Code
2. Client context is loaded automatically from the client's data directory

```
Act as a senior career negotiation coach with 15+ years of experience helping professionals negotiate compensation packages. You specialize in [TARGET INDUSTRY] and have coached hundreds of candidates through offers at companies ranging from startups to Fortune 500s.

Using the client's resume, preferences, target roles, and salary expectations, generate a comprehensive salary negotiation framework structured as follows.

### Section 1: Market Value Research Brief

Create a personalized research section that includes:

1. **Your Target Salary Range**: State the client's target range from `preferences.salaryRange` and contextualize it within market data for their target role and location.
2. **Research Resources Checklist**: List 8-10 specific resources the client should consult, including:
   - Glassdoor salary explorer (with exact search terms to use for their role)
   - Levels.fyi (if tech-adjacent)
   - Payscale.com
   - LinkedIn Salary Insights
   - Robert Half Salary Guide
   - Salary.com
   - H1B Salary Database (if applicable)
   - Industry-specific compensation surveys
3. **Factors That Increase Your Leverage**: List 5-7 specific factors from the client's background that strengthen their negotiating position (e.g., specialized certifications, years of experience, in-demand skills, competing offers).
4. **Your Negotiation Range**: Define three numbers:
   - **Walk-away number**: The absolute minimum they would accept
   - **Target number**: What they realistically want
   - **Anchor number**: The aspirational number to open with (10-20% above target)

### Section 2: Negotiation Scripts

Generate word-for-word scripts for each of these scenarios. Each script should feel natural, confident, and conversational -- not robotic. Include stage directions in [brackets] for tone and pacing.

**Script 1: Initial Offer Response (Buying Time)**
- When the recruiter/hiring manager presents the offer verbally
- Goal: Express enthusiasm without committing, buy 48-72 hours
- Include: gratitude statement, enthusiasm signal, timeline request
- Example opening: "Thank you so much for this offer -- I'm genuinely excited about the opportunity to [specific thing about the role]. I'd love to take a couple of days to review the full package thoughtfully. Could you send the details in writing so I can look everything over?"
- Provide 3 variations: enthusiastic, measured, and brief

**Script 2: Counteroffer Presentation**
- When calling back to present your counter
- Goal: Anchor high, justify with data, remain collaborative
- Structure: appreciation > reaffirm excitement > present research > state counter > pause
- Must include the "collaborative frame" -- positioning the negotiation as working together toward a fair outcome, not adversarial
- Example: "I've done thorough research on the market rate for [ROLE] in [LOCATION], and based on my [X years] of experience in [SPECIFIC SKILL], I was hoping we could discuss a base salary in the range of [ANCHOR NUMBER]. I'm basing this on [cite 2-3 data points]."
- Include the critical instruction: **After stating your number, stop talking. Silence is your most powerful tool.**

**Script 3: Handling "This Is Our Best Offer"**
- When they push back and claim the offer is final
- Goal: Probe for flexibility without being aggressive
- Include 3 response options:
  1. The Probe: "I understand there may be constraints on base salary. Are there other areas of the package we could explore?"
  2. The Reframe: "I appreciate you sharing that. If the base is fixed, could we discuss [signing bonus / equity / review timeline / title]?"
  3. The Walk-Away Test: "I respect the constraints you're working within. I'd like to sleep on it -- can I get back to you by [date]?"

**Script 4: Negotiating Beyond Base Salary**
- When base salary is locked, explore the full compensation package
- Create a prioritized negotiation menu with scripts for each item:
  1. **Signing Bonus**: "Given the gap between the base and my expectations, would a signing bonus of [AMOUNT] be possible to bridge that difference?"
  2. **Equity/Stock Options**: "Can we discuss the equity component? I'd be interested in understanding if there's flexibility in the grant size."
  3. **Performance Review Timeline**: "Would you be open to an accelerated first review at 6 months instead of 12, with the possibility of a salary adjustment at that point?"
  4. **PTO / Vacation Days**: "I currently have [X] weeks of vacation. Would you be able to match that?"
  5. **Remote Work / Flexibility**: "Could we formalize a hybrid arrangement of [X] days remote per week?"
  6. **Title Adjustment**: "Given my level of experience, would it be possible to bring me in at the [SENIOR/LEAD] level?"
  7. **Professional Development Budget**: "Is there a professional development stipend available? I'd love to continue growing in [SPECIFIC AREA]."
  8. **Relocation Assistance**: (if applicable)

### Section 3: Email Templates

Generate 3 polished email templates:

**Email 1: Requesting Time to Consider**
- Subject line: "Thank You - [ROLE] Offer"
- Body: Express gratitude, confirm receipt, request written details if not already received, confirm response timeline
- Tone: warm, professional, enthusiastic but not over-eager
- Keep under 150 words

**Email 2: Written Counteroffer**
- Subject line: "Re: [ROLE] Offer - Thoughts and Discussion"
- Body: Open with genuine enthusiasm for the role and team. Reference specific conversations or aspects of the role that excited them. Present research-backed counter with 2-3 supporting data points. State desired number clearly. Close with collaborative language.
- Include the framework: Enthusiasm > Context > Data > Ask > Collaboration
- Keep under 300 words

**Email 3: Accepting the Offer**
- Subject line: "Re: [ROLE] Offer - Excited to Accept"
- Body: Clear acceptance statement, confirm key terms (start date, salary, any negotiated additions), express excitement about joining, ask about next steps and onboarding
- Keep under 200 words

### Section 4: Key Negotiation Principles

Summarize these five foundational principles with practical guidance:

1. **The Silence Technique**: After stating your number or counter, stop talking. The person who speaks first after a number is stated usually concedes. Practice being comfortable with 5-10 seconds of silence.

2. **Anchoring**: Always let the employer state their range first if possible. If pressed, anchor 10-20% above your target. The first number mentioned heavily influences the final outcome.

3. **BATNA (Best Alternative to a Negotiated Agreement)**: Define the client's BATNA based on their situation -- other offers, current job, freelance options. The stronger your alternative, the more confidently you negotiate.

4. **The Flinch**: When you hear a number that's lower than expected, pause. Let your reaction show (a brief "Hmm" or "I see"). This signals that the number doesn't meet expectations without being confrontational.

5. **Never Accept the First Offer**: Even if it's good, negotiate. Hiring managers expect it. A simple counter of 10-15% is standard and rarely risks the offer.

### Section 5: Practice Scenarios

Create 3 realistic roleplay scenarios customized to the client's target roles. Each scenario should include:

**Scenario 1: The Lowball Offer**
- Setup: Client receives an offer 15-20% below their target range from a company they're excited about
- What the hiring manager says (realistic dialogue)
- Suggested client responses at each stage
- Best possible outcome to aim for
- Red flags to watch for

**Scenario 2: The Competitive Offer**
- Setup: Client has two offers and wants to use leverage without burning bridges
- How to communicate competing offers professionally
- Scripts for telling Company A about Company B's offer without ultimatums
- How to handle "match or beat" conversations

**Scenario 3: The Internal Promotion / Raise**
- Setup: Client is negotiating a raise or promotion at their current company
- How the dynamics differ from external offers
- Scripts for the conversation with their manager
- How to document contributions and frame the request with data

### Formatting Requirements

- Use clear markdown headers (##, ###) for each section
- Use blockquotes (>) for all scripts and dialogue examples
- Use bold for key phrases within scripts that the client should emphasize
- Include [stage directions] in brackets within scripts for tone guidance
- Add a "Quick Reference Card" at the end: a single-page summary of the 5 most important scripts in abbreviated form
- Add a "Do's and Don'ts" table at the very end

### Anti-Patterns to Avoid

- Do NOT use aggressive or adversarial language in any script
- Do NOT suggest lying about competing offers
- Do NOT suggest a specific salary number without basing it on the client's `preferences.salaryRange`
- Do NOT use generic scripts that ignore the client's industry and role context
- Do NOT include more than 3 variations of any single script -- focus on quality over quantity
- Do NOT make the tone overly formal or legalistic -- these should sound like a confident professional, not a lawyer

### Tone and Voice

The overall tone should be: **confident, warm, collaborative, and data-driven**. The client should feel empowered reading this, not anxious. Every script should feel like something a real person would actually say in conversation -- natural phrasing, appropriate warmth, and strategic pauses.
```

**Variables to replace:** [TARGET INDUSTRY], [ROLE], [TARGET ROLE], [LOCATION], [ANCHOR NUMBER], [X years], [SPECIFIC SKILL], [AMOUNT], [COMPANY NAME], [SENIOR/LEAD]

---

## Job Offer Evaluation

**What it does:** Analyze a job offer against client criteria with structured decision framework

**Best with:** Claude Sonnet 4.6

**How to use:**
1. Invoke via `/job-offer-evaluation [client-slug]` in Claude Code
2. Client context is loaded automatically from the client's data directory

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

---

## Counter-Offer Response

**What it does:** Decision framework and scripts for responding to a current employer's counter-offer

**Best with:** Claude Sonnet 4.6

**How to use:**
1. Invoke via `/counter-offer-response [client-slug]` in Claude Code
2. Client context is loaded automatically from the client's data directory

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

---

## Resignation Letter

**What it does:** Draft a professional resignation letter in three tone variants

**Best with:** Claude Sonnet 4.6

**How to use:**
1. Invoke via `/resignation-letter [client-slug]` in Claude Code
2. Client context is loaded automatically from the client's data directory

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

---

## First 90 Days Plan

**What it does:** Generate a 30-60-90 day onboarding success plan for a new role

**Best with:** Claude Sonnet 4.6

**How to use:**
1. Invoke via `/first-90-days-plan [client-slug]` in Claude Code
2. Client context is loaded automatically from the client's data directory

```
### Before Generating

To create a truly useful 90-day plan, you need to know the target role. Check available context:

1. **Best case**: Client has accepted an offer -- use the specific company and role details
2. **Good case**: Client has target roles defined in preferences -- generate for `preferences.targetRoles[0]`
3. **Minimum case**: Use whatever is available from resume and preferences to infer the role

If the role is unclear, prompt the user to specify:
- New role title
- Company (or type of company: startup, enterprise, agency, etc.)
- Team size they'll be joining or leading
- Whether this is an IC or management role
- Any specific expectations communicated during interviews

### Plan Structure

---

#### Header

```markdown
# First 90 Days Plan: [CLIENT NAME]
**New Role**: [JOB TITLE] at [COMPANY NAME]
**Start Date**: [START DATE or "TBD"]
**Generated**: [TODAY'S DATE]
**Plan Type**: [Individual Contributor / People Manager / Executive]

> This plan is designed to be shared with your new manager during your first week. It shows initiative, creates alignment, and gives you both a framework for early check-ins.
```

---

#### Section 1: Days 1-30 -- Listen, Learn, Build Trust

**Theme**: Absorb everything. Build relationships. Understand the landscape before trying to change it.

```markdown
## Phase 1: Days 1-30 -- Listen, Learn, Build Trust

### Mindset
You are a sponge, not a fixer. Resist the urge to suggest improvements in the first month, no matter how obvious they seem. Your job right now is to understand the "why" behind how things work, build credibility through competence, and earn the trust that gives you permission to drive change later.

### Key Objectives
1. **Understand the business context**
   - Learn the company's products/services, revenue model, and competitive position
   - Understand the team's OKRs/goals and how they connect to company strategy
   - Identify the top 3 priorities your manager cares about most

2. **Map the organization**
   - Identify key stakeholders: who makes decisions, who influences, who blocks
   - Understand the team dynamics: who are the experts, the connectors, the culture carriers
   - Learn the unwritten rules: communication norms, meeting culture, decision-making style

3. **Build foundational relationships**
   - Schedule 1:1 introductory meetings with every team member
   - Meet cross-functional partners (at least 2-3 from adjacent teams)
   - Establish a strong working relationship with your direct manager

4. **Deliver early credibility**
   - Identify 1-2 quick wins: small, visible improvements that don't require deep context
   - Complete all onboarding tasks ahead of schedule
   - Volunteer for a time-sensitive task to demonstrate reliability

### Stakeholder Meeting Guide

Schedule 15-30 minute introductory conversations with each key stakeholder. Use these questions:

| Category | Questions |
|----------|-----------|
| Their role | "What does your team own? What are your biggest priorities right now?" |
| Working together | "How will we interact most? What does a great working relationship look like to you?" |
| Context | "What should I know about [DOMAIN] that isn't in the documentation?" |
| Pain points | "What's the biggest challenge you're facing that I might be able to help with?" |
| History | "What's been tried before in [AREA]? What worked, what didn't?" |

Aim to complete: **8-12 stakeholder meetings** in the first 30 days.

### First Week Checklist
- [ ] Complete all HR/IT onboarding (accounts, access, equipment)
- [ ] Have a detailed 1:1 with your manager to align on 30/60/90 expectations
- [ ] Get added to all relevant Slack channels, email lists, and recurring meetings
- [ ] Read the last 3 months of team meeting notes / standup summaries
- [ ] Identify your onboarding buddy or go-to person for questions
- [ ] Set up your calendar with recurring 1:1s (manager, direct reports if applicable, key partners)
- [ ] Review the team's current projects, backlog, and roadmap

### Metrics to Track
- Number of stakeholder meetings completed
- Onboarding tasks completed on time
- Manager's satisfaction in weekly 1:1 (ask directly: "How am I doing so far?")
```

---

#### Section 2: Days 31-60 -- Contribute, Optimize, Propose

**Theme**: Start adding tangible value. Move from observer to contributor. Begin identifying opportunities.

```markdown
## Phase 2: Days 31-60 -- Contribute, Optimize, Propose

### Mindset
You've built enough context to start contributing meaningfully. You're not the new person anymore -- you're a team member with a unique outsider's perspective that won't last forever. Now is the time to channel observations into action, but always with humility and collaboration.

### Key Objectives
1. **Own your responsibilities fully**
   - Take full ownership of your core deliverables without hand-holding
   - Demonstrate consistent, reliable output in your primary function
   - Begin developing your own processes and workflows

2. **Identify improvement opportunities**
   - Document 3-5 observations from your fresh-eyes perspective
   - Prioritize by impact and feasibility -- what can you improve without major disruption?
   - Validate observations with trusted colleagues before proposing changes

3. **Deepen expertise**
   - Develop deep knowledge in [SPECIFIC DOMAIN relevant to the role]
   - Identify skill gaps and create a self-directed learning plan
   - Seek feedback actively: "What's one thing I could do better?"

4. **Expand your network**
   - Build relationships beyond your immediate team
   - Attend company events, ERGs, or cross-functional working groups
   - Start establishing yourself as a go-to person for [SPECIFIC EXPERTISE]

### Contribution Framework

| Area | Action | Expected Outcome |
|------|--------|-----------------|
| [PRIMARY RESPONSIBILITY] | [SPECIFIC ACTION] | [MEASURABLE RESULT] |
| Process improvement | Identify and fix one workflow inefficiency | Time saved or errors reduced |
| Knowledge sharing | Create or improve one piece of documentation | Team efficiency gain |
| Cross-functional | Contribute to one initiative outside your core team | Visibility and relationship building |

### 30-Day Review Conversation

At the 30-day mark, request a formal or informal check-in with your manager. Bring:
1. A summary of what you've learned and accomplished
2. Your 3-5 observations about opportunities
3. Questions about priorities for the next 30 days
4. Any concerns or resource needs

Ask: "Am I focused on the right things? What should I do more of, less of, or differently?"

### Metrics to Track
- Projects completed or contributed to
- Feedback received (qualitative -- keep a log)
- One process improved or documented
- Cross-functional relationships established
```

---

#### Section 3: Days 61-90 -- Lead, Impact, Set Long-Term Vision

**Theme**: Demonstrate measurable impact. Take on larger ownership. Set the trajectory for the next 6-12 months.

```markdown
## Phase 3: Days 61-90 -- Lead, Impact, Set Long-Term Vision

### Mindset
By now, you should feel like a full member of the team. This phase is about transitioning from "contributing" to "driving." You're no longer just completing tasks -- you're shaping direction, influencing decisions, and building toward long-term goals. This is also when your manager starts forming their longer-term assessment of your trajectory.

### Key Objectives
1. **Deliver a signature win**
   - Complete one meaningful project or initiative that demonstrates your full capabilities
   - Ensure it's visible to your manager and relevant stakeholders
   - Quantify the impact where possible (revenue, efficiency, quality, speed)

2. **Propose a strategic initiative**
   - Based on your 60 days of observation and contribution, propose one significant improvement or new initiative
   - Present it with context, data, a plan, and resource requirements
   - This demonstrates strategic thinking and ownership mindset

3. **Establish your professional brand internally**
   - Be known for [SPECIFIC EXPERTISE/QUALITY]
   - Mentor or support a colleague (even informally)
   - Contribute to team culture -- be someone people want to work with

4. **Set your 6-12 month trajectory**
   - Create a development plan with your manager
   - Identify stretch goals and growth opportunities
   - Align on how success will be measured going forward

### 90-Day Review Preparation

At the 90-day mark, prepare a concise self-assessment to share with your manager:

```
**90-Day Summary: [CLIENT NAME]**

What I accomplished:
- [KEY ACHIEVEMENT 1 with measurable impact]
- [KEY ACHIEVEMENT 2 with measurable impact]
- [KEY ACHIEVEMENT 3 with measurable impact]

What I learned:
- [KEY INSIGHT about the company/industry/role]
- [KEY INSIGHT about the team/culture]

What I want to focus on next:
- [GOAL 1 for months 4-6]
- [GOAL 2 for months 4-6]
- [DEVELOPMENT AREA I'd like to grow in]

What I need:
- [RESOURCE, ACCESS, or SUPPORT that would help]
```

### Metrics to Track
- Signature project completed with measurable impact
- Strategic proposal delivered
- Manager feedback on performance trajectory
- Peer feedback or recognition received
```

---

#### Section 4: Role-Specific Customization

Tailor the plan based on whether the client is entering an IC, management, or executive role:

```markdown
## Role-Specific Priorities

### If Individual Contributor
- Days 1-30: Focus on technical ramp-up and understanding the codebase/tools/systems
- Days 31-60: Ship your first solo project; establish code review or peer feedback rhythms
- Days 61-90: Become the team expert in one area; propose a technical improvement

### If People Manager
- Days 1-30: Conduct 1:1s with every direct report; understand each person's goals, challenges, and working style
- Days 31-60: Establish your management rhythms (1:1 cadence, team meetings, feedback loops); address any urgent team issues
- Days 61-90: Set team goals for the next quarter; have career development conversations with each report; deliver on one team-level improvement

### If Executive / Senior Leader
- Days 1-30: Build relationships with leadership peers and board members; understand the P&L and strategic plan deeply
- Days 31-60: Assess the team and organizational structure; identify the top 3 strategic priorities
- Days 61-90: Present a 6-month vision to leadership; make any critical hiring or structural decisions; establish your leadership cadence
```

---

#### Section 5: Questions to Ask in the First Week

```markdown
## Essential First-Week Questions

### For Your Manager
1. "What does success look like for me at the 30, 60, and 90-day marks?"
2. "What are the top 3 things you want me to focus on first?"
3. "Who are the key people I should build relationships with early?"
4. "What are the biggest challenges the team is facing right now?"
5. "How do you prefer to communicate -- Slack, email, in-person, scheduled 1:1s?"
6. "Is there anything the previous person in this role did that worked really well? Anything that didn't?"

### For Your Peers
1. "What should I know about working with this team that isn't in the handbook?"
2. "What's your biggest pain point right now?"
3. "How can I best support your work?"

### For Your Direct Reports (if managing)
1. "What's going well that I should protect and continue?"
2. "What's one thing you'd change about how the team operates?"
3. "What do you need from me to do your best work?"
4. "What are your career goals for the next 1-2 years?"
```

### Personalization Requirements

- Tailor all objectives, actions, and examples to the client's specific target role and industry
- If the client has accepted a specific offer, reference the actual company, team, and role details
- Pull from the client's resume to identify relevant past experiences that will transfer ("You've done this before at [PREVIOUS COMPANY] -- bring that experience to [NEW SITUATION]")
- Adjust seniority of the plan based on the client's experience level and target role
- If the client is transitioning industries, add a "domain knowledge ramp-up" section to Phase 1
- If the client is making an IC-to-management transition, emphasize the mindset shift and people skills in all three phases

### Tone

- Encouraging but realistic -- starting a new job is exciting AND stressful
- Practical and specific -- avoid generic advice like "be a team player"
- Strategic -- help the client think about their career trajectory, not just survival
- Confident -- assume the client is capable and this plan will accelerate their success
```

**Variables to replace:** [CLIENT NAME], [JOB TITLE], [COMPANY NAME], [START DATE], [PLAN TYPE], [SPECIFIC DOMAIN], [SPECIFIC EXPERTISE], [PRIMARY RESPONSIBILITY], [PREVIOUS COMPANY], [INDUSTRY]

---

## Professional Reference List Builder

**What it does:** Generate a formatted professional reference list with prep materials for references

**Best with:** Claude Sonnet 4.6

**How to use:**
1. Invoke via `/reference-list-builder [client-slug]` in Claude Code
2. Client context is loaded automatically from the client's data directory

```
Generate a comprehensive reference preparation kit containing ALL sections below. Use the client's resume and intake materials to identify likely references and pre-populate where possible. Ask the user for specific reference details if needed.

### Section 1: Reference Selection Strategy

Open with strategic guidance on choosing references:

```markdown
## Reference Selection Strategy

### The Ideal Reference Portfolio
You need **3-5 references** ready at all times. The strongest reference lists include a mix of relationship types that together paint a complete picture of who you are as a professional.

### Reference Types to Include

| Type | Who | What They Validate | Priority |
|------|-----|-------------------|----------|
| **Direct Manager** | A supervisor who managed your day-to-day work | Work ethic, performance, reliability, growth | Essential (must have at least 1) |
| **Senior Leader** | A VP, director, or executive who knows your work | Strategic impact, leadership potential, judgment | Highly valuable |
| **Peer/Colleague** | Someone at your level who worked closely with you | Collaboration, teamwork, technical skills | Important for team-oriented roles |
| **Cross-Functional Partner** | Someone from another department you collaborated with | Communication, influence without authority, adaptability | Valuable for leadership roles |
| **Direct Report** | Someone who reported to you | Management style, mentorship, delegation | Essential for management roles |
| **Client/Vendor** | External stakeholder you worked with | Client management, relationship building, professionalism | Strong differentiator |

### Selection Rules
1. **Recency matters**: Prioritize references from the last 5 years. Older references are acceptable if the relationship was significant.
2. **Relevance over rank**: A colleague who can speak in detail about your project work is more valuable than a CEO who vaguely remembers you.
3. **Diversity of perspective**: Each reference should illuminate a different strength. Avoid 3 references who all say "great team player."
4. **Test the relationship**: If you're unsure someone would give a strong reference, they probably won't. Only list enthusiastic advocates.
5. **Match references to roles**: Different opportunities may call for different reference combinations. Have a bench of 5-6 people you can mix and match from.

### Who NOT to Use
- Family members or personal friends (unless they were also professional collaborators)
- Supervisors who you had a contentious relationship with
- Anyone you haven't spoken to in 3+ years without reconnecting first
- Anyone who might be surprised to receive the call
```

### Section 2: Formatted Reference List

Generate a clean, professionally formatted reference list. Pre-populate with likely references from the client's resume (former managers, notable colleagues) and clearly mark fields the client needs to fill in:

```markdown
## Professional References for [Client Name]

---

### Reference 1: [Direct Manager]
**Name**: [Reference Name]
**Title**: [Current Title]
**Company**: [Current Company]
**Relationship**: [e.g., "Direct manager at Acme Corp, 2021-2024"]
**Phone**: [Phone Number]
**Email**: [Email Address]
**Best time to reach**: [Morning/Afternoon/Evening]
**Preferred contact method**: [Phone/Email]

---

### Reference 2: [Senior Leader / Cross-Functional Partner]
**Name**: [Reference Name]
**Title**: [Current Title]
**Company**: [Current Company]
**Relationship**: [e.g., "VP of Engineering; oversaw my team's integration project"]
**Phone**: [Phone Number]
**Email**: [Email Address]
**Best time to reach**: [Morning/Afternoon/Evening]
**Preferred contact method**: [Phone/Email]

---

### Reference 3: [Peer/Colleague]
**Name**: [Reference Name]
**Title**: [Current Title]
**Company**: [Current Company]
**Relationship**: [e.g., "Co-led the product launch at XYZ Corp"]
**Phone**: [Phone Number]
**Email**: [Email Address]
**Best time to reach**: [Morning/Afternoon/Evening]
**Preferred contact method**: [Phone/Email]

---
```

Generate 3-5 reference slots based on the client's career history. Infer likely reference categories from their resume (e.g., if they managed a team, include a "Direct Report" slot).

### Section 3: Reference Request Email Templates

Provide ready-to-send email templates for asking someone to be a reference:

```markdown
## Reference Request Templates

### Template A: Former Manager (Close Relationship)

Subject: Would you be willing to serve as a reference?

Hi [Manager Name],

I hope you're doing well! I'm reaching out because I'm currently exploring new opportunities in [TARGET AREA], and I'm in the process of assembling my references.

Our time working together at [Company] was one of the most formative experiences in my career -- particularly [SPECIFIC PROJECT OR EXPERIENCE YOU SHARED]. Your mentorship during [SPECIFIC SITUATION] made a real impact on my professional growth.

Would you be willing to serve as a reference? I'm targeting [TYPE OF ROLES] at [TYPE OF COMPANIES], and I think your perspective on my [SPECIFIC SKILLS -- e.g., "ability to lead cross-functional projects" or "technical problem-solving"] would resonate strongly with potential employers.

If you're open to it, I'll send you a brief prep sheet with the key things I'd love you to highlight. I'll also always give you advance notice before sharing your information -- no surprise calls!

Thank you so much for considering this. I'm happy to return the favor anytime.

Warm regards,
[Your Name]

### Template B: Colleague or Cross-Functional Partner

Subject: Quick ask -- reference for my job search

Hi [Colleague Name],

It's been [great staying in touch / too long since we connected]! I wanted to reach out because I'm currently looking for my next role in [TARGET AREA], and I immediately thought of you as someone who could speak to [SPECIFIC SKILL OR COLLABORATION].

Working with you on [SPECIFIC PROJECT/INITIATIVE] at [Company] was a highlight -- especially [SPECIFIC MEMORY OR OUTCOME]. I think your perspective on our collaboration would carry a lot of weight.

Would you be comfortable being a reference? I'd only share your info with companies I'm seriously pursuing, and I'll always give you a heads-up before anyone reaches out.

Let me know, and thanks for even considering it!

Best,
[Your Name]

### Template C: Reconnecting After a Gap

Subject: Reconnecting -- and a favor to ask

Hi [Name],

I hope this message finds you well! It's been a while since we worked together at [Company], and I've been meaning to reconnect. I've been following your work at [Current Company] -- congrats on [RECENT ACHIEVEMENT IF KNOWN].

I'm currently in the market for a new role in [TARGET AREA], and as I'm building my reference list, your name was one of the first that came to mind. Our work together on [PROJECT/INITIATIVE] was some of the strongest of my career, and I think your perspective would be very valuable.

Would you be open to a quick call to catch up? I'd love to fill you in on what I've been up to and, if you're comfortable, discuss the possibility of you serving as a reference.

No pressure at all -- I completely understand either way.

Best regards,
[Your Name]
```

### Section 4: Reference Prep Sheets

For each reference, generate a personalized prep sheet that the client can send (or share verbally) so the reference knows exactly what to emphasize:

```markdown
## Reference Prep Sheets

### Prep Sheet for [Reference 1 Name]

**Thank you for being a reference for [Client Name]!**

Here's a quick briefing so you're prepared when a potential employer calls:

**Roles I'm targeting**: [Target job titles and industries]

**Key things I'd love you to highlight**:
1. **[Skill/Quality 1]**: Specifically, how I [SPECIFIC EXAMPLE -- e.g., "led the migration project that reduced system downtime by 40%"]
2. **[Skill/Quality 2]**: Especially our work on [SPECIFIC PROJECT] where I [SPECIFIC CONTRIBUTION]
3. **[Skill/Quality 3]**: If they ask about my [leadership/technical/collaboration] skills, the [SPECIFIC STORY] would be a great example

**Stories that resonate**:
- The time I [ACHIEVEMENT 1 that this reference witnessed]
- How I handled [CHALLENGE that this reference can speak to]
- My role in [PROJECT OUTCOME this reference was part of]

**Common questions they might ask you**:
1. "How would you describe [Client Name]'s work style?"
2. "Can you give an example of [Client Name] handling a challenging situation?"
3. "What are [Client Name]'s greatest strengths?"
4. "What areas could [Client Name] improve in?" (Suggest: frame as growth areas that are also strengths -- e.g., "She's so thorough that sometimes she spends more time than necessary perfecting details, but she's learned to balance quality with speed")
5. "Would you work with [Client Name] again?"

**What NOT to mention**:
- [Any sensitive topics, gaps, or situations to avoid]
- Salary history or expectations
- Reasons for leaving (let me handle that narrative)

**Heads-up process**: I'll always email you before sharing your info with a company, including the company name, role, and expected timeline for the call.
```

Generate a prep sheet for each reference. Tailor the stories and highlights based on the client's resume -- match achievements to the reference who witnessed them.

### Section 5: Timeline & Process

```markdown
## Reference Timeline

### When to Prepare References
- **Start of job search**: Identify 5-6 potential references and reach out with the request email
- **Before first application**: Have at least 3 confirmed references ready

### When to Notify References
- **When you reach the interview stage**: Send a heads-up email: "I have an interview with [Company] for [Role]. They may reach out soon."
- **Before sharing their info**: Always email first with the company name, role, and who might call
- **After the process concludes**: Whether you got the offer or not, close the loop. Thank them.

### Notification Email Template

Subject: Heads up -- [Company Name] may contact you

Hi [Reference Name],

Quick heads up: I'm in the [interview/final round] process with [Company] for a [Job Title] role, and I've listed you as a reference. [Recruiter/Hiring Manager Name] from their team may reach out in the next [timeframe].

The role focuses on [1-2 sentence description]. If they ask, I'd love for you to emphasize [KEY POINT TO HIGHLIGHT FOR THIS SPECIFIC ROLE].

Thanks so much -- I'll keep you posted on how it goes!

[Your Name]
```

### Section 6: What to Do If You Have Limited References

Address common reference challenges:

```markdown
## Handling Reference Challenges

### "I can't use my current manager"
This is extremely common and no employer will penalize you for it. Options:
- Use a previous manager from an earlier role
- Use a senior colleague at your current company you trust
- Explain: "I'd prefer not to alert my current employer, but I can provide [alternative]"
- Some companies accept "upon offer" reference checks -- negotiate this

### "I've only had 1-2 jobs"
- Use professors, academic advisors, or capstone project supervisors
- Volunteer supervisors or board members of organizations you've contributed to
- Freelance clients or contract managers
- Mentors from professional development programs

### "I left a previous role on bad terms"
- You don't have to list everyone. Choose the references who will advocate for you.
- If pressed about a specific employer, offer a peer or cross-functional partner from that organization
- Prepare a brief, professional narrative about the departure that focuses on what you learned

### "It's been years since I worked with my best references"
- Reconnect first (use Template C above)
- Update them on your career since you worked together
- Send the prep sheet so they have fresh details to reference
- A strong but slightly dated reference is better than a weak recent one

### "My references might be contacted and say something negative"
- Do a reference check on yourself: have a trusted friend call as a "prospective employer" and report back
- If there's a genuine risk, proactively address it: tell the recruiter "You may hear [X] from [reference], and here's the full context..."
- Replace any uncertain references with enthusiastic ones
```

### Tone and Style

- Practical and organized -- this is a preparation kit, not a motivational piece
- Coaching voice -- guide the client through a process they may not have done formally before
- Anticipate anxiety -- many people feel uncomfortable asking for references; normalize it
- Template-ready -- every email should be copy-paste ready with clear placeholders
```

**Variables to replace:** [Client Name], [Your Name], [Reference Name], [Company], [TARGET AREA], [SPECIFIC PROJECT/INITIATIVE], [SPECIFIC SKILLS], [Target job titles], [KEY ACHIEVEMENTS], [Manager Name], [Colleague Name]

---

## Rejection Reframe & Analysis

**What it does:** Constructively analyze a job rejection and extract actionable lessons

**Best with:** Claude Sonnet 4.6

**How to use:**
1. Invoke via `/rejection-reframe [client-slug]` in Claude Code
2. Client context is loaded automatically from the client's data directory

```
Generate a complete rejection analysis document. Ask the user for details about the rejection if not provided (which company, what stage, any feedback received, how they're feeling about it). Then produce ALL sections below.

### Section 1: What Happened (Factual Summary)

Present the facts of the rejection without emotional coloring:

```markdown
## What Happened

**Company**: [Company Name]
**Role**: [Job Title]
**Stage Reached**: [Application / Phone Screen / Technical Interview / Final Round / Offer Stage]
**Date of Rejection**: [Date]
**Feedback Received**: [Quote any feedback provided, or "No feedback provided"]
**Time Invested**: [Approximate total hours spent on this opportunity]
**Application Method**: [Applied online / Referred by / Recruiter reached out / Networking]
```

Keep this section purely factual. No interpretation, no emotion -- just the record. This separation of fact from feeling is the foundation of the reframe.

### Section 2: What This Does NOT Mean About You

This is the most critical section. Directly counter the negative self-talk that follows rejection:

```markdown
## What This Does NOT Mean About You

Rejection triggers automatic negative thoughts. Let's address them directly.

### Common Thought: "I'm not good enough"
**Reality**: This rejection means you were not the selected candidate for this specific role at this specific company at this specific time. It does not measure your worth, talent, or potential. Companies reject exceptional candidates constantly for reasons that have nothing to do with capability:
- The role was filled internally but the posting stayed live
- A candidate with a niche skill edge (not better -- just different) was selected
- Budget was cut mid-process
- The hiring manager had a predetermined preference
- Cultural fit is subjective and varies team to team

### Common Thought: "I should have done better in the interview"
**Reality**: [If interview stage was reached] Even flawless interviews result in rejection. The hiring process is not a meritocracy -- it's a selection process influenced by dozens of variables outside your control. What you CAN control is preparation, and you showed up.

### Common Thought: "I'll never find the right role"
**Reality**: You've been searching for [DURATION]. The average job search for professionals at your level takes [3-6 months / 6-9 months depending on seniority]. You are [within normal range / still early in the process / past the average but that's not uncommon for senior roles]. One rejection does not change the probability of your next application succeeding.

### What IS true
- You identified a role worth pursuing -- your targeting instincts are working
- You [made it to X stage] -- that means your [resume/interview skills/qualifications] passed [X] filters
- You gained information about [Company], [industry], and your own preferences that you didn't have before
```

Customize this section based on what stage the client reached. Getting rejected after a final round deserves different reframing than a post-application silence.

### Section 3: Lessons Learned

Be honest and constructive. Not everything is outside the client's control -- some rejections contain real signals:

```markdown
## Lessons Learned

### What Went Well
- [Specific positive element -- e.g., "Your resume passed ATS and recruiter screening"]
- [Specific positive element -- e.g., "You made it to the final round against strong competition"]
- [Specific positive element -- e.g., "The recruiter mentioned your [X] was impressive"]

### What Could Be Improved
Be honest here. Growth comes from candid assessment, not reassurance.

- **[Area 1]**: [Specific observation and improvement suggestion]
  _Action_: [Concrete step to improve]

- **[Area 2]**: [Specific observation and improvement suggestion]
  _Action_: [Concrete step to improve]

- **[Area 3 if applicable]**: [Specific observation and improvement suggestion]
  _Action_: [Concrete step to improve]

### Questions to Reflect On
1. Was this role genuinely aligned with your strengths, or were you stretching into an area where you need more development?
2. If you could redo one part of the process, what would it be and why?
3. Did anything during the process reveal something about the company or role that concerned you?
4. Were there any signals during the process that this might not be the right fit -- signals you might have minimized?
```

If the client received specific feedback from the company, directly address each point of feedback with an honest assessment and action plan.

### Section 4: Action Plan (This Week)

Provide 3 specific, achievable actions the client can take THIS WEEK to channel rejection energy into forward progress:

```markdown
## Action Plan: 3 Steps This Week

### Step 1: [Concrete Action]
**What**: [Specific, actionable task -- not "keep applying" but "Submit 3 applications to roles at companies X, Y, Z from your target list"]
**Why**: [How this directly addresses a lesson from the rejection or maintains momentum]
**Time required**: [Realistic estimate]
**Deadline**: [Specific day this week]

### Step 2: [Concrete Action]
**What**: [Specific skill-building or preparation task]
**Why**: [How this strengthens an area identified in the lessons learned]
**Time required**: [Realistic estimate]
**Deadline**: [Specific day this week]

### Step 3: [Concrete Action]
**What**: [Networking or outreach task -- reconnect, reach out, expand network]
**Why**: [Rejection is isolation-inducing; this step counters that]
**Time required**: [Realistic estimate]
**Deadline**: [Specific day this week]
```

Actions must be:
- Specific enough that the client knows exactly what to do
- Small enough to complete in the emotional aftermath of rejection
- Varied (one application, one skill-building, one relational)
- Achievable within the week

### Section 5: Pattern Analysis

Look at the client's broader job search data and identify trends:

```markdown
## Pattern Analysis

### Your Job Search by the Numbers
| Metric | Count |
|--------|-------|
| Total Applications Submitted | [N] |
| Phone Screens | [N] |
| Interviews | [N] |
| Final Rounds | [N] |
| Offers | [N] |
| This Rejection Stage | [Stage] |

### Conversion Rates
- Application to Phone Screen: [X%] (industry average: 10-20%)
- Phone Screen to Interview: [X%] (industry average: 40-60%)
- Interview to Final Round: [X%] (industry average: 30-50%)
- Final Round to Offer: [X%] (industry average: 25-50%)

### Pattern Observations
[Analyze the data for patterns. Examples:]
- "You're consistently making it to the interview stage, which means your resume and phone presence are strong. The gap is between interview and offer -- let's focus interview preparation."
- "Your application-to-screen rate is below average, suggesting your resume may need ATS optimization for the roles you're targeting."
- "You've only applied to 8 roles. At your level, the typical offer comes after 50-100 applications. You're still very early in the process."

### What the Data Says
[Honest, data-driven assessment of where they are in the process and what the numbers suggest they should focus on]
```

If job search data is not available, provide the template with industry benchmark data and prompt the client to fill in their numbers.

### Section 6: Motivational Context

Ground the emotional experience in data and reality:

```markdown
## Putting Rejection in Context

### The Numbers
- The average corporate job posting receives **250 applications**
- Of those, **4-6 candidates** are interviewed
- **1 person** gets the offer
- That means **98% of applicants are rejected every time** -- including exceptional candidates
- The average professional applies to **100-200 positions** before receiving an offer at the mid-career level
- Senior and executive roles average **6-12 months** of active searching

### Successful People Who Were Rejected
This isn't about motivation posters. It's about the statistical reality that rejection is the default outcome of application, and it is completely uncorrelated with eventual success:
- The average CEO was rejected from multiple companies before their breakthrough role
- Most successful career changers report 50+ rejections during their pivot
- Recruiters themselves say they reject candidates they know are excellent because they can only pick one

### Your Specific Encouragement
[Based on the client's resume, achievements, and situation, provide 2-3 sentences of genuine, evidence-based encouragement. Reference specific accomplishments from their resume. This is not generic -- it should be grounded in their actual track record.]
```

### Section 7: Energy Recovery

Close with practical steps to rebuild emotional momentum:

```markdown
## Energy Recovery Plan

Rejection depletes motivation. These are research-backed strategies to restore it:

### Today
- **Acknowledge the feeling**: Name the emotion (disappointment, frustration, self-doubt). Naming it reduces its power. You're allowed to feel it.
- **Physical reset**: 20-minute walk, workout, or any physical activity. Movement interrupts rumination.
- **Talk to one person**: Text a friend, call a supporter, or message your coach. Isolation amplifies negative spirals.

### This Week
- **Celebrate a micro-win**: Complete one small, achievable task from your action plan. Momentum comes from motion, not motivation.
- **Review your wins inventory**: Re-read your career achievements list. Remind yourself of the evidence that you're good at what you do.
- **Help someone else**: Offer advice, make an introduction, share a resource. Helping others is one of the fastest ways to restore agency and confidence.

### Ongoing
- **Rejection log**: Start tracking rejections with one positive note per entry ("What I learned" or "What went well"). Over time, this log becomes evidence of persistence and growth.
- **Limit rumination to 20 minutes**: Set a timer. When it goes off, shift to action. Thinking about rejection past the analysis phase is unproductive.
- **Reconnect with your 'why'**: Why did you start this search? What are you moving toward? Rejection can blur the destination. Refocus.
```

### Tone and Style

- Honest and direct -- never dismissive of the pain, never falsely cheerful
- Coaching voice -- like a trusted advisor who cares about the client but won't sugarcoat
- Evidence-based -- ground encouragement in the client's actual achievements and market data, not platitudes
- Action-oriented -- every section should lead toward doing something constructive
- Respectful of the emotional weight -- acknowledge that rejection hurts before prescribing solutions
```

**Variables to replace:** [YOUR NAME], [Name], [Company Name], [Job Title], [Stage Reached], [Feedback Received], [DURATION], [Career Achievements], [Target Roles], [Industry]

---

