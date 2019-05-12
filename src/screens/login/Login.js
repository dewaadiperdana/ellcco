import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StatusBar
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome';
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

class Login extends Component {
  static navigationOptions = {
    tabBarVisible: false,
    headerLeft: ({ onPress }) => (
      <TouchableWithoutFeedback onPress={() => onPress()}>
        <FontAwesome5 size={18} color={colors.black} name="arrow-left" />
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
      backgroundColor: colors.transparent,
    }
  };

  gotoRegister = () => {
    this.props.navigation.navigate('Register');
  }

  render() {
    return (
      <Background>
        <StatusBar barStyle="dark-content" hidden={false} backgroundColor={colors.white} translucent={true} />
          <Container verticalCenter>
            <Text style={[text.h1, text.alignLeft]}>Login</Text>
            <Text style={[text.paragraph, text.alignLeft, spacing.mb2]}>
              Silahkan login jika sudah punya akun
            </Text>
            <FormGroup>
              <FormLabel text="Email" />
              <FormInput placeholder="Email anda" />
            </FormGroup>
            <FormGroup>
              <FormLabel text="Password" />
              <FormInput placeholder="Password anda" password />
            </FormGroup>
            <Button block fullRound textLight onPress={() => this.props.navigation.navigate('Dashboard')}>Login</Button>
            <Block spaceBetween style={spacing.mt2}>
              <Text style={[
                spacing.mt2,
                spacing.mb1,
                text.paragraph,
                text.medium
              ]}>Belum punya akun?</Text>
              <Button fullRound textLight green onPress={this.gotoRegister}>Daftar</Button>
            </Block>
          </Container>
      </Background>
    );
  }
}

export default Login;