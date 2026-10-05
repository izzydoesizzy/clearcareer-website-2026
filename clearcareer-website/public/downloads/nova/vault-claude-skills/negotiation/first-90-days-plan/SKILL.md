---
name: first-90-days-plan
description: Generate a 30-60-90 day onboarding success plan for a new role
allowed-tools: Read
---

# First 90 Days Plan

Generate a 30-60-90 day onboarding success plan for a new role

**Best with:** Claude Sonnet 4.6

**How to use:**
1. Invoke via `/first-90-days-plan [client-slug]` in Claude Code
2. Client context is loaded automatically from the client's data directory

---

## Prompt

Full prompt instructions for First 90 Days Plan

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

