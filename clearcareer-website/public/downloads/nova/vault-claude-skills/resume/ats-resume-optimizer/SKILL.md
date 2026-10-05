---
name: ats-resume-optimizer
description: Optimize a resume for ATS keyword matching against a specific job description
allowed-tools: Read
---

# ATS Resume Optimizer

Optimize a resume for ATS keyword matching against a specific job description

**Best with:** Claude Sonnet 4.6

**How to use:**
1. Invoke via `/ats-resume-optimizer [client-slug]` in Claude Code
2. Client context is loaded automatically from the client's data directory

---

## Prompt

Full prompt instructions for ATS Resume Optimizer

```
Execute the following analysis and generation steps in sequence. The output document must contain ALL sections described below.

### Step 1: Job Description Analysis

Analyze the target job description (provided by the user or found in the client's intake materials) and extract:

1. **Hard Skills & Technical Keywords** -- Programming languages, tools, platforms, certifications, methodologies (e.g., "Python", "Salesforce", "Agile", "PMP", "SQL")
2. **Soft Skills & Competencies** -- Leadership, communication, collaboration phrases the ATS may score (e.g., "cross-functional collaboration", "stakeholder management")
3. **Industry-Specific Terminology** -- Domain jargon, acronyms, and standards (e.g., "SOX compliance", "GMP", "SaaS", "B2B")
4. **Action Verbs & Phrases** -- Verbs the job description emphasizes (e.g., "spearheaded", "optimized", "drove revenue")
5. **Required Qualifications** -- Degree requirements, years of experience, must-have credentials
6. **Preferred Qualifications** -- Nice-to-have skills, bonus certifications, preferred experience

Present this as a structured keyword inventory table:

```
| Category | Keyword/Phrase | Frequency in JD | Priority |
|----------|---------------|-----------------|----------|
| Hard Skill | Python | 3 mentions | Critical |
| Hard Skill | AWS | 2 mentions | Critical |
| Soft Skill | Cross-functional collaboration | 2 mentions | High |
| Industry Term | SaaS | 4 mentions | Critical |
| ...      | ...           | ...             | ...      |
```

Priority levels:
- **Critical** -- Mentioned 3+ times or listed as required qualification
- **High** -- Mentioned 2 times or listed as preferred qualification
- **Medium** -- Mentioned once in the body of the description
- **Low** -- Implied but not explicitly stated

### Step 2: Resume Gap Analysis

Compare the keyword inventory against the client's current resume and produce:

1. **Match Score** -- Calculate the percentage of Critical and High priority keywords found in the resume. Present as: `ATS Match Score: XX% (XX/XX critical keywords found)`

2. **Keywords Present** -- List keywords already in the resume with the exact line where they appear

3. **Keywords Missing** -- List each missing keyword with:
   - The keyword/phrase
   - Its priority level
   - A specific recommendation for WHERE in the resume to add it (which section, which bullet point)
   - A suggested phrasing that incorporates the keyword naturally

4. **Keyword Density Flags** -- Identify any keywords that appear too frequently (keyword stuffing risk) or important keywords that appear only once when they should appear 2-3 times

Present this as a clear gap analysis table:

```
| Missing Keyword | Priority | Suggested Section | Recommended Phrasing |
|----------------|----------|-------------------|---------------------|
| AWS | Critical | Technical Skills + Experience bullet #3 | "Architected cloud infrastructure on AWS, reducing deployment time by 40%" |
| stakeholder management | High | Professional Summary | "Skilled in stakeholder management across engineering, product, and executive teams" |
```

### Step 3: ATS Formatting Audit

Review the resume for ATS-hostile formatting and flag issues:

- **Tables and columns** -- ATS parsers often scramble multi-column layouts. Recommend single-column format.
- **Headers and footers** -- Many ATS systems skip header/footer content entirely. Move critical info (name, contact) to the body.
- **Graphics, icons, and images** -- ATS cannot read these. Remove all visual elements.
- **Fancy fonts and special characters** -- Stick to standard fonts. Replace special bullets with standard dashes or asterisks.
- **File format** -- Recommend .docx over .pdf (some ATS parse PDF poorly). Note this in the guidance.
- **Section headings** -- Use standard headings the ATS recognizes: "Professional Experience", "Education", "Skills", "Certifications" (not creative alternatives like "Where I've Made Impact").
- **Date formatting** -- Use consistent MM/YYYY or Month YYYY format.
- **Acronyms** -- Spell out acronyms AND include the abbreviation: "Search Engine Optimization (SEO)"

Present as a checklist:

```
ATS Formatting Audit:
[PASS/FAIL] Single-column layout
[PASS/FAIL] Standard section headings
[PASS/FAIL] No tables or graphics
[PASS/FAIL] Contact info in body (not header)
[PASS/FAIL] Consistent date format
[PASS/FAIL] Acronyms spelled out
[PASS/FAIL] Standard bullet characters
[PASS/FAIL] No text boxes
```

### Step 4: ATS-Optimized Resume

Generate the complete ATS-optimized resume with these requirements:

1. **Professional Summary** -- 3-4 sentences front-loaded with the top Critical keywords. Mirror the job description's language where authentic.

2. **Skills Section** -- A dedicated "Core Competencies" or "Technical Skills" section placed immediately after the summary. Include ALL Critical and High priority keywords the client can legitimately claim. Group by category (Technical Skills, Tools & Platforms, Methodologies, Certifications).

3. **Professional Experience** -- Rewrite bullet points to:
   - Lead with strong action verbs from the job description
   - Incorporate missing keywords naturally into achievement statements
   - Maintain CAR format (Challenge-Action-Result) with quantified metrics
   - Mirror the job description's phrasing without copy-pasting
   - Include 2-3 keyword-rich bullets per role that directly map to JD requirements

4. **Education & Certifications** -- Include relevant coursework, certifications, and credentials using exact terminology from the JD.

5. **Keyword Density Target** -- Each Critical keyword should appear 2-3 times across the resume. Each High keyword should appear at least once. Never exceed 4 mentions of any single keyword.

### Step 5: Before/After Summary

Close the document with a comparison:

```
## Optimization Summary

| Metric | Before | After |
|--------|--------|-------|
| ATS Match Score | XX% | XX% |
| Critical Keywords Found | X/X | X/X |
| High Keywords Found | X/X | X/X |
| Formatting Issues | X | 0 |
| Estimated ATS Pass Rate | Low/Medium/High | High |
```

### Tone and Style

- Professional and direct -- this is a technical optimization, not creative writing
- Preserve the client's authentic voice and real achievements; never fabricate experience
- When adding keywords, weave them into existing accomplishments rather than adding filler
- If the client lacks experience in a Critical keyword area, note it transparently in the gap analysis rather than inventing it

### Example Output Structure

```markdown
# ATS Resume Optimization Report
## Client: [Name] | Target: [Job Title] at [Company]
## Date: [Date]

---

## 1. Job Description Keyword Analysis
[Keyword inventory table]

## 2. Resume Gap Analysis
**ATS Match Score: 62% (8/13 critical keywords found)**
[Gap analysis table]

## 3. ATS Formatting Audit
[Formatting checklist]

## 4. ATS-Optimized Resume
[Full optimized resume]

## 5. Optimization Summary
[Before/after comparison table]

## 6. Additional Recommendations
[Any extra guidance specific to this role/industry]
```
```

**Variables to replace:** [YOUR NAME], [Name], [Job Title], [Company], [PASTE RESUME TEXT HERE], [JOB DESCRIPTION], [Target Industry], [Top Skills]

