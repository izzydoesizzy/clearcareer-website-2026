#!/usr/bin/env python3
"""
Build the plan, email, and ad artifacts from their Markdown sources.

  python3 scripts/build.py

Inputs
  docs/*.md            long-form plan documents
  emails/emails.md     every email and SMS, separated by "### EMAIL" blocks
Outputs
  plan/*.html          one page per doc, with a sidebar table of contents
  emails/*.html        one preview page per email, plus emails/index.html
  emails/ALL-EMAILS.txt  plain-text pack for pasting into Brevo
  ads/index.html       the ads plan (from docs/ADS.md)
  index.html           the artifact hub at the repo root
  404.html             root 404 for GitHub Pages

Requires: pip install markdown
The site pages in site/ are hand-written and are not touched by this script.
"""
import html
import os
import re
import sys
from pathlib import Path

try:
    import markdown
except ImportError:
    sys.exit("pip install markdown  (python-markdown is the only dependency)")

ROOT = Path(__file__).resolve().parent.parent
FONTS = '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">'

# ---------------------------------------------------------------------------
# Documents: (source, output, title, section, blurb)
# ---------------------------------------------------------------------------
DOCS = [
    ("docs/SIMPLE-PLAN.md", "plan/simple-plan.html", "The Simple Plan", "Plan",
     "The version you can run with ADHD and a full-time job: five lines, five stages, one number, built inside Brevo and Calendly. Start here."),
    ("docs/ROADMAP.md", "plan/roadmap.html", "Roadmap and Next Steps", "Plan",
     "Every next step for the site, the marketing plan, and the project: 17 workstreams with owners, effort, dependencies, a timeline, decisions, and what to build next."),
    ("docs/PLAN.md", "plan/marketing-plan.html", "Marketing Plan", "Plan",
     "The master plan: positioning, offer ladder, funnel, nurture, Strategy Session, content, site, rollout."),
    ("docs/FUNNEL.md", "plan/funnel.html", "Funnel Map", "Plan",
     "Every step from an Instagram reel to a signed client, with the tool, the owner, and the metric at each step."),
    ("docs/OFFERS.md", "plan/offers.html", "Offers and Pricing", "Plan",
     "The five-rung ladder, what each offer includes, what it costs, and the decision on every current offer."),
    ("docs/TOOLS-AND-COSTS.md", "plan/tools-and-costs.html", "Tools and Costs", "Plan",
     "The cheapest stack that runs the whole funnel, what to cancel, and the monthly bill before and after revenue."),
    ("docs/ADS.md", "ads/index.html", "Ads Plan", "Ads",
     "How to spend on Meta ads using the Evelyn Weiss model: budget phases, targets, creatives, kill rules."),
    ("docs/STRATEGY-SESSION.md", "plan/strategy-session.html", "Strategy Session Playbook", "Plan",
     "Booking page, qualifying questions, pre-call sequence, the minute-by-minute call script, objections, decision tree."),
    ("docs/MANYCHAT-FLOWS.md", "plan/manychat-flows.html", "ManyChat Flows", "Plan",
     "Every Instagram DM automation, word for word, with tags, branches, and follow-ups."),
    ("docs/CONTENT-CALENDAR.md", "plan/content-calendar.html", "Content Calendar", "Plan",
     "90 days of reels, carousels, stories, and Saturday emails, with hooks for every pillar."),
    ("docs/KPIS.md", "plan/kpis.html", "KPIs and Tracking", "Plan",
     "The weekly scorecard, how each number is measured, and what to do when one is off."),
    ("docs/LAUNCH-CHECKLIST.md", "plan/launch-checklist.html", "Launch Checklist", "Plan",
     "Phase 0 to Phase 2, every task, in order, with the tool and the time estimate."),
    ("docs/SITE-BUILD-GUIDE.md", "plan/site-build-guide.html", "Site Build Guide", "Plan",
     "How the static site is built: rules, components, facts, placeholders."),
]

