import type { APIRoute } from 'astro';
import { buildBoldConversion, SITE_URL, DISCOVERY_CALL_URL } from '../../lib/email/index.js';
import type { EmailData } from '../../lib/email/types.js';

export const prerender = false;

const BREVO_API_KEY = import.meta.env.BREVO_API_KEY;

const LIST_IDS: Record<string, number> = {
  'make-it-count': 3,
  'achievement-worksheet': 4,
  'newsletter': 5,
  'canadian-finance-companies': 3,
  'quantified-achievements': 3,
  'linkedin-banners': 3,
  'linkedin-headshot': 3,
  'email-templates': 3,
  'salary-guide-2026': 3,
  'hidden-job-titles': 3,
  'linkedin-boolean': 3,
  'layoff-survival-kit': 3,
  'canadian-remote-companies': 3,
};

// ── Testimonial Pool (rotated per lead magnet) ───────────────────────────

const TESTIMONIALS: { quote: string; name: string; outcome: string }[] = [
  { quote: '200+ failed apps. 27 targeted emails. 13 replies. 1 offer.', name: 'Blake McDermott', outcome: '$5K salary increase after rewriting resume with ClearCareer' },
  { quote: 'Stuck in a job search black hole. 2 offers in weeks.', name: 'Annie Bell', outcome: '2 offers within weeks, 200% salary increase' },
  { quote: 'From freelancer to $127K + 30 PTO days negotiated.', name: 'Kira Howe', outcome: '$127K salary with negotiated PTO' },
  { quote: '1 year unemployed. Employed in 3 weeks.', name: 'Kristin Davis', outcome: 'Hired in 3 weeks after joining ClearCareer' },
  { quote: '1+ year searching. Hired in 30 days.', name: 'Sparsh Kalia', outcome: 'Hired in 30 days after joining ClearCareer' },
  { quote: '$20K+ raise and a bonus. After getting zero interviews.', name: 'Tamara Gordon', outcome: '$20K+ salary increase after ClearCareer coaching' },
  { quote: '$22,000/year salary bump. Landed my dream role.', name: 'Laura Salamanca', outcome: '30%+ salary increase' },
  { quote: 'Landed Associate Director role. $25K salary increase.', name: 'Chris Chipman', outcome: '$25K salary increase' },
  { quote: '2 offers in 1 week. 30% salary increase.', name: 'Henrique Perez', outcome: '2 offers in 1 week, 30% salary increase' },
  { quote: '3 interviews in 2 weeks after 11 months and 500+ applications.', name: 'Victor Perez', outcome: '3 interviews in 2 weeks' },
  { quote: 'Hundreds of applications with no results to responses in the first week.', name: 'Andrew Cameron', outcome: 'Employer responses in first week' },
  { quote: '3 job offers + $10K negotiated raise.', name: 'Wil Gerard', outcome: '3 offers + $10K raise' },
  { quote: '$10K negotiated bump. Landed my dream tech marketing role.', name: 'Marsha Druker', outcome: '$10K negotiated bump' },
  { quote: '$10K above initial offer. Overcame impostor syndrome.', name: 'Septembre Anderson', outcome: '$10K above initial offer' },
  { quote: '12 months searching. Got an offer + $6K negotiated increase.', name: 'Jorge Garboza', outcome: 'Offer + $6K negotiated increase' },
];

// ── Upsell Blocks (no Community — ever) ──────────────────────────────────

type UpsellGroup = 'vault' | 'jsis' | 'layoff-kit';

interface UpsellBlock {
  quickWinTip: string;
  headline: string;
  description: string;
  bullets: string[];
  buttonText: string;
  buttonUrl: string;
}

