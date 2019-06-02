import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Block from "./Block";
import { colors, text, spacing } from "./styles";

const ChatBubble = props => {
  return (
    <Block alignLeft alignMiddle>
      <View style={[styles.triangle, styles.triangleLeft]} />
      <View style={styles.chatWrapper}>{props.text}</View>
      <Text>{props.date}</Text>
    </Block>
  );
};

export default ChatBubble;

const styles = StyleSheet.create({
  chatWrapper: {
    padding: 20,
    borderRadius: 5
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 50,
    borderRightWidth: 50,
    borderBottomWidth: 100,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "red"
  },
  triangleLeft: {
    transform: [{ rotate: "-90deg" }]
  },
  triangleRight: {
    transform: [{ rotate: "90deg" }]
  }
});
