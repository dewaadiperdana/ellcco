import React, { Component } from "react";
import { Text, TouchableWithoutFeedback } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {
  Container,
  Block,
  Background,
  Separator,
  Spinner,
  Alert,
  Illustration,
  Button
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

import Pemesanan from '../../models/pemesanan';
import Notifikasi from '../../models/notifikasi';

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
      notifikasi: new Notifikasi(this.props.navigation.getParam('notifikasi')),
      detailPesanan: new Pemesanan({}),
      errors: new FormError({}),
      konfirmasiHapus: false
    };
  }

  componentDidMount() {
    this.tandaiSudahDibaca();
    this.getDetailIfOrderNotification();
  }

  getDetailIfOrderNotification = async () => {
    const notifikasi = this.props.navigation.getParam('notifikasi');
    const pesanan = JSON.parse(notifikasi.data);

    if (notifikasi.tipe === 'pesanan') {
      this.setState({ spinner: true });

      try {
        const response = await PesanService.detail(pesanan.id);

        this.setState({ spinner: false, detailPesanan: response });
      } catch (error) {
        this.setState({ spinner: false });
        alert(error);
      }
    }
  }

  tandaiSudahDibaca = async () => {
    const { navigation } = this.props;
    const notifikasi = navigation.getParam("notifikasi");

    try {
      if (notifikasi.dibaca === false) {
        this.setState({ spinner: true });

        await NotifikasiService.tandaiSudahDibaca(notifikasi.id);

        this.setState({ spinner: false });
        this.props.fetchUnreadNotifications();
        this.props.fetchAllNotifications();
      }
    } catch (error) {
      this.setState({ spinner: false });
      alert(error);
    }
  }

  terimaPesanan = async pesanan => {
    this.setState({ spinner: true });

    try {
      const response = await PesanService.terima(pesanan.id);

      this.setState({ spinner: false });
      this.props.navigation.navigate("DetailPesanan", {
        pesanan: pesanan
      });
    } catch (error) {
      this.setState({ spinner: false, errors: new FormError(error) });
    }
  }

  deleteNotification = async () => {
    this.setState({ spinner: true });

    try {
      const deleted = await NotifikasiService.delete(this.state.notifikasi.id);

      if (deleted) {
        this.setState({ spinner: false });
        this.props.fetchAllNotifications();
        this.props.navigation.navigate('Notifikasi');
      }
    } catch (error) {
      this.setState({ spinner: false });
      alert(error);
    }
  }

  renderNotifikasiContent = () => {
    const { navigation } = this.props;
    const notifikasi = navigation.getParam("notifikasi");

    switch (notifikasi.tipe) {
      case "regular":
        return <NotifikasiRegular data={notifikasi} />;
      case "pesanan":
        return (
          <NotifikasiPesanan
            data={notifikasi}
            detail={this.state.detailPesanan}
            onTerima={this.terimaPesanan} />
        );
       default:
         return null;
    }
  };

  render() {
    return (
      <Background color={colors.white}>
        <Spinner
          whiteBackdrop
          isVisible={this.state.spinner}
          color={colors.black}
          type="bar"
        />
        <Alert
          title="Error"
          text={this.state.errors.get("modal")}
          isVisible={this.state.errors.has("modal")}
          onClosePress={() => this.setState({ errors: new FormError({}) })}
        />
        <Alert
          title="Anda yakin?"
          text="Anda yakin ingin menghapus notifikasi ini?"
          isVisible={this.state.konfirmasiHapus}
          allowCancelAndConfirm={true}
          onClosePress={() => this.setState({ konfirmasiHapus: !this.state.konfirmasiHapus })}
          onConfirm={() => this.deleteNotification()}
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
          <Block alignMiddle style={{ paddingTop: 10 }}>
            <Button
              circleWithIcon={true}
              icon="trash-alt"
              red={true}
              onPress={() => this.setState({ konfirmasiHapus: true })}
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