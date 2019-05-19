import React, { Component } from 'react';
import { Text, StatusBar, Image } from 'react-native';
import { Container, Background, Button } from '../../components';
import { text, spacing } from '../../components/styles';

class Intro extends Component {
  static navigationOptions = {
    header: null,
    tabBarVisible: false,
  };

  goto = (route) => {
    this.props.navigation.navigate(route);
  }

	render() {
    return (
      <Background color="white">
        <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#ffffff" translucent={true} />
        <Container centerContent>
          <Image source={require('../../assets/images/intro@240x240.jpg')} width={240} height={240} />
          <Text style={[text.alignCenter, text.h2]}>Selamat Datang</Text>
          <Text style={[text.alignCenter, text.paragraph, spacing.mb4]}>
            Silahkan Login atau Daftar terlebih dahulu untuk menggunakan aplikasi
          </Text>
          <Button block fullRound textLight onPress={() => this.goto('Login')}>Login</Button>
          <Text style={[
            text.paragraph,
            text.medium,
            text.alignCenter,
            spacing.mb2,
            spacing.mt2
          ]}>Atau</Text>
          <Button block fullRound textLight green onPress={() => this.goto('Register')}>Daftar</Button>
        </Container>
      </Background>
    );
	}
}

export default Intro;