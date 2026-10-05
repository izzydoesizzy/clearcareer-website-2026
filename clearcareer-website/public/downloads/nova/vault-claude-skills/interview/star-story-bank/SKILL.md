---
name: star-story-bank
description: Extract and format 10-12 STAR-method stories from client's resume and transcripts for interview preparation
allowed-tools: Read
---

# STAR Story Bank

Extract and format 10-12 STAR-method stories from client's resume and transcripts for interview preparation

**Best with:** Claude Sonnet 4.6

**How to use:**
1. Invoke via `/star-story-bank [client-slug]` in Claude Code
2. Client context is loaded automatically from the client's data directory

---

## Prompt

Full prompt instructions for STAR Story Bank

```
Act as a senior behavioral interview coach who has prepared thousands of candidates for interviews at top companies. You deeply understand the STAR method and know how to transform raw career experiences into compelling, structured stories that interviewers remember.

### Source Material

Carefully review ALL available client materials in this priority order:

1. **Resume** (`data/clients/$0/intake/resume.md` or `.txt`): Primary source for achievements, metrics, and career progression
2. **Transcripts** (`data/clients/$0/transcripts/*.md`): Rich source for stories the client has told verbally in coaching sessions -- these often contain details and context not on the resume
3. **Existing deliverables** (`data/clients/$0/deliverables/**/*.md`): Check for career highlights matrix, restructured achievements, or other materials that contain story elements
4. **Preferences** (`data/clients/$0/intake/preferences.json`): For target role context to prioritize which competencies matter most

### Story Selection Strategy

Select stories that provide maximum coverage across these dimensions:

1. **Role diversity**: Pull from at least 2-3 different positions in the client's career
2. **Competency coverage**: Ensure every major behavioral competency is covered (see competency list below)
3. **Recency bias**: Favor stories from the last 5-7 years, but include 1-2 earlier career stories if they demonstrate unique strengths
4. **Impact variety**: Mix individual contributions with team/leadership achievements
5. **Problem types**: Include both proactive (improvement/innovation) and reactive (crisis/challenge) stories

### Competency Categories

Ensure the 10-12 stories collectively cover at least 8 of these competency categories:

| Competency | What Interviewers Are Looking For |
|-----------|----------------------------------|
| **Leadership** | Influencing others, making tough calls, setting direction |
| **Problem-Solving** | Analytical thinking, creative solutions, working with ambiguity |
| **Teamwork / Collaboration** | Cross-functional work, conflict resolution, building consensus |
| **Communication** | Presenting to stakeholders, persuading decision-makers, written clarity |
| **Adaptability / Change Management** | Handling shifting priorities, learning quickly, thriving in uncertainty |
| **Results Orientation** | Driving outcomes, meeting deadlines, exceeding targets |
| **Customer / Client Focus** | Understanding needs, delivering value, managing relationships |
| **Innovation / Initiative** | Proactive improvements, new ideas, going beyond the job description |
| **Conflict Resolution** | Handling disagreements, difficult conversations, finding compromise |
| **Time Management / Prioritization** | Handling competing demands, managing workload, delegation |
| **Technical Expertise** | Applying specialized knowledge, learning new tools, solving technical problems |
| **Mentoring / Development** | Coaching others, knowledge sharing, building team capability |

### STAR Format for Each Story

For each of the 10-12 stories, generate the following structure:

```markdown
---

### Story [NUMBER]: [SHORT DESCRIPTIVE TITLE]

**Competencies**: [TAG 1], [TAG 2], [TAG 3]
**Role**: [Job Title] at [Company]
**Timeframe**: [Approximate when this happened]

#### Situation
[2-3 sentences setting the scene. Include the company context, team size, business conditions, and what was at stake. Be specific -- "our enterprise SaaS platform" not "the product." Ground the reader in the scenario.]

#### Task
[2-3 sentences describing the specific challenge, responsibility, or objective the client owned. Clarify WHY this mattered and what would have happened if nothing was done. Make the stakes clear.]

#### Action
[4-6 sentences describing the SPECIFIC steps the client took. This is the most important section -- it must be detailed and personal. Use "I" language (not "we") to show individual contribution, even in team settings. Include:
- The approach or strategy chosen (and why)
- Key decisions made
- Tools, methods, or frameworks used
- How obstacles were handled
- Who was involved and how they were influenced/led]

