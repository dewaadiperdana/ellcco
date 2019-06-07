import React, { Component } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import { spacing, colors, text, fonts } from "./styles";

const FormInput = props => {
  let placeholder = "placeholder" in props ? props.placeholder : null;
  let password = "password" in props ? true : false;

  let blockStyle = [styles.formInput, props.error && styles.formInputError];

  let feedbackBlockStyle = [
    styles.formFeedback,
    styles.formFeedbackRegular,
    props.error && styles.formFeedbackError
  ];

  const feedback =
    "feedback" in props && props.feedback !== null ? (
      <Text style={feedbackBlockStyle}>{props.feedback}</Text>
    ) : null;

  return (
    <View style={styles.formInputWrap}>
      <TextInput
        value={props.value}
        style={blockStyle}
        onChangeText={props.onChangeText}
        placeholder={placeholder}
        placeholderTextColor={
          "error" in props && props.error === true
            ? colors.red
            : colors.verylightgrey
        }
        secureTextEntry={password}
        multiline={
          "multiline" in props && props.multiline === true ? true : false
        }
        numberOfLines={"multiline" in props && props.multiline === true ? 7 : 1}
        textAlignVertical={
          "multiline" in props && props.multiline === true ? "top" : "center"
        }
      />
      {feedback}
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  formInputWrap: {
    width: "100%"
  },
  formInput: {
    alignSelf: "stretch",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: colors.verylightgrey,
    borderRadius: 5,
    backgroundColor: colors.white,
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.black
  },
  formInputError: {
    borderColor: colors.red,
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.red
  },
  formFeedback: {
    marginTop: 5
  },
  formFeedbackRegular: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.lightgrey
  },
  formFeedbackError: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.red
  }
});
