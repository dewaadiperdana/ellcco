import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Button = props => {
  const buttonBlockStyle = [
    styles.button,
    props.block && styles.buttonBlock,
    props.fullRound && styles.buttonFullRound,
    props.bgWhite && styles.buttonBgWhite
  ];

  const buttonTextStyle = [
    styles.buttonText,
    props.textDark && styles.buttonTextDark,
    props.textLight && styles.buttonTextLight
  ];

  const button = 'linear' in props ? (
    <LinearGradient colors={['#32CCBC', '#19AEDE']} start={{x: 0, y: -1}} end={{x: 1, y: 2}} style={buttonBlockStyle}>
      <TouchableOpacity onPress={props.onPress} activeOpacity={1}>
        <Text style={buttonTextStyle}>
          {props.children}
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  ) : (
    <TouchableOpacity style={buttonBlockStyle} onPress={props.onPress} activeOpacity={1}>
      <Text style={styles.buttonText}>
        {props.children}
      </Text>
    </TouchableOpacity>
  );

  return button;
};

export default Button;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    backgroundColor: '#19AEDE',
    alignSelf: 'flex-start',
    borderRadius: 5
  },
  buttonText: {
    textAlign: 'center',
    fontFamily: 'Rubik-Medium',
    fontSize: 16
  },
  buttonTextLight: { color: 'white' },
  buttonTextDark: { color: '#585858' },
  buttonBlock: {
    width: '100%',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonFullRound: {
    borderRadius: 50
  },
  buttonBgWhite: {
    backgroundColor: 'white'
  }
});