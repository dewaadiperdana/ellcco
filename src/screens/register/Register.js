import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StatusBar,
  ScrollView
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  Container,
  WrapBox,
  Background,
  Button,
  FormGroup,
  FormInput,
  FormLabel,
  Block
} from '../../components';
import { align, text, spacing, colors } from '../../components/styles';

class Register extends Component {
  static navigationOptions = {
    headerLeft: ({ onPress }) => (
      <TouchableWithoutFeedback onPress={() => onPress()}>
        <FontAwesome size={18} color={colors.black} name="arrow-left" />
      </TouchableWithoutFeedback>
    ),
    headerLeftContainerStyle: {
      paddingLeft: 30,
      marginTop: 25,
    },
    headerStyle: {
      borderBottomColor: colors.transparent,
      shadowColor: colors.transparent,
      elevation: 0,
      shadowOpacity: 0,
      backgroundColor: colors.transparent
    }
  };

  gotoLogin = () => {
    this.props.navigation.navigate('Login');
  }

  render() {
    return (
      <Background>
        <StatusBar barStyle="dark-content" hidden={false} backgroundColor={colors.white} translucent={true} />
          <Container verticalCenter>
              <Text style={text.h1}>Daftar</Text>
              <Text style={[text.paragraph, spacing.mb2]}>Silahkan daftar jika belum punya akun</Text>
              <FormGroup>
                <FormLabel text="Nama" />
                <FormInput placeholder="Nama anda" />
              </FormGroup>
              <FormGroup>
                <FormLabel text="Email" />
                <FormInput placeholder="Email anda" />
              </FormGroup>
              <FormGroup>
                <FormLabel text="Alamat Lengkap" />
                <FormInput placeholder="Alamat lengkap anda" />
              </FormGroup>
              <FormGroup>
                <FormLabel text="Password" />
                <FormInput placeholder="Password anda" password />
              </FormGroup>
              <Button fullRound block textLight>Daftar</Button>
            <Block spaceBetween style={spacing.mt2}>
              <Text style={[
                text.paragraph,
                text.medium
              ]}>Sudah punya akun?</Text>
              <Button fullRound green textLight onPress={this.gotoLogin}>Login</Button>
            </Block>
          </Container>
      </Background>
    );
  }
}

export default Register;