import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Block } from '../../../components';

import { colors, spacing } from '../../../components/styles';

const NotificationIcon = props => {
  const notificationIndicator = !props.empty ? (
    <View style={styles.notificationIndicator}></View>
  ) : null;

  return (
    <TouchableOpacity onPress={props.onPress}>
      <Block alignMiddle alignCenter column>
        <FontAwesome5 name="bell" size={25} color={colors.black} />
        {notificationIndicator}
      </Block>
    </TouchableOpacity>
  );
};

export default NotificationIcon;

const styles = StyleSheet.create({
  notificationIndicator: {
    width: 10,
    height: 10,
    borderRadius: 50,
    position: 'absolute',
    left: -3,
    bottom: 3,
    backgroundColor: colors.red
  }
});