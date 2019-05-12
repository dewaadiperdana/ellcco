import React from 'react';
import { View, StyleSheet } from 'react-native';

const Container = props => {
  const blockStyles = [
    styles.container,
    props.centerContent && styles.containerCenterContent,
    props.verticalCenter && styles.containerVerticalCenter
  ];

  return (
    <View style={blockStyles}>
      {props.children}
    </View>
  );
};

export default Container;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
    padding: 0,
  },
  containerCenterContent: {
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center', 
  },
  containerVerticalCenter: {
    flex: 1,
    justifyContent: 'center'
  }
});