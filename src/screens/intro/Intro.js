import React, { Component } from "react";
import { Text, StatusBar } from "react-native";
import { Container, Background, Button, Illustration } from "../../components";
import { text, spacing } from "../../components/styles";

class Intro extends Component {
  static navigationOptions = {
    header: null,
    tabBarVisible: false
  };

  goto = route => {
    this.props.navigation.navigate(route);
  };

  render() {
    return (
      <Background color="white">
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor="#ffffff"
          translucent={true}
        />
        <Container centerContent>
          <Illustration
            width={240}
            height={240}
            source={require("../../assets/images/intro.jpg")}
          />
          <Text style={[text.alignCenter, text.paragraph, spacing.mb4]}>
            Silahkan Login terlebih dahulu untuk menggunakan aplikasi. Jika
            belum punya akun, pendaftaran bisa dilakukan melalui halaman login
            masing-masing
          </Text>
          <Button
            block
            fullRound
            textLight
            onPress={() => this.goto("LoginPelanggan")}
          >
            Masuk Sebagai Pelanggan
          </Button>
          <Text
            style={[
              text.paragraph,
              text.medium,
              text.alignCenter,
              spacing.mb2,
              spacing.mt2
            ]}
          >
            Atau
          </Text>
          <Button
            block
            fullRound
            textLight
            green
            onPress={() => this.goto("LoginTukang")}
          >
            Masuk Sebagai Tukang
          </Button>
        </Container>
      </Background>
    );
  }
}

export default Intro;