const UPSELL_BLOCKS: Record<UpsellGroup, UpsellBlock> = {
  vault: {
    quickWinTip: 'Start with your 3 most recent roles. That\'s where recruiters spend 80% of their time. If you can quantify one achievement per role with a real number, you\'re already ahead of 90% of applicants.',
    headline: 'Want AI to help you write stronger bullets?',
    description: 'The Career Prompt Vault has 50 AI frameworks you can copy, paste, and use right now. 7 of them are built specifically for resumes.',
    bullets: [
      'Turn vague job duties into quantified achievements',
      'Generate professional summaries that actually sound like you',
      'Works with Claude, ChatGPT, Gemini, or any AI tool',
    ],
    buttonText: 'Get the Vault for $9',
    buttonUrl: `${SITE_URL}/tools/career-prompt-vault`,
  },
  jsis: {
    quickWinTip: 'Most job seekers apply to 50+ roles and hear back from 2. The ones who land interviews fast do the opposite: they pick 10-15 companies, research the decision makers, and reach out directly.',
    headline: 'Want all 21 career assets built for you?',
    description: 'The Job Search Ignition System builds your complete job search toolkit in 8 weeks. Resume, LinkedIn, outreach templates, interview prep, salary negotiation scripts, and more.',
    bullets: [
      '20+ done-for-you career assets (resume, LinkedIn, outreach, interview prep)',
      '3 private 1:1 coaching sessions with Izzy',
      'Weekly group calls and WhatsApp support for 8 weeks',
    ],
    buttonText: 'Learn About the Program',
    buttonUrl: `${SITE_URL}/programs/jsis`,
  },
  'layoff-kit': {
    quickWinTip: 'The first 72 hours matter most. Before you update LinkedIn or start applying, read the severance section. Most people leave thousands of dollars on the table by accepting the first offer.',
    headline: 'Need the full toolkit?',
    description: 'The free guide covers the first 72 hours. The full Layoff Survival Kit gives you everything else: a severance calculator, lawyer directory, tax strategies, and 10 complete guides.',
    bullets: [
      'Severance negotiation playbook with scripts',
      'Employment lawyer directory (30+ Canadian firms)',
      'Financial runway worksheet and tax planning strategies',
    ],
    buttonText: 'Get the Full Kit for $67',
    buttonUrl: `${SITE_URL}/layoff-survival-kit`,
  },
};

// Map old ctaGroup values to new upsell groups
const CTA_TO_UPSELL: Record<string, UpsellGroup> = {
  'resume': 'vault',
  'linkedin': 'vault',
  'strategy': 'jsis',
  'company-lists': 'jsis',
  'layoff': 'layoff-kit',
};

// ── Lead Magnet Config ─────────────────────────────────────────────────────

