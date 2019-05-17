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
  light: { fontFamily: fonts.light },
  bold: { fontFamily: fonts.bold },
  medium: { fontFamily: fonts.medium },
  black: { fontFamily: fonts.black },
  fontExtraLarge: { fontSize: 45 },
  fontLarge: { fontSize: 40 },
  fontMedium: { fontSize: 35 },
  fontSmall: { fontSize: 25 },
  fontRegular: { fontSize: 15 },
  fontExtraSmall: { fontSize: 13 },
  fontSmallest: { fontSize: 11 },
});

export default text;