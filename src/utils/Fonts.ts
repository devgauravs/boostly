export const Fonts = {
    // Regular weights
    Thin: 'Poppins-Thin',
    ExtraLight: 'Poppins-ExtraLight',
    Light: 'Poppins-Light',
    Regular: 'Poppins-Regular',
    Medium: 'Poppins-Medium',
    SemiBold: 'Poppins-SemiBold',
    Bold: 'Poppins-Bold',
    ExtraBold: 'Poppins-ExtraBold',
    Black: 'Poppins-Black',
    
    // Italic weights
    ThinItalic: 'Poppins-ThinItalic',
    ExtraLightItalic: 'Poppins-ExtraLightItalic',
    LightItalic: 'Poppins-LightItalic',
    Italic: 'Poppins-Italic',
    MediumItalic: 'Poppins-MediumItalic',
    SemiBoldItalic: 'Poppins-SemiBoldItalic',
    BoldItalic: 'Poppins-BoldItalic',
    ExtraBoldItalic: 'Poppins-ExtraBoldItalic',
    BlackItalic: 'Poppins-BlackItalic',
    
    // Legacy Plus Jakarta Sans (keeping for backward compatibility)
    Medium_PlusJkSans: 'PlusJakartaSans-Medium',
    SemiBold_PlusJkSans: 'PlusJakartaSans-SemiBold',
  }

// Font weight mapping for easier usage
export const FontWeights = {
    100: Fonts.Thin,
    200: Fonts.ExtraLight,
    300: Fonts.Light,
    400: Fonts.Regular,
    500: Fonts.Medium,
    600: Fonts.SemiBold,
    700: Fonts.Bold,
    800: Fonts.ExtraBold,
    900: Fonts.Black,
  }

// Helper function to get font with italic variant
export const getFontFamily = (weight: keyof typeof FontWeights, italic: boolean = false) => {
    const baseFont = FontWeights[weight];
    if (!italic) return baseFont;
    
    const italicMap: Record<string, string> = {
      [Fonts.Thin]: Fonts.ThinItalic,
      [Fonts.ExtraLight]: Fonts.ExtraLightItalic,
      [Fonts.Light]: Fonts.LightItalic,
      [Fonts.Regular]: Fonts.Italic,
      [Fonts.Medium]: Fonts.MediumItalic,
      [Fonts.SemiBold]: Fonts.SemiBoldItalic,
      [Fonts.Bold]: Fonts.BoldItalic,
      [Fonts.ExtraBold]: Fonts.ExtraBoldItalic,
      [Fonts.Black]: Fonts.BlackItalic,
    };
    
    return italicMap[baseFont] || baseFont;
  }
  