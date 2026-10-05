/**
 * Direction F: "Split Hero"
 * Bold blue left sidebar accent running full height. Geometric, asymmetric, distinctive.
 * Inspired by Figma, Loom, modern SaaS onboarding emails.
 */
import type { EmailData, BuildEmailFn } from '../types.js';
import {
  wrapDocument,
  outerTable,
  ctaButton,
  buttonRow,
  testimonialBlock,
  footer,
  wordmark,
  icon,
  bulletList,
  spacer,
  formatName,
} from '../components.js';
import { COLORS, FONTS, DISCOVERY_CALL_URL } from '../constants.js';

export const buildEmail: BuildEmailFn = (data) => {
  const greeting = data.firstName ? `Hi ${data.firstName},` : 'Hi there,';

  const imageSection = data.image
    ? `<img src="${data.image.url}" alt="${data.image.alt}" width="440" style="width:100%;max-width:440px;border-radius:8px;border:1px solid ${COLORS.grey200};margin-bottom:24px;" />`
    : '';

  const buttonsSection = data.downloadCta
    ? buttonRow(
        { text: data.primaryCta.text, url: data.primaryCta.url },
        { text: data.downloadCta.text, url: data.downloadCta.url, bgColor: data.downloadCta.variant === 'sheet' ? COLORS.green : COLORS.navy },
      )
    : ctaButton(data.primaryCta.text, data.primaryCta.url, { borderRadius: '8px' });

  const extraContent = data.extraContent
    ? `<div style="margin:24px 0 0;">${data.extraContent}</div>`
    : '';

  const discoverySection =
    data.discoveryCall !== false
      ? `<tr><td style="padding:24px 0 0;text-align:center;">
<a href="${data.discoveryCall?.url || DISCOVERY_CALL_URL}" style="color:${COLORS.blue};text-decoration:none;font-size:14px;font-weight:600;">${data.discoveryCall?.text || 'Book a free discovery call'} &rarr;</a>
</td></tr>`
      : '';

  const displayName = formatName(data.testimonial.name);

  const cardContent = `
<tr><td>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${COLORS.white};border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);" class="email-card">

<!-- Blue sidebar + content layout -->
<tr>
<!-- Blue sidebar -->
<td width="8" style="background-color:${COLORS.blue};width:8px;" valign="top">&nbsp;</td>

<!-- Main content -->
<td style="padding:0;" valign="top">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">

<!-- Header -->
<tr><td style="padding:32px 36px 0;" class="email-padding">
<table role="presentation" cellpadding="0" cellspacing="0" width="100%">
<tr>
<td valign="middle">
${wordmark('blue', 140)}
</td>
<td align="right" valign="middle">
<p style="margin:0;font-size:11px;letter-spacing:1px;text-transform:uppercase;color:${COLORS.grey400};font-family:${FONTS.body};">RESOURCE DELIVERY</p>
</td>
</tr>
</table>
</td></tr>

<tr><td style="padding:16px 36px 0;" class="email-padding">
<hr style="margin:0;border:none;border-top:1px solid ${COLORS.grey200};" class="email-hr">
</td></tr>

<!-- Hero area with blue accent block -->
<tr><td style="padding:28px 36px 0;" class="email-padding">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${COLORS.blueBg};border-radius:10px;">
<tr><td style="padding:24px 28px;">
<h1 style="margin:0 0 8px;color:${COLORS.heading};font-size:24px;font-weight:400;line-height:1.3;font-family:${FONTS.heading};" class="email-heading">${data.productName}</h1>
${data.subtitle ? `<p style="margin:0;color:${COLORS.slate500};font-size:15px;line-height:1.5;" class="email-text-muted">${data.subtitle}</p>` : ''}
</td></tr>
</table>
</td></tr>

<!-- Body -->
<tr><td style="padding:24px 36px 0;" class="email-padding">
<p style="margin:0 0 24px;color:${COLORS.grey600};font-size:16px;line-height:1.7;" class="email-text">${greeting} Your resource is ready. The link never expires, so come back to it anytime.</p>

${imageSection}

${buttonsSection}

${extraContent}
</td></tr>

${spacer('24px')}

<!-- Quick Tip with blue dot -->
<tr><td style="padding:0 36px;" class="email-padding">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
<tr>
<td width="12" valign="top" style="padding-top:5px;"><div style="width:8px;height:8px;border-radius:4px;background-color:${COLORS.blue};"></div></td>
<td style="padding-left:12px;">
<p style="margin:0 0 2px;color:${COLORS.heading};font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;" class="email-heading">${data.quickTip.label}</p>
<p style="margin:0;color:${COLORS.grey600};font-size:14px;line-height:1.6;" class="email-text">${data.quickTip.text}</p>
</td>
</tr>
</table>
</td></tr>

<!-- Divider -->
<tr><td style="padding:28px 36px 0;" class="email-padding">
<hr style="margin:0;border:none;border-top:1px solid ${COLORS.grey200};" class="email-hr">
</td></tr>

<!-- Upsell -->
<tr><td style="padding:24px 36px 0;" class="email-padding">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${COLORS.grey200};border-radius:10px;border-left:4px solid ${COLORS.blue};" class="email-border">
<tr><td style="padding:20px 24px;">
<h3 style="margin:0 0 8px;color:${COLORS.heading};font-size:18px;font-weight:400;line-height:1.3;font-family:${FONTS.heading};" class="email-heading">${data.upsell.headline}</h3>
<p style="margin:0 0 16px;color:${COLORS.slate500};font-size:14px;line-height:1.6;" class="email-text-muted">${data.upsell.description}</p>
${bulletList(data.upsell.bullets)}
${ctaButton(data.upsell.buttonText, data.upsell.buttonUrl, {
  bgColor: COLORS.navy,
  fontSize: '14px',
  padding: '12px 24px',
})}
</td></tr>
</table>
</td></tr>

<!-- Divider -->
<tr><td style="padding:28px 36px 0;" class="email-padding">
<hr style="margin:0;border:none;border-top:1px solid ${COLORS.grey200};" class="email-hr">
</td></tr>

<!-- Testimonial -->
<tr><td style="padding:20px 36px 0;" class="email-padding">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${COLORS.grey50};border-radius:8px;" class="email-testimonial-bg">
<tr><td style="padding:20px 24px;">
<p style="margin:0 0 8px;color:${COLORS.heading};font-size:15px;font-weight:600;font-style:italic;line-height:1.5;" class="email-heading">&ldquo;${data.testimonial.quote}&rdquo;</p>
<p style="margin:0;color:${COLORS.slate500};font-size:13px;" class="email-text-muted"><strong style="color:${COLORS.heading};" class="email-heading">${displayName}</strong> &middot; ${data.testimonial.outcome}</p>
</td></tr>
</table>
</td></tr>

<!-- Discovery + sign-off -->
<tr><td style="padding:24px 36px;" class="email-padding">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
${discoverySection}
</table>
<p style="margin:20px 0 0;font-size:14px;color:${COLORS.grey500};line-height:1.6;" class="email-text-muted">
Questions? Just reply. I read every one.<br>- Izzy
</p>
</td></tr>

<!-- Footer -->
<tr><td style="padding:0 36px 28px;" class="email-padding">
<hr style="margin:0 0 16px;border:none;border-top:1px solid ${COLORS.grey200};" class="email-hr">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
<tr><td style="text-align:center;">
<p style="margin:0 0 4px;color:${COLORS.slate500};font-size:13px;">Izzy Piyale-Sheard | <a href="https://joinclearcareer.com" style="color:${COLORS.blue};text-decoration:none;">ClearCareer</a></p>
<p style="margin:0;color:${COLORS.grey400};font-size:11px;">You're getting this because you downloaded a resource. <a href="${data.unsubscribeUrl || '{{unsubscribe}}'}" style="color:${COLORS.grey400};text-decoration:underline;">Unsubscribe</a></p>
</td></tr>
</table>
</td></tr>

</table>
</td>
</tr>

</table>
</td></tr>`;

  return wrapDocument(outerTable(cardContent));
};