SITE_PAGES = [
    ("site/index.html", "Home", "One promise, two next steps, three paths."),
    ("site/services.html", "Work With Me", "Five offers, four questions, one comparison table."),
    ("site/accelerator.html", "Job Search Accelerator", "The flagship 8-week sales page."),
    ("site/salary-negotiation.html", "Salary Negotiation Sprint", "The $5K-or-free guarantee, sold on its own."),
    ("site/clarity.html", "Career Clarity Intensive", "The $497 start-here offer."),
    ("site/community.html", "Community", "One page, one price, live checkout."),
    ("site/strategy-session.html", "Strategy Session", "The honest booking page with the calendar."),
    ("site/results.html", "Results", "Outcomes report plus the testimonial wall."),
    ("site/about.html", "About Izzy", "The story, the proof, the person."),
    ("site/free.html", "Free Tools", "Calculators, downloads, shareables, the Saturday email."),
    ("site/shop.html", "Shop", "17 products grouped by problem, not by price."),
    ("site/go/salary.html", "Funnel: SALARY", "$9 landing page for the Salary Number Generator."),
    ("site/go/prompts.html", "Funnel: PROMPTS", "$9 landing page for the Career Prompt Vault."),
    ("site/go/outreach.html", "Funnel: OUTREACH", "$9 landing page for the Cold Outreach Script Pack."),
    ("site/thanks/salary.html", "Thank-you: Salary", "Access plus the Strategy Session upsell."),
    ("site/thanks/community.html", "Thank-you: Community", "Access plus the Community upsell."),
    ("site/links.html", "Links (Instagram bio)", "Self-hosted link-in-bio page."),
    ("site/contact.html", "Contact", "Email, social, and the honest call framing."),
    ("site/soft-landing.html", "Soft Landing (employers)", "The B2B outplacement offer."),
    ("site/privacy.html", "Privacy", "Template, for legal review."),
    ("site/terms.html", "Terms", "Template, for legal review."),
    ("site/refunds.html", "Refunds", "One card per offer."),
    ("site/404.html", "404", "That page moved."),
]

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def cur(flag: bool) -> str:
    return ' aria-current="page"' if flag else ""


def rel(from_path: str, to_path: str) -> str:
    """Relative URL from one output file to another, both relative to ROOT."""
    return os.path.relpath(to_path, os.path.dirname(from_path)).replace(os.sep, "/")


def md_convert(text: str):
    md = markdown.Markdown(extensions=["toc", "tables", "fenced_code", "attr_list", "sane_lists", "md_in_html"],
                           extension_configs={"toc": {"toc_depth": "2-3", "permalink": False}})
    body = md.convert(text)
    # task lists
    body = re.sub(r"<li>\s*\[ \]\s*", '<li class="task-list-item"><input type="checkbox" disabled> ', body)
    body = re.sub(r"<li>\s*\[x\]\s*", '<li class="task-list-item"><input type="checkbox" checked disabled> ', body, flags=re.I)
    # callouts: paragraphs starting with **Note:** / **Warning:** / **Tip:**
    body = re.sub(r"<p><strong>Note:</strong>", '<p class="callout callout--info"><strong>Note:</strong>', body)
    body = re.sub(r"<p><strong>Warning:</strong>", '<p class="callout callout--warn"><strong>Warning:</strong>', body)
    body = re.sub(r"<p><strong>Tip:</strong>", '<p class="callout callout--tip"><strong>Tip:</strong>', body)
    return body, md.toc_tokens


def toc_html(tokens, depth=0):
    out = []
    for t in tokens:
        cls = ' class="lvl-3"' if t["level"] >= 3 else ""
        out.append(f'<li><a href="#{t["id"]}"{cls}>{html.escape(t["name"])}</a></li>')
        if t.get("children"):
            out.append(toc_html(t["children"], depth + 1))
    return "".join(out)


