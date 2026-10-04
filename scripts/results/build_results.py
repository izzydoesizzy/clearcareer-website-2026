import json, re, html

SCRATCH = "/tmp/claude-0/-home-user-clearcareer-website/7b3c7f82-cbb6-5207-9356-a25b85514a9b/scratchpad"
src = json.load(open("/home/user/clearcareer-website/src/data/testimonials.json", encoding="utf-8"))
tpl = open(f"{SCRATCH}/results-template.html", encoding="utf-8").read()

HEADS = {"blake-mcdermott", "darin-mellor", "kira-howe", "kristin-davis",
         "laura-salamanca", "raunika-lamge", "sparsh-kalia", "tamara-gordon"}
DROP = {"ClearCareer client", "LinkedIn verified review", "Case study", "Workshop attendee",
        "ClearCareer client (case study)", "ClearCareer client (new immigrant to Canada)",
        "Client (website design)", "Create Community Podcast host"}
BANNED = ["leverage", "unlock", "empower", "optimiz", "comprehensive", "journey", "navigat", "landscape",
          "elevate", "transformative", "game-changing", "holistic", "seamless", "robust", "delve",
          "in today's", "at the end of the day"]

# Short outcome labels, each derived from the entry's own "outcome" field. Nothing invented.
BADGE = {
    "Alison Gibbins": "Top of range + 5 vacation days",
    "Andrew Cameron": "Replies in week one",
    "Annie Bell": "2 offers, 200% raise",
    "Blake McDermott": "27 emails, 13 replies, 1 offer",
    "Chris Chipman": "$25K raise, Associate Director",
    "Daniela Dyer Melhado": "World Bank Legal Analyst",
    "Darin Mellor": "Signed offer after 600+ applications",
    "Haddie Lengyuen": "Jobs landed through outreach",
    "Henrique Perez": "2 offers in 1 week, 30% raise",
    "Jorge Garboza": "Offer plus $6K after 12 months",
    "Julian Pedraza": "$20K raise, new industry",
    "Kira Howe": "$127K plus 30 PTO days",
    "Kristin Davis": "Hired in 3 weeks",
    "Laura Salamanca": "$22K raise, dream role",
    "Leanne Saldanha": "Interview from one email",
    "Marsha Druker": "$10K above the offer",
    "Marsha Malcolm": "Switched fields",
    "Raunika Lamge": "Director role",
    "Septembre Anderson": "$10K above the offer",
    "Sparsh Kalia": "Hired in 30 days",
    "Susanne": "Operations Manager, new industry",
    "Tamara Gordon": "$20K+ raise plus bonus",
    "Victor Perez": "3 interviews in 2 weeks",
    "Wil Gerard": "3 offers, $10K raise",
    "Adam Kastor": "Kickstart in one session",
    "Athena Hernandez": "AI job search strategy",
    "Courtenay Badran": "Confidence and resume",
    "Danica Stark": "Resume overhaul",
    "Erin Marini": "Resume and cover letter",
    "Gamze Aluc": "Resume and interview insight",
    "Hamsharan Mahalingam": "Career guidance",
    "Jeska Edens": "Renewed confidence",
    "Jessica Leung": "Website and personal brand",
    "Kay Woods": "Coaching value",
    "Kedar Nadkarny": "Canadian-format resume",
    "Kevin Truong": "Career clarity for a founder",
    "Maria Chami": "Career tips",
    "Mazia Syed": "Renewed energy",
    "Nabeel K Adeni": "Interview positioning",
    "Sarvesh Syal": "Outreach email praised",
    "Veronica Amarante": "Reframed job search",
    "Victor Rivas": "Profile and confidence",
    "Win Shi Wong": "Resume review",
}


def esc(s):
    return html.escape(s, quote=False)


def nodash(s):
    # Em dashes and en dashes inside quotes become commas (allowed edit).
    s = s.replace(" — ", ", ").replace("—", ", ").replace(" – ", ", ").replace("–", "-")
    return re.sub(r",\s*,", ",", s)


def trim(q, n=220):
    if len(q) <= n:
        return q
    cut = q[:n]
    m = max(cut.rfind(". "), cut.rfind("! "), cut.rfind("? "))
    if m > 80:
        return cut[:m + 1]
    return cut.rsplit(" ", 1)[0].rstrip(",;:") + "..."


def role(r):
    parts = [p.strip() for p in r.split("/")]
    keep = [p for p in parts if p not in DROP]
    return keep[0] if keep else "ClearCareer client"


def initials(n):
    ps = n.split()
    return (ps[0][0] + ps[-1][0]).upper() if len(ps) > 1 else ps[0][:2].upper()


def slug(n):
    return n.lower().replace(" ", "-")


def has_banned(s):
    return any(re.search(re.escape(w), s, re.I) for w in BANNED)


wall = [t for t in src if t["category"] in ("career-outcome", "coaching-quality", "linkedin-review")]
wall = [t for t in wall if "260" not in json.dumps(t)]
wall.sort(key=lambda t: (0 if "sortPriority" in t else 1, t.get("sortPriority", 0),
                         0 if t["category"] in ("career-outcome", "linkedin-review") else 1, t["name"]))

cards = []
for i, t in enumerate(wall):
    q = t.get("pullQuote") or trim(t["quote"])
    q = nodash(q)
    success = t["category"] in ("career-outcome", "linkedin-review")
    cls = "badge badge--success" if success else "badge"
    s = slug(t["name"])
    if s in HEADS:
        avatar = f'<img class="avatar" src="../assets/img/testimonials/{s}.png" alt="">'
    else:
        avatar = f'<div class="avatar avatar--initials">{initials(t["name"])}</div>'
    badge = BADGE.get(t["name"]) or re.split(r";|\(", t["outcome"])[0].strip()
    delay = ' data-delay="80"' if i % 3 == 1 else (' data-delay="160"' if i % 3 == 2 else "")
    cards.append(
        f'        <figure class="quote" data-animate{delay}>\n'
        f'          <div class="quote__mark">“</div>\n'
        f'          <blockquote class="quote__text">{esc(q)}</blockquote>\n'
        f'          <figcaption class="quote__who">{avatar}<div><div class="quote__name">{esc(t["name"])}</div>'
        f'<div class="quote__role">{esc(role(t["role"]))}</div></div></figcaption>\n'
        f'          <span class="{cls} quote__outcome">{esc(badge)}</span>\n'
        f'        </figure>'
    )

ws = [t for t in src if t["category"] == "workshop"]
items = []
for t in ws:
    pq = t.get("pullQuote") or t["quote"]
    sents = re.split(r"(?<=[.!?])\s+", nodash(pq))
    clean = [s for s in sents if len(s) >= 40 and not has_banned(s)]
    if clean:
        pick = clean[0]
    else:
        longish = [s for s in sents if len(s) >= 40]
        pick = longish[0] if longish else max(sents, key=len)
    items.append(f'            <li><strong>{esc(t["name"])}</strong>: "{esc(pick)}"</li>')

out = tpl.replace("{{WALL}}", "\n".join(cards)).replace("{{WORKSHOP}}", "\n".join(items))
open("/home/user/clearcareer-website-2026/site/results.html", "w", encoding="utf-8").write(out)
print("wall cards:", len(cards), "workshop items:", len(items),
      "peer:", sum(1 for t in src if t["category"] == "peer-endorsement"))
for t in wall:
    print(f'  {t["name"]:26} {role(t["role"]):34} | {BADGE.get(t["name"], "??")}')
