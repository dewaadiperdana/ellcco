import React, { Component } from 'react';
import { View, Text, StatusBar } from 'react-native';
import { Container, WrapBox, Background, Button } from '../../components';
import { align, text, spacing } from '../../components/styles';
import styles from './styles';

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
      <Background>
        <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#ffffff" translucent={true} />
        <Container centerContent>
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