def doc_nav(out_path: str, current: str) -> str:
    hub = rel(out_path, "index.html")
    items = [
        ("Hub", "index.html"),
        ("Plan", "plan/marketing-plan.html"),
        ("Funnel", "plan/funnel.html"),
        ("Emails", "emails/index.html"),
        ("Ads", "ads/index.html"),
        ("Site", "site/index.html"),
    ]
    links = "".join(
        f'<li><a href="{rel(out_path, p)}"{cur(p == current)}>{n}</a></li>'
        for n, p in items
    )
    return f'''<header class="site-header"><div class="container nav">
  <a class="nav__logo" href="{hub}"><img src="{rel(out_path, "assets/img/logo/clearcareer-icon-blue.svg")}" alt="" width="30" height="30">ClearCareer <span class="small muted" style="font-family:var(--font-sans);font-size:.8rem;margin-left:.25rem">2026</span></a>
  <button class="nav__toggle" aria-label="Toggle menu" aria-expanded="false" aria-controls="nav-links"><span></span></button>
  <ul class="nav__links" id="nav-links">{links}</ul>
</div></header>'''


def doc_footer(out_path: str) -> str:
    return f'''<footer class="site-footer" style="padding:2rem 0"><div class="container footer__bottom" style="margin-top:0;padding-top:0;border:0">
  <span>ClearCareer 2026 plan. Internal working documents. © <span data-year>2026</span> Izzy Piyale-Sheard.</span>
  <span><a href="{rel(out_path, "index.html")}">Artifact hub</a> · <a href="https://github.com/izzydoesizzy/clearcareer-website-2026">Repository</a></span>
</div></footer>
<script src="{rel(out_path, "assets/js/site.js")}"></script>'''


def head(out_path: str, title: str, desc: str, extra_css=True) -> str:
    css = f'<link rel="stylesheet" href="{rel(out_path, "assets/css/site.css")}">'
    if extra_css:
        css += f'<link rel="stylesheet" href="{rel(out_path, "assets/css/docs.css")}">'
    return f'''<!doctype html>
<html lang="en" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{html.escape(title)} | ClearCareer 2026</title>
<meta name="description" content="{html.escape(desc)}">
<meta name="robots" content="noindex">
<link rel="icon" href="{rel(out_path, "assets/img/favicon.svg")}" type="image/svg+xml">
{FONTS}
{css}
</head>
<body>'''


def write(path: str, content: str):
    p = ROOT / path
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(content, encoding="utf-8")
    print("wrote", path)


# ---------------------------------------------------------------------------
# Docs
# ---------------------------------------------------------------------------

def build_docs():
    for src, out, title, section, blurb in DOCS:
        text = (ROOT / src).read_text(encoding="utf-8")
        # drop the first H1, we render our own header
        m = re.match(r"\s*#\s+(.+)\n", text)
        h1 = m.group(1).strip() if m else title
        if m:
            text = text[m.end():]
        body, toc = md_convert(text)
        side_docs = "".join(
            f'<li><a href="{rel(out, o)}"{cur(o == out)}>{html.escape(t)}</a></li>'
            for _, o, t, s, _ in DOCS if s == "Plan"
        )
        side_docs += f'<li><a href="{rel(out, "plan/funnel-stages.html")}">Funnel Flowcharts by Stage</a></li>'
        side_docs += f'<li><a href="{rel(out, "plan/funnel-map.html")}">Funnel Map (visual)</a></li>'
        side_docs += f'<li><a href="{rel(out, "ads/index.html")}"{cur(out == "ads/index.html")}>Ads Plan</a></li>'
        side_docs += f'<li><a href="{rel(out, "emails/index.html")}">Email Sequences</a></li>'
        page = f'''{head(out, h1, blurb)}
{doc_nav(out, out)}
<main id="main"><div class="container docs-shell">
<aside class="docs-side">
  <h4>Documents</h4><ul>{side_docs}</ul>
  <div class="toc"><h4>On this page</h4><ul>{toc_html(toc)}</ul></div>
</aside>
<article class="doc">
  <div class="doc-header">
    <div class="crumbs"><a href="{rel(out, "index.html")}">Hub</a> / {html.escape(section)}</div>
    <h1>{html.escape(h1)}</h1>
    <div class="meta"><span>{html.escape(blurb)}</span><span>Source: <code>{src}</code></span></div>
  </div>
  {body}
</article>
</div></main>
{doc_footer(out)}
</body></html>'''
        write(out, page)


