import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

const FormGroup = props => {
  return (
    <View style={[styles.formGroup]}>
      {props.children}
    </View>
  );
};

export default FormGroup;

const styles = StyleSheet.create({
  formGroup: {
    marginBottom: 25,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'column'
  }
});