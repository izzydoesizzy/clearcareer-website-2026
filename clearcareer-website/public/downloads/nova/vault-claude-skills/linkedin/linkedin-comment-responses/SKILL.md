---
name: linkedin-comment-responses
description: Generate a LinkedIn commenting strategy guide with templates for visibility
allowed-tools: Read
---

# LinkedIn Comment Responses

Generate a LinkedIn commenting strategy guide with templates for visibility

**Best with:** Claude Sonnet 4.6

**How to use:**
1. Invoke via `/linkedin-comment-responses [client-slug]` in Claude Code
2. Client context is loaded automatically from the client's data directory

---

## Prompt

Full prompt instructions for LinkedIn Comment Responses

```
### Guide Structure

Generate the commenting strategy guide with the following sections:

---

#### Section 1: Why Commenting Matters

Brief (3-4 sentences) explanation of why commenting is a strategic job search activity. Cover:
- Comments appear in the feeds of everyone connected to the poster AND the commenter
- Thoughtful comments get profile views from hiring managers and recruiters
- Commenting is lower-effort and lower-risk than posting, making it a great starting point
- Consistent commenting builds familiarity ("I keep seeing your name") which warms up outreach

---

#### Section 2: Who to Comment On

A prioritized list of the types of accounts the client should follow and engage with, tailored to their target industry and roles:

```markdown
## Who to Comment On (Priority Order)

### Tier 1: Direct Targets (Comment 3-5x/week)
- Hiring managers at target companies in [TARGET INDUSTRY]
- Recruiters who post [TARGET ROLE] jobs
- Leaders at companies on your Target Companies List (Deliverable #7)
- People in [TARGET ROLE] positions sharing day-in-the-life content

### Tier 2: Industry Voices (Comment 2-3x/week)
- Industry thought leaders in [TARGET INDUSTRY]
- [INDUSTRY]-specific newsletter authors and content creators
- Conference speakers and panel organizers in [SPECIALTY AREA]
- Professional association leaders (e.g., [RELEVANT ASSOCIATIONS])

### Tier 3: Broad Visibility (Comment 1-2x/week)
- Career coaches and recruiters with large followings (your comments get seen by thousands)
- Authors of trending posts about [RELEVANT TOPICS]
- News outlets and journalists covering [TARGET INDUSTRY]
```

Include 3-5 specific, named accounts or types of accounts relevant to the client's industry.

---

#### Section 3: Comment Templates by Scenario

Provide **10 comment templates** across 4 categories. Each template should include:
- The scenario (when to use it)
- The template text with `[BRACKET]` placeholders
- A filled-in example using the client's actual industry/expertise
- Character count guidance

##### Category A: Agree & Amplify (3 templates)

Use when: You agree with the post and can add a supporting perspective or example.

**Template A1: Add a data point or example**
```
This resonates. In my experience [working in DOMAIN / leading FUNCTION], I've seen [SPECIFIC OBSERVATION that supports the post's point].

One thing I'd add: [ADDITIONAL INSIGHT or NUANCE].
```

**Template A2: Share a personal story**
```
[POSTER NAME], this is spot on.

I experienced this firsthand when [BRIEF 1-2 SENTENCE STORY FROM CLIENT'S CAREER]. The lesson that stuck with me was [TAKEAWAY THAT CONNECTS TO THE POST].

Thanks for putting this into words.
```

**Template A3: Validate with industry context**
```
This is especially true in [TARGET INDUSTRY] right now. [1-2 SENTENCES about why this post's point is particularly relevant to the client's domain].

Great perspective, [POSTER NAME].
```

##### Category B: Thoughtful Disagreement / Nuance (2 templates)

Use when: You see a different angle. CRITICAL: Always be respectful and frame as "adding a perspective," never attacking.

**Template B1: "Yes, and..." reframe**
```
Interesting take, [POSTER NAME]. I agree with [SPECIFIC PART], though I've found that [ALTERNATIVE PERSPECTIVE].

In [DOMAIN/INDUSTRY], [BRIEF SUPPORTING EVIDENCE FROM EXPERIENCE].

Would love to hear if others have seen something similar.
```

**Template B2: Context-dependent response**
```
This is great advice for [SITUATION A]. I wonder if it plays out differently in [SITUATION B]?

In my experience with [RELEVANT CONTEXT], [ALTERNATIVE OBSERVATION]. Curious what you think, [POSTER NAME].
```

##### Category C: Ask a Smart Question (3 templates)

Use when: You want to engage with a thought leader and demonstrate curiosity. Questions get responses, which creates conversation threads visible to both networks.

**Template C1: Dig deeper**
```
Really insightful, [POSTER NAME]. I'm curious -- how do you see this playing out for [SPECIFIC SEGMENT relevant to client's targets]?

