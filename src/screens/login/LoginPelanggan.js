import React, { Component } from "react";
import {
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StatusBar,
  Image,
  ScrollView
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
  Alert,
  Illustration
} from "../../components";
import { text, spacing, colors } from "../../components/styles";
import PenggunaService from "../../services/PenggunaService";
import FormError from "../../helpers/FormError";
import Storage from "../../helpers/Storage";
import Auth from "../../models/auth";

class LoginPelanggan extends Component {
  static navigationOptions = {
    tabBarVisible: false,
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
      borderBottomColor: "transparent",
      shadowColor: "transparent",
      elevation: 0,
      shadowOpacity: 0,
      backgroundColor: colors.transparent
    }
  };

  constructor(props) {
    super(props);

    this.state = {
      spinner: false,
      form: {
        email: "",
        password: ""
      },
      errors: new FormError({})
    };
  }

  gotoRegister = () => {
    this.props.navigation.navigate("RegisterPelanggan");
  };

  processLogin = async () => {
    this.setState({ spinner: true });

    try {
      const response = await PenggunaService.login(
        "pelanggan",
        this.state.form
      );
      this.setState({ spinner: false });

      await Storage.put("auth", new Auth(response));

      this.props.navigation.navigate("DashboardPelanggan");
    } catch (error) {
      this.setState({ spinner: false, errors: new FormError(error) });
    }
  };

  handleChangeText = (field, text) => {
    this.setState({
      form: {
        ...this.state.form,
        [field]: text
      }
    });
  };

  render() {
    const { errors } = this.state;

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
          <ScrollView>
            <Alert
              title="Error"
              text={errors.get("modal")}
              isVisible={errors.has("modal")}
              onClosePress={() => this.setState({ errors: new FormError({}) })}
            />
            <Block spaceAround>
              <Block>
                <Illustration
                  width={152}
                  height={152}
                  source={require("../../assets/images/intro.jpg")}
                />
              </Block>
              <Block column alignLeft wrapContent style={spacing.ml2}>
                <Text style={[text.h1, text.alignLeft]}>Login</Text>
                <Text style={[text.paragraph, text.alignLeft, spacing.mb2]}>
                  Silahkan login sebagai pelanggan jika sudah punya akun
                </Text>
              </Block>
            </Block>
            <FormGroup>
              <FormLabel text="Email" />
              <FormInput
                error={errors.has("email")}
                feedback={errors.get("email")}
                placeholder="Email anda"
                onChangeText={text => this.handleChangeText("email", text)}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel text="Password" />
              <FormInput
                error={errors.has("password")}
                feedback={errors.get("password")}
                placeholder="Password anda"
                password
                onChangeText={text => this.handleChangeText("password", text)}
              />
            </FormGroup>
            <Button block fullRound textLight onPress={this.processLogin}>
              Login
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
                Belum punya akun?
              </Text>
              <TouchableOpacity
                style={[spacing.ml1, spacing.mt2]}
                onPress={this.gotoRegister}
              >
                <Text style={[text.bold]}>Daftar</Text>
              </TouchableOpacity>
            </Block>
          </ScrollView>
        </Container>
      </Background>
    );
  }
}

export default LoginPelanggan;
