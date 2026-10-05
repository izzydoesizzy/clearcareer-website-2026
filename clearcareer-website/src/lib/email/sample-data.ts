import type { EmailData } from './types.js';
import { SITE_URL, DISCOVERY_CALL_URL } from './constants.js';

export const sampleLeadMagnet: EmailData = {
  productName: 'Make It Count: The Complete Guide to Quantifying Your Career Impact',
  subtitle: 'Your free playbook is ready to download.',
  primaryCta: {
    text: 'Read the Full Playbook',
    url: `${SITE_URL}/blog/make-it-count-quantify-your-career-impact`,
  },
  downloadCta: {
    text: 'Download PDF Version',
    url: `${SITE_URL}/downloads/make-it-count.pdf`,
    variant: 'pdf',
  },
  quickTip: {
    label: 'Quick tip',
    text: "Start with your 3 most recent roles. That's where recruiters spend 80% of their time. If you can quantify one achievement per role with a real number, you're already ahead of 90% of applicants.",
  },
  upsell: {
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
  testimonial: {
    quote: '200+ failed apps. 27 targeted emails. 13 replies. 1 offer.',
    name: 'Blake McDermott',
    outcome: '$5K salary increase after rewriting resume with ClearCareer',
  },
  discoveryCall: {
    text: 'Want to talk through your job search?',
    url: DISCOVERY_CALL_URL,
  },
  unsubscribeUrl: '#unsubscribe-preview',
};

export const samplePaidProduct: EmailData = {
  productName: 'Your Layoff Survival Kit',
  subtitle: 'Severance calculator, lawyer directory, and 10 complete guides.',
  firstName: 'Sarah',
  primaryCta: {
    text: 'Access Your Kit',
    url: `${SITE_URL}/layoff-survival-kit/access/preview-session`,
  },
  quickTip: {
    label: 'Start here',
    text: `Run the <a href="${SITE_URL}/free-tools/severance-calculator" style="color:#0161EF;text-decoration:none;font-weight:600;">severance calculator</a> first. It takes 2 minutes and will tell you whether your package is fair before you sign anything.`,
  },
  extraContent: `
<h3 style="margin:0 0 12px;font-size:16px;color:#1B2A4A;">What's inside:</h3>
<ul style="margin:0;padding-left:20px;">
  <li style="color:#4b5563;font-size:14px;line-height:1.8;">Severance negotiation playbook with word-for-word scripts</li>
  <li style="color:#4b5563;font-size:14px;line-height:1.8;">Employment lawyer directory (30+ Canadian firms)</li>
  <li style="color:#4b5563;font-size:14px;line-height:1.8;">Financial runway worksheet and tax planning strategies</li>
  <li style="color:#4b5563;font-size:14px;line-height:1.8;">LinkedIn optimization guide and salary negotiation framework</li>
  <li style="color:#4b5563;font-size:14px;line-height:1.8;">30/60/90 day job search action plan</li>
</ul>`,
  upsell: {
    headline: 'Want to talk it through?',
    description: "Getting laid off is overwhelming. If you want to talk through your situation, your severance, or your next move, book a free call. No pitch, just clarity.",
    bullets: [
      'Review your severance package with a career expert',
      'Get a clear 30-day action plan',
      'Understand your options before signing anything',
    ],
    buttonText: 'Book a Free Call',
    buttonUrl: DISCOVERY_CALL_URL,
  },
  testimonial: {
    quote: '$20K+ raise and a bonus. After getting zero interviews.',
    name: 'Tamara Gordon',
    outcome: '$20K+ salary increase after ClearCareer coaching',
  },
  discoveryCall: false,
  unsubscribeUrl: '#unsubscribe-preview',
};

export const sampleSpreadsheet: EmailData = {
  productName: '86 Companies Hiring in Canadian Banking & Fintech',
  subtitle: 'Your company list is ready to explore.',
  primaryCta: {
    text: 'View the Full List',
    url: `${SITE_URL}/resources/canadian-banking-fintech-companies`,
  },
  downloadCta: {
    text: 'Copy Spreadsheet to Google Drive',
    url: 'https://docs.google.com/spreadsheets/d/1GNyVSBTVlmkMEBDRp7f3D4XzNVsjX1gpNL3XsLhGBAY/copy',
    variant: 'sheet',
  },
  image: {
    url: `${SITE_URL}/images/resources/canadian-finance-spreadsheet-email.jpg`,
    alt: 'Preview of the Canadian Banking & Fintech companies spreadsheet',
  },
  quickTip: {
    label: 'Quick tip',
    text: "Don't just save this list. Pick your top 10, find 2-3 people at each company on LinkedIn, and send a connection request with a note. That single action beats 100 cold applications.",
  },
  upsell: {
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
  testimonial: {
    quote: '1 year unemployed. Employed in 3 weeks.',
    name: 'Kristin Davis',
    outcome: 'Hired in 3 weeks after joining ClearCareer',
  },
  unsubscribeUrl: '#unsubscribe-preview',
};
