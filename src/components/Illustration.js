import React from "react";
import { View, ImageBackground } from "react-native";

const Illustration = props => {
  return (
    <View style={{ width: props.width, height: props.height }}>
      <ImageBackground
        style={{ width: props.width, height: props.height }}
        source={props.source}
        resizeMode="cover"
      />
    </View>
  );
};

export default Illustration;
