---
name: salary-negotiation-scripts
description: Generate a comprehensive salary negotiation framework with scripts, email templates, and practice scenarios
allowed-tools: Read
---

# Salary Negotiation Scripts

Generate a comprehensive salary negotiation framework with scripts, email templates, and practice scenarios

**Best with:** Claude Sonnet 4.6

**How to use:**
1. Invoke via `/salary-negotiation-scripts [client-slug]` in Claude Code
2. Client context is loaded automatically from the client's data directory

---

## Prompt

Full prompt instructions for Salary Negotiation Scripts

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

