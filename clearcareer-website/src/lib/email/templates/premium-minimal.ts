/**
 * Direction A: "Premium Minimal"
 * Inspired by Stripe, Linear — clean, lots of white space, restrained color.
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
import { COLORS, FONTS, DISCOVERY_CALL_URL } from '../constants.js';

export const buildEmail: BuildEmailFn = (data) => {
  const greeting = data.firstName ? `Hi ${data.firstName},` : 'Hi there,';

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
    : ctaButton(data.primaryCta.text, data.primaryCta.url, { align: 'left' });

  const extraContent = data.extraContent
    ? `<tr><td style="padding:24px 40px 0;" class="email-padding">${data.extraContent}</td></tr>`
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

<!-- Header: Wordmark + accent line -->
<tr><td style="padding:32px 40px 24px;text-align:center;" class="email-padding">
${wordmark('blue', 180, 'margin:0 auto;')}
</td></tr>
<tr><td style="padding:0 40px;" class="email-padding">
<hr style="margin:0;border:none;border-top:2px solid ${COLORS.blue};">
</td></tr>

<!-- Body -->
<tr><td style="padding:40px 40px 0;" class="email-padding">
<h2 style="margin:0 0 8px;color:${COLORS.heading};font-size:26px;font-weight:400;line-height:1.3;font-family:${FONTS.heading};" class="email-heading">Your resource is ready</h2>
<p style="margin:0 0 8px;color:${COLORS.heading};font-size:18px;font-weight:600;line-height:1.4;" class="email-heading">${data.productName}</p>
<p style="margin:0 0 32px;color:${COLORS.slate500};font-size:16px;line-height:1.7;" class="email-text-muted">${greeting} Thanks for grabbing this. Click below to access it right now.</p>

<table role="presentation" cellpadding="0" cellspacing="0" width="100%">
${imageSection}
</table>

${buttonsSection}

<p style="margin:32px 0 0;color:${COLORS.grey400};font-size:13px;line-height:1.6;" class="email-text-muted">The link above will always work. Bookmark it if you want to come back later.</p>
</td></tr>

${spacer('32px')}

<!-- Quick Tip -->
<tr><td style="padding:0 40px;" class="email-padding">
${tipBox(data.quickTip.label, data.quickTip.text, {
  bgColor: COLORS.offWhite,
  borderColor: 'transparent',
  labelColor: COLORS.grey500,
})}
</td></tr>

${extraContent}

<!-- Divider -->
<tr><td style="padding:40px 40px 0;" class="email-padding">
<hr style="margin:0;border:none;border-top:1px solid ${COLORS.grey200};" class="email-hr">
</td></tr>

<!-- Upsell Section -->
<tr><td style="padding:32px 40px 0;" class="email-padding">
<h3 style="margin:0 0 8px;color:${COLORS.heading};font-size:18px;font-weight:600;line-height:1.3;font-family:${FONTS.heading};" class="email-heading">${data.upsell.headline}</h3>
<p style="margin:0 0 16px;color:${COLORS.slate500};font-size:14px;line-height:1.6;" class="email-text-muted">${data.upsell.description}</p>
${bulletList(data.upsell.bullets)}
${ctaButton(data.upsell.buttonText, data.upsell.buttonUrl, {
  bgColor: COLORS.navy,
  fontSize: '14px',
  padding: '12px 24px',
})}
</td></tr>

<!-- Divider -->
<tr><td style="padding:40px 40px 0;" class="email-padding">
<hr style="margin:0;border:none;border-top:1px solid ${COLORS.grey200};" class="email-hr">
</td></tr>

<!-- Testimonial -->
<tr><td style="padding:32px 40px 0;" class="email-padding">
${testimonialBlock(data.testimonial.quote, data.testimonial.name, data.testimonial.outcome, { style: 'pull-quote', quoteSize: '17px' })}
</td></tr>

<!-- Discovery Call -->
${discoverySection}

<!-- Footer -->
${footer(data.unsubscribeUrl, { style: 'light' })}

</table>
</td></tr>`;

  return wrapDocument(outerTable(cardContent));
};
