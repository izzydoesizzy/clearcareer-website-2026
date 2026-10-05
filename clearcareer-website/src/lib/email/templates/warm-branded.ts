/**
 * Direction B: "Warm & Branded"
 * Inspired by Notion, Superhuman — personal, warm, card-based, branded footer.
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
  formatName,
} from '../components.js';
import { COLORS, FONTS, DISCOVERY_CALL_URL, LOGO } from '../constants.js';

export const buildEmail: BuildEmailFn = (data) => {
  const greeting = data.firstName ? `Hey ${data.firstName},` : 'Hey there,';

  const imageSection = data.image
    ? `<tr><td style="padding:0 0 24px;">
<img src="${data.image.url}" alt="${data.image.alt}" width="520" style="width:100%;max-width:520px;border-radius:8px;border:1px solid ${COLORS.grey200};" />
</td></tr>`
    : '';

  const buttonsSection = data.downloadCta
    ? buttonRow(
        { text: data.primaryCta.text, url: data.primaryCta.url },
        { text: data.downloadCta.text, url: data.downloadCta.url, bgColor: data.downloadCta.variant === 'sheet' ? COLORS.green : COLORS.navy },
      )
    : ctaButton(data.primaryCta.text, data.primaryCta.url, { borderRadius: '10px', padding: '14px 32px' });

  const extraContent = data.extraContent
    ? `<tr><td style="padding:24px 0 0;">${data.extraContent}</td></tr>`
    : '';

  const discoverySection =
    data.discoveryCall !== false
      ? discoveryCallRow(
          data.discoveryCall?.text || 'Want to talk through your job search?',
          data.discoveryCall?.url || DISCOVERY_CALL_URL,
        )
      : '';

  // Get initials for testimonial avatar + formatted name
  const displayName = formatName(data.testimonial.name);
  const initials = data.testimonial.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const cardContent = `
<!-- Card wrapper -->
<tr><td>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${COLORS.white};border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);" class="email-card">

<!-- Header: Blue gradient with logo + product name -->
<tr><td style="background:linear-gradient(135deg,${COLORS.blue} 0%,${COLORS.blueDark} 100%);padding:36px 40px;text-align:center;" class="email-padding">
<!--[if mso]><v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:600px;"><v:fill type="gradient" color="${COLORS.blue}" color2="${COLORS.blueDark}" angle="135"/><v:textbox style="mso-fit-shape-to-text:true" inset="36px 40px 36px 40px"><![endif]-->
${wordmark('white', 160, 'margin:0 auto 16px;')}
<h1 style="margin:0;color:${COLORS.white};font-size:24px;font-weight:400;line-height:1.3;font-family:${FONTS.heading};">${data.productName}</h1>
${data.subtitle ? `<p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:16px;line-height:1.5;">${data.subtitle}</p>` : ''}
<!--[if mso]></v:textbox></v:rect><![endif]-->
</td></tr>

<!-- Body -->
<tr><td style="padding:32px 40px 0;" class="email-padding">
<p style="margin:0 0 8px;color:${COLORS.heading};font-size:18px;font-weight:600;line-height:1.4;" class="email-heading">${greeting}</p>
<p style="margin:0 0 28px;color:${COLORS.grey600};font-size:16px;line-height:1.7;" class="email-text">Thanks for grabbing <strong style="color:${COLORS.heading};" class="email-heading">${data.productName}</strong>. Here's your access link. It never expires, so bookmark it and come back anytime.</p>

<table role="presentation" cellpadding="0" cellspacing="0" width="100%">
${imageSection}
</table>

${buttonsSection}
</td></tr>

${spacer('28px')}

<!-- Quick Tip Card -->
<tr><td style="padding:0 40px;" class="email-padding">
${tipBox(`\u{1F4A1} ${data.quickTip.label}`, data.quickTip.text)}
</td></tr>

${extraContent ? `<tr><td style="padding:0 40px;" class="email-padding">${extraContent}</td></tr>` : ''}

<!-- Divider -->
<tr><td style="padding:32px 40px 0;" class="email-padding">
<hr style="margin:0;border:none;border-top:1px solid ${COLORS.grey200};" class="email-hr">
</td></tr>

<!-- Upsell Card -->
<tr><td style="padding:28px 40px 0;" class="email-padding">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${COLORS.grey200};border-radius:10px;overflow:hidden;" class="email-border">
<tr><td style="padding:24px;">
<h3 style="margin:0 0 8px;color:${COLORS.heading};font-size:18px;font-weight:400;line-height:1.3;font-family:${FONTS.heading};" class="email-heading">${data.upsell.headline}</h3>
<p style="margin:0 0 16px;color:${COLORS.slate500};font-size:14px;line-height:1.6;" class="email-text-muted">${data.upsell.description}</p>
${bulletList(data.upsell.bullets)}
${ctaButton(data.upsell.buttonText, data.upsell.buttonUrl, {
  bgColor: COLORS.navy,
  fontSize: '14px',
  padding: '12px 24px',
  borderRadius: '10px',
})}
</td></tr>
</table>
</td></tr>

<!-- Divider -->
<tr><td style="padding:28px 40px 0;" class="email-padding">
<hr style="margin:0;border:none;border-top:1px solid ${COLORS.grey200};" class="email-hr">
</td></tr>

<!-- Testimonial Card -->
<tr><td style="padding:24px 40px 0;" class="email-padding">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-left:4px solid ${COLORS.blue};background-color:${COLORS.grey50};border-radius:0 8px 8px 0;" class="email-testimonial-bg">
<tr><td style="padding:20px 24px;">
<table role="presentation" cellpadding="0" cellspacing="0" width="100%">
<tr>
<td width="44" valign="top" style="padding-right:14px;">
<div style="width:40px;height:40px;border-radius:20px;background-color:${COLORS.blue};color:${COLORS.white};font-size:14px;font-weight:700;line-height:40px;text-align:center;font-family:${FONTS.body};">${initials}</div>
</td>
<td valign="top">
<p style="margin:0 0 6px;color:${COLORS.heading};font-size:15px;font-weight:600;font-style:italic;line-height:1.5;" class="email-heading">&ldquo;${data.testimonial.quote}&rdquo;</p>
<p style="margin:0;color:${COLORS.slate500};font-size:13px;" class="email-text-muted"><strong style="color:${COLORS.heading};" class="email-heading">${displayName}</strong> &middot; ${data.testimonial.outcome}</p>
</td>
</tr>
</table>
</td></tr>
</table>
</td></tr>

<!-- Discovery Call -->
${discoverySection}

<!-- Sign-off -->
<tr><td style="padding:24px 40px 0;" class="email-padding">
<p style="margin:0;font-size:14px;color:${COLORS.grey500};line-height:1.6;" class="email-text-muted">
Questions? Just reply to this email. I read every one.<br>- Izzy
</p>
</td></tr>

<!-- Footer -->
${footer(data.unsubscribeUrl, { style: 'dark' })}

</table>
</td></tr>`;

  return wrapDocument(outerTable(cardContent));
};