const LEAD_MAGNETS: Record<string, {
  subject: string;
  playbook: string;
  webUrl: string;
  ctaGroup: string;
  pdfUrl?: string;
  sheetUrl?: string;
  imageUrl?: string;
}> = {
  'make-it-count': {
    subject: "Here's your Make It Count playbook",
    playbook: "Make It Count: The Complete Guide to Quantifying Your Career Impact",
    webUrl: `${SITE_URL}/blog/make-it-count-quantify-your-career-impact`,
    pdfUrl: `${SITE_URL}/downloads/make-it-count.pdf`,
    ctaGroup: 'resume',
  },
  'resume-is-an-ad': {
    subject: "Here's your Resume playbook",
    playbook: "Your Resume Is an Ad, Not a Biography",
    webUrl: `${SITE_URL}/blog/resume-is-an-ad-not-a-biography`,
    pdfUrl: `${SITE_URL}/downloads/resume-is-an-ad.pdf`,
    ctaGroup: 'resume',
  },
  'achievement-mining': {
    subject: "Here's your Achievement Mining playbook",
    playbook: "Achievement Mining: How to Quantify Your Resume Bullets",
    webUrl: `${SITE_URL}/blog/achievement-mining-how-to-quantify-your-resume-bullets`,
    pdfUrl: `${SITE_URL}/downloads/achievement-mining.pdf`,
    ctaGroup: 'resume',
  },
  'linkedin-profile-optimization': {
    subject: "Here's your LinkedIn Optimization playbook",
    playbook: "LinkedIn Profile Optimization: The Full Audit",
    webUrl: `${SITE_URL}/blog/linkedin-profile-optimization-the-full-audit`,
    pdfUrl: `${SITE_URL}/downloads/linkedin-profile-optimization.pdf`,
    ctaGroup: 'linkedin',
  },
  'linkedin-post-ideas': {
    subject: "Here's your LinkedIn Post Ideas guide",
    playbook: "30+ LinkedIn Post Ideas for Job Seekers",
    webUrl: `${SITE_URL}/blog/linkedin-post-ideas-for-job-seekers`,
    ctaGroup: 'linkedin',
  },
  'canadian-finance-companies': {
    subject: "Here's your list of 86 Canadian Banking & Fintech companies",
    playbook: "86 Companies Hiring in Canadian Banking & Fintech",
    webUrl: `${SITE_URL}/resources/canadian-banking-fintech-companies`,
    sheetUrl: 'https://docs.google.com/spreadsheets/d/1GNyVSBTVlmkMEBDRp7f3D4XzNVsjX1gpNL3XsLhGBAY/copy',
    imageUrl: `${SITE_URL}/images/resources/canadian-finance-spreadsheet-email.jpg`,
    ctaGroup: 'company-lists',
  },
  'quantified-achievements': {
    subject: "Here's your 1,600+ Quantified Achievement Bullets",
    playbook: "1,600+ Quantified Resume Achievements for 80+ Job Titles",
    webUrl: `${SITE_URL}/resources/quantified-achievements`,
    sheetUrl: 'https://docs.google.com/spreadsheets/d/10coFJPjCTFB5Bheob6uPGUucVi7GOTgeWnL3Y-e5h2c/copy',
    ctaGroup: 'resume',
  },
  'linkedin-banners': {
    subject: "Here's your LinkedIn Banner Pack",
    playbook: "33 Free LinkedIn Banners for Job Seekers",
    webUrl: `${SITE_URL}/resources/linkedin-banners`,
    ctaGroup: 'linkedin',
  },
  'linkedin-headshot': {
    subject: "Here's your DIY LinkedIn Headshot Guide",
    playbook: "DIY LinkedIn Headshot Guide",
    webUrl: `${SITE_URL}/resources/linkedin-headshot-guide`,
    pdfUrl: `${SITE_URL}/downloads/diy-linkedin-headshot-guide.pdf`,
    ctaGroup: 'linkedin',
  },
  'email-templates': {
    subject: "Here are your 7 Job Search Email Templates",
    playbook: "7 Email Templates Every Job Seeker Needs",
    webUrl: `${SITE_URL}/resources/email-templates`,
    ctaGroup: 'strategy',
  },
  'salary-guide-2026': {
    subject: "Here's your 2026 Canadian Salary Guide",
    playbook: "The 2026 Salary Guide: 50 In-Demand Roles in Canada",
    webUrl: `${SITE_URL}/resources/2026-salary-guide`,
    ctaGroup: 'strategy',
  },
  'hidden-job-titles': {
    subject: "Here are 40 Job Titles That Pay $100K+ in Canada",
    playbook: "40 Job Titles You've Never Heard Of That Pay $100K+",
    webUrl: `${SITE_URL}/resources/hidden-job-titles`,
    ctaGroup: 'strategy',
  },
  'linkedin-boolean': {
    subject: "Here's your LinkedIn Boolean Search Cheat Sheet",
    playbook: "The LinkedIn Recruiter Cheat Sheet: 30 Boolean Search Strings",
    webUrl: `${SITE_URL}/resources/linkedin-boolean-search`,
    ctaGroup: 'linkedin',
  },
  'layoff-checklist': {
    subject: "Here's your Layoff Survival Checklist",
    playbook: "The Layoff Survival Checklist: 25 Steps For the First 72 Hours",
    webUrl: `${SITE_URL}/resources/layoff-checklist`,
    ctaGroup: 'layoff',
  },
  'canadian-remote-companies': {
    subject: "Here's your list of 194 Canadian Remote & Hybrid Companies",
    playbook: "194+ Companies in Canada Hiring Remote & Hybrid Roles",
    webUrl: `${SITE_URL}/resources/canadian-remote-companies`,
    ctaGroup: 'company-lists',
  },
};

