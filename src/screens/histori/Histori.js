import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Background, Container, Button, Spinner } from "../../components";

import HistoriKosong from "./HistoriKosong";
import ListHistori from "./ListHistori";
import PesanService from "../../services/PesanService";
import Storage from "../../helpers/Storage";

import Auth from "../../models/auth";

import { colors, text, spacing } from "../../components/styles";

class Histori extends Component {
  static navigationOptions = {
    header: null,
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      return (
        <FontAwesome5
          name="clipboard"
          size={20}
          focused={focused}
          color={tintColor}
        />
      );
    }
  };

  constructor(props) {
    super(props);

    this.state = {
      histori: [],
      spinner: false,
      auth: new Auth({})
    };
  }

  componentDidMount() {
    this.getHistori();
  }

  _onRefresh = () => {
    this.getHistori();
  };

  getHistori = async () => {
    const auth = await Storage.get("auth");
    this.setState({ spinner: true, auth: new Auth(auth) });

    try {
      const histori = await PesanService.histori();

      this.setState({ spinner: false, histori: histori });
    } catch (error) {
      this.setState({ spinner: false });
      alert(error);
    }
  };

  gotoPesan = () => {
    this.props.navigation.navigate("Pesan");
  };

  gotoDetail = pesanan => {
    this.props.navigation.navigate("DetailPesanan", {
      pesanan: pesanan
    });
  };

  render() {
    const { auth, histori } = this.state;

    const historiContent =
      histori === null || histori.length <= 0 ? (
        <HistoriKosong
          gotoPesan={this.gotoPesan}
          auth={auth}
          onRefresh={this._onRefresh}
        />
      ) : (
        <ListHistori
          histori={this.state.histori}
          gotoDetail={this.gotoDetail}
          onRefresh={this._onRefresh}
        />
      );

    return (
      <Background color={colors.white}>
        <Spinner
          isVisible={this.state.spinner}
          whiteBackdrop
          type="bar"
          color={colors.black}
        />
        {historiContent}
      </Background>
    );
  }
}

export default Histori;
