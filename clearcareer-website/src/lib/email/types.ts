export interface EmailData {
  /** The resource/product name shown in the heading */
  productName: string;
  /** Short description shown below the product name */
  subtitle?: string;
  /** Greeting name — falls back to "there" if not provided */
  firstName?: string;
  /** Primary CTA */
  primaryCta: { text: string; url: string };
  /** Optional secondary download/copy CTA */
  downloadCta?: {
    text: string;
    url: string;
    variant: 'pdf' | 'sheet';
  };
  /** Optional hero image */
  image?: { url: string; alt: string };
  /** Quick tip callout box */
  quickTip: { label: string; text: string };
  /** Secondary upsell section */
  upsell: {
    headline: string;
    description: string;
    bullets: string[];
    buttonText: string;
    buttonUrl: string;
  };
  /** Testimonial / social proof */
  testimonial: { quote: string; name: string; outcome: string };
  /** Discovery call CTA — set to false to hide */
  discoveryCall?: { text: string; url: string } | false;
  /** Unsubscribe URL — Brevo uses {{unsubscribe}}, Resend handles it automatically */
  unsubscribeUrl?: string;
  /** Extra content blocks (e.g., "What's inside" list, "Quick start" steps) */
  extraContent?: string;
}

export type TemplateDirection = 'premium-minimal' | 'warm-branded' | 'bold-conversion' | 'editorial' | 'dark-native' | 'split-hero';

export type BuildEmailFn = (data: EmailData) => string;