// ── Email Sending ──────────────────────────────────────────────────────────

function buildEmailData(magnet: typeof LEAD_MAGNETS[string], index: number): EmailData {
  const upsellGroup = CTA_TO_UPSELL[magnet.ctaGroup] || 'vault';
  const upsell = UPSELL_BLOCKS[upsellGroup];
  const testimonial = TESTIMONIALS[index % TESTIMONIALS.length];

  return {
    productName: magnet.playbook,
    primaryCta: {
      text: 'Read the Full Playbook',
      url: magnet.webUrl,
    },
    downloadCta: magnet.pdfUrl
      ? { text: 'Download PDF Version', url: magnet.pdfUrl, variant: 'pdf' as const }
      : magnet.sheetUrl
        ? { text: 'Copy Spreadsheet to Google Drive', url: magnet.sheetUrl, variant: 'sheet' as const }
        : undefined,
    image: magnet.imageUrl
      ? { url: magnet.imageUrl, alt: magnet.playbook }
      : undefined,
    quickTip: {
      label: 'Quick tip',
      text: upsell.quickWinTip,
    },
    upsell: {
      headline: upsell.headline,
      description: upsell.description,
      bullets: upsell.bullets,
      buttonText: upsell.buttonText,
      buttonUrl: upsell.buttonUrl,
    },
    testimonial,
    discoveryCall: {
      text: 'Want to talk through your job search?',
      url: DISCOVERY_CALL_URL,
    },
    unsubscribeUrl: '{{unsubscribe}}',
  };
}

async function sendDeliveryEmail(email: string, source: string): Promise<void> {
  const magnet = LEAD_MAGNETS[source];
  if (!magnet) return;

  const magnetKeys = Object.keys(LEAD_MAGNETS);
  const index = magnetKeys.indexOf(source);
  const emailData = buildEmailData(magnet, index >= 0 ? index : 0);
  const html = buildBoldConversion(emailData);

  await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'api-key': BREVO_API_KEY,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      sender: { name: 'Izzy from ClearCareer', email: 'izzy@joinclearcareer.com' },
      to: [{ email }],
      subject: magnet.subject,
      htmlContent: html,
    }),
  });
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { email, source, website: honeypot } = body;

    // Honeypot: bots fill this hidden field, real users don't
    if (honeypot) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!email || !email.includes('@')) {
      return new Response(JSON.stringify({ error: 'Valid email required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const listId = LIST_IDS[source] || LIST_IDS['newsletter'];

    if (!BREVO_API_KEY) {
      console.error('BREVO_API_KEY not set');
      return new Response(JSON.stringify({ error: 'Server configuration error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 1. Add contact to Brevo list
    const brevoRes = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'api-key': BREVO_API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        email,
        listIds: [listId],
        updateEnabled: true,
        attributes: {
          SOURCE: source || 'website',
        },
      }),
    });

    // Accept success or duplicate contact
    const contactOk = brevoRes.ok || brevoRes.status === 204;
    if (!contactOk) {
      const brevoBody = await brevoRes.text();
      if (!(brevoRes.status === 400 && brevoBody.includes('already exist'))) {
        console.error('Brevo contact error:', brevoRes.status, brevoBody);
      }
    }

    // 2. Send delivery email (fire and forget, don't block the response)
    sendDeliveryEmail(email, source).catch((err) => {
      console.error('Delivery email error:', err);
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Subscribe error:', err);
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
