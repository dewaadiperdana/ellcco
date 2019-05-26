import React, { Component } from "react";
import { Text } from "react-native";
import { Container, Block, Illustration } from "../../components";

import { text } from "../../components/styles";

const NotifikasiKosong = props => {
  return (
    <Container centerContent>
      <Block column alignCenter>
        <Illustration
          width={189}
          height={189}
          source={require("../../assets/images/notifikasi.jpg")}
        />
        <Text style={[text.fontSmall, text.medium, text.alignCenter]}>
          Anda Belum Memiliki Notifikasi
        </Text>
      </Block>
    </Container>
  );
};

export default NotifikasiKosong;
