import { Theme, ThemeConfig } from '../types';

export const themes: Record<Theme, ThemeConfig> = {
  green: {
    primary: '#10b981',
    secondary: '#059669',
    primaryLight: '#d1fae5',
    primaryDark: '#047857',
  },
  blue: {
    primary: '#3b82f6',
    secondary: '#1d4ed8',
    primaryLight: '#dbeafe',
    primaryDark: '#1e40af',
  },
  purple: {
    primary: '#8b5cf6',
    secondary: '#7c3aed',
    primaryLight: '#e9d5ff',
    primaryDark: '#6d28d9',
  },
  red: {
    primary: '#ef4444',
    secondary: '#dc2626',
    primaryLight: '#fee2e2',
    primaryDark: '#b91c1c',
  },
  orange: {
    primary: '#f59e0b',
    secondary: '#d97706',
    primaryLight: '#fef3c7',
    primaryDark: '#b45309',
  },
};

export const colors = {
  white: '#ffffff',
  black: '#000000',
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
};

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
  '3xl': '64px',
};

export const borderRadius = {
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  '2xl': '20px',
  full: '9999px',
};

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
};

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};
