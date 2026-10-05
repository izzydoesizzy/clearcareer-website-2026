export type { EmailData, TemplateDirection, BuildEmailFn } from './types.js';
export { COLORS, FONTS, SITE_URL, DISCOVERY_CALL_URL, SENDER, SOCIAL, LOGO } from './constants.js';

import { buildEmail as buildPremiumMinimal } from './templates/premium-minimal.js';
import { buildEmail as buildWarmBranded } from './templates/warm-branded.js';
import { buildEmail as buildBoldConversion } from './templates/bold-conversion.js';
import { buildEmail as buildEditorial } from './templates/editorial.js';
import { buildEmail as buildDarkNative } from './templates/dark-native.js';
import { buildEmail as buildSplitHero } from './templates/split-hero.js';
import type { TemplateDirection, BuildEmailFn } from './types.js';

export const templates: Record<TemplateDirection, BuildEmailFn> = {
  'premium-minimal': buildPremiumMinimal,
  'warm-branded': buildWarmBranded,
  'bold-conversion': buildBoldConversion,
  'editorial': buildEditorial,
  'dark-native': buildDarkNative,
  'split-hero': buildSplitHero,
};

export { buildPremiumMinimal, buildWarmBranded, buildBoldConversion, buildEditorial, buildDarkNative, buildSplitHero };
