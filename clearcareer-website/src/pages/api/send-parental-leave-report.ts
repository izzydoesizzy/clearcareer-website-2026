import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { COLORS, FONTS, LOGO, SENDER, SITE_URL, DISCOVERY_CALL_URL } from '../../lib/email/constants.js';

export const prerender = false;

const BREVO_API_KEY = import.meta.env.BREVO_API_KEY;
const RESEND_API_KEY = import.meta.env.RESEND_API_KEY;

const PARENTAL_LEAVE_LIST_ID = 3;

function fmtCAD(n: number) {
  return new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }).format(n);
}

interface PhaseData {
  label: string;
  weeks: number;
  weeklyBenefit: number;
  weeklyTopUp: number;
}

interface ParentData {
  totalWeeks: number;
  totalBenefit: number;
  totalTopUp: number;
  grandTotal: number;
  phases: PhaseData[];
}

interface RecData {
  type: string;
  title: string;
  body: string;
}

interface ReportData {
  leaveType: string;
  isQuebec: boolean;
  qpipPlan: string;
  bpProvince: string;
  opProvince: string;
  bpSalary: number;
  opSalary: number;
  bpTopUp: number;
  opTopUp: number;
  bpResult: ParentData;
  opResult: ParentData;
  familyTotal: number;
  incomeGap: number;
  avgWeekly: number;
  totalWeeks: number;
  leavePeriodWeeks: number;
  sharingBonusTriggered: boolean;
  sharingBonusWeeks: number;
  recommendations: RecData[];
}

