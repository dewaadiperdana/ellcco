import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const WrapBox = props => {
  const blockStyles = [
    styles.wrap,
    props.p1 && styles.wrapP1,
    props.p2 && styles.wrapP2,
    props.p3 && styles.wrapP3,
    props.p4 && styles.wrapP4,
    props.p5 && styles.wrapP5,
  ];

  const boxLogo = 'logo' in props ? (
    <View style={styles.boxLogo}>
      <Image style={styles.boxLogoImage} source={require('../assets/images/logo@144px.png')} />
    </View>
  ) : null;

  return (
    <View style={blockStyles}>
      {boxLogo}
      {props.children}
    </View>
  );
};

export default WrapBox;

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    padding: 25,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 25,
    backgroundColor: 'white',
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  wrapP1: { padding: 15 },
  wrapP2: { padding: 25 },
  wrapP3: { padding: 35 },
  wrapP4: { padding: 45 },
  wrapP4: { padding: 45 },
  wrapP5: { padding: 55 },
  boxLogo: {
    width: 85,
    height: 85,
    marginTop: -80,
    marginBottom: 25,
    padding: 0,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  boxLogoImage: {
    width: 85,
    height: 85
  }
});