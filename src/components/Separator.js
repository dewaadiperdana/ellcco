import React from 'react';
import { View, StyleSheet } from 'react-native';

import { colors } from './styles';

const Separator = props => {
  return (
    <View style={styles.separator}></View>
  );
};

export default Separator;

const styles = StyleSheet.create({
  separator: {
    width: '100%',
    height: 1,
    marginVertical: 25,
    backgroundColor: colors.semiLightGrey
  }
});