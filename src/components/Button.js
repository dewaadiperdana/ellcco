import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { colors, fonts } from './styles';

const Button = props => {
  const buttonBlockStyle = [
    styles.button,
    props.block && styles.buttonBlock,
    props.fullRound && styles.buttonFullRound,
    props.green && styles.buttonGreen
  ];

  const buttonTextStyle = [
    styles.buttonText,
    props.textDark && styles.buttonTextDark,
    props.textLight && styles.buttonTextLight
  ];

  return (
    <TouchableOpacity style={buttonBlockStyle} onPress={props.onPress} activeOpacity={1}>
      <Text style={[buttonTextStyle]}>
        {props.children}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    backgroundColor: colors.primary,
    alignSelf: 'flex-start',
    borderRadius: 5
  },
  buttonText: {
    textAlign: 'center',
    fontFamily: fonts.medium,
    fontSize: 16
  },
  buttonTextLight: { color: colors.white },
  buttonTextDark: { color: colors.black },
  buttonBlock: {
    width: '100%',
  },
  buttonFullRound: {
    borderRadius: 50
  },
  buttonWhite: { backgroundColor: colors.white },
  buttonGreen: { backgroundColor: colors.green }
});