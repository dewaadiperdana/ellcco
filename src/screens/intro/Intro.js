import React, { Component } from 'react';
import { View, Text, StatusBar } from 'react-native';
import { Container, WrapBox, Background, Button } from '../../components';
import { align, text, spacing } from '../../components/styles';
import styles from './styles';

class Intro extends Component {
  static navigationOptions = {
    header: null
  };

  gotoLogin = () => {
    this.props.navigation.push('Login');
  }

	render() {
    return (
      <Background>
        <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#f7f7f7" translucent={true} />
        <Container centerContent>
          <WrapBox p3 logo>
            <Text style={[text.alignCenter, text.h2]}>Selamat Datang</Text>
            <Text style={[text.alignCenter, text.paragraph, spacing.mb4]}>
              Silahkan Login atau Daftar terlebih dahulu untuk menggunakan aplikasi
            </Text>
            <Button block fullRound linear textLight onPress={this.gotoLogin}>Login</Button>
            <Text style={[
              text.paragraph,
              text.medium,
              text.alignCenter,
              spacing.mb2,
              spacing.mt2
            ]}>Atau</Text>
            <Button block fullRound linear textLight>Daftar</Button>
          </WrapBox>
        </Container>
      </Background>
    );
	}
}

export default Intro;