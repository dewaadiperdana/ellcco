import React, { Component } from 'react';
import {
  Text,
  TouchableWithoutFeedback,
  StatusBar
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome';
import {
  Container,
  Background,
  Button,
  FormGroup,
  FormInput,
  FormLabel,
  Block,
  Spinner,
  AlertError
} from '../../components';
import { text, spacing, colors } from '../../components/styles';
import PenggunaService from '../../services/PenggunaService';
import FormError from '../../helpers/FormError';
import AsyncStorage from '@react-native-community/async-storage';

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

  constructor(props) {
    super(props);

    this.state = {
      spinner: false,
      form: {
        email: '',
        password: ''
      },
      errors: new FormError({})
    };
  }

  gotoRegister = () => {
    this.props.navigation.navigate('Register');
  }

  processLogin = async () => {
    this.setState({ spinner: true });

    try {
      const response = await PenggunaService.login(this.state.form);
      this.setState({ spinner: false });

      await AsyncStorage.setItem('auth', response);

      this.props.navigation.navigate('Dashboard');
    } catch (error) {
      this.setState({ spinner: false, errors: new FormError(error) });
    }
  }

  handleChangeText = (field, text) => {
    this.setState({
      form: {
        ...this.state.form,
        [field]: text
      }
    });
  }

  render() {
    const { errors } = this.state;

    return (
      <Background>
        <StatusBar barStyle="dark-content" hidden={false} backgroundColor={colors.white} translucent={true} />
          <Container verticalCenter>
            <AlertError
              text={errors.get('modal')}
              isVisible={errors.has('modal')}
              onOkPress={() => this.setState({ errors: new FormError({})})} />
            <Spinner isVisible={this.state.spinner} type="bar" color="white" />
            <Text style={[text.h1, text.alignLeft]}>Login</Text>
            <Text style={[text.paragraph, text.alignLeft, spacing.mb2]}>
              Silahkan login jika sudah punya akun
            </Text>
            <FormGroup>
              <FormLabel text="Email" />
              <FormInput
                error={errors.has('email')}
                feedback={errors.get('email')}
                placeholder="Email anda"
                onChangeText={text => this.handleChangeText('email', text)}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel text="Password" />
              <FormInput
                error={errors.has('password')}
                feedback={errors.get('password')}
                placeholder="Password anda"
                password
                onChangeText={text => this.handleChangeText('password', text)}
              />
            </FormGroup>
            <Button block fullRound textLight onPress={this.processLogin}>Login</Button>
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