# ---------------------------------------------------------------------------
# Emails
# ---------------------------------------------------------------------------

def parse_emails(text: str):
    blocks = re.split(r"^### EMAIL\s*$", text, flags=re.M)[1:]
    emails = []
    for b in blocks:
        header, _, body = b.partition("\n---\n")
        meta = {}
        for line in header.strip().splitlines():
            if ":" in line:
                k, v = line.split(":", 1)
                meta[k.strip().lower()] = v.strip()
        meta["body"] = body.strip()
        emails.append(meta)
    return emails


def email_body_html(md_text: str, out_path: str) -> str:
    body, _ = md_convert(md_text)
    # Buttons: a paragraph that is only a link in the form [[Label|URL]]
    body = re.sub(r"<p>\[\[(.+)\|(.+?)\]\]</p>",
                  lambda m: f'<p><a class="btn btn--primary" href="{html.escape(m.group(2))}">{html.escape(m.group(1))}</a></p>', body)
    body = re.sub(r"\[\[([^\[\]|]+)\|([^\[\]]+?)\]\]",
                  lambda m: f'<a class="btn btn--primary" href="{html.escape(m.group(2))}">{html.escape(m.group(1))}</a>', body)
    return body


def build_emails():
    src = ROOT / "emails/emails.md"
    if not src.exists():
        print("skip emails: emails/emails.md not found")
        return
    emails = parse_emails(src.read_text(encoding="utf-8"))
    # group by sequence, preserving order
    seqs = {}
    for e in emails:
        seqs.setdefault(e.get("sequence", "Other"), []).append(e)

    plain = []
    for i, e in enumerate(emails):
        out = f"emails/{e['id']}.html"
        prev_e = emails[i - 1] if i > 0 else None
        next_e = emails[i + 1] if i + 1 < len(emails) else None
        channel = e.get("channel", "email")
        subject = e.get("subject", e.get("title", ""))
        body_html = email_body_html(e["body"], out)
        meta_rows = ""
        for k, label in [("sequence", "Sequence"), ("step", "Step"), ("variant", "Variant"), ("send", "Send"), ("trigger", "Trigger"), ("goal", "Goal"), ("cta", "Primary CTA"), ("notes", "Notes")]:
            if e.get(k):
                meta_rows += f"<dt>{label}</dt><dd>{html.escape(e[k])}</dd>"
        variant_badge = f'<span class="badge badge--warning">{html.escape(e["variant"])}</span>' if e.get("variant") else ""
        bar = (f'<div class="email__bar"><span>From: Izzy Piyale-Sheard &lt;izzy@joinclearcareer.com&gt;</span><strong>{html.escape(subject)}</strong>'
               + (f'<span class="preview">{html.escape(e["preview"])}</span>' if e.get("preview") else "") + "</div>") if channel == "email" else \
              f'<div class="email__bar"><span>SMS from ClearCareer</span><strong>{html.escape(e.get("title", "Text message"))}</strong></div>'
        nav = '<div class="email-nav">'
        nav += f'<a class="btn btn--secondary btn--sm" href="{prev_e["id"]}.html">Previous: {html.escape(prev_e.get("title", ""))[:40]}</a>' if prev_e else "<span></span>"
        nav += f'<a class="btn btn--secondary btn--sm" href="{next_e["id"]}.html">Next: {html.escape(next_e.get("title", ""))[:40]}</a>' if next_e else "<span></span>"
        nav += "</div>"
        page = f'''{head(out, e.get("title", subject), f"{e.get('sequence','')} step {e.get('step','')}: {subject}")}
{doc_nav(out, "emails/index.html")}
<main id="main"><div class="container" style="padding:2.5rem 0 5rem">
  <div class="doc-header" style="padding-top:0">
    <div class="crumbs"><a href="{rel(out, "index.html")}">Hub</a> / <a href="index.html">Emails</a> / {html.escape(e.get("sequence",""))}</div>
    <h1>{html.escape(e.get("title", subject))}</h1>
    <div class="meta"><span class="badge">{html.escape(e.get("sequence",""))} · step {html.escape(e.get("step",""))}</span>{variant_badge}<span>{html.escape(e.get("send",""))}</span></div>
  </div>
  <div class="email-page">
    <div>
      <div class="email-frame"><div class="email">{bar}<div class="email__body" id="email-body">{body_html}</div><div class="email__footer">ClearCareer · Toronto, Canada · You're getting this because you {"bought something from" if "Buyer" in e.get("sequence","") else "signed up at"} joinclearcareer.com · Unsubscribe</div></div></div>
      {nav}
    </div>
    <aside class="email-meta"><dl>{meta_rows}</dl><button class="btn btn--secondary btn--sm btn--block mt-3 copy-btn" data-copy="#email-body">Copy body text</button><p class="small muted mt-2 mb-0">Paste into Brevo's editor. Replace [[Label|URL]] buttons with Brevo buttons.</p></aside>
  </div>
</div></main>
{doc_footer(out)}
</body></html>'''
        write(out, page)
        plain.append("=" * 72 + f"\n{e.get('sequence','')} · step {e.get('step','')}" + (f" · {e['variant']}" if e.get("variant") else "") + f"\nSEND: {e.get('send','')}\nTRIGGER: {e.get('trigger','')}\n" + (f"SUBJECT: {subject}\nPREVIEW: {e.get('preview','')}\n" if channel == "email" else "CHANNEL: SMS\n") + "-" * 72 + "\n" + e["body"] + "\n")

    # index
    out = "emails/index.html"
    sections = ""
    for name, items in seqs.items():
        first = items[0]
        rows = "".join(
            f'<li><a href="{it["id"]}.html"><span class="n">{html.escape(str(it.get("step","")))}</span><span><span class="t">{html.escape(it.get("title",""))}</span><br><span class="s">{html.escape(it.get("subject","") if it.get("channel","email")=="email" else "SMS")}</span></span><span class="when">{html.escape(it.get("send",""))}</span></a></li>'
            for it in items
        )
        sections += f'''<section class="mt-5" id="{re.sub(r"[^a-z0-9]+","-",name.lower()).strip("-")}">
  <h2>{html.escape(name)} <span class="badge">{len(items)} {"messages" if len(items)!=1 else "message"}</span></h2>
  <p class="muted">{html.escape(first.get("goal", ""))}</p>
  <ul class="seq-list">{rows}</ul>
</section>'''
    page = f'''{head(out, "Email Sequences", "Every email and SMS in the ClearCareer nurture system, rendered as previews.")}
{doc_nav(out, out)}
<main id="main"><div class="container" style="padding:2.5rem 0 5rem">
  <div class="doc-header" style="padding-top:0">
    <div class="crumbs"><a href="{rel(out, "index.html")}">Hub</a> / Emails</div>
    <h1>Email sequences</h1>
    <div class="meta"><span>{len(emails)} messages across {len(seqs)} sequences.</span><span>Plain-text pack: <a href="ALL-EMAILS.txt">ALL-EMAILS.txt</a></span><span>Automation map: <a href="{rel(out, "plan/funnel.html")}">Funnel</a></span></div>
  </div>
  <p class="lead">Every message is written in full and ready to paste into Brevo. Click any row to see it as the reader will. Buttons shown as <code>[[Label|URL]]</code> in the text pack become Brevo buttons.</p>
  {sections}
</div></main>
{doc_footer(out)}
</body></html>'''
    write(out, page)
    write("emails/ALL-EMAILS.txt", "\n".join(plain))


