import { COLORS, FONTS, SITE_URL, SOCIAL, LOGO } from './constants.js';

/**
 * Wraps email content in a full HTML document with dark mode support,
 * MSO conditionals for Outlook, and responsive meta tags.
 */
export function wrapDocument(bodyContent: string, bgColor = COLORS.offWhite): string {
  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="color-scheme" content="light dark">
<meta name="supported-color-schemes" content="light dark">
<title>ClearCareer</title>
<!--[if mso]>
<noscript>
<xml>
<o:OfficeDocumentSettings>
<o:PixelsPerInch>96</o:PixelsPerInch>
</o:OfficeDocumentSettings>
</xml>
</noscript>
<![endif]-->
<style>
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@400;600;700&display=swap');

  body, table, td, p, a, li { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
  table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
  img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }

  @media (prefers-color-scheme: dark) {
    .email-bg { background-color: ${COLORS.dark.bg} !important; }
    .email-card { background-color: ${COLORS.dark.card} !important; }
    .email-text { color: ${COLORS.dark.text} !important; }
    .email-text-muted { color: ${COLORS.dark.textMuted} !important; }
    .email-heading { color: ${COLORS.dark.text} !important; }
    .email-border { border-color: ${COLORS.dark.border} !important; }
    .email-tip-bg { background-color: #1e2a4a !important; }
    .email-testimonial-bg { background-color: #252540 !important; }
    .email-footer-bg { background-color: #111128 !important; }
    .email-hr { border-top-color: ${COLORS.dark.border} !important; }
  }

  /* Outlook dark mode */
  [data-ogsc] .email-bg { background-color: ${COLORS.dark.bg} !important; }
  [data-ogsc] .email-card { background-color: ${COLORS.dark.card} !important; }
  [data-ogsc] .email-text { color: ${COLORS.dark.text} !important; }
  [data-ogsc] .email-text-muted { color: ${COLORS.dark.textMuted} !important; }
  [data-ogsc] .email-heading { color: ${COLORS.dark.text} !important; }

  @media only screen and (max-width: 480px) {
    .email-container { width: 100% !important; }
    .email-padding { padding-left: 20px !important; padding-right: 20px !important; }
    .email-btn { display: block !important; width: 100% !important; text-align: center !important; box-sizing: border-box !important; }
    .email-stack { display: block !important; width: 100% !important; }
    .email-btn-cell { display: block !important; width: 100% !important; padding-right: 0 !important; padding-bottom: 10px !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background-color:${bgColor};font-family:${FONTS.body};">
${bodyContent}
</body>
</html>`;
}

/**
 * Outer table wrapper that centers content at 600px with MSO fallback.
 */
export function outerTable(innerContent: string, bgColor = COLORS.offWhite): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${bgColor};" class="email-bg">
<tr><td align="center" style="padding:40px 20px;" class="email-padding">
<!--[if mso]><table role="presentation" cellpadding="0" cellspacing="0" width="600" align="center"><tr><td><![endif]-->
<table role="presentation" width="600" cellpadding="0" cellspacing="0" class="email-container" style="max-width:600px;width:100%;">
${innerContent}
</table>
<!--[if mso]></td></tr></table><![endif]-->
</td></tr>
</table>`;
}

/**
 * Primary CTA button using the bulletproof button technique for Outlook.
 */
export function ctaButton(
  text: string,
  url: string,
  options: {
    bgColor?: string;
    textColor?: string;
    fontSize?: string;
    padding?: string;
    borderRadius?: string;
    align?: 'left' | 'center';
    fullWidth?: boolean;
  } = {},
): string {
  const {
    bgColor = COLORS.blue,
    textColor = COLORS.white,
    fontSize = '16px',
    padding = '14px 28px',
    borderRadius = '8px',
    align = 'left',
    fullWidth = false,
  } = options;

  const widthAttr = fullWidth ? 'width="100%"' : '';
  const displayStyle = fullWidth ? 'display:block;' : 'display:inline-block;';
  const textAlignStyle = fullWidth ? 'text-align:center;' : '';

  return `<table role="presentation" cellpadding="0" cellspacing="0" ${widthAttr} ${align === 'center' ? 'align="center"' : ''}>
<tr><td align="${align}" style="border-radius:${borderRadius};background-color:${bgColor};" bgcolor="${bgColor}">
<!--[if mso]><i style="letter-spacing:10px;mso-font-width:-100%;mso-text-raise:20pt">&nbsp;</i><![endif]-->
<a href="${url}" target="_blank" style="${displayStyle}${textAlignStyle}padding:${padding};background-color:${bgColor};color:${textColor};text-decoration:none;border-radius:${borderRadius};font-weight:600;font-size:${fontSize};font-family:${FONTS.body};mso-padding-alt:0;" class="email-btn">${text}</a>
<!--[if mso]><i style="letter-spacing:10px;mso-font-width:-100%">&nbsp;</i><![endif]-->
</td></tr>
</table>`;
}

/**
 * Quick tip / callout box.
 */
export function tipBox(
  label: string,
  text: string,
  options: {
    bgColor?: string;
    borderColor?: string;
    labelColor?: string;
    textColor?: string;
  } = {},
): string {
  const {
    bgColor = COLORS.blueTip,
    borderColor = COLORS.blue,
    labelColor = COLORS.blue,
    textColor = COLORS.heading,
  } = options;

  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${bgColor};border-radius:8px;border-left:4px solid ${borderColor};" class="email-tip-bg">
<tr><td style="padding:16px 20px;">
<p style="margin:0 0 4px;color:${labelColor};font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;">${label}</p>
<p style="margin:0;color:${textColor};font-size:14px;line-height:1.6;" class="email-text">${text}</p>
</td></tr>
</table>`;
}

/**
 * Testimonial block.
 */
export function testimonialBlock(
  quote: string,
  name: string,
  outcome: string,
  options: {
    bgColor?: string;
    borderLeft?: string;
    quoteSize?: string;
    style?: 'card' | 'pull-quote' | 'bordered';
  } = {},
): string {
  const {
    bgColor = COLORS.grey50,
    borderLeft,
    quoteSize = '15px',
    style = 'card',
  } = options;

  const displayName = formatName(name);
  const borderStyle = borderLeft ? `border-left:4px solid ${borderLeft};` : '';

  if (style === 'pull-quote') {
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
<tr><td style="padding:20px 24px;">
<p style="margin:0 0 4px;color:${COLORS.blue};font-size:48px;font-family:Georgia,serif;line-height:1;opacity:0.3;">&ldquo;</p>
<p style="margin:-20px 0 12px;color:${COLORS.heading};font-size:${quoteSize};font-weight:600;font-style:italic;line-height:1.5;" class="email-heading">${quote}</p>
<p style="margin:0;color:${COLORS.slate500};font-size:13px;" class="email-text-muted"><strong style="color:${COLORS.heading};" class="email-heading">${displayName}</strong> &middot; ${outcome}</p>
</td></tr>
</table>`;
  }

  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${bgColor};border-radius:8px;${borderStyle}" class="email-testimonial-bg">
<tr><td style="padding:20px 24px;">
<p style="margin:0 0 8px;color:${COLORS.heading};font-size:${quoteSize};font-weight:600;font-style:italic;line-height:1.5;" class="email-heading">&ldquo;${quote}&rdquo;</p>
<p style="margin:0;color:${COLORS.slate500};font-size:13px;" class="email-text-muted"><strong style="color:${COLORS.heading};" class="email-heading">${displayName}</strong> &middot; ${outcome}</p>
</td></tr>
</table>`;
}

/**
 * Horizontal divider.
 */
export function divider(spacing = '32px', padding = '0 40px'): string {
  return `<tr><td style="padding:${spacing} ${padding.includes(' ') ? padding.split(' ').slice(1).join(' ') : padding} 0;" class="email-padding">
<hr style="margin:0;border:none;border-top:1px solid ${COLORS.grey200};" class="email-hr">
</td></tr>`;
}

/**
 * Discovery call CTA row.
 */
export function discoveryCallRow(text: string, url: string): string {
  return `<tr><td style="padding:28px 40px 0;text-align:center;" class="email-padding">
<p style="margin:0 0 8px;color:${COLORS.heading};font-size:14px;font-weight:600;" class="email-heading">${text}</p>
<p style="margin:0;"><a href="${url}" style="color:${COLORS.blue};text-decoration:none;font-size:14px;font-weight:600;">Book a free discovery call &rarr;</a></p>
</td></tr>`;
}

/**
 * Standard email footer with social links, attribution, and unsubscribe.
 */
export function footer(
  unsubscribeUrl = '{{unsubscribe}}',
  options: {
    bgColor?: string;
    textColor?: string;
    linkColor?: string;
    style?: 'light' | 'dark';
  } = {},
): string {
  const {
    bgColor = COLORS.offWhite,
    textColor = COLORS.slate500,
    linkColor = COLORS.blue,
    style: footerStyle = 'light',
  } = options;

  const isDark = footerStyle === 'dark';
  const bg = isDark ? COLORS.navy : bgColor;
  const text = isDark ? 'rgba(255,255,255,0.6)' : textColor;
  const link = isDark ? 'rgba(255,255,255,0.8)' : linkColor;
  const socialBg = isDark ? 'rgba(255,255,255,0.1)' : COLORS.grey200;
  const socialColor = isDark ? '#ffffff' : COLORS.slate500;

  return `<tr><td style="padding:32px 0 0;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${bg};border-radius:0 0 12px 12px;" class="email-footer-bg">
<tr><td style="padding:28px 40px;text-align:center;" class="email-padding">

<!-- Social Links -->
<table role="presentation" cellpadding="0" cellspacing="0" align="center" style="margin-bottom:16px;">
<tr>
<td style="padding:0 6px;">
<a href="${SOCIAL.linkedin.url}" target="_blank" style="display:inline-block;width:32px;height:32px;background-color:${socialBg};border-radius:6px;text-align:center;line-height:32px;text-decoration:none;" aria-label="LinkedIn">
<img src="https://cdn-icons-png.flaticon.com/512/3536/3536505.png" alt="LinkedIn" width="16" height="16" style="vertical-align:middle;${isDark ? 'filter:brightness(10);' : ''}" />
</a>
</td>
<td style="padding:0 6px;">
<a href="${SOCIAL.youtube.url}" target="_blank" style="display:inline-block;width:32px;height:32px;background-color:${socialBg};border-radius:6px;text-align:center;line-height:32px;text-decoration:none;" aria-label="YouTube">
<img src="https://cdn-icons-png.flaticon.com/512/3670/3670147.png" alt="YouTube" width="16" height="16" style="vertical-align:middle;${isDark ? 'filter:brightness(10);' : ''}" />
</a>
</td>
</tr>
</table>

<p style="margin:0 0 4px;color:${text};font-size:13px;">Izzy Piyale-Sheard | <a href="${SITE_URL}" style="color:${link};text-decoration:none;">ClearCareer</a></p>
<p style="margin:0 0 12px;color:${text};font-size:12px;line-height:1.5;">Helping professionals land jobs they love, faster.</p>
<p style="margin:0;color:${text};font-size:11px;opacity:0.7;">You're getting this because you downloaded a resource or purchased a product. <a href="${unsubscribeUrl}" style="color:${text};text-decoration:underline;">Unsubscribe</a></p>
</td></tr>
</table>
</td></tr>`;
}

/**
 * Wordmark logo (full "ClearCareer" text).
 * @param variant 'blue' for light backgrounds, 'white' for dark/blue backgrounds
 */
export function wordmark(variant: 'blue' | 'white' = 'blue', width = 180, style = ''): string {
  const src = variant === 'white' ? LOGO.wordmarkWhite : LOGO.wordmarkBlue;
  return `<img src="${src}" alt="ClearCareer" width="${width}" height="${Math.round(width * 60 / 400)}" style="display:block;${style}" />`;
}

/**
 * Icon logo (rounded square "C").
 * @param variant 'blue' for light backgrounds, 'white' for dark/blue backgrounds
 */
export function icon(variant: 'blue' | 'white' = 'blue', width = 48, style = ''): string {
  const src = variant === 'white' ? LOGO.iconWhite : LOGO.iconBlue;
  return `<img src="${src}" alt="ClearCareer" width="${width}" height="${width}" style="display:block;${style}" />`;
}

/**
 * Two buttons side by side. Stacks vertically on mobile via email-stack class.
 */
export function buttonRow(
  primary: { text: string; url: string; bgColor?: string },
  secondary: { text: string; url: string; bgColor?: string },
): string {
  const pBg = primary.bgColor || COLORS.blue;
  const sBg = secondary.bgColor || COLORS.navy;
  const btnStyle = (bg: string) =>
    `display:inline-block;padding:14px 28px;background-color:${bg};color:${COLORS.white};text-decoration:none;border-radius:8px;font-weight:600;font-size:16px;font-family:${FONTS.body};mso-padding-alt:0;`;

  return `<table role="presentation" cellpadding="0" cellspacing="0" width="100%"><tr>
<td class="email-btn-cell" style="padding-right:12px;">
<!--[if mso]><i style="letter-spacing:10px;mso-font-width:-100%;mso-text-raise:20pt">&nbsp;</i><![endif]-->
<a href="${primary.url}" target="_blank" style="${btnStyle(pBg)}" class="email-btn">${primary.text}</a>
<!--[if mso]><i style="letter-spacing:10px;mso-font-width:-100%">&nbsp;</i><![endif]-->
</td>
<td class="email-btn-cell">
<!--[if mso]><i style="letter-spacing:10px;mso-font-width:-100%;mso-text-raise:20pt">&nbsp;</i><![endif]-->
<a href="${secondary.url}" target="_blank" style="${btnStyle(sBg)}" class="email-btn">${secondary.text}</a>
<!--[if mso]><i style="letter-spacing:10px;mso-font-width:-100%">&nbsp;</i><![endif]-->
</td>
</tr></table>`;
}

/**
 * Bullet list from array of strings.
 */
export function bulletList(items: string[], options: { color?: string; fontSize?: string } = {}): string {
  const { color = COLORS.grey600, fontSize = '14px' } = options;
  const listItems = items
    .map((item) => `<li style="color:${color};font-size:${fontSize};line-height:1.6;padding:3px 0;" class="email-text">${item}</li>`)
    .join('\n');
  return `<ul style="margin:0 0 20px;padding-left:20px;">\n${listItems}\n</ul>`;
}

/**
 * Spacer row.
 */
export function spacer(height = '24px'): string {
  return `<tr><td style="height:${height};font-size:0;line-height:0;">&nbsp;</td></tr>`;
}

/**
 * Format a full name as "First L." for testimonial privacy.
 * "Blake McDermott" -> "Blake M."
 * "Annie Bell" -> "Annie B."
 */
export function formatName(fullName: string): string {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length < 2) return parts[0];
  return `${parts[0]} ${parts[parts.length - 1][0]}.`;
}
