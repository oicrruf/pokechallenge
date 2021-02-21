import {DefaultTheme} from 'react-native-paper';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const font = {
  bold: 'Ubuntu-Bold',
  boldItalic: 'Ubuntu-BoldItalic',
  italic: 'Ubuntu-Italic',
  light: 'Ubuntu-Light',
  lightItalic: 'Ubuntu-LightItalic',
  medium: 'Ubuntu-Medium',
  mediumItalic: 'Ubuntu-MediumItalic',
  regular: 'Ubuntu-Regular',
  lg: 18,
  normal: 14,
  small: 11,
};

export const color = {
  white: ['#FFFFFF'],
  black: ['#000000'],
  red: ['#E3350D', '#D32B2B', '#EF5350'],
  yellow: ['#FECA1B', '#E6BC2F'],
  blue: ['#3761A8', '#263238', '#EBF5F0'],
  aqua: ['#30A7D7'],
  green: ['#4DAD5B'],
  orange: ['#EE6B2F'],
  gray: ['#919191', '#313131', '#232323', '#F5F5F5'],
  google: ['#DE5246'],
  facebook: ['#3B5998'],
};

export const theme = {
  ...DefaultTheme,
  roundness: 5,
  colors: {
    ...DefaultTheme.colors,
    primary: color.red[1],
    background: color.white[0],
    accent: color.gray[1],
    text: color.gray[2],
  },
  fonts: {
    ...DefaultTheme.fonts,
    regular: {
      fontFamily: font.regular,
    },
    medium: {
      fontFamily: font.medium,
    },
    light: {
      fontFamily: font.light,
    },
  },
};
