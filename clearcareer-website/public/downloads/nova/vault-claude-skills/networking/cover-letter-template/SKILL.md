---
name: cover-letter-template
description: Generate an ATS-optimized cover letter template with bracket variables for rapid per-application customization
allowed-tools: Read
---

# AI-Automated Cover Letter Template

Generate an ATS-optimized cover letter template with bracket variables for rapid per-application customization

**Best with:** Claude Sonnet 4.6

**How to use:**
1. Invoke via `/cover-letter-template [client-slug]` in Claude Code
2. Client context is loaded automatically from the client's data directory

---

## Prompt

Full prompt instructions for AI-Automated Cover Letter Template

```
Act as a professional resume writer and career coach who specializes in ATS-optimized application materials. You have reviewed thousands of cover letters and know exactly what hiring managers and applicant tracking systems look for.

Using the client's resume, achievements, target roles, and industry, generate a complete cover letter template system.

### Document Structure

The output file should contain these sections in order:

1. Quick-Customize Instructions
2. ATS Optimization Guide
3. Variant 1: Traditional Cover Letter
4. Variant 2: Results-Driven Cover Letter
5. Variant 3: Story-Based Cover Letter
6. Achievement Bank (pre-filled from client's resume)
7. Variable Reference Table

---

### Section 1: Quick-Customize Instructions

Write a brief (5-7 bullet) instruction guide at the top of the document explaining:

- How to select the right variant for each application
- How to fill in the [BRACKET] variables (with a time estimate of "under 30 seconds")
- When to use each variant:
  - **Traditional**: Conservative industries (finance, law, government), large corporations, formal postings
  - **Results-Driven**: Tech, sales, marketing, any role that values measurable outcomes
  - **Story-Based**: Startups, creative roles, culture-fit-focused companies, networking referrals
- A reminder to always swap in the most relevant achievement from the Achievement Bank
- A note about length: aim for 250-350 words (3/4 of a page max)

### Section 2: ATS Optimization Guide

Include a concise ATS optimization section covering:

1. **Keywords**: Instruct the client to mirror 3-5 keywords directly from the job description in their cover letter. Provide an example showing how to identify and integrate keywords.
2. **Formatting Rules**:
   - Use standard fonts (no headers/footers in the cover letter body when submitting online)
   - Avoid tables, columns, graphics, or special characters
   - Use simple paragraph formatting
   - Save as .pdf or .docx depending on the application system's preference
3. **File Naming Convention**: `[FirstName]-[LastName]-Cover-Letter-[CompanyName].pdf`
4. **Subject Line** (when emailing directly): "[FULL NAME] - [JOB TITLE] Application - [JOB ID if available]"

### Section 3: Variant 1 -- Traditional Cover Letter

Structure this variant with clear [BRACKET] variables. The tone should be professional, polished, and confident.

```
[YOUR FULL NAME]
[YOUR CITY, PROVINCE/STATE]
[YOUR EMAIL] | [YOUR PHONE]
[YOUR LINKEDIN URL]

[DATE]

[HIRING MANAGER NAME or "Hiring Team"]
[COMPANY NAME]
[COMPANY ADDRESS (optional)]

