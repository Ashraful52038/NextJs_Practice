// src/components/pdf-generators/ReactPdfFonts.ts
import { Font } from '@react-pdf/renderer';

export const registerFonts = () => {
  Font.register({
    family: 'Roboto',
    fonts: [
      {
        src: 'https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxP.ttf',
        fontWeight: 'normal',
      },
      {
        src: 'https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmEU9fBBc9.ttf',
        fontWeight: 'bold',
      },
      {
        src: 'https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu72xP.ttf',
        fontWeight: 300,
        fontStyle: 'light',
      },
      {
        src: 'https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu5mxP.ttf',
        fontWeight: 500,
        fontStyle: 'medium',
      },
    ],
  });

  // Fallback fonts
  Font.register({
    family: 'Fallback',
    fonts: [
      { src: 'Helvetica', fontWeight: 'normal' },
      { src: 'Helvetica-Bold', fontWeight: 'bold' },
    ],
  });

  // Emoji support
  Font.registerEmojiSource({
    format: 'png',
    url: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/',
  });
};

// Font family configuration
export const fontConfig = {
  primary: 'Roboto',
  fallback: 'Fallback',
  defaultSize: 12,
  lineHeight: 1.5,
};

// Font utility functions
export const getFontFamily = (weight: 'normal' | 'bold' | 'light' | 'medium' = 'normal') => {
  return `Roboto-${weight}`;
};

export const getFontStyles = (options?: {
  size?: number;
  weight?: 'normal' | 'bold' | 'light' | 'medium';
  color?: string;
}) => {
  return {
    fontFamily: getFontFamily(options?.weight),
    fontSize: options?.size || fontConfig.defaultSize,
    color: options?.color || '#374151',
    lineHeight: fontConfig.lineHeight,
  };
};