import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { colors, fonts } from "./styles";

const Badge = props => {
  const badgeBlockStyles = [
    styles.badgeDefault,
    props.blue && styles.badgeBgBlue,
    props.red && styles.bagdeBgRed
  ];

  return (
    <View style={badgeBlockStyles}>
      <Text style={styles.badgeTextDefault}>{props.children}</Text>
    </View>
  );
};

export default Badge;

const styles = StyleSheet.create({
  badgeDefault: {
    padding: 5,
    borderRadius: 5,
    backgroundColor: colors.green
  },
  bagdeBgRed: {
    backgroundColor: colors.red
  },
  badgeBgBlue: {
    backgroundColor: colors.primary
  },
  badgeTextDefault: {
    fontFamily: fonts.medium,
    fontSize: 11,
    color: colors.white,
    textAlign: "center"
  }
});