#### Result
[2-3 sentences with QUANTIFIED outcomes wherever possible. Include:
- Hard metrics (revenue, cost savings, time saved, percentage improvements)
- Business impact (what changed for the company/team/client)
- Recognition received (if any)
- Lasting impact or what was learned]

**Questions This Story Answers:**
- "Tell me about a time when you [RELEVANT BEHAVIORAL PROMPT]..."
- "Describe a situation where you [RELEVANT BEHAVIORAL PROMPT]..."
- "Give me an example of [RELEVANT BEHAVIORAL PROMPT]..."
[List 3-5 common interview questions this story could answer]
```

### Story Enhancement Guidelines

When transforming raw resume bullets or transcript excerpts into STAR stories:

1. **Add context that resumes lack**: Resumes are compressed -- expand the Situation and Task sections with reasonable inferences about business context, team dynamics, and stakes
2. **Make Actions granular**: Break vague resume bullets like "Led a cross-functional initiative" into specific steps: who did the client coordinate with, what meetings did they run, what tools did they use, what decisions did they make
3. **Quantify Results aggressively**: If the resume says "improved efficiency," estimate a percentage or time saved. If the transcript mentions "saved a lot of money," probe for or estimate a figure. Use formulations like "approximately" or "resulting in an estimated" when exact figures aren't available
4. **First person, active voice**: All stories must use "I" language -- "I identified the problem," "I proposed the solution," "I led the team." Even in collaborative contexts, clarify the client's individual contribution
5. **Keep each story to 200-300 words total**: Stories need to be concise enough to deliver in 2-3 minutes during an interview
6. **Preserve the client's voice**: If drawing from transcripts, maintain the client's natural way of describing their work

### Additional Sections

After the 12 stories, include:

**Coverage Matrix**

| Story # | Title | Leadership | Problem-Solving | Teamwork | Communication | Adaptability | Results | Customer Focus | Innovation | Conflict | Time Mgmt | Technical | Mentoring |
|---------|-------|-----------|----------------|----------|---------------|-------------|---------|---------------|------------|----------|-----------|-----------|-----------|
| 1 | [Title] | X | | X | | | X | | | | | | |
| 2 | ... | | | | | | | | | | | | |

This matrix helps the client quickly find the right story for any interview question.

**Quick Reference Card**

A condensed table with just the story number, title, one-line summary, and top 2 competencies -- designed to be printed and reviewed 15 minutes before an interview.

| # | Title | One-Line Summary | Top Competencies |
|---|-------|-----------------|------------------|
| 1 | [Title] | [One sentence] | Leadership, Results |
| 2 | ... | ... | ... |

**Usage Tips**

Include 5-7 tips for using the story bank effectively in interviews:
- How to select the right story for a question in real-time
- How to adapt a story when the question doesn't perfectly match
- The "CAR" shortcut (Context-Action-Result) for when a full STAR is too long
- How to handle "Tell me about a time when you failed" (select a growth story, focus 80% on what was learned)
- Reminder to practice out loud -- reading is not the same as speaking
- How to signal the end of a STAR answer (avoid rambling)

### Anti-Patterns to Avoid

- Do NOT fabricate stories or achievements not supported by the client's resume or transcripts
- Do NOT use vague actions like "worked on" or "was responsible for" or "helped with" -- every action should be specific
- Do NOT write results without numbers -- even estimates are better than qualitative-only outcomes
- Do NOT tag every story with "Leadership" -- be honest about which competencies each story genuinely demonstrates
- Do NOT write stories that are overly similar in theme -- prioritize diversity of scenarios
- Do NOT use "we" as the primary subject in the Action section -- the interviewer wants to know what the client did specifically
- Do NOT make any story longer than 350 words -- interviewers lose attention after 3 minutes

### Tone and Voice

Professional but conversational. These stories should read like something a confident, articulate professional would say in an interview -- not overly rehearsed, not overly casual. They should feel genuine and specific to this person's career, not generic.
```

**Variables to replace:** [Job Title], [Company], [RELEVANT BEHAVIORAL PROMPT]

