import chevronDown from '@icons/chevron-down-svgrepo-com.svg';
import chevronUp from '@icons/chevron-up-svgrepo-com.svg';
import checkmark from '@icons/checkmark-svgrepo-com.svg';

export const ICONS = {
  chevronDown: 'chevronDown',
  chevronUp: 'chevronUp',
  checkmark: 'checkmark',
} as const;

export const ICON_SIZES = {
    SMALL: 'SMALL',
    MEDIUM: 'MEDIUM',
    LARGE: 'LARGE',
} as const;

const ICON_SOURCES: Record<IconName, string> = {
  [ICONS.chevronDown]: chevronDown,
  [ICONS.chevronUp]: chevronUp,
  [ICONS.checkmark]: checkmark,
}

const ICON_DEFAULT_SIZES: Record<IconSize, number> = {
  SMALL: 16,
  MEDIUM: 24,
  LARGE: 32,
}

export function getIconSource(iconName: IconName): string {
  const iconSource = ICON_SOURCES[iconName]

  if (!iconSource) {
    throw new Error(`Icono no encontrado: "${iconName}"`)
  }

  return iconSource;
}

export function getIconSize(iconSize: IconSize): number {
  return ICON_DEFAULT_SIZES[iconSize]
}

export type IconName = keyof typeof ICONS;
export type ICON_DICT = (typeof ICONS)[keyof typeof ICONS];
export type IconSize = (typeof ICON_SIZES)[keyof typeof ICON_SIZES];
