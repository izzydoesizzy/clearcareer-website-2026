import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { COLORS, FONTS, LOGO, SENDER, SITE_URL, DISCOVERY_CALL_URL } from '../../lib/email/constants.js';

export const prerender = false;

const BREVO_API_KEY = import.meta.env.BREVO_API_KEY;
const RESEND_API_KEY = import.meta.env.RESEND_API_KEY;

const SEVERANCE_LIST_ID = 3;

function fmtCAD(n: number) {
  return new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }).format(n);
}

function buildReportEmail(data: {
  province: string;
  esaTotalWeeks: number;
  esaTotalDollars: number;
  commonLawLow: number;
  commonLawMid: number;
  commonLawHigh: number;
  lowDollars: number;
  midDollars: number;
  highDollars: number;
  gapAboveEsa: number;
  exceptionalCase: boolean;
  netLow: number;
  netHigh: number;
  comparableCases: { name: string; year: number; award: number; detail: string }[];
}): string {
  const casesHtml = data.comparableCases.map(c => `
    <tr>
      <td style="padding:8px 0; border-bottom:1px solid ${COLORS.grey200}; font-size:13px;">
        <strong>${c.name}</strong> <span style="color:${COLORS.grey400};">(${c.year})</span><br/>
        <span style="color:${COLORS.grey500}; font-size:12px;">${c.detail}</span>
      </td>
      <td style="padding:8px 0; border-bottom:1px solid ${COLORS.grey200}; text-align:right; font-weight:700; color:${COLORS.blue}; font-size:14px; white-space:nowrap;">${c.award} mo</td>
    </tr>
  `).join('');

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
              <td align="right" style="font-size:12px; color:rgba(255,255,255,0.5);">Severance Estimate Report</td>
            </tr>
          </table>
        </td></tr>

        <!-- Hero: Months + Dollars -->
        <tr><td style="padding:40px 32px; background:white; text-align:center; border-bottom:1px solid ${COLORS.grey200};">
          <div style="font-size:12px; font-weight:600; text-transform:uppercase; letter-spacing:0.1em; color:${COLORS.blue}; margin-bottom:8px;">Courts Have Awarded in Similar Cases</div>
          <div style="font-size:48px; font-weight:700; color:${COLORS.navy}; font-family:${FONTS.heading}; line-height:1;">${data.commonLawLow} – ${data.commonLawHigh} months</div>
          <div style="font-size:15px; color:${COLORS.grey500}; margin-top:4px;">of reasonable notice</div>
          <div style="font-size:14px; color:${COLORS.navy}; margin-top:12px;">At your salary: ${fmtCAD(data.lowDollars)} – ${fmtCAD(data.highDollars)} (gross, before tax and fees)</div>
          <div style="font-size:13px; color:${COLORS.grey400}; margin-top:8px;">Employer's statutory minimum: ${data.esaTotalWeeks} weeks (${fmtCAD(data.esaTotalDollars)})</div>
        </td></tr>

        <!-- 3-Tier Breakdown -->
        <tr><td style="padding:24px 32px; background:white; border-bottom:1px solid ${COLORS.grey200};">
          <div style="font-size:14px; font-weight:600; color:${COLORS.navy}; margin-bottom:12px;">Your Estimate Breakdown</div>

          <!-- Tier 1: ESA -->
          <div style="padding:10px 14px; background:${COLORS.offWhite}; border-radius:8px; margin-bottom:8px; display:flex; justify-content:space-between; align-items:center;">
            <div>
              <div style="font-size:10px; font-weight:600; text-transform:uppercase; letter-spacing:0.05em; color:${COLORS.grey400};">What Your Employer Must Pay (ESA)</div>
              <div style="font-size:12px; color:${COLORS.grey500};">Legal floor. No lawyer needed.</div>
            </div>
            <div style="text-align:right;">
              <div style="font-size:15px; font-weight:700; color:${COLORS.grey500};">${data.esaTotalWeeks} wks (${fmtCAD(data.esaTotalDollars)})</div>
            </div>
          </div>

          <!-- Tier 2: Settlement (highlighted) -->
          <div style="padding:10px 14px; background:#f0fdf4; border-radius:8px; margin-bottom:8px; border:2px solid #bbf7d0; display:flex; justify-content:space-between; align-items:center;">
            <div>
              <div style="font-size:10px; font-weight:600; text-transform:uppercase; letter-spacing:0.05em; color:${COLORS.green};">Potential Settlement Range (With a Lawyer)</div>
              <div style="font-size:12px; color:${COLORS.grey500};">With a lawyer. After ~30% fees.</div>
            </div>
            <div style="text-align:right;">
              <div style="font-size:15px; font-weight:700; color:${COLORS.navy};">${fmtCAD(data.netLow)} – ${fmtCAD(data.netHigh)}</div>
            </div>
          </div>

          <!-- Tier 3: Court -->
          <div style="padding:10px 14px; background:${COLORS.offWhite}; border-radius:8px; display:flex; justify-content:space-between; align-items:center;">
            <div>
              <div style="font-size:10px; font-weight:600; text-transform:uppercase; letter-spacing:0.05em; color:${COLORS.grey400};">What Courts Have Awarded (Bardal)</div>
              <div style="font-size:12px; color:${COLORS.grey500};">Theoretical ceiling. 12-24 month trial.</div>
            </div>
            <div style="text-align:right;">
              <div style="font-size:15px; font-weight:700; color:${COLORS.grey500};">${data.commonLawLow}–${data.commonLawHigh} mo (${fmtCAD(data.lowDollars)}–${fmtCAD(data.highDollars)})</div>
            </div>
          </div>
        </td></tr>

        <!-- Caveats -->
        <tr><td style="padding:16px 32px; background:${COLORS.amberBg}; border-bottom:1px solid ${COLORS.grey200};">
          <div style="font-size:12px; color:#92400e; line-height:1.7;">
            <strong>Duty to mitigate:</strong> Courts expect active job searching. Income earned reduces the amount.
            <strong>Your contract:</strong> A termination clause could limit you to the ESA minimum.
            <strong>Tax:</strong> Severance is taxable. Ask about salary continuation vs. lump sum.
          </div>
        </td></tr>

        ${data.exceptionalCase ? `
        <tr><td style="padding:16px 32px; background:#f5f3ff; border-bottom:1px solid ${COLORS.grey200};">
          <div style="font-size:13px; color:#6d28d9;"><strong>Exceptional circumstances.</strong> Your age, tenure, and seniority may justify exceeding the 24-month cap. Courts have awarded 26-27 months in similar cases.</div>
        </td></tr>` : ''}

        <!-- Comparable Cases -->
        ${casesHtml ? `
        <tr><td style="padding:24px 32px; background:white; border-bottom:1px solid ${COLORS.grey200};">
          <div style="font-size:14px; font-weight:600; color:${COLORS.navy}; margin-bottom:12px;">Comparable Court Decisions</div>
          <table width="100%" cellpadding="0" cellspacing="0">${casesHtml}</table>
        </td></tr>` : ''}

        <!-- CTA: Layoff Kit -->
        <tr><td style="padding:24px 32px; background:${COLORS.blueBg};">
          <div style="font-size:16px; font-weight:700; color:${COLORS.navy};">Get the full severance negotiation playbook.</div>
          <div style="font-size:13px; color:${COLORS.grey500}; margin-top:6px; line-height:1.6;">
            Email scripts, counter-offer templates, employment lawyer directory (30+ firms), tax strategies. 10 complete modules for $67 CAD.
          </div>
          <div style="margin-top:16px;">
            <a href="${SITE_URL}/layoff-survival-kit" style="display:inline-block; background:${COLORS.blue}; color:white; padding:12px 28px; border-radius:8px; font-size:14px; font-weight:600; text-decoration:none;">Get the Layoff Survival Kit &rarr;</a>
          </div>
        </td></tr>

        <!-- CTA: JSIS -->
        <tr><td style="padding:24px 32px; background:white; border-bottom:1px solid ${COLORS.grey200};">
          <div style="font-size:16px; font-weight:700; color:${COLORS.navy};">Need help landing your next role?</div>
          <div style="font-size:13px; color:${COLORS.grey500}; margin-top:6px; line-height:1.6;">
            8-week group coaching program. Done-for-you resume, LinkedIn, outreach templates, and three 1:1 sessions with Izzy.
          </div>
          <div style="margin-top:16px;">
            <a href="${SITE_URL}/programs/jsis" style="display:inline-block; background:${COLORS.navy}; color:white; padding:12px 28px; border-radius:8px; font-size:14px; font-weight:600; text-decoration:none;">Explore the Program &rarr;</a>
          </div>
        </td></tr>

        <!-- CTA: Free Audit -->
        <tr><td style="padding:20px 32px; background:white; text-align:center; border-bottom:1px solid ${COLORS.grey200};">
          <div style="font-size:14px; font-weight:600; color:${COLORS.navy};">Not sure where to start?</div>
          <div style="margin-top:8px;"><a href="${DISCOVERY_CALL_URL}" style="color:${COLORS.blue}; font-size:14px; font-weight:600;">Book a free 20-minute career audit &rarr;</a></div>
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:20px 32px; background:${COLORS.offWhite}; border-radius:0 0 12px 12px;">
          <div style="font-size:11px; color:${COLORS.grey400}; text-align:center; line-height:1.6;">
            This is not legal advice. Educational estimates based on general Canadian employment law precedent. Consult an employment lawyer.<br/>
            Generated by <a href="${SITE_URL}/free-tools/severance-calculator" style="color:${COLORS.blue};">ClearCareer Severance Calculator</a>
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
      return new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    if (!email || !email.includes('@')) {
      return new Response(JSON.stringify({ error: 'Valid email required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    if (RESEND_API_KEY) {
      const resend = new Resend(RESEND_API_KEY);
      const html = buildReportEmail(reportData);
      await resend.emails.send({
        from: `${SENDER.name} <${SENDER.email}>`,
        to: email,
        subject: `Your Severance Estimate — ${reportData.commonLawLow}-${reportData.commonLawHigh} months of reasonable notice`,
        html,
      });
    }

    if (subscribe && BREVO_API_KEY) {
      await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: { 'api-key': BREVO_API_KEY, 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ email, listIds: [SEVERANCE_LIST_ID], updateEnabled: true, attributes: { SOURCE: 'severance-calculator' } }),
      }).catch((err) => console.error('Brevo error:', err));
    }

    return new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    console.error('Send severance report error:', err);
    return new Response(JSON.stringify({ error: 'Failed to send email' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};
