/**
 * Direction C: "Bold & Conversion-Focused"
 * Inspired by ConvertKit, high-conversion landing pages — bold, direct, aggressive CTAs.
 */
import type { EmailData, BuildEmailFn } from '../types.js';
import {
  wrapDocument,
  outerTable,
  ctaButton,
  buttonRow,
  tipBox,
  testimonialBlock,
  footer,
  wordmark,
  icon,
  bulletList,
  spacer,
  discoveryCallRow,
} from '../components.js';
import { COLORS, FONTS, DISCOVERY_CALL_URL, LOGO } from '../constants.js';

export const buildEmail: BuildEmailFn = (data) => {
  const greeting = data.firstName ? `Hi ${data.firstName},` : 'Hi there,';

  const imageSection = data.image
    ? `<tr><td style="padding:0 0 20px;">
<img src="${data.image.url}" alt="${data.image.alt}" width="520" style="width:100%;max-width:520px;border-radius:8px;border:1px solid ${COLORS.grey200};" />
</td></tr>`
    : '';

  const downloadButton = data.downloadCta
    ? buttonRow(
        { text: data.primaryCta.text, url: data.primaryCta.url },
        { text: data.downloadCta.text, url: data.downloadCta.url, bgColor: data.downloadCta.variant === 'sheet' ? COLORS.green : COLORS.navy },
      )
    : '';

  const extraContent = data.extraContent
    ? `<tr><td style="padding:20px 0 0;">${data.extraContent}</td></tr>`
    : '';

  const discoverySection =
    data.discoveryCall !== false
      ? discoveryCallRow(
          data.discoveryCall?.text || 'Want to talk through your job search?',
          data.discoveryCall?.url || DISCOVERY_CALL_URL,
        )
      : '';

  const cardContent = `
<!-- Card wrapper -->
<tr><td>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${COLORS.white};border-radius:12px;overflow:hidden;" class="email-card">

<!-- Hero Banner -->
<tr><td style="background-color:${COLORS.blue};padding:48px 40px;text-align:center;" class="email-padding">
<!--[if mso]><v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:600px;"><v:fill type="tile" color="${COLORS.blue}"/><v:textbox style="mso-fit-shape-to-text:true" inset="48px 40px 48px 40px"><![endif]-->
<h2 style="margin:0 0 20px;color:${COLORS.white};font-size:18px;font-weight:700;letter-spacing:1.5px;font-family:${FONTS.body};">CLEARCAREER</h2>
<h1 style="margin:0 0 8px;color:${COLORS.white};font-size:28px;font-weight:700;line-height:1.2;font-family:${FONTS.heading};">${data.productName}</h1>
${data.subtitle ? `<p style="margin:0 0 24px;color:rgba(255,255,255,0.8);font-size:16px;line-height:1.5;">${data.subtitle}</p>` : `<div style="height:24px;"></div>`}
${ctaButton(data.primaryCta.text, data.primaryCta.url, {
  bgColor: COLORS.white,
  textColor: COLORS.blue,
  fontSize: '16px',
  padding: '16px 36px',
  borderRadius: '10px',
  align: 'center',
})}
<!--[if mso]></v:textbox></v:rect><![endif]-->
</td></tr>

<!-- Body -->
<tr><td style="padding:32px 40px 0;" class="email-padding">
<p style="margin:0 0 24px;color:${COLORS.grey600};font-size:16px;line-height:1.7;" class="email-text">${greeting} Your resource is ready. Click the button above or the link below to access it anytime.</p>

<table role="presentation" cellpadding="0" cellspacing="0" width="100%">
${imageSection}
</table>
${downloadButton}
</td></tr>

${extraContent ? `<tr><td style="padding:0 40px;" class="email-padding">${extraContent}</td></tr>` : ''}

${spacer('24px')}

<!-- Quick Tip — amber accent for bold pop -->
<tr><td style="padding:0 40px;" class="email-padding">
${tipBox(data.quickTip.label, data.quickTip.text, {
  bgColor: COLORS.amberBg,
  borderColor: COLORS.amber,
  labelColor: COLORS.amber,
})}
</td></tr>

<!-- Divider -->
<tr><td style="padding:32px 40px 0;" class="email-padding">
<hr style="margin:0;border:none;border-top:1px solid ${COLORS.grey200};" class="email-hr">
</td></tr>

<!-- Upsell Section — bold treatment -->
<tr><td style="padding:28px 40px 0;" class="email-padding">
<h3 style="margin:0 0 8px;color:${COLORS.heading};font-size:20px;font-weight:700;line-height:1.3;" class="email-heading">${data.upsell.headline}</h3>
<p style="margin:0 0 16px;color:${COLORS.slate500};font-size:14px;line-height:1.6;" class="email-text-muted">${data.upsell.description}</p>

<!-- Checkmark bullets -->
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:20px;">
${data.upsell.bullets
  .map(
    (bullet) => `<tr>
<td width="28" valign="top" style="padding:4px 0;color:${COLORS.green};font-size:16px;">&#10003;</td>
<td valign="top" style="padding:4px 0;color:${COLORS.grey600};font-size:14px;line-height:1.6;" class="email-text">${bullet}</td>
</tr>`,
  )
  .join('\n')}
</table>

${ctaButton(data.upsell.buttonText, data.upsell.buttonUrl, {
  bgColor: COLORS.navy,
  fontSize: '15px',
  padding: '14px 28px',
  borderRadius: '10px',
  fullWidth: true,
})}
</td></tr>

<!-- Divider -->
<tr><td style="padding:28px 40px 0;" class="email-padding">
<hr style="margin:0;border:none;border-top:1px solid ${COLORS.grey200};" class="email-hr">
</td></tr>

<!-- Social Proof Section -->
<tr><td style="padding:24px 40px 0;" class="email-padding">
<!-- Stats bar -->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${COLORS.blueBg};border-radius:8px;margin-bottom:20px;" class="email-tip-bg">
<tr><td style="padding:16px 24px;text-align:center;">
<p style="margin:0;color:${COLORS.blue};font-size:14px;font-weight:700;">Trusted by 500+ Canadian professionals in their job search</p>
</td></tr>
</table>

${testimonialBlock(data.testimonial.quote, data.testimonial.name, data.testimonial.outcome, {
  bgColor: COLORS.grey50,
  quoteSize: '16px',
})}
</td></tr>

<!-- Discovery Call -->
${discoverySection}

<!-- Footer -->
${footer(data.unsubscribeUrl, { style: 'light' })}

</table>
</td></tr>`;

  return wrapDocument(outerTable(cardContent));
};
