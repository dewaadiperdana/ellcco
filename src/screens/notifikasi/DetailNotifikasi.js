import React, { Component } from "react";
import { Text, TouchableWithoutFeedback } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {
  Container,
  Block,
  Background,
  Separator,
  Spinner,
  AlertError,
  Illustration
} from "../../components";

import { colors, text, spacing } from "../../components/styles";

import FormError from "../../helpers/FormError";

import { connect } from "react-redux";
import {
  fetchUnreadNotifications,
  fetchAllNotifications
} from "../../store/actions/notificationAction";

import NotifikasiService from "../../services/NotifikasiService";
import PesanService from "../../services/PesanService";

import NotifikasiRegular from "./components/NotifikasiRegular";
import NotifikasiPesanan from "./components/NotifikasiPesanan";

class DetailNotifikasi extends Component {
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
      notifikasi: {},
      detailPesanan: {},
      errors: new FormError({})
    };
  }

  componentDidMount() {
    this.tandaiSudahDibaca();
  }

  tandaiSudahDibaca = async () => {
    const { navigation } = this.props;
    const notifikasi = navigation.getParam("notifikasi");

    if (notifikasi.dibaca === false) {
      this.setState({ spinner: true, notifikasi: notifikasi });

      try {
        await NotifikasiService.tandaiSudahDibaca(notifikasi.id);

        this.setState({ spinner: false });
        this.props.fetchUnreadNotifications();
        this.props.fetchAllNotifications();
      } catch (error) {
        this.setState({ spinner: false });
        alert("Maaf, sedang terjadi kesalahan");
      }
    }
  };

  terimaPesanan = async pesanan => {
    this.setState({ spinner: true });

    try {
      const response = await PesanService.terima(pesanan.kode_pesanan);

      this.setState({ spinner: false });
      this.props.navigation.navigate("DetailPesanan", {
        pesanan: response
      });
    } catch (error) {
      this.setState({ spinner: false, errors: new FormError(error) });
    }
  };

  renderNotifikasiContent = () => {
    const { navigation } = this.props;
    const notifikasi = navigation.getParam("notifikasi");

    switch (notifikasi.tipe) {
      case "regular":
        return <NotifikasiRegular data={notifikasi} />;
      case "pesanan":
        return (
          <NotifikasiPesanan data={notifikasi} onTerima={this.terimaPesanan} />
        );
    }
  };

  render() {
    return (
      <Background color={colors.white}>
        <Spinner
          isVisible={this.state.spinner}
          color={colors.white}
          type="bar"
        />
        <AlertError
          text={this.state.errors.get("modal")}
          isVisible={this.state.errors.has("modal")}
          onOkPress={() => this.setState({ errors: new FormError({}) })}
        />
        <Container noPaddingAndMargin>
          <Block column alignCenter paddingHorizontal>
            <Illustration
              width={189}
              height={189}
              source={require("../../assets/images/notifikasi.jpg")}
            />
            <Text style={[text.fontSmall, text.medium]}>Detail Notifikasi</Text>
          </Block>
          <Block paddingHorizontal>
            <FontAwesome5
              name="trash"
              size={20}
              color={colors.black}
              style={[spacing.mt2]}
            />
          </Block>
          <Separator />
          {this.renderNotifikasiContent()}
        </Container>
      </Background>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUnreadNotifications: () => {
      dispatch(fetchUnreadNotifications());
    },
    fetchAllNotifications: () => {
      dispatch(fetchAllNotifications());
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(DetailNotifikasi);