function buildReportEmail(data: ReportData): string {
  const planLabel = data.isQuebec
    ? `QPIP ${data.qpipPlan === 'basic' ? 'Basic' : 'Special'} Plan`
    : `EI ${data.leaveType === 'standard' ? 'Standard (12 mo)' : 'Extended (18 mo)'}`;

  const parentSection = (label: string, parent: ParentData, color: string) => {
    const phasesHtml = parent.phases.map(p => `
      <tr>
        <td style="padding:6px 0; font-size:13px; color:${COLORS.grey500}; border-bottom:1px solid ${COLORS.grey200};">
          ${p.label} (${p.weeks} wks)
        </td>
        <td style="padding:6px 0; text-align:right; font-size:13px; color:${COLORS.grey500}; border-bottom:1px solid ${COLORS.grey200};">
          ${fmtCAD(p.weeklyBenefit)}/wk${p.weeklyTopUp > 0 ? ` <span style="color:${COLORS.green};">+${fmtCAD(p.weeklyTopUp)}</span>` : ''}
        </td>
        <td style="padding:6px 0; text-align:right; font-size:13px; font-weight:600; color:${COLORS.navy}; border-bottom:1px solid ${COLORS.grey200};">
          ${fmtCAD(p.weeks * (p.weeklyBenefit + p.weeklyTopUp))}
        </td>
      </tr>
    `).join('');

    return `
      <td width="50%" style="vertical-align:top; padding:16px; background:${COLORS.offWhite}; border-radius:8px; border-left:3px solid ${color};">
        <div style="font-size:11px; font-weight:600; text-transform:uppercase; letter-spacing:0.1em; color:${COLORS.grey500}; margin-bottom:8px;">${label}</div>
        <div style="font-size:24px; font-weight:700; color:${COLORS.navy}; font-family:${FONTS.heading};">${fmtCAD(parent.grandTotal)}</div>
        <div style="font-size:12px; color:${COLORS.grey400}; margin-top:2px;">${parent.totalWeeks} weeks</div>
        ${parent.phases.length > 0 ? `
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:12px;">
            ${phasesHtml}
          </table>
        ` : ''}
      </td>
    `;
  };

  const recsHtml = data.recommendations.map(r => {
    const borderColor = r.type === 'warning' ? COLORS.amber : r.type === 'optimization' ? COLORS.blue : r.type === 'positive' ? COLORS.green : COLORS.navy;
    return `
      <div style="padding:10px 12px; background:${COLORS.offWhite}; border-radius:8px; margin-bottom:6px; border-left:3px solid ${borderColor};">
        <div style="font-size:13px; font-weight:600; color:${COLORS.navy};">${r.title}</div>
        <div style="font-size:12px; color:${COLORS.grey500}; margin-top:2px;">${r.body}</div>
      </div>
    `;
  }).join('');

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
              <td align="right" style="font-size:12px; color:rgba(255,255,255,0.5);">Parental Leave Report</td>
            </tr>
          </table>
        </td></tr>

        <!-- Hero -->
        <tr><td style="padding:40px 32px; background:white; text-align:center; border-bottom:1px solid ${COLORS.grey200};">
          <div style="font-size:12px; font-weight:600; text-transform:uppercase; letter-spacing:0.1em; color:${COLORS.blue}; margin-bottom:8px;">Total Family Benefits</div>
          <div style="font-size:48px; font-weight:700; color:${COLORS.navy}; font-family:${FONTS.heading}; line-height:1;">${fmtCAD(data.familyTotal)}</div>
          <div style="font-size:16px; color:${COLORS.grey500}; margin-top:8px;">${data.totalWeeks} weeks &middot; ${fmtCAD(data.avgWeekly)}/week average</div>
        </td></tr>

        <!-- Plan Badge -->
        <tr><td style="padding:12px 32px; background:${COLORS.blueBg}; border-bottom:1px solid ${COLORS.grey200};">
          <div style="font-size:13px; color:${COLORS.blue};">
            <strong>${planLabel}</strong> &middot; ${data.bpProvince}${data.opSalary > 0 && data.opProvince !== data.bpProvince ? ` / ${data.opProvince}` : ''}
          </div>
        </td></tr>

        <!-- Per-Parent Breakdown -->
        <tr><td style="padding:24px 32px; background:white; border-bottom:1px solid ${COLORS.grey200};">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              ${parentSection('Birthing Parent', data.bpResult, COLORS.blue)}
              <td width="16px"></td>
              ${parentSection('Other Parent', data.opResult, COLORS.navy)}
            </tr>
          </table>
        </td></tr>

        <!-- Income Gap -->
        ${data.incomeGap > 0 ? `
        <tr><td style="padding:16px 32px; background:${COLORS.amberBg}; border-bottom:1px solid ${COLORS.grey200};">
          <div style="font-size:14px; font-weight:600; color:#92400e;">Income Gap: ${fmtCAD(data.incomeGap)}</div>
          <div style="font-size:13px; color:#92400e; margin-top:4px;">
            The difference between your normal family income and leave income over ${data.leavePeriodWeeks} weeks.
          </div>
        </td></tr>
        ` : ''}

        <!-- Sharing Bonus -->
        ${data.sharingBonusTriggered ? `
        <tr><td style="padding:16px 32px; background:#ecfdf5; border-bottom:1px solid ${COLORS.grey200};">
          <div style="font-size:14px; font-weight:600; color:#065f46;">Sharing Bonus: +${data.sharingBonusWeeks} weeks unlocked</div>
          <div style="font-size:13px; color:#065f46; margin-top:4px;">Both parents are taking enough leave to trigger bonus weeks.</div>
        </td></tr>
        ` : ''}

        <!-- Recommendations -->
        ${data.recommendations.length > 0 ? `
        <tr><td style="padding:24px 32px; background:white; border-bottom:1px solid ${COLORS.grey200};">
          <div style="font-size:14px; font-weight:600; color:${COLORS.navy}; margin-bottom:12px;">Recommendations</div>
          ${recsHtml}
        </td></tr>
        ` : ''}

        <!-- CTA: JSIS -->
        <tr><td style="padding:24px 32px; background:${COLORS.blueBg};">
          <div style="font-size:16px; font-weight:700; color:${COLORS.navy};">Navigating a career transition?</div>
          <div style="font-size:13px; color:${COLORS.grey500}; margin-top:6px; line-height:1.6;">
            8-week group coaching program. Done-for-you resume, LinkedIn, outreach templates, and three 1:1 sessions with Izzy.
          </div>
          <div style="margin-top:16px;">
            <a href="${SITE_URL}/programs/jsis" style="display:inline-block; background:${COLORS.blue}; color:white; padding:12px 28px; border-radius:8px; font-size:14px; font-weight:600; text-decoration:none;">Explore the Program &rarr;</a>
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
            Estimates only. Actual benefits depend on insurable earnings, hours worked, and individual circumstances.<br/>
            Generated by <a href="${SITE_URL}/free-tools/parental-leave-calculator" style="color:${COLORS.blue};">ClearCareer Parental Leave Calculator</a>
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
        subject: `Your Parental Leave Estimate — ${fmtCAD(reportData.familyTotal)} over ${reportData.totalWeeks} weeks`,
        html,
      });
    }

    if (subscribe && BREVO_API_KEY) {
      await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: { 'api-key': BREVO_API_KEY, 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ email, listIds: [PARENTAL_LEAVE_LIST_ID], updateEnabled: true, attributes: { SOURCE: 'parental-leave-calculator' } }),
      }).catch((err) => console.error('Brevo error:', err));
    }

    return new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    console.error('Send parental leave report error:', err);
    return new Response(JSON.stringify({ error: 'Failed to send email' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};
