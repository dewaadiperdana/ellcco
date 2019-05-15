import React from 'react';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator
} from 'react-native-indicators';
import { View, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const Spinner = props => {
  let spinners = {
    ball: () => <BallIndicator size={props.size} color={props.color} />,
    bar: () => <BarIndicator size={props.size} color={props.color} />,
    dot: () => <DotIndicator size={props.size} color={props.color} />,
    material: () => <MaterialIndicator size={props.size} color={props.color} />,
    pacman: () => <PacmanIndicator size={props.size} color={props.color} />,
    pulse: () => <PulseIndicator size={props.size} color={props.color} />,
    skype: () => <SkypeIndicator size={props.size} color={props.color} />,
    uiActivity: () => <UIActivityIndicator size={props.size} color={props.color} />,
    wave: () => <WaveIndicator size={props.size} color={props.color} />,
    ball: () => <BallIndicator size={props.size} color={props.color} />,
  };

  let SpinnerComponent = spinners[props.type];

  return props.isVisible === true ? (
    <View style={styles.spinner}>
      <SpinnerComponent />
    </View>
  ) : null;
};

export default Spinner;

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    height: height,
    width: width,
    position: 'absolute',
    zIndex: 2,
    marginLeft: -30
  }
});