/**
 * Direction D: "Editorial"
 * Newspaper/newsletter style — clean masthead, personal letter tone, no heavy branding.
 * Inspired by Substack, The Hustle, Morning Brew.
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
  bulletList,
  spacer,
  formatName,
} from '../components.js';
import { COLORS, FONTS, DISCOVERY_CALL_URL } from '../constants.js';

export const buildEmail: BuildEmailFn = (data) => {
  const greeting = data.firstName ? `Hey ${data.firstName},` : 'Hey there,';

  const imageSection = data.image
    ? `<img src="${data.image.url}" alt="${data.image.alt}" width="520" style="width:100%;max-width:520px;border-radius:4px;margin-bottom:24px;" />`
    : '';

  const buttonsSection = data.downloadCta
    ? buttonRow(
        { text: data.primaryCta.text, url: data.primaryCta.url },
        { text: data.downloadCta.text, url: data.downloadCta.url, bgColor: data.downloadCta.variant === 'sheet' ? COLORS.green : COLORS.navy },
      )
    : ctaButton(data.primaryCta.text, data.primaryCta.url, { align: 'left' });

  const extraContent = data.extraContent
    ? `<div style="margin:24px 0 0;">${data.extraContent}</div>`
    : '';

  const discoverySection =
    data.discoveryCall !== false
      ? `<p style="margin:32px 0 0;font-size:14px;color:${COLORS.slate500};text-align:center;">
<a href="${data.discoveryCall?.url || DISCOVERY_CALL_URL}" style="color:${COLORS.blue};text-decoration:none;font-weight:600;">${data.discoveryCall?.text || 'Want to talk through your job search?'} &rarr;</a>
</p>`
      : '';

  const displayName = formatName(data.testimonial.name);

  const cardContent = `
<tr><td>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${COLORS.white};border-radius:0;overflow:hidden;" class="email-card">

<!-- Masthead -->
<tr><td style="padding:40px 48px 0;text-align:center;" class="email-padding">
${wordmark('blue', 160, 'margin:0 auto;')}
</td></tr>
<tr><td style="padding:16px 48px 0;" class="email-padding">
<hr style="margin:0;border:none;border-top:3px double ${COLORS.heading};">
</td></tr>
<tr><td style="padding:8px 48px 0;text-align:center;" class="email-padding">
<p style="margin:0;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${COLORS.grey400};font-family:${FONTS.body};">YOUR RESOURCE IS READY</p>
</td></tr>

<!-- Article Body -->
<tr><td style="padding:32px 48px 0;" class="email-padding">
<h1 style="margin:0 0 24px;color:${COLORS.heading};font-size:28px;font-weight:400;line-height:1.3;font-family:${FONTS.heading};" class="email-heading">${data.productName}</h1>

<p style="margin:0 0 24px;color:${COLORS.grey600};font-size:17px;line-height:1.8;font-family:${FONTS.body};" class="email-text">${greeting} Your copy is ready. I put this together because it's the kind of thing I wish someone had handed me when I was job searching. Hope it helps.</p>

${imageSection}

${buttonsSection}

${extraContent}
</td></tr>

${spacer('32px')}

<!-- Tip as a P.S. -->
<tr><td style="padding:0 48px;" class="email-padding">
<hr style="margin:0 0 24px;border:none;border-top:1px solid ${COLORS.grey200};" class="email-hr">
<p style="margin:0;color:${COLORS.grey600};font-size:15px;line-height:1.7;font-family:${FONTS.body};" class="email-text"><strong style="color:${COLORS.heading};" class="email-heading">P.S.</strong> ${data.quickTip.text}</p>
</td></tr>

${spacer('32px')}

<!-- Upsell as editorial recommendation -->
<tr><td style="padding:0 48px;" class="email-padding">
<hr style="margin:0 0 24px;border:none;border-top:1px solid ${COLORS.grey200};" class="email-hr">
<p style="margin:0 0 4px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${COLORS.grey400};font-family:${FONTS.body};">RECOMMENDED</p>
<h3 style="margin:0 0 8px;color:${COLORS.heading};font-size:20px;font-weight:400;line-height:1.3;font-family:${FONTS.heading};" class="email-heading">${data.upsell.headline}</h3>
<p style="margin:0 0 16px;color:${COLORS.grey600};font-size:15px;line-height:1.7;" class="email-text">${data.upsell.description}</p>
${bulletList(data.upsell.bullets, { fontSize: '15px' })}
${ctaButton(data.upsell.buttonText, data.upsell.buttonUrl, {
  bgColor: COLORS.heading,
  fontSize: '15px',
  padding: '12px 24px',
  borderRadius: '4px',
})}
</td></tr>

${spacer('32px')}

<!-- Testimonial as a callout -->
<tr><td style="padding:0 48px;" class="email-padding">
<hr style="margin:0 0 24px;border:none;border-top:1px solid ${COLORS.grey200};" class="email-hr">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
<tr><td style="padding:0 24px;border-left:3px solid ${COLORS.grey200};">
<p style="margin:0 0 8px;color:${COLORS.heading};font-size:16px;font-style:italic;line-height:1.6;" class="email-heading">&ldquo;${data.testimonial.quote}&rdquo;</p>
<p style="margin:0;color:${COLORS.slate500};font-size:13px;" class="email-text-muted">${displayName} &middot; ${data.testimonial.outcome}</p>
</td></tr>
</table>
</td></tr>

<!-- Sign-off -->
<tr><td style="padding:32px 48px 0;" class="email-padding">
${discoverySection}
<p style="margin:24px 0 0;font-size:15px;color:${COLORS.grey600};line-height:1.6;" class="email-text">
Talk soon,<br>
<strong style="color:${COLORS.heading};">Izzy</strong>
</p>
</td></tr>

<!-- Footer -->
<tr><td style="padding:32px 48px;" class="email-padding">
<hr style="margin:0 0 20px;border:none;border-top:3px double ${COLORS.heading};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
<tr><td style="text-align:center;">
<p style="margin:0 0 4px;color:${COLORS.slate500};font-size:13px;">Izzy Piyale-Sheard | <a href="https://joinclearcareer.com" style="color:${COLORS.blue};text-decoration:none;">ClearCareer</a></p>
<p style="margin:0;color:${COLORS.grey400};font-size:11px;">You're getting this because you downloaded a resource. <a href="${data.unsubscribeUrl || '{{unsubscribe}}'}" style="color:${COLORS.grey400};text-decoration:underline;">Unsubscribe</a></p>
</td></tr>
</table>
</td></tr>

</table>
</td></tr>`;

  return wrapDocument(outerTable(cardContent, COLORS.white), COLORS.white);
};
