import React from 'react';
import { StyleSheet } from 'react-native';
import fonts from './fonts';
import colors from './colors';

const text = StyleSheet.create({
  alignCenter: { textAlign: 'center' },
  alignLeft: { textAlign: 'left' },
  alignRight: { textAlign: 'right' },
  h1: {
    fontSize: 30,
    fontFamily: fonts.medium,
    color: colors.black,
    marginBottom: 5
  },
  h2: {
    fontSize: 25,
    fontFamily: fonts.medium,
    color: colors.black,
    marginBottom: 5
  },
  paragraph: {
    fontSize: 14,
    fontFamily: fonts.regular
  },
  regular: { fontFamily: fonts.regular, color: colors.black },
  light: { fontFamily: fonts.light, color: colors.black },
  bold: { fontFamily: fonts.bold, color: colors.black },
  medium: { fontFamily: fonts.medium, color: colors.black },
  black: { fontFamily: fonts.black, color: colors.black },
  fontExtraLarge: { fontSize: 45, color: colors.black },
  fontLarge: { fontSize: 40, color: colors.black },
  fontMedium: { fontSize: 35, color: colors.black },
  fontSmall: { fontSize: 25, color: colors.black },
  fontRegular: { fontSize: 15, color: colors.black },
  fontSemiRegular: { fontSize: 18, color: colors.black },
  fontExtraSmall: { fontSize: 13, color: colors.black },
  fontSmallest: { fontSize: 11, color: colors.black },
});

export default text;