import React from "react";
import { Text } from "react-native";
import { Block, Illustration, Container } from "../../../components";
import { text, spacing, colors } from "../../../components/styles";

const ListPerbaikanTukangKosong = props => {
  return (
    <Block column alignCenter>
      <Illustration
        width={300}
        height={275}
        source={require("../../../assets/images/histori.jpg")}
      />
      <Text
        style={[
          text.alignCenter,
          text.fontSemiRegular,
          text.medium,
          spacing.mt2
        ]}
      >
        Anda sedang tidak
      </Text>
      <Text style={[text.alignCenter, text.medium, text.fontSemiRegular]}>
        melakukan pelayanan perbaikan
      </Text>
    </Block>
  );
};

export default ListPerbaikanTukangKosong;
