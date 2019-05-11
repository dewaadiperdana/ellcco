import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import { text } from './styles';

const FormLabel = props => {
  return (
    <Text style={[styles.formLabel, text.paragraph]}>
      {props.text}
    </Text>
  );
};

export default FormLabel;

const styles = StyleSheet.create({
  formLabel: {
    marginBottom: 5
  }
});