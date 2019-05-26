import React from "react";
import { View, StyleSheet } from "react-native";

const Background = props => {
  return (
    <View style={[styles.background, { backgroundColor: props.color }]}>
      {props.children}
    </View>
  );
};

export default Background;

const styles = StyleSheet.create({
  background: {
    flex: 1
  }
});
