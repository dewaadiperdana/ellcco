import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { colors, fonts } from "./styles";

const Badge = props => {
  const badgeBlockStyles = [
    styles.badgeDefault,
    props.red && styles.bagdeBgRed,
    props.green && styles.bagdeBgGreen
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
    backgroundColor: colors.primary
  },
  bagdeBgRed: {
    backgroundColor: colors.red
  },
  bagdeBgGreen: {
    backgroundColor: colors.green
  },
  badgeTextDefault: {
    fontFamily: fonts.medium,
    fontSize: 11,
    color: colors.white,
    textAlign: "center"
  }
});
