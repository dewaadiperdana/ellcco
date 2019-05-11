import React, { Component } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { spacing, text } from './styles';

const FormInput = props => {
  let placeholder = 'placeholder' in props ? props.placeholder : null;
  let password = 'password' in props ? true : false;

  return (
    <View style={styles.formInputWrap}>
      <TextInput
        style={[styles.formInput, text.paragraph]}
        onChangeText={props.onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#C9C9C9"
        secureTextEntry={password} />
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  formInputWrap: {
    alignItems: 'stretch',
    flexDirection: 'row'
  },
  formInput: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 5,
  }
});