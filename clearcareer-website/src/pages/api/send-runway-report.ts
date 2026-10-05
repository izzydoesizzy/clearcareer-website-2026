import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { COLORS, FONTS, LOGO, SENDER, SITE_URL, DISCOVERY_CALL_URL } from '../../lib/email/constants.js';

export const prerender = false;

const BREVO_API_KEY = import.meta.env.BREVO_API_KEY;
const RESEND_API_KEY = import.meta.env.RESEND_API_KEY;

// Brevo list for runway calculator leads
const RUNWAY_LIST_ID = 3;

function fmtCAD(n: number) {
  return new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }).format(n);
}

function buildReportEmail(data: {
  runwayMonths: number;
  isInfinite: boolean;
  tier: 'green' | 'amber' | 'red';
  totalFunds: number;
  monthlyExpenses: number;
  monthlyIncome: number;
  monthlyBurn: number;
  depletionDate: string;
  worryDate: string;
  interpretation: string;
  province: string;
  severanceNote: string;
}): string {
  const tierColor = data.tier === 'green' ? COLORS.green : data.tier === 'amber' ? COLORS.amber : '#dc2626';
  const tierLabel = data.isInfinite ? 'Unlimited' : `${data.runwayMonths.toFixed(1)} months`;

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0; padding:0; background:${COLORS.offWhite}; font-family:${FONTS.body}; color:${COLORS.text};">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:${COLORS.offWhite};">
    <tr><td align="center" style="padding:32px 16px;">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%;">

        <!-- Header -->
        <tr><td style="padding:24px 32px; background:${COLORS.navy}; border-radius:12px 12px 0 0;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td><img src="${LOGO.wordmarkWhite}" alt="ClearCareer" height="24" style="height:24px;" /></td>
              <td align="right" style="font-size:12px; color:rgba(255,255,255,0.5);">Financial Runway Report</td>
            </tr>
          </table>
        </td></tr>

        <!-- Hero Result -->
        <tr><td style="padding:40px 32px; background:white; text-align:center; border-bottom:1px solid ${COLORS.grey200};">
          <div style="font-size:12px; font-weight:600; text-transform:uppercase; letter-spacing:0.1em; color:${tierColor}; margin-bottom:8px;">
            ${data.isInfinite ? 'Unlimited Runway' : 'Your Financial Runway'}
          </div>
          <div style="font-size:48px; font-weight:700; color:${COLORS.navy}; font-family:${FONTS.heading}; line-height:1;">
            ${tierLabel}
          </div>
          <div style="font-size:15px; color:${COLORS.grey500}; margin-top:12px; max-width:400px; margin-left:auto; margin-right:auto; line-height:1.6;">
            ${data.interpretation}
          </div>
        </td></tr>

        <!-- Key Dates -->
        ${!data.isInfinite ? `
        <tr><td style="padding:24px 32px; background:white; border-bottom:1px solid ${COLORS.grey200};">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td width="50%" style="padding:12px; background:${COLORS.offWhite}; border-radius:8px; text-align:center;">
                <div style="font-size:10px; font-weight:600; text-transform:uppercase; letter-spacing:0.1em; color:${COLORS.grey500};">Savings Run Out</div>
                <div style="font-size:18px; font-weight:700; color:${COLORS.navy}; font-family:${FONTS.heading}; margin-top:4px;">${data.depletionDate}</div>
              </td>
              <td width="8"></td>
              <td width="50%" style="padding:12px; background:${COLORS.offWhite}; border-radius:8px; text-align:center;">
                <div style="font-size:10px; font-weight:600; text-transform:uppercase; letter-spacing:0.1em; color:${COLORS.grey500};">Search Sprint By</div>
                <div style="font-size:18px; font-weight:700; color:${COLORS.navy}; font-family:${FONTS.heading}; margin-top:4px;">${data.worryDate}</div>
                <div style="font-size:10px; color:${COLORS.grey400};">70% mark, 30% buffer</div>
              </td>
            </tr>
          </table>
        </td></tr>` : ''}

        <!-- Monthly Breakdown -->
        <tr><td style="padding:24px 32px; background:white; border-bottom:1px solid ${COLORS.grey200};">
          <div style="font-size:14px; font-weight:600; color:${COLORS.navy}; margin-bottom:12px;">Monthly Breakdown</div>
          <table width="100%" cellpadding="0" cellspacing="0" style="font-size:13px;">
            <tr style="border-bottom:1px solid ${COLORS.grey200};">
              <td style="padding:10px 0; color:${COLORS.grey500};">Total funds (savings + severance)</td>
              <td align="right" style="padding:10px 0; font-weight:600; color:${COLORS.navy};">${fmtCAD(data.totalFunds)}</td>
            </tr>
            <tr style="border-bottom:1px solid ${COLORS.grey200};">
              <td style="padding:10px 0; color:${COLORS.grey500};">Monthly expenses</td>
              <td align="right" style="padding:10px 0; font-weight:600;">${fmtCAD(data.monthlyExpenses)}</td>
            </tr>
            <tr style="border-bottom:1px solid ${COLORS.grey200};">
              <td style="padding:10px 0; color:${COLORS.grey500};">Monthly income</td>
              <td align="right" style="padding:10px 0; font-weight:600; color:${COLORS.green};">+${fmtCAD(data.monthlyIncome)}</td>
            </tr>
            <tr>
              <td style="padding:10px 0; color:${COLORS.grey500};">Net monthly burn</td>
              <td align="right" style="padding:10px 0; font-weight:700; color:${data.tier === 'red' ? '#dc2626' : COLORS.navy};">${fmtCAD(data.monthlyBurn)}</td>
            </tr>
          </table>
          ${data.severanceNote ? `<div style="font-size:11px; color:${COLORS.grey400}; margin-top:8px; font-style:italic;">${data.severanceNote}</div>` : ''}
        </td></tr>

        <!-- CTA 1: Layoff Survival Kit -->
        <tr><td style="padding:24px 32px; background:${COLORS.blueBg};">
          <div style="font-size:16px; font-weight:700; color:${COLORS.navy};">Just got laid off? Get the Layoff Survival Kit.</div>
          <div style="font-size:13px; color:${COLORS.grey500}; margin-top:6px; line-height:1.6;">
            Severance negotiation scripts. Employment lawyer directory. Tax strategies. 30/60/90 day job search plan. 10 complete modules for $67 CAD.
          </div>
          <div style="margin-top:16px;">
            <a href="${SITE_URL}/layoff-survival-kit" style="display:inline-block; background:${COLORS.blue}; color:white; padding:12px 28px; border-radius:8px; font-size:14px; font-weight:600; text-decoration:none;">
              Get the Layoff Survival Kit &rarr;
            </a>
          </div>
        </td></tr>

        <!-- CTA 2: JSIS -->
        <tr><td style="padding:24px 32px; background:white; border-bottom:1px solid ${COLORS.grey200};">
          <div style="font-size:16px; font-weight:700; color:${COLORS.navy};">Want a structured job search? Join the next cohort.</div>
          <div style="font-size:13px; color:${COLORS.grey500}; margin-top:6px; line-height:1.6;">
            The Job Search Ignition System: 8 weeks of group coaching for senior professionals. Done-for-you resume, LinkedIn, outreach templates, and three 1:1 sessions with Izzy. Cohorts capped at 10.
          </div>
          <div style="margin-top:16px;">
            <a href="${SITE_URL}/programs/jsis" style="display:inline-block; background:${COLORS.navy}; color:white; padding:12px 28px; border-radius:8px; font-size:14px; font-weight:600; text-decoration:none;">
              Explore the Program &rarr;
            </a>
          </div>
        </td></tr>

        <!-- CTA 3: Free Audit -->
        <tr><td style="padding:20px 32px; background:white; text-align:center; border-bottom:1px solid ${COLORS.grey200};">
          <div style="font-size:14px; font-weight:600; color:${COLORS.navy};">Not sure where to start?</div>
          <div style="font-size:13px; color:${COLORS.grey500}; margin-top:2px;">Book a free 20-minute career audit. No pitch, just an honest assessment.</div>
          <div style="margin-top:12px;">
            <a href="${DISCOVERY_CALL_URL}" style="color:${COLORS.blue}; font-size:14px; font-weight:600; text-decoration:underline;">
              Book Your Free Audit &rarr;
            </a>
          </div>
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:20px 32px; background:${COLORS.offWhite}; border-radius:0 0 12px 12px;">
          <div style="font-size:11px; color:${COLORS.grey400}; text-align:center; line-height:1.6;">
            This is an estimate, not financial advice. Consult a financial advisor for personalized guidance.<br />
            Generated by <a href="${SITE_URL}/free-tools/financial-runway-calculator" style="color:${COLORS.blue};">ClearCareer Financial Runway Calculator</a>
          </div>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { email, subscribe, reportData, website: honeypot } = body;

    // Honeypot: bots fill this hidden field, real users don't
    if (honeypot) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200, headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!email || !email.includes('@')) {
      return new Response(JSON.stringify({ error: 'Valid email required' }), {
        status: 400, headers: { 'Content-Type': 'application/json' },
      });
    }

    // 1. Send the report email via Resend
    if (RESEND_API_KEY) {
      const resend = new Resend(RESEND_API_KEY);
      const html = buildReportEmail(reportData);
      await resend.emails.send({
        from: `${SENDER.name} <${SENDER.email}>`,
        to: email,
        subject: `Your Financial Runway Report — ${reportData.isInfinite ? 'Unlimited' : reportData.runwayMonths.toFixed(1) + ' months'}`,
        html,
      });
    }

    // 2. Add to Brevo list (if opted in)
    if (subscribe && BREVO_API_KEY) {
      await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: {
          'api-key': BREVO_API_KEY,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          email,
          listIds: [RUNWAY_LIST_ID],
          updateEnabled: true,
          attributes: { SOURCE: 'runway-calculator' },
        }),
      }).catch((err) => console.error('Brevo error:', err));
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200, headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Send runway report error:', err);
    return new Response(JSON.stringify({ error: 'Failed to send email' }), {
      status: 500, headers: { 'Content-Type': 'application/json' },
    });
  }
};
