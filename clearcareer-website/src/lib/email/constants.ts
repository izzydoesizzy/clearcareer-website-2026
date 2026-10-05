export const SITE_URL = 'https://joinclearcareer.com';
export const DISCOVERY_CALL_URL = 'https://calendly.com/clearcareer/discovery-call';

// Brand logos — served via GitHub Pages CDN (always available, no deploy needed)
const BRAND_CDN = 'https://izzydoesizzy.github.io/clearcareer-brand/assets/logo';
export const LOGO = {
  wordmarkBlue: `${BRAND_CDN}/clearcareer-wordmark-blue.svg`,
  wordmarkWhite: `${BRAND_CDN}/clearcareer-wordmark-white.svg`,
  iconBlue: `${BRAND_CDN}/clearcareer-icon-blue.svg`,
  iconWhite: `${BRAND_CDN}/clearcareer-icon-white.svg`,
};

export const SOCIAL = {
  linkedin: {
    url: 'https://linkedin.com/in/izzydoesizzy',
    label: 'LinkedIn',
  },
  youtube: {
    url: 'https://www.youtube.com/@joinclearcareer',
    label: 'YouTube',
  },
};

export const COLORS = {
  blue: '#0161EF',
  blueDark: '#0450c8',
  navy: '#030620',
  blueBg: '#EFF5FF',
  blueTip: '#f0f7ff',
  white: '#ffffff',
  offWhite: '#f8fafc',
  grey50: '#fafafa',
  grey100: '#f3f4f6',
  grey200: '#e5e7eb',
  grey400: '#9ca3af',
  grey500: '#6b7280',
  grey600: '#4b5563',
  slate500: '#64748B',
  heading: '#1B2A4A',
  text: '#0f0f0f',
  green: '#059669',
  amber: '#D97706',
  amberBg: '#fffbeb',

  // Dark mode overrides
  dark: {
    bg: '#1a1a2e',
    card: '#2d2d44',
    text: '#e2e8f0',
    textMuted: '#94a3b8',
    border: '#3d3d5c',
  },
};

export const FONTS = {
  heading: "'DM Serif Display', Georgia, 'Times New Roman', serif",
  body: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
};

export const SENDER = {
  name: 'Izzy from ClearCareer',
  email: 'izzy@joinclearcareer.com',
};
