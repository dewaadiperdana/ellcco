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
  bold: { fontFamily: fonts.bold },
  medium: { fontFamily: fonts.medium },
  black: { fontFamily: fonts.black },
});

export default text;