I've been thinking about [RELATED ANGLE] and would love your take.
```

**Template C2: Application question**
```
Great framework. How would you apply this in a [SPECIFIC CONTEXT from client's industry]?

I've been experimenting with [RELATED APPROACH] and wondering if [SPECIFIC QUESTION].
```

**Template C3: Forward-looking question**
```
Fascinating perspective. Where do you see this heading in the next 2-3 years for [INDUSTRY/FUNCTION]?

I've noticed [TREND CLIENT HAS OBSERVED] and I'm curious if you're seeing the same.
```

##### Category D: Share Relevant Experience (2 templates)

Use when: The post topic directly relates to your expertise. These comments position you as a peer, not a spectator.

**Template D1: "Here's how I handled this"**
```
This is a challenge I've navigated [in my X years in DOMAIN]. What worked for me:

1. [SPECIFIC ACTION]
2. [SPECIFIC ACTION]
3. [SPECIFIC ACTION]

The biggest lesson? [KEY INSIGHT]. Thanks for raising this, [POSTER NAME].
```

**Template D2: Results-oriented contribution**
```
[POSTER NAME], this is timely. When I [FACED SIMILAR SITUATION] at [COMPANY], we [ACTION TAKEN] and saw [MEASURABLE RESULT].

The key was [INSIGHT]. Would be happy to share more details if helpful.
```

---

#### Section 4: Commenting Dos and Don'ts

```markdown
## The Rules

### Do
- Comment within the first 1-2 hours of a post going live (early comments get more visibility)
- Use the poster's name -- it feels personal and they'll notice
- Keep comments to 3-7 sentences (long enough to add value, short enough to be read)
- Like the post AND comment (the algorithm rewards both signals)
- Comment consistently: 5-10 thoughtful comments per week beats 50 low-effort ones
- Check back and reply if the poster or others respond to your comment
- Use your expertise -- every comment should subtly demonstrate competence

### Don't
- Write "Great post!" or "Love this!" with nothing else (adds zero value, looks lazy)
- Turn your comment into a pitch for yourself or mention you're job searching
- Write multi-paragraph essays in comments (save that energy for your own posts)
- Comment on controversial political or social topics from your professional account
- Tag random people in comments to "boost" visibility (it's transparent and annoying)
- Use emojis as the primary content of your comment (one emoji is fine, a wall of them is not)
- Copy-paste the same comment template verbatim across multiple posts
- Argue aggressively or dismissively, even if someone is wrong
```

---

#### Section 5: From Comment to Connection

A specific playbook for converting commenting into actual networking:

```markdown
## Turning Comments into Connections

### The 3-Touch Method

**Touch 1 (Week 1):** Comment thoughtfully on 2-3 of the person's posts.
- No connection request yet. Just be visible and add value.

**Touch 2 (Week 2):** Comment again on a new post and reply to any of their responses to your earlier comments.
- They should now recognize your name.

**Touch 3 (Week 2-3):** Send a connection request with a personalized note:

> "Hi [NAME], I've really enjoyed your recent posts on [TOPIC] -- especially your point about [SPECIFIC DETAIL]. I'm a [ROLE/EXPERTISE] professional in [INDUSTRY] and your perspective has been valuable. Would love to connect."

### Why This Works
- By the time you send the request, they've already seen your name 3-5 times
- Your connection request references specific content, proving you're genuine
- You've already demonstrated expertise through your comments
- Acceptance rates for this approach are 60-80% vs. 20-30% for cold requests

### For Target Company Decision-Makers
If the person works at one of your target companies:
1. Follow the 3-Touch Method above
2. After connecting, wait 3-5 days
3. Send a message referencing your comment exchanges:
   > "Thanks for connecting, [NAME]. I've been following [COMPANY]'s work in [AREA] and your perspective has been really insightful. I'd love to learn more about the team's approach to [SPECIFIC TOPIC]. Would you be open to a brief chat?"
```

---

#### Section 6: Weekly Commenting Schedule

A simple routine the client can follow:

```markdown
## Suggested Weekly Routine

| Day | Activity | Time |
|-----|----------|------|
| Monday | Scroll feed, comment on 2-3 posts from Tier 1 targets | 15 min |
| Tuesday | Find and comment on 1-2 industry thought leader posts | 10 min |
| Wednesday | Reply to any responses to your earlier comments | 5 min |
| Thursday | Comment on 2-3 posts, focusing on target company employees | 15 min |
| Friday | Comment on 1 trending post in your industry | 10 min |

**Total time commitment: ~55 minutes/week (~11 min/day)**
```

### Tone and Style

- Write in second person ("you") addressing the client directly
- Tone should be encouraging and practical, not academic
- Every template should feel natural when read aloud -- no stiff corporate language
- Emphasize that commenting is a skill that improves with practice; the first few will feel awkward
- Make it clear this is a strategic activity, not aimless scrolling

### Personalization Requirements

- All example comments must reference the client's actual industry, skills, or experience
- Tier 1 targets must reflect the client's specific target companies and roles
- Templates should use language natural to the client's seniority level and field
- If the client's resume or transcripts reveal specific stories, reference those in the example comments
```

**Variables to replace:** [CLIENT NAME], [TARGET INDUSTRY], [TARGET ROLE], [DOMAIN], [SPECIALTY AREA], [RELEVANT ASSOCIATIONS], [COMPANY], [YEARS OF EXPERIENCE], [TOP SKILLS], [TARGET COMPANIES]

