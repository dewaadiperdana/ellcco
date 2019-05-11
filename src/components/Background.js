import React from 'react';
import { View, StyleSheet } from 'react-native';

const Background = props => (
  <View style={styles.background}>
    {props.children}
  </View>
);

export default Background;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#f7f7f7'
  }
});