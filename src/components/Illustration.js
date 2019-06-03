import React from "react";
import { View, ImageBackground } from "react-native";

const Illustration = props => {
  return (
    <View style={[
      { width: props.width, height: props.height },
      'style' in props ? props.style : {}
    ]}>
      <ImageBackground
        style={{ width: props.width, height: props.height }}
        source={props.source}
        resizeMode="cover"
      />
    </View>
  );
};

export default Illustration;