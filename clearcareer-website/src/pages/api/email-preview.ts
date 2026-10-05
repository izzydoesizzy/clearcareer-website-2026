import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { templates } from '../../lib/email/index.js';
import { sampleLeadMagnet, samplePaidProduct, sampleSpreadsheet } from '../../lib/email/sample-data.js';
import type { TemplateDirection } from '../../lib/email/types.js';

export const prerender = false;

const sampleMap = {
  'lead-magnet': sampleLeadMagnet,
  'paid-product': samplePaidProduct,
  'spreadsheet': sampleSpreadsheet,
} as const;

const directionLabels: Record<TemplateDirection, string> = {
  'premium-minimal': 'A: Premium Minimal',
  'warm-branded': 'B: Warm & Branded',
  'bold-conversion': 'C: Bold & Conversion',
  'editorial': 'D: Editorial',
  'dark-native': 'E: Dark Native',
  'split-hero': 'F: Split Hero',
};

export const POST: APIRoute = async ({ request }) => {
  const resendKey = import.meta.env.RESEND_API_KEY;
  if (!resendKey) {
    return new Response(JSON.stringify({ error: 'RESEND_API_KEY not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const body = await request.json();
  const { email, direction, sample } = body as {
    email: string;
    direction: TemplateDirection;
    sample: keyof typeof sampleMap;
  };

  if (!email || !email.includes('@')) {
    return new Response(JSON.stringify({ error: 'Valid email required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const templateFn = templates[direction];
  const sampleData = sampleMap[sample];
  if (!templateFn || !sampleData) {
    return new Response(JSON.stringify({ error: 'Invalid direction or sample type' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const html = templateFn(sampleData);
  const resend = new Resend(resendKey);

  try {
    await resend.emails.send({
      from: 'Izzy from ClearCareer <izzy@joinclearcareer.com>',
      to: email,
      subject: `[TEST] ${directionLabels[direction]} — ${sampleData.productName}`,
      html,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Test email send error:', err);
    return new Response(JSON.stringify({ error: 'Failed to send email' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
