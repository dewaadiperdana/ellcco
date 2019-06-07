import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import Block from "./Block";
import { colors, text, spacing } from "./styles";
import moment from "moment";

const ChatBubble = props => {
  const ChatComponent = props.own ? (
    <Block alignCenter style={{ marginVertical: 10, alignSelf: "flex-end" }}>
      <Block column style={[styles.chatWrapper, styles.chatWrapperOwn]}>
        <Text style={[text.fontRegular, text.colorLight]}>{props.text}</Text>
        <Text
          style={[text.italic, text.fontSmallest, text.colorLight, spacing.mt1]}
        >
          {moment(props.date).format("LLL")}
        </Text>
      </Block>
      <View style={[styles.triangle, styles.triangleRight]} />
    </Block>
  ) : (
    <Block alignCenter style={{ marginVertical: 10 }}>
      <View style={[styles.triangle, styles.triangleLeft]} />
      <Block column style={styles.chatWrapper}>
        <Text style={text.fontRegular}>{props.text}</Text>
        <Text
          style={[text.italic, text.fontSmallest, text.textMuted, spacing.mt1]}
        >
          {moment(props.date).format("LLL")}
        </Text>
      </Block>
    </Block>
  );

  return ChatComponent;
};

export default ChatBubble;

const { width, height } = Dimensions.get("screen");

const styles = StyleSheet.create({
  chatOwn: {
    alignSelf: "flex-end"
  },
  chatWrapper: {
    width: "50%",
    padding: 10,
    borderRadius: 5,
    backgroundColor: colors.chatMessageGrey
  },
  chatWrapperOwn: {
    backgroundColor: colors.primary
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 7,
    borderRightWidth: 7,
    borderBottomWidth: 14,
    borderLeftColor: "transparent",
    borderRightColor: "transparent"
  },
  triangleLeft: {
    transform: [{ rotate: "-90deg" }],
    borderBottomColor: colors.chatMessageGrey
  },
  triangleRight: {
    transform: [{ rotate: "90deg" }],
    borderBottomColor: colors.primary
  }
});
