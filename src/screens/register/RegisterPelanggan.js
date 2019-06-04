import React, { Component } from "react";
import {
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  StyleSheet,
  Image
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {
  Container,
  Background,
  Button,
  FormGroup,
  FormInput,
  FormLabel,
  Block,
  Spinner,
  Illustration
} from "../../components";
import PenggunaService from "../../services/PenggunaService";
import { text, spacing, colors, fonts } from "../../components/styles";
import FormError from "../../helpers/FormError";

class RegisterPelanggan extends Component {
  static navigationOptions = {
    headerLeft: ({ onPress }) => (
      <TouchableWithoutFeedback onPress={() => onPress()}>
        <FontAwesome5 size={18} color={colors.black} name="arrow-left" />
      </TouchableWithoutFeedback>
    ),
    headerLeftContainerStyle: {
      paddingLeft: 30,
      marginTop: 25
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
        id_hak_akses: "",
        nama: "",
        email: "",
        alamat: "",
        no_telp: "",
        password: ""
      },
      errors: new FormError({})
    };
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
  };

  gotoLogin = () => {
    this.props.navigation.navigate("LoginPelanggan");
  };

  handleChangeText = (field, value) => {
    this.setState({
      form: {
        ...this.state.form,
        [field]: value
      }
    });
  };

  processRegister = async () => {
    this.setState({ spinner: true });

    try {
      await PenggunaService.register("pelanggan", this.state.form);
      this.props.navigation.navigate("LoginPelanggan");
    } catch (error) {
      this.setState({
        errors: new FormError(error),
        spinner: false
      });
    }
  };

  render() {
    return (
      <Background color={colors.white}>
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor={colors.white}
          translucent={true}
        />
        <Spinner
          isVisible={this.state.spinner}
          type="bar"
          color={colors.black}
          whiteBackdrop
        />
        <Container>
          <Block spaceAround>
            <Block>
              <Illustration
                width={152}
                height={152}
                source={require("../../assets/images/intro.jpg")}
              />
            </Block>
            <Block column wrapContent alignLeft style={spacing.ml2}>
              <Text style={text.h1}>Daftar</Text>
              <Text style={[text.paragraph, spacing.mb2]}>
                Silahkan daftar sebagai pelanggan jika belum punya akun
              </Text>
            </Block>
          </Block>
          <ScrollView>
            <FormGroup>
              <FormLabel text="Nama" />
              <FormInput
                error={this.state.errors.has("nama")}
                feedback={this.state.errors.get("nama")}
                placeholder="Nama anda"
                onChangeText={text => this.handleChangeText("nama", text)}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel text="Email" />
              <FormInput
                error={this.state.errors.has("email")}
                feedback={this.state.errors.get("email")}
                placeholder="Email anda"
                onChangeText={text => this.handleChangeText("email", text)}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel text="No. Telp" />
              <FormInput
                error={this.state.errors.has("no_telp")}
                feedback={this.state.errors.get("no_telp")}
                placeholder="No. telp anda"
                onChangeText={text => this.handleChangeText("no_telp", text)}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel text="Password" />
              <FormInput
                error={this.state.errors.has("password")}
                feedback={this.state.errors.get("password")}
                placeholder="Password anda"
                onChangeText={text => this.handleChangeText("password", text)}
                password
              />
            </FormGroup>
            <FormGroup>
              <FormLabel text="Alamat Lengkap" />
              <FormInput
                error={this.state.errors.has("alamat")}
                feedback={this.state.errors.get("alamat")}
                placeholder="Alamat lengkap anda"
                multiline={true}
                onChangeText={text => this.handleChangeText("alamat", text)}
              />
            </FormGroup>
            <Button fullRound block textLight onPress={this.processRegister}>
              Daftar
            </Button>
            <Block alignMiddle style={spacing.mt2}>
              <Text
                style={[
                  spacing.mt2,
                  spacing.mb1,
                  text.fontRegular,
                  text.regular
                ]}
              >
                Sudah punya akun?
              </Text>
              <TouchableOpacity
                style={[spacing.ml1, spacing.mt2]}
                onPress={this.gotoLogin}
              >
                <Text style={[text.bold]}>Login</Text>
              </TouchableOpacity>
            </Block>
          </ScrollView>
        </Container>
      </Background>
    );
  }
}

export default RegisterPelanggan;

const styles = StyleSheet.create({
  inputAndroidError: {
    borderColor: colors.red
  }
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30
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
  }
});
