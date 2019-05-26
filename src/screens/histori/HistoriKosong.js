import React, { Component } from "react";
import { Text } from "react-native";
import { Container, Button, Illustration } from "../../components";

import { text, spacing } from "../../components/styles";

const HistoriKosong = props => {
  return (
    <Container centerContent>
      <Illustration
        width={266}
        height={266}
        source={require("../../assets/images/histori.jpg")}
      />
      <Text
        style={[
          text.medium,
          text.fontSmall,
          text.alignCenter,
          spacing.mt4,
          spacing.mb4
        ]}
      >
        Anda Belum Memesan Layanan
      </Text>
      <Button
        fullRound={true}
        block={true}
        green={true}
        textLight={true}
        onPress={props.gotoPesan}
      >
        Pesan Sekarang
      </Button>
    </Container>
  );
};

export default HistoriKosong;