# ---------------------------------------------------------------------------
# Hub and root 404
# ---------------------------------------------------------------------------

def build_hub():
    out = "index.html"

    def cards(items):
        return "".join(
            f'<a class="card hub-card" href="{p}"><span class="badge">{html.escape(b)}</span><h3>{html.escape(t)}</h3><p>{html.escape(d)}</p><span class="path">{html.escape(p)}</span></a>'
            for p, t, d, b in items
        )

    plan_items = [(o, t, b, s) for _, o, t, s, b in DOCS]
    plan_items.insert(1, ("plan/funnel-stages.html", "Funnel Flowcharts by Stage", "The funnel drawn at each of the five stages: what is automated, what Izzy does, and the one test that opens the next stage.", "Plan"))
    plan_items.insert(4, ("plan/funnel-map.html", "Funnel Map (visual)", "The full engine on one screen, six lanes, plus the call decision tree and the automation map.", "Plan"))
    email_items = [("emails/index.html", "Email sequences", "Every nurture email and SMS, rendered, with a plain-text pack.", "Emails")]
    site_items = [(p, t, d, "Site") for p, t, d in SITE_PAGES]
    page = f'''{head(out, "ClearCareer 2026", "Marketing plan, funnel, emails, ads, and the redesigned site. Everything in one place.")}
{doc_nav(out, out)}
<main id="main">
<section class="hero hero--pattern"><div class="container">
  <p class="eyebrow">ClearCareer 2026 · artifact hub</p>
  <h1 style="max-width:18ch">Everything for the relaunch, in one place.</h1>
  <p class="hero__sub">The redesigned website, the marketing plan, the funnel map, every email written in full, the ads plan, and the launch checklist. Plain HTML, hosted on GitHub Pages, nothing to install.</p>
  <div class="btn-row"><a class="btn btn--primary btn--lg" href="site/index.html">Open the new site</a><a class="btn btn--secondary btn--lg" href="plan/marketing-plan.html">Read the plan</a><a class="btn btn--secondary btn--lg" href="emails/index.html">See the emails</a></div>
  <p class="trust-line">If you read one thing: <a href="plan/simple-plan.html"><strong>The Simple Plan</strong></a>. Then <a href="plan/funnel-stages.html">the flowcharts by stage</a>. The full roadmap and launch checklist are for later.</p>
</div></section>
<section class="section section--tight"><div class="container">
  <div class="section-head section-head--left"><p class="eyebrow">The plan</p><h2>Strategy documents</h2></div>
  <div class="grid grid--3">{cards(plan_items)}</div>
</div></section>
<section class="section section--tight section--soft"><div class="container">
  <div class="section-head section-head--left"><p class="eyebrow">Nurture</p><h2>Emails and SMS</h2></div>
  <div class="grid grid--3">{cards(email_items)}</div>
</div></section>
<section class="section section--tight"><div class="container">
  <div class="section-head section-head--left"><p class="eyebrow">The website</p><h2>Redesigned pages</h2><p class="muted">Every page is a standalone HTML file under <code>site/</code>. Open them from <a href="site/index.html">the home page</a> or jump straight in.</p></div>
  <div class="grid grid--4">{cards(site_items)}</div>
</div></section>
</main>
{doc_footer(out)}
</body></html>'''
    write(out, page)

    page404 = f'''{head("404.html", "Page not found", "That page moved.", extra_css=False)}
<main id="main"><section class="hero hero--pattern hero--center"><div class="container container--narrow">
<p class="eyebrow">404</p><h1>That page moved.</h1><p class="hero__sub">Try one of these instead.</p>
<div class="btn-row btn-row--center"><a class="btn btn--primary" href="index.html">Artifact hub</a><a class="btn btn--secondary" href="site/index.html">The new site</a><a class="btn btn--secondary" href="plan/marketing-plan.html">The plan</a></div>
</div></section></main>
<script src="assets/js/site.js"></script></body></html>'''
    write("404.html", page404)


if __name__ == "__main__":
    build_docs()
    build_emails()
    build_hub()
    print("done")
