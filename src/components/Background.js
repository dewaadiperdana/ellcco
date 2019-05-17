import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';

const Background = props => {
  const bgDefault = require('../assets/images/bgdefault.png');
  const bg1 = require('../assets/images/bg1.png');
  const bg2 = require('../assets/images/bg2.png');
  
  let background = null;

  if ('bg1' in props) {
    background = bg1;
  } else if ('bg2' in props) {
    background = bg2;
  } else if ('dashboard' in props) {
    background = require('../assets/images/bg-dashboard.png');
  } else {
    background = bgDefault;
  }

  const BackgroundComponent = ('color' in props) ? (
    <View style={[styles.background, { backgroundColor: props.color }]}>
      {props.children}
    </View>
  ) : (
    <ImageBackground source={background} style={styles.background}>
      {props.children}
    </ImageBackground>
  );

  return BackgroundComponent;
};

export default Background;

const styles = StyleSheet.create({
  background: {
    flex: 1
  }
});