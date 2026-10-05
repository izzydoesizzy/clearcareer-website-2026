/**
 * Direction E: "Dark Mode Native"
 * Dark background throughout. Glowing blue accents. Premium and modern.
 * Inspired by Vercel, Raycast, Arc Browser emails.
 */
import type { EmailData, BuildEmailFn } from '../types.js';
import {
  wrapDocument,
  outerTable,
  ctaButton,
  buttonRow,
  footer,
  wordmark,
  bulletList,
  spacer,
  formatName,
} from '../components.js';
import { COLORS, FONTS, DISCOVERY_CALL_URL } from '../constants.js';

const DARK = {
  bg: '#0a0a1a',
  card: '#111128',
  surface: '#1a1a36',
  border: '#2a2a4a',
  text: '#e2e8f0',
  textMuted: '#8892a8',
  accent: '#3b82f6',
};

export const buildEmail: BuildEmailFn = (data) => {
  const greeting = data.firstName ? `Hi ${data.firstName},` : 'Hi there,';

  const imageSection = data.image
    ? `<img src="${data.image.url}" alt="${data.image.alt}" width="520" style="width:100%;max-width:520px;border-radius:8px;border:1px solid ${DARK.border};margin-bottom:24px;" />`
    : '';

  const buttonsSection = data.downloadCta
    ? buttonRow(
        { text: data.primaryCta.text, url: data.primaryCta.url },
        { text: data.downloadCta.text, url: data.downloadCta.url, bgColor: data.downloadCta.variant === 'sheet' ? COLORS.green : '#ffffff' },
      )
    : ctaButton(data.primaryCta.text, data.primaryCta.url, {
        bgColor: COLORS.blue,
        padding: '14px 28px',
        borderRadius: '8px',
      });

  const extraContent = data.extraContent
    ? `<div style="margin:24px 0 0;">${data.extraContent}</div>`
    : '';

  const discoverySection =
    data.discoveryCall !== false
      ? `<tr><td style="padding:28px 40px 0;text-align:center;" class="email-padding">
<p style="margin:0 0 8px;color:${DARK.text};font-size:14px;font-weight:600;">${data.discoveryCall?.text || 'Want to talk through your job search?'}</p>
<p style="margin:0;"><a href="${data.discoveryCall?.url || DISCOVERY_CALL_URL}" style="color:${COLORS.blue};text-decoration:none;font-size:14px;font-weight:600;">Book a free discovery call &rarr;</a></p>
</td></tr>`
      : '';

  const displayName = formatName(data.testimonial.name);

  // Override download button text color for white bg button
  const downloadBtnFix = data.downloadCta
    ? `<style>.email-btn-dark { color: ${DARK.card} !important; }</style>`
    : '';

  const cardContent = `
<tr><td>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${DARK.card};border-radius:12px;overflow:hidden;border:1px solid ${DARK.border};">

<!-- Header -->
<tr><td style="padding:32px 40px 0;text-align:center;" class="email-padding">
${wordmark('white', 160, 'margin:0 auto;')}
</td></tr>

<!-- Glow accent line -->
<tr><td style="padding:20px 40px 0;" class="email-padding">
<hr style="margin:0;border:none;height:2px;background:linear-gradient(90deg, transparent 0%, ${COLORS.blue} 50%, transparent 100%);">
</td></tr>

<!-- Body -->
<tr><td style="padding:32px 40px 0;" class="email-padding">
<h2 style="margin:0 0 8px;color:${DARK.text};font-size:26px;font-weight:400;line-height:1.3;font-family:${FONTS.heading};">${data.productName}</h2>
${data.subtitle ? `<p style="margin:0 0 24px;color:${DARK.textMuted};font-size:15px;line-height:1.5;">${data.subtitle}</p>` : '<div style="height:16px;"></div>'}

<p style="margin:0 0 28px;color:${DARK.textMuted};font-size:16px;line-height:1.7;">${greeting} Your resource is ready. Access it anytime using the link below.</p>

${imageSection}

${buttonsSection}

${extraContent}
</td></tr>

${spacer('24px')}

<!-- Quick Tip -->
<tr><td style="padding:0 40px;" class="email-padding">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${DARK.surface};border-radius:8px;border:1px solid ${DARK.border};">
<tr><td style="padding:16px 20px;">
<p style="margin:0 0 4px;color:${COLORS.blue};font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;">&#9889; ${data.quickTip.label}</p>
<p style="margin:0;color:${DARK.text};font-size:14px;line-height:1.6;">${data.quickTip.text}</p>
</td></tr>
</table>
</td></tr>

<!-- Divider -->
<tr><td style="padding:32px 40px 0;" class="email-padding">
<hr style="margin:0;border:none;border-top:1px solid ${DARK.border};">
</td></tr>

<!-- Upsell -->
<tr><td style="padding:28px 40px 0;" class="email-padding">
<h3 style="margin:0 0 8px;color:${DARK.text};font-size:18px;font-weight:600;line-height:1.3;">${data.upsell.headline}</h3>
<p style="margin:0 0 16px;color:${DARK.textMuted};font-size:14px;line-height:1.6;">${data.upsell.description}</p>

<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:20px;">
${data.upsell.bullets
  .map(
    (bullet) => `<tr>
<td width="24" valign="top" style="padding:4px 0;color:${COLORS.blue};font-size:14px;">&#8226;</td>
<td valign="top" style="padding:4px 0;color:${DARK.textMuted};font-size:14px;line-height:1.6;">${bullet}</td>
</tr>`,
  )
  .join('\n')}
</table>

${ctaButton(data.upsell.buttonText, data.upsell.buttonUrl, {
  bgColor: COLORS.white,
  textColor: DARK.card,
  fontSize: '14px',
  padding: '12px 24px',
})}
</td></tr>

<!-- Divider -->
<tr><td style="padding:28px 40px 0;" class="email-padding">
<hr style="margin:0;border:none;border-top:1px solid ${DARK.border};">
</td></tr>

<!-- Testimonial -->
<tr><td style="padding:24px 40px 0;" class="email-padding">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${DARK.surface};border-radius:8px;border:1px solid ${DARK.border};">
<tr><td style="padding:20px 24px;">
<p style="margin:0 0 8px;color:${DARK.text};font-size:15px;font-style:italic;line-height:1.5;">&ldquo;${data.testimonial.quote}&rdquo;</p>
<p style="margin:0;color:${DARK.textMuted};font-size:13px;"><strong style="color:${DARK.text};">${displayName}</strong> &middot; ${data.testimonial.outcome}</p>
</td></tr>
</table>
</td></tr>

<!-- Discovery Call -->
${discoverySection}

<!-- Sign-off -->
<tr><td style="padding:24px 40px 0;" class="email-padding">
<p style="margin:0;font-size:14px;color:${DARK.textMuted};line-height:1.6;">
Questions? Just reply to this email. I read every one.<br>- Izzy
</p>
</td></tr>

<!-- Footer -->
<tr><td style="padding:32px 40px;" class="email-padding">
<hr style="margin:0 0 20px;border:none;border-top:1px solid ${DARK.border};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
<tr><td style="text-align:center;">
<p style="margin:0 0 4px;color:${DARK.textMuted};font-size:13px;">Izzy Piyale-Sheard | <a href="https://joinclearcareer.com" style="color:${COLORS.blue};text-decoration:none;">ClearCareer</a></p>
<p style="margin:0;color:${DARK.textMuted};font-size:11px;opacity:0.6;">You're getting this because you downloaded a resource or purchased a product. <a href="${data.unsubscribeUrl || '{{unsubscribe}}'}" style="color:${DARK.textMuted};text-decoration:underline;">Unsubscribe</a></p>
</td></tr>
</table>
</td></tr>

</table>
</td></tr>`;

  return wrapDocument(outerTable(cardContent, DARK.bg), DARK.bg);
};
