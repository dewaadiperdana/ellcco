import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import { colors } from './styles';

const Card = props => {
  const cardStyles = [
    styles.cardStyle,
    props.contentCenter && styles.cardContentCenter
  ];

  const Card = ('allowClick' in props && props.allowClick === true) ? (
    <TouchableOpacity style={cardStyles} onPress={props.onClick} activeOpacity={0.6}>
      {props.children}
    </TouchableOpacity>
  ) : (
    <View style={cardStyles}>
      {props.children}
    </View>
  );

  return Card;
};

export default Card;

const styles = StyleSheet.create({
  cardStyle: {
    width: '45%',
    margin: 10,
    padding: 20,
    borderRadius: 10,
    backgroundColor: colors.extraLightGrey
  },
  cardContentCenter: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  }
});

