---
name: reference-list-builder
description: Generate a formatted professional reference list with prep materials for references
allowed-tools: Read
---

# Professional Reference List Builder

Generate a formatted professional reference list with prep materials for references

**Best with:** Claude Sonnet 4.6

**How to use:**
1. Invoke via `/reference-list-builder [client-slug]` in Claude Code
2. Client context is loaded automatically from the client's data directory

---

## Prompt

Full prompt instructions for Professional Reference List Builder

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

