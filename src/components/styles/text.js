import React from 'react';
import { StyleSheet } from 'react-native';

const text = StyleSheet.create({
  alignCenter: {
    textAlign: 'center'
  },
  alignLeft: {
    textAlign: 'left'
  },
  alignRight: {
    textAlign: 'right'
  },
  h1: {
    fontSize: 30,
    fontFamily: 'Rubik-Medium',
    color: '#575757',
    marginBottom: 5
  },
  h2: {
    fontSize: 25,
    fontFamily: 'Rubik-Medium',
    color: '#575757',
    marginBottom: 5
  },
  paragraph: {
    fontSize: 14,
    fontFamily: 'Rubik-Regular'
  },
  bold: { fontFamily: 'Rubik-Bold' },
  medium: { fontFamily: 'Rubik-Medium' },
  black: { fontFamily: 'Rubik-Black' },
});

export default text;