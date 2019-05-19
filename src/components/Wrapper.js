import React from 'react';
import { View, StyleSheet } from 'react-native';

const Wrapper = props => (
  <View style={styles.wrapper}>
    {props.children}
  </View>
);

export default Wrapper;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    margin: 0,
    padding: 0
  }
});