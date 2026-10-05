import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { buildBoldConversion, SENDER, SITE_URL, DISCOVERY_CALL_URL } from '../../lib/email/index.js';
import type { EmailData } from '../../lib/email/types.js';

export const prerender = false;

const BREVO_API_KEY = import.meta.env.BREVO_API_KEY;
const RESEND_API_KEY = import.meta.env.RESEND_API_KEY;
const TOOLS_LIST_ID = 3;

const TESTIMONIALS = [
  { quote: '200+ failed apps. 27 targeted emails. 13 replies. 1 offer.', name: 'Blake McDermott', outcome: '$5K salary increase' },
  { quote: 'Stuck in a job search black hole. 2 offers in weeks.', name: 'Annie Bell', outcome: '2 offers, 200% salary increase' },
  { quote: '1+ year searching. Hired in 30 days.', name: 'Sparsh Kalia', outcome: 'Hired in 30 days' },
  { quote: '3 job offers + $10K negotiated raise.', name: 'Wil Gerard', outcome: '3 offers + $10K raise' },
];

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { email, subscribe, tool, subject, resultHtml, website: honeypot } = body;

    // Honeypot: bots fill this hidden field, real users don't
    if (honeypot) {
      return new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    if (!email || !email.includes('@')) {
      return new Response(JSON.stringify({ error: 'Valid email required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    // Tool-specific config
    const toolConfig: Record<string, { productName: string; primaryUrl: string; quickTip: string }> = {
      'recruiter-finder': {
        productName: 'Your LinkedIn X-Ray Search Results',
        primaryUrl: `${SITE_URL}/free-tools/linkedin-recruiter-finder`,
        quickTip: 'Connect with 3-5 recruiters per week using your search string. Personalize every request. Mention their industry, a recent post, or a shared connection. Quality over quantity.',
      },
      'job-search-builder': {
        productName: 'Your LinkedIn Job Search URL',
        primaryUrl: `${SITE_URL}/free-tools/linkedin-job-search-builder`,
        quickTip: 'Bookmark your URL and open it every morning. Apply within 24 hours of a posting. Early applicants get 8x more responses. Run the tool 3-4 times with different title variations.',
      },
      'weekly-planner': {
        productName: 'Your Weekly Job Search Plan',
        primaryUrl: `${SITE_URL}/free-tools/weekly-job-search-planner`,
        quickTip: 'Block your search hours on your calendar like meetings. Networking comes first. If you only do one thing today, make it a networking touchpoint. Batch similar tasks.',
      },
    };

    const config = toolConfig[tool] || toolConfig['weekly-planner'];
    const testimonial = TESTIMONIALS[Math.floor(Math.random() * TESTIMONIALS.length)];

    const emailData: EmailData = {
      productName: config.productName,
      primaryCta: {
        text: 'Open the Tool',
        url: config.primaryUrl,
      },
      quickTip: {
        label: 'Quick tip from Izzy',
        text: config.quickTip,
      },
      upsell: {
        headline: 'Want the full job search system?',
        description: 'The Job Search Ignition System builds your complete toolkit in 8 weeks. Resume, LinkedIn, outreach templates, interview prep, salary negotiation scripts.',
        bullets: [
          '20+ done-for-you career assets',
          '3 private 1:1 coaching sessions with Izzy',
          'Weekly group calls and WhatsApp support',
        ],
        buttonText: 'Learn About the Program',
        buttonUrl: `${SITE_URL}/programs/jsis`,
      },
      testimonial,
      discoveryCall: {
        text: 'Want to talk through your job search?',
        url: DISCOVERY_CALL_URL,
      },
      extraContent: resultHtml,
    };

    // Send via Resend
    if (RESEND_API_KEY) {
      const resend = new Resend(RESEND_API_KEY);
      const html = buildBoldConversion(emailData);
      await resend.emails.send({
        from: `${SENDER.name} <${SENDER.email}>`,
        to: email,
        subject: subject || config.productName,
        html,
      });
    }

    // Subscribe to Brevo
    if (subscribe && BREVO_API_KEY) {
      await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: { 'api-key': BREVO_API_KEY, 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ email, listIds: [TOOLS_LIST_ID], updateEnabled: true, attributes: { SOURCE: `tool-${tool}` } }),
      }).catch((err) => console.error('Brevo error:', err));
    }

    return new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    console.error('Send tool report error:', err);
    return new Response(JSON.stringify({ error: 'Failed to send' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};
