import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { colors, fonts } from "./styles";
import Icon from 'react-native-vector-icons/FontAwesome5';

const Button = props => {
  const buttonBlockStyle = [
    styles.button,
    props.block && styles.buttonBlock,
    props.fullRound && styles.buttonFullRound,
    props.green && styles.buttonGreen,
    props.red && styles.buttonRed,
    props.purple && styles.buttonPurple,
    props.noTopRound && styles.buttonNoTopRound,
    props.half && styles.buttonHalf,
    props.outline && styles.buttonOutline,
    props.themeLight && styles.themeLight,
    'style' in props ? props.style : {}
  ];

  const buttonTextStyle = [
    styles.buttonText,
    props.textDark && styles.buttonTextDark,
    props.textLight && styles.buttonTextLight
  ];

  buttonCircleWithIconBlockStyles = [
    styles.buttonCircleWithIcon,
    props.red && styles.buttonCircleWithIconRed,
    props.green && styles.buttonCircleWithIconGreen,
    props.purple && styles.buttonCircleWithIconPurple,
    'style' in props ? props.style : {}
  ];

  return !props.circleWithIcon ? (
    <TouchableOpacity
      style={buttonBlockStyle}
      onPress={props.onPress}
      activeOpacity={1}
    >
      <Text style={[buttonTextStyle]}>{props.children}</Text>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      style={buttonCircleWithIconBlockStyles}
      onPress={props.onPress}
    >
      <Icon name={props.icon} size={12} color={colors.white} />
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  buttonCircleWithIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary
  },
  buttonCircleWithIconRed: {
    backgroundColor: colors.red
  },
  buttonCircleWithIconGreen: {
    backgroundColor: colors.green
  },
  buttonCircleWithIconPurple: {
    backgroundColor: colors.purple
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    backgroundColor: colors.primary,
    alignSelf: "flex-start",
    borderRadius: 5
  },
  buttonText: {
    textAlign: "center",
    fontFamily: fonts.medium,
    fontSize: 16
  },
  buttonTextLight: { color: colors.white },
  buttonTextDark: { color: colors.black },
  buttonBlock: {
    width: "100%"
  },
  buttonFullRound: {
    borderRadius: 50
  },
  buttonWhite: { backgroundColor: colors.white },
  buttonGreen: { backgroundColor: colors.green },
  buttonRed: { backgroundColor: colors.red },
  buttonPurple: { backgroundColor: colors.purple },
  buttonNoTopRound: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0
  },
  buttonHalf: {
    width: '50%'
  },
  buttonOutline: {
    borderWidth: 1,
    borderColor: colors.black,
    backgroundColor: colors.transparent
  },
  themeLight: {
    borderColor: colors.white
  }
});