import React, { Component } from "react";
import { Text, ScrollView, RefreshControl } from "react-native";
import { Container, Button, Illustration } from "../../components";

import { text, spacing } from "../../components/styles";

class HistoriKosong extends Component {
  state = {
    refreshing: false
  };

  render() {
    return (
      <Container centerContent>
        <ScrollView
          refreshing={this.state.refreshing}
          onRefresh={this.props.onRefresh}
        >
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
            {this.props.role === "pelanggan"
              ? "Anda belum memesan layanan"
              : "Anda belum menerima pesanan"}
          </Text>
          {this.props.role === "pelanggan" ? (
            <Button
              fullRound={true}
              block={true}
              green={true}
              textLight={true}
              onPress={this.props.gotoPesan}
            >
              Pesan Sekarang
            </Button>
          ) : null}
        </ScrollView>
      </Container>
    );
  }
}

export default HistoriKosong;
