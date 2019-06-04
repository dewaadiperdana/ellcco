import React, { Component } from "react";
import { Text, TouchableWithoutFeedback, ScrollView } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import {
  Container,
  Background,
  Block,
  FormInput,
  FormGroup,
  FormLabel,
  Button,
  Spinner,
  Illustration
} from "../../components";

import FormError from "../../helpers/FormError";
import PesanService from "../../services/PesanService";

import { colors, text, spacing } from "../../components/styles";

export default class FormPesan extends Component {
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
      jasa: this.props.navigation.getParam("jasa"),
      form: {
        kerusakan: "",
        deskripsi: ""
      },
      spinner: false,
      errors: new FormError({})
    };
  }

  handleChangeText = (field, value) => {
    this.setState({
      form: {
        ...this.state.form,
        [field]: value
      }
    });
  };

  _pesan = async () => {
    this.setState({ spinner: true });

    try {
      const data = {
        id_jasa: this.state.jasa.id,
        kerusakan: this.state.form.kerusakan,
        deskripsi: this.state.form.deskripsi
      };

      await PesanService.pesan(data);

      this.setState({ spinner: false });

      this.props.navigation.dispatch({
        type: "Navigation/NAVIGATE",
        routeName: "DashboardPelanggan",
        action: {
          type: "Navigation/NAVIGATE",
          routeName: "Histori"
        }
      });
    } catch (error) {
      this.setState({
        spinner: false,
        errors: new FormError(error)
      });
    }
  };

  render() {
    const { jasa, errors } = this.state;

    return (
      <Background color={colors.white}>
        <Spinner
          isVisible={this.state.spinner}
          type="bar"
          color={colors.black}
          whiteBackdrop
        />
        <Container>
          <ScrollView>
            <Block column alignCenter style={[spacing.mb2]}>
              <Illustration
                width={159}
                height={159}
                source={require("../../assets/images/pesan.jpg")}
              />
              <Text style={[text.fontSemiRegular, text.medium]}>
                Lengkapi Data Pesanan Anda
              </Text>
            </Block>
            <Block alignCenter style={spacing.mb1}>
              <Text style={text.bold}>Perbaikan</Text>
              <FontAwesome5
                name="angle-double-right"
                size={11}
                color={colors.black}
                style={[spacing.ml1, spacing.mr1]}
              />
              <Text style={text.regular}>{jasa.nama}</Text>
            </Block>
            <FormGroup>
              <FormLabel text="Bagaimana kerusakan alat anda?" />
              <FormInput
                error={errors.has("kerusakan")}
                feedback={errors.get("kerusakan")}
                placeholder="Misalkan : TV mati total"
                onChangeText={text => this.handleChangeText("kerusakan", text)}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel text="Ceritakan bagaimana kerusakan alat anda" />
              <FormInput
                error={errors.has("deskripsi")}
                feedback={errors.get("deskripsi")}
                placeholder="Misalkan : Ketika dihidupkan tidak ada indikator nyala, layar mati..."
                multiline={true}
                onChangeText={text => this.handleChangeText("deskripsi", text)}
              />
            </FormGroup>
            <Button fullRound block textLight onPress={this._pesan}>
              Pesan
            </Button>
          </ScrollView>
        </Container>
      </Background>
    );
  }
}
