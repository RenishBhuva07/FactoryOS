export const CORE_COLORS = {
  PALE_MINT: '#CFE8E1',
  MIDNIGHT_NAVY: '#002941',
  CORAL_ORANGE: '#FD6E6E',
} as const;

export const COLOR_SCALES = {
  navy: {
    50: '#F0F5F9',
    100: '#DFECF3',
    200: '#BDD7E7',
    300: '#8EBED7',
    400: '#579FC3',
    500: '#3381AB',
    600: '#22668C',
    700: '#164E6E',
    800: '#0C3953',
    900: '#002941',
    950: '#001827',
  },
  mint: {
    50: '#F4FAF8',
    100: '#E4F4F0',
    200: '#CFE8E1',
    300: '#A8D7CC',
    400: '#74BFB0',
    500: '#43A392',
    600: '#2D8576',
    700: '#20675C',
    800: '#184E46',
    900: '#103530',
    950: '#0A221F',
  },
  coral: {
    50: '#FFF4F3',
    100: '#FFE6E4',
    200: '#FFD0CC',
    300: '#FFAAA3',
    400: '#FD6E6E',
    500: '#F04646',
    600: '#D62727',
    700: '#AB1B1B',
    800: '#871919',
    900: '#6B1717',
    950: '#420909',
  },
} as const;

export const HERO_COLORS = {
  NAVY: {
    id: 'heroNavy',
    name: 'Midnight Navy Hero',
    stops: {
      light: '#164E6E',
      main: '#0C3953',
      dark: '#002941',
    },
    gradient: 'linear-gradient(135deg, #002941 0%, #0C3953 50%, #164E6E 100%)',
    gradientVertical: 'linear-gradient(180deg, #164E6E 0%, #0C3953 50%, #002941 100%)',
    cssClass: 'bg-gradient-to-br from-[#002941] via-[#0C3953] to-[#164E6E]',
    barClass: 'bg-gradient-to-b from-[#164E6E] via-[#0C3953] to-[#002941]',
    shadow: '0 10px 25px -5px rgba(0, 41, 65, 0.3)',
    text: '#FFFFFF',
  },
  CORAL: {
    id: 'heroCoral',
    name: 'Coral Red Hero',
    stops: {
      light: '#FD6E6E',
      main: '#F04646',
      dark: '#AB1B1B',
    },
    gradient: 'linear-gradient(135deg, #FD6E6E 0%, #F04646 50%, #AB1B1B 100%)',
    gradientVertical: 'linear-gradient(180deg, #FD6E6E 0%, #F04646 50%, #AB1B1B 100%)',
    cssClass: 'bg-gradient-to-br from-[#FD6E6E] via-[#F04646] to-[#AB1B1B]',
    barClass: 'bg-gradient-to-b from-[#FD6E6E] via-[#F04646] to-[#AB1B1B]',
    shadow: '0 10px 25px -5px rgba(253, 110, 110, 0.35)',
    text: '#FFFFFF',
  },
  MINT: {
    id: 'heroMint',
    name: 'Pale Mint Hero',
    stops: {
      light: '#CFE8E1',
      main: '#43A392',
      dark: '#184E46',
    },
    gradient: 'linear-gradient(135deg, #CFE8E1 0%, #43A392 100%)',
    gradientVertical: 'linear-gradient(180deg, #CFE8E1 0%, #74BFB0 50%, #43A392 100%)',
    cssClass: 'bg-gradient-to-br from-[#103530] via-[#184E46] to-[#2D8576]',
    barClass: 'bg-gradient-to-b from-[#CFE8E1] via-[#74BFB0] to-[#43A392]',
    shadow: '0 10px 25px -5px rgba(45, 133, 118, 0.25)',
    text: '#002941',
  },
} as const;

export type HeroColorKey = keyof typeof HERO_COLORS;
export type HeroColorId = (typeof HERO_COLORS)[HeroColorKey]['id'];

export const SEMANTIC_COLORS = {
  canvas: '#F5F7F8',
  surface: '#FFFFFF',
  surfaceSubtle: '#F8FAFA',
  surfaceMint: '#F4FAF8',
  surfaceCoral: '#FFF4F3',
  surfaceDark: '#002941',

  borderSubtle: '#EBF1F5',
  borderLight: '#DFECF3',
  borderMedium: '#CBD6DF',
  borderMint: '#CFE8E1',
  borderCoral: '#FFD0CC',

  textPrimary: '#002941',
  textSecondary: '#566E7F',
  textMuted: '#8DA1AF',
  textInverse: '#FFFFFF',

  primaryActionBg: '#002941',
  primaryActionText: '#FFFFFF',
  secondaryActionBg: '#F0F5F9',
  secondaryActionText: '#002941',
  accentActionBg: '#CFE8E1',
  accentActionText: '#002941',
  coralActionBg: '#FD6E6E',
  coralActionText: '#FFFFFF',

  status: {
    completed: {
      dot: '#2D8576',
      text: '#184E46',
      bg: '#E4F4F0',
      border: '#CFE8E1',
    },
    inProgress: {
      dot: '#002941',
      text: '#002941',
      bg: '#DFECF3',
      border: '#BDD7E7',
    },
    pending: {
      dot: '#FFFFFF',
      text: '#FFFFFF',
      bg: 'bg-gradient-to-r from-[#FD6E6E] via-[#F04646] to-[#AB1B1B]',
      border: 'transparent',
    },
    issue: {
      dot: '#D62727',
      text: '#871919',
      bg: '#FFE6E4',
      border: '#FD6E6E',
    },
  },

  gradients: {
    heroMint: HERO_COLORS.MINT.gradient,
    heroNavy: HERO_COLORS.NAVY.gradient,
    heroCoral: HERO_COLORS.CORAL.gradient,
    heroNavyVertical: HERO_COLORS.NAVY.gradientVertical,
    heroCoralVertical: HERO_COLORS.CORAL.gradientVertical,
    heroMintVertical: HERO_COLORS.MINT.gradientVertical,
    mintToNavy: 'linear-gradient(135deg, #CFE8E1 0%, #002941 100%)',
  },
} as const;

export default {
  CORE_COLORS,
  COLOR_SCALES,
  HERO_COLORS,
  SEMANTIC_COLORS,
};
