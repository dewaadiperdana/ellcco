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
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.props.onRefresh}
            />
          }
          contentContainerStyle={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Illustration
            width={200}
            height={200}
            source={require("../../assets/images/histori.jpg")}
          />
          <Text
            style={[
              text.fontSemiRegular,
              text.alignCenter,
              text.italic,
              spacing.mt2,
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