Dear [HIRING MANAGER NAME or "Hiring Team"],
```

**Opening Paragraph (2-3 sentences):**
- Hook that references the specific role and company
- State how you found the position (referral, job board, company website)
- One sentence positioning statement connecting your experience to their need
- Pre-fill with: "I am writing to express my interest in the [JOB TITLE] position at [COMPANY NAME]. With [X YEARS] of experience in [INDUSTRY/FIELD], I bring a proven track record of [KEY VALUE PROPOSITION drawn from client's resume]."

**Body Paragraph 1 -- Priority Alignment (3-4 sentences):**
- Connect the client's top achievement to the role's primary requirement
- Use the format: "In my role as [CURRENT/RECENT TITLE] at [COMPANY], I [ACHIEVEMENT WITH METRICS]."
- Pre-fill ONE achievement from the client's resume as the default, with instructions to swap from the Achievement Bank
- Include [PRIORITY FROM JOB DESCRIPTION] as a variable

**Body Paragraph 2 -- Second Achievement + Skills (3-4 sentences):**
- Highlight a second relevant achievement
- Weave in 2-3 technical skills or tools from the job description
- Pre-fill with another achievement from the client's resume

**Body Paragraph 3 -- Cultural Fit + Motivation (2-3 sentences):**
- Reference something specific about the company (mission, recent news, product, values)
- Connect it to the client's personal motivation or career goals
- Variable: [SPECIFIC THING ABOUT COMPANY THAT RESONATES]

**Closing Paragraph (2 sentences):**
- Confident close expressing enthusiasm for next steps
- Pre-fill: "I would welcome the opportunity to discuss how my experience in [KEY SKILL AREA] can contribute to [COMPANY NAME]'s goals. I look forward to the possibility of connecting."

```
Sincerely,
[YOUR FULL NAME]
```

### Section 4: Variant 2 -- Results-Driven Cover Letter

Same header format as Variant 1, but the body structure emphasizes quantified outcomes.

**Opening (2 sentences):**
- Lead with a bold, metric-driven statement
- Example: "In [X YEARS] as a [TITLE], I have [TOP QUANTIFIED ACHIEVEMENT]. I'm excited to bring this track record to the [JOB TITLE] role at [COMPANY NAME]."

**Achievement Showcase (formatted as 3 bullet points):**
- Pull the client's top 3 quantified achievements from their resume
- Each bullet follows the XYZ format: "Achieved [X] as measured by [Y] by doing [Z]"
- Pre-fill all 3 from the client's resume, with instructions to swap based on job relevance
- Example:
  - Increased [METRIC] by [PERCENTAGE]% by [ACTION], resulting in [OUTCOME]
  - Led a team of [NUMBER] to deliver [PROJECT/INITIATIVE], achieving [RESULT]
  - Reduced [COST/TIME/INEFFICIENCY] by [AMOUNT] through [METHOD]

**Connection Paragraph (2-3 sentences):**
- Bridge achievements to the company's needs
- Variable: [COMPANY'S KEY CHALLENGE OR GOAL from job description or research]

**Close (1-2 sentences):**
- Direct and confident: "I'd love to discuss how these results translate to impact at [COMPANY NAME]. Let's connect."

### Section 5: Variant 3 -- Story-Based Cover Letter

Same header format, but the body uses narrative structure.

**The Hook (2-3 sentences):**
- Open with a brief, specific story from the client's career that illustrates their core strength
- Pre-fill with a compelling anecdote drawn from the client's resume or transcripts
- Example: "When I joined [COMPANY] as [TITLE], the [DEPARTMENT/FUNCTION] was [CHALLENGE]. Within [TIMEFRAME], I [RESULT]."

**The Bridge (2-3 sentences):**
- Connect the story's lesson to the target role
- Show self-awareness about what drives the client professionally
- Variable: [WHAT DREW YOU TO THIS ROLE]

**The Evidence (2-3 sentences):**
- Provide 1-2 additional proof points that support the narrative
- Keep these brief and metric-driven to balance the storytelling

**The Vision (2-3 sentences):**
- Paint a picture of what the client would accomplish in the first 90 days or year
- Variable: [YOUR VISION FOR THE ROLE based on job description]

**Close (1-2 sentences):**
- Warm and enthusiastic: "I'd love to share more about how my experience aligns with your vision for [TEAM/DEPARTMENT]. Looking forward to connecting."

### Section 6: Achievement Bank

Create a table of 8-10 achievements extracted from the client's resume, formatted for easy copy-paste into any variant:

| # | Achievement (XYZ Format) | Best For (Role Type) | Keywords |
|---|--------------------------|---------------------|----------|
| 1 | [Achievement from resume] | [e.g., Management roles] | [e.g., leadership, P&L, team building] |
| 2 | ... | ... | ... |

Pre-fill all rows from the client's resume. If the resume has fewer than 8 achievements, note which ones could be expanded or suggest areas to develop new achievement statements.

### Section 7: Variable Reference Table

| Variable | What to Fill In | Where to Find It |
|----------|----------------|-------------------|
| `[COMPANY NAME]` | Target company name | Job posting |
| `[JOB TITLE]` | Exact title from posting | Job posting title |
| `[HIRING MANAGER NAME]` | Name of hiring manager | LinkedIn, company page, or use "Hiring Team" |
| `[PRIORITY FROM JOB DESCRIPTION]` | Top requirement from posting | First 2-3 bullets in job requirements |
| `[SPECIFIC THING ABOUT COMPANY]` | Mission, news, product | Company website, LinkedIn, news |
| `[JOB ID]` | Reference number if available | Job posting |
| `[COMPANY'S KEY CHALLENGE]` | Business challenge or goal | Job description, earnings calls, news |
| `[YOUR VISION FOR THE ROLE]` | What you'd accomplish | Based on job description + your experience |

### Formatting Requirements

- Each variant should be clearly separated with a horizontal rule (`---`) and a header
- All [BRACKET VARIABLES] should be in ALL CAPS inside square brackets for easy scanning
- Pre-filled content from the client's resume should be in regular text (ready to use as-is)
- Instructions and guidance should be in blockquotes (>) or italics to distinguish from template text
- Include a word count target next to each variant header

### Anti-Patterns to Avoid

- Do NOT use generic filler phrases like "I am a hard worker" or "I am passionate about excellence"
- Do NOT start any variant with "I am writing to apply for..." -- that wastes the most valuable sentence in the letter
- Do NOT exceed 400 words for any single variant
- Do NOT use cliches: "think outside the box," "team player," "results-oriented professional," "dynamic individual"
- Do NOT include salary expectations in any cover letter variant
- Do NOT include references or "references available upon request"
- Do NOT make the templates so generic they could apply to any candidate -- they should clearly reflect this specific client's background and strengths

### Tone and Voice

Professional but personable. The cover letter should sound like a confident professional having a focused conversation, not a form letter. Vary the tone slightly across variants: Variant 1 is polished and formal, Variant 2 is direct and data-driven, Variant 3 is warm and narrative.
```

**Variables to replace:** [YOUR FULL NAME], [YOUR CITY, PROVINCE/STATE], [YOUR EMAIL], [YOUR LINKEDIN URL], [X YEARS], [INDUSTRY/FIELD], [CURRENT/RECENT TITLE], [COMPANY], [KEY VALUE PROPOSITION], [KEY SKILL AREA], [TOP QUANTIFIED ACHIEVEMENT], [BRACKET]

