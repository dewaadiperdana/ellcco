import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StatusBar
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  Container,
  WrapBox,
  Background,
  Button,
  FormGroup,
  FormInput,
  FormLabel
} from '../../components';
import { align, text, spacing, colors } from '../../components/styles';

class Login extends Component {
  static navigationOptions = {
    headerLeft: ({ onPress }) => (
      <TouchableWithoutFeedback onPress={() => onPress()}>
        <FontAwesome size={18} color="#585858" name="arrow-left" />
      </TouchableWithoutFeedback>
    ),
    headerLeftContainerStyle: {
      paddingLeft: 30,
      marginTop: 25,
    },
    headerStyle: {
      borderBottomColor: 'transparent',
      shadowColor: 'transparent',
      elevation: 0,
      shadowOpacity: 0,
      backgroundColor: colors.appBgColor
    }
  };

  render() {
    return (
      <Background>
        <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#f7f7f7" translucent={true} />
          <Container centerContent>
            <WrapBox p3 logo>
              <Text style={[text.alignCenter, text.h1]}>Login</Text>
              <FormGroup>
                <FormLabel text="Email" />
                <FormInput placeholder="Email anda" />
              </FormGroup>
              <FormGroup>
                <FormLabel text="Password" />
                <FormInput placeholder="Password anda" password />
              </FormGroup>
            </WrapBox>
            <Text style={[
              spacing.mt4,
              spacing.mb1,
              text.paragraph,
              text.medium
            ]}>Belum punya akun?</Text>
            <Button block fullRound bgWhite textDark>Daftar</Button>
          </Container>
      </Background>
    );
  }
}

export default Login;