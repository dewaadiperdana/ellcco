import React, { Component } from 'react';
import {
  Text,
  TouchableWithoutFeedback,
  StatusBar,
  ScrollView,
  StyleSheet
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import RNPickerSelect from 'react-native-picker-select';
import {
  Container,
  Background,
  Button,
  FormGroup,
  FormInput,
  FormLabel,
  Block,
  Spinner
} from '../../components';
import PenggunaService from '../../services/PenggunaService';
import { text, spacing, colors, fonts } from '../../components/styles';
import FormError from '../../helpers/FormError';

class Register extends Component {
  static navigationOptions = {
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
      borderBottomColor: colors.transparent,
      shadowColor: colors.transparent,
      elevation: 0,
      shadowOpacity: 0,
      backgroundColor: colors.transparent
    }
  };

  constructor(props) {
    super(props);

    this.state = {
      spinner: false,
      hakAkses: [],
      form: {
        id_hak_akses: '',
        nama: '',
        email: '',
        alamat: '',
        no_telp: '',
        password: ''
      },
      errors: new FormError({})
    };
  }

  componentDidMount() {
    this.getHakAkses();
  }

  getHakAkses = async () => {
    this.setState({ spinner: true });

    try {
      const hakAkses = await PenggunaService.getHakAkses();
      const data = hakAkses.map(item => {
        return {
          label: item.nama,
          value: item.id
        };
      });
      
      this.setState({ hakAkses: data, spinner: false });
    } catch (error) {
      this.setState({ spinner: false });
      throw error;
    }
  }

  gotoLogin = () => {
    this.props.navigation.navigate('Login');
  }

  handleChangeText = (field, value) => {
    this.setState({
      form: {
        ...this.state.form,
        [field]: value
      }
    });
  }

  processRegister = async () => {
    this.setState({ spinner: true });

    try {
      await PenggunaService.register(this.state.form);
      this.props.navigation.navigate('Login');
    } catch (error) {
      this.setState({
        errors: new FormError(error),
        spinner: false
      });
    }
  }

  render() {
    const placeholder = {
      label: 'Pilih hak akses',
      value: null,
      color: colors.black,
    };

    const { errors } = this.state;

    const hakAksesError = errors.has('id_hak_akses') ? (
      <Text style={{
        fontFamily: fonts.regular,
        fontSize: 12,
        color: colors.red
      }}>{errors.get('id_hak_akses')}</Text>
    ) : null;

    return (
      <Background>
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor={colors.white}
          translucent={true} />
        <Container verticalCenter>
          <Spinner isVisible={this.state.spinner} type="bar" color="white" />
          <ScrollView>
            <Text style={text.h1}>Daftar</Text>
            <Text style={[text.paragraph, spacing.mb2]}>Silahkan daftar jika belum punya akun</Text>
            <FormGroup>
              <FormLabel text="Nama" />
              <FormInput
                error={this.state.errors.has('nama')}
                feedback={this.state.errors.get('nama')}
                placeholder="Nama anda"
                onChangeText={text => this.handleChangeText('nama', text)} />
            </FormGroup>
            <FormGroup>
              <FormLabel text="Email" />
              <FormInput
                error={this.state.errors.has('email')}
                feedback={this.state.errors.get('email')}
                placeholder="Email anda"
                onChangeText={text => this.handleChangeText('email', text)} />
            </FormGroup>
            <FormGroup>
              <FormLabel text="Alamat Lengkap" />
              <FormInput
                error={this.state.errors.has('alamat')}
                feedback={this.state.errors.get('alamat')}
                placeholder="Alamat lengkap anda"
                onChangeText={text => this.handleChangeText('alamat', text)} />
            </FormGroup>
            <FormGroup>
              <FormLabel text="No. Telp" />
              <FormInput
                error={this.state.errors.has('no_telp')}
                feedback={this.state.errors.get('no_telp')}
                placeholder="No. telp anda"
                onChangeText={text => this.handleChangeText('no_telp', text)} />
            </FormGroup>
            <FormGroup>
              <FormLabel text="Password" />
              <FormInput
                error={this.state.errors.has('password')}
                feedback={this.state.errors.get('password')}
                placeholder="Password anda"
                onChangeText={text => this.handleChangeText('password', text)}
                password />
            </FormGroup>
            <FormGroup>
              <FormLabel text="Daftar Sebagai" />
              <RNPickerSelect
                placeholder={placeholder}
                items={this.state.hakAkses}
                onValueChange={value => {
                  this.setState({
                    form: {
                      ...this.state.form,
                      id_hak_akses: value
                    },
                  });
                }}
                style={{
                  ...pickerSelectStyles,
                  iconContainer: {
                    top: 5,
                    right: 12,
                  },
                }}
                value={this.state.form.id_hak_akses}
                useNativeAndroidPickerStyle={false}
                textInputProps={{ underlineColor: colors.primary }}
                Icon={() => {
                  return <FontAwesome5 name="sort-down" size={24} color={colors.lightgrey} />;
                }}
              />
              {hakAksesError}
            </FormGroup>
            <Button fullRound block textLight onPress={this.processRegister}>Daftar</Button>
            <Block spaceBetween style={spacing.mt2}>
              <Text style={[
                text.paragraph,
                text.medium
              ]}>Sudah punya akun?</Text>
              <Button fullRound green textLight onPress={this.gotoLogin}>Login</Button>
            </Block>
          </ScrollView>
        </Container>
      </Background>
    );
  }
}

export default Register;

const styles = StyleSheet.create({
  inputAndroidError: {
    borderColor: colors.red,
  }
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
  },
  inputAndroid: {
    width: 150,
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: colors.lightgrey,
    borderRadius: 5,
    color: colors.black,
    paddingRight: 30,
    backgroundColor: colors.white,
    fontFamily: fonts.regular
  },
});