import React from 'react';
import { StyleSheet } from 'react-native';

import { colors } from '../../components/styles';

const styles = StyleSheet.create({
  listHistori: {
    paddingVertical: 20,
    paddingHorizontal: 30
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: colors.extraLightGrey
  }
});

export default styles;