import { Resend } from 'resend';
import { readFileSync } from 'fs';
import { buildEmail as buildBoldConversion } from '../src/lib/email/templates/bold-conversion.js';
import type { EmailData } from '../src/lib/email/types.js';

// Load env manually
const envFile = readFileSync('.env', 'utf8');
const RESEND_API_KEY = envFile.match(/RESEND_API_KEY=(.+)/)?.[1]?.trim();
if (!RESEND_API_KEY) { console.error('No RESEND_API_KEY in .env'); process.exit(1); }

const resend = new Resend(RESEND_API_KEY);
const TO = 'izzy@joinclearcareer.com';
const SITE_URL = 'https://joinclearcareer.com';
const DISCOVERY_CALL_URL = 'https://calendly.com/clearcareer/discovery-call';

const TESTIMONIALS = [
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

const UPSELLS: Record<string, any> = {
  vault: {
    quickWinTip: "Start with your 3 most recent roles. That's where recruiters spend 80% of their time. If you can quantify one achievement per role with a real number, you're already ahead of 90% of applicants.",
    headline: 'Want AI to help you write stronger bullets?',
    description: 'The Career Prompt Vault has 50 AI frameworks you can copy, paste, and use right now. 7 of them are built specifically for resumes.',
    bullets: ['Turn vague job duties into quantified achievements', 'Generate professional summaries that actually sound like you', 'Works with Claude, ChatGPT, Gemini, or any AI tool'],
    buttonText: 'Get the Vault for $9',
    buttonUrl: `${SITE_URL}/tools/career-prompt-vault`,
  },
  jsis: {
    quickWinTip: 'Most job seekers apply to 50+ roles and hear back from 2. The ones who land interviews fast do the opposite: they pick 10-15 companies, research the decision makers, and reach out directly.',
    headline: 'Want all 21 career assets built for you?',
    description: 'The Job Search Ignition System builds your complete job search toolkit in 8 weeks.',
    bullets: ['20+ done-for-you career assets (resume, LinkedIn, outreach, interview prep)', '3 private 1:1 coaching sessions with Izzy', 'Weekly group calls and WhatsApp support for 8 weeks'],
    buttonText: 'Learn About the Program',
    buttonUrl: `${SITE_URL}/programs/jsis`,
  },
  'layoff-kit': {
    quickWinTip: 'The first 72 hours matter most. Before you update LinkedIn or start applying, read the severance section.',
    headline: 'Need the full toolkit?',
    description: 'The free guide covers the first 72 hours. The full Layoff Survival Kit gives you everything else.',
    bullets: ['Severance negotiation playbook with scripts', 'Employment lawyer directory (30+ Canadian firms)', 'Financial runway worksheet and tax planning strategies'],
    buttonText: 'Get the Full Kit for $67',
    buttonUrl: `${SITE_URL}/layoff-survival-kit`,
  },
};

const CTA_MAP: Record<string, string> = { resume: 'vault', linkedin: 'vault', strategy: 'jsis', 'company-lists': 'jsis', layoff: 'layoff-kit' };

const LEAD_MAGNETS = [
  { key: 'make-it-count', subject: "Here's your Make It Count playbook", playbook: 'Make It Count: The Complete Guide to Quantifying Your Career Impact', webUrl: `${SITE_URL}/blog/make-it-count-quantify-your-career-impact`, pdfUrl: `${SITE_URL}/downloads/make-it-count.pdf`, ctaGroup: 'resume' },
  { key: 'resume-is-an-ad', subject: "Here's your Resume playbook", playbook: 'Your Resume Is an Ad, Not a Biography', webUrl: `${SITE_URL}/blog/resume-is-an-ad-not-a-biography`, pdfUrl: `${SITE_URL}/downloads/resume-is-an-ad.pdf`, ctaGroup: 'resume' },
  { key: 'achievement-mining', subject: "Here's your Achievement Mining playbook", playbook: 'Achievement Mining: How to Quantify Your Resume Bullets', webUrl: `${SITE_URL}/blog/achievement-mining-how-to-quantify-your-resume-bullets`, pdfUrl: `${SITE_URL}/downloads/achievement-mining.pdf`, ctaGroup: 'resume' },
  { key: 'linkedin-profile-optimization', subject: "Here's your LinkedIn Optimization playbook", playbook: 'LinkedIn Profile Optimization: The Full Audit', webUrl: `${SITE_URL}/blog/linkedin-profile-optimization-the-full-audit`, pdfUrl: `${SITE_URL}/downloads/linkedin-profile-optimization.pdf`, ctaGroup: 'linkedin' },
  { key: 'linkedin-post-ideas', subject: "Here's your LinkedIn Post Ideas guide", playbook: '30+ LinkedIn Post Ideas for Job Seekers', webUrl: `${SITE_URL}/blog/linkedin-post-ideas-for-job-seekers`, ctaGroup: 'linkedin' },
  { key: 'canadian-finance-companies', subject: "Here's your list of 86 Canadian Banking & Fintech companies", playbook: '86 Companies Hiring in Canadian Banking & Fintech', webUrl: `${SITE_URL}/resources/canadian-banking-fintech-companies`, sheetUrl: 'https://docs.google.com/spreadsheets/d/1GNyVSBTVlmkMEBDRp7f3D4XzNVsjX1gpNL3XsLhGBAY/copy', imageUrl: `${SITE_URL}/images/resources/canadian-finance-spreadsheet-email.jpg`, ctaGroup: 'company-lists' },
  { key: 'quantified-achievements', subject: "Here's your 1,600+ Quantified Achievement Bullets", playbook: '1,600+ Quantified Resume Achievements for 80+ Job Titles', webUrl: `${SITE_URL}/resources/quantified-achievements`, sheetUrl: 'https://docs.google.com/spreadsheets/d/10coFJPjCTFB5Bheob6uPGUucVi7GOTgeWnL3Y-e5h2c/copy', ctaGroup: 'resume' },
  { key: 'linkedin-banners', subject: "Here's your LinkedIn Banner Pack", playbook: '33 Free LinkedIn Banners for Job Seekers', webUrl: `${SITE_URL}/resources/linkedin-banners`, ctaGroup: 'linkedin' },
  { key: 'linkedin-headshot', subject: "Here's your DIY LinkedIn Headshot Guide", playbook: 'DIY LinkedIn Headshot Guide', webUrl: `${SITE_URL}/resources/linkedin-headshot-guide`, pdfUrl: `${SITE_URL}/downloads/diy-linkedin-headshot-guide.pdf`, ctaGroup: 'linkedin' },
  { key: 'email-templates', subject: "Here are your 7 Job Search Email Templates", playbook: '7 Email Templates Every Job Seeker Needs', webUrl: `${SITE_URL}/resources/email-templates`, ctaGroup: 'strategy' },
  { key: 'salary-guide-2026', subject: "Here's your 2026 Canadian Salary Guide", playbook: 'The 2026 Salary Guide: 50 In-Demand Roles in Canada', webUrl: `${SITE_URL}/resources/2026-salary-guide`, ctaGroup: 'strategy' },
  { key: 'hidden-job-titles', subject: "Here are 40 Job Titles That Pay $100K+ in Canada", playbook: "40 Job Titles You've Never Heard Of That Pay $100K+", webUrl: `${SITE_URL}/resources/hidden-job-titles`, ctaGroup: 'strategy' },
  { key: 'linkedin-boolean', subject: "Here's your LinkedIn Boolean Search Cheat Sheet", playbook: 'The LinkedIn Recruiter Cheat Sheet: 30 Boolean Search Strings', webUrl: `${SITE_URL}/resources/linkedin-boolean-search`, ctaGroup: 'linkedin' },
  { key: 'layoff-checklist', subject: "Here's your Layoff Survival Checklist", playbook: 'The Layoff Survival Checklist: 25 Steps For the First 72 Hours', webUrl: `${SITE_URL}/resources/layoff-checklist`, ctaGroup: 'layoff' },
  { key: 'canadian-remote-companies', subject: "Here's your list of 194 Canadian Remote & Hybrid Companies", playbook: '194+ Companies in Canada Hiring Remote & Hybrid Roles', webUrl: `${SITE_URL}/resources/canadian-remote-companies`, ctaGroup: 'company-lists' },
];

async function send(subject: string, html: string) {
  await resend.emails.send({
    from: 'Izzy from ClearCareer <izzy@joinclearcareer.com>',
    to: TO,
    subject: `[TEST] ${subject}`,
    html,
  });
}

async function main() {
  let sent = 0;
  let failed = 0;

  // 14 lead magnets
  for (let i = 0; i < LEAD_MAGNETS.length; i++) {
    const m = LEAD_MAGNETS[i];
    const upsell = UPSELLS[CTA_MAP[m.ctaGroup]];
    const testimonial = TESTIMONIALS[i % TESTIMONIALS.length];
    const data: EmailData = {
      productName: m.playbook,
      primaryCta: { text: 'Read the Full Playbook', url: m.webUrl },
      downloadCta: (m as any).pdfUrl
        ? { text: 'Download PDF Version', url: (m as any).pdfUrl, variant: 'pdf' }
        : (m as any).sheetUrl
          ? { text: 'Copy Spreadsheet to Google Drive', url: (m as any).sheetUrl, variant: 'sheet' }
          : undefined,
      image: (m as any).imageUrl ? { url: (m as any).imageUrl, alt: m.playbook } : undefined,
      quickTip: { label: 'Quick tip', text: upsell.quickWinTip },
      upsell: { headline: upsell.headline, description: upsell.description, bullets: upsell.bullets, buttonText: upsell.buttonText, buttonUrl: upsell.buttonUrl },
      testimonial,
      discoveryCall: { text: 'Want to talk through your job search?', url: DISCOVERY_CALL_URL },
      unsubscribeUrl: '#unsubscribe-test',
    };
    try {
      await send(m.subject, buildBoldConversion(data));
      sent++;
      console.log(`✓ ${sent}/16 ${m.key}`);
    } catch (e: any) { failed++; console.error(`✗ ${m.key}: ${e.message}`); }
    await new Promise(r => setTimeout(r, 400));
  }

  // Vault
  const vaultData: EmailData = {
    productName: 'Your Career Prompt Vault',
    subtitle: '50 AI career frameworks, ready to use.',
    firstName: 'Izzy',
    primaryCta: { text: 'Access Your Toolkit', url: `${SITE_URL}/tools/career-prompt-vault/access?session_id=test123` },
    quickTip: { label: 'Pro tip', text: 'Start with the "Career Highlights Extractor" prompt. Upload your resume, run it, and you\'ll have a list of quantified achievements you can use across every other prompt in the vault.' },
    extraContent: `<h3 style="margin:0 0 12px;font-size:16px;color:#1B2A4A;">Quick start:</h3><ol style="margin:0;padding-left:20px;line-height:1.8;"><li style="color:#4b5563;font-size:14px;">Go to <a href="https://claude.ai" style="color:#0161EF;">claude.ai</a>, <a href="https://chatgpt.com" style="color:#0161EF;">chatgpt.com</a>, or your preferred AI tool</li><li style="color:#4b5563;font-size:14px;">Upload your resume</li><li style="color:#4b5563;font-size:14px;">Copy a prompt from your access page and paste it in</li><li style="color:#4b5563;font-size:14px;">Replace the [brackets] with your details and hit send</li></ol>`,
    upsell: { headline: 'Want all 21 career assets built for you?', description: 'The Job Search Ignition System builds your complete job search toolkit in 8 weeks.', bullets: ['20+ done-for-you career assets', '3 private 1:1 coaching sessions with Izzy', 'Weekly group calls and WhatsApp support for 8 weeks'], buttonText: 'Learn About the Program', buttonUrl: `${SITE_URL}/programs/jsis` },
    testimonial: { quote: 'Top of salary range, extra vacation, and a role that matters.', name: 'Alison Gibbins', outcome: 'Top of salary range + 5 extra vacation days; corporate to nonprofit transition' },
    discoveryCall: { text: 'Want to talk through your job search?', url: DISCOVERY_CALL_URL },
  };
  try {
    await send('Your Career Prompt Vault is ready', buildBoldConversion(vaultData));
    sent++;
    console.log(`✓ ${sent}/16 vault`);
  } catch (e: any) { failed++; console.error(`✗ vault: ${e.message}`); }

  await new Promise(r => setTimeout(r, 400));

  // Layoff Kit
  const layoffData: EmailData = {
    productName: 'Your Layoff Survival Kit',
    subtitle: 'Severance calculator, lawyer directory, and 10 complete guides.',
    firstName: 'Izzy',
    primaryCta: { text: 'Access Your Kit', url: `${SITE_URL}/layoff-survival-kit/access/test123` },
    quickTip: { label: 'Start here', text: `Run the <a href="${SITE_URL}/free-tools/severance-calculator" style="color:#0161EF;text-decoration:none;font-weight:600;">severance calculator</a> first. It takes 2 minutes and will tell you whether your package is fair before you sign anything.` },
    extraContent: `<h3 style="margin:0 0 12px;font-size:16px;color:#1B2A4A;">What's inside:</h3><ul style="margin:0;padding-left:20px;"><li style="color:#4b5563;font-size:14px;line-height:1.8;">Severance negotiation playbook with word-for-word scripts</li><li style="color:#4b5563;font-size:14px;line-height:1.8;">Employment lawyer directory (30+ Canadian firms)</li><li style="color:#4b5563;font-size:14px;line-height:1.8;">Financial runway worksheet and tax planning strategies</li><li style="color:#4b5563;font-size:14px;line-height:1.8;">LinkedIn optimization guide and salary negotiation framework</li><li style="color:#4b5563;font-size:14px;line-height:1.8;">30/60/90 day job search action plan</li></ul>`,
    upsell: { headline: 'Want to talk it through?', description: 'Getting laid off is overwhelming. If you want to talk through your situation, your severance, or your next move, book a free call. No pitch, just clarity.', bullets: ['Review your severance package with a career expert', 'Get a clear 30-day action plan', 'Understand your options before signing anything'], buttonText: 'Book a Free Call', buttonUrl: DISCOVERY_CALL_URL },
    testimonial: { quote: '600+ applications, only 3 interviews. ClearCareer changed everything.', name: 'Darin Mellor', outcome: 'Maintained salary after completely transforming job search approach' },
    discoveryCall: false,
  };
  try {
    await send('Your Layoff Survival Kit is ready', buildBoldConversion(layoffData));
    sent++;
    console.log(`✓ ${sent}/16 layoff-kit`);
  } catch (e: any) { failed++; console.error(`✗ layoff-kit: ${e.message}`); }

  console.log(`\nDone: ${sent} sent, ${failed} failed`);
}

main();
