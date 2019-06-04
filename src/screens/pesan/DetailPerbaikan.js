import React, { Component } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  FlatList,
  StyleSheet,
  ScrollView,
  RefreshControl
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { colors, text, spacing } from "../../components/styles";
import {
  Container,
  Background,
  Block,
  Button,
  Illustration,
  FormGroup,
  FormInput,
  FormLabel,
  Spinner
} from "../../components";
import Pemesanan from "../../models/pemesanan";
import Perbaikan from "../../models/perbaikan";
import Auth from "../../models/auth";
import Storage from "../../helpers/Storage";
import DetailPerbaikanService from "../../services/DetailPerbaikanService";
import PesanService from "../../services/PesanService";

class DetailPerbaikan extends Component {
  static navigationOptions = {
    headerLeft: ({ onPress }) => (
      <TouchableWithoutFeedback onPress={() => onPress()}>
        <Icon size={18} color={colors.black} name="arrow-left" />
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
      auth: new Auth({}),
      refreshing: false,
      spinner: false,
      isAddingDetail: false,
      isAddingBill: false,
      namaDetail: "",
      biaya: "",
      detail: [],
      pemesanan: new Pemesanan(props.navigation.getParam("pemesanan"))
    };
  }

  componentDidMount() {
    this._getAuth();
    this._fetchDetailPerbaikan();
  }

  _fetchDetailPerbaikan = async () => {
    this.setState({ spinner: true });

    try {
      const response = await DetailPerbaikanService.list(
        this.state.pemesanan.id
      );

      this.setState({ spinner: false, detail: response });
    } catch (error) {
      this.setState({ spinner: false });
      alert(error);
    }
  };

  _fetchDetailPemesanan = async () => {
    this.setState({ spinner: true });

    try {
      const response = await PesanService.detail(this.state.pemesanan.id);

      this.setState({ spinner: false, pemesanan: response });
    } catch (error) {
      this.setState({ spinner: false });
      throw error;
    }
  };

  _getAuth = async () => {
    const auth = await Storage.get("auth");
    this.setState({ auth: auth });
  };

  _handleChangeText = (key, text) => {
    this.setState({ [key]: text });
  };

  _saveDetail = async () => {
    this.setState({ spinner: true });

    try {
      const response = await DetailPerbaikanService.store({
        id_pemesanan: this.state.pemesanan.id,
        nama: this.state.namaDetail
      });

      this._fetchDetailPerbaikan();
      this.setState({
        spinner: false,
        isAddingDetail: false,
        isAddingBill: false
      });
    } catch (error) {
      this.setState({ spinner: false });
      alert(error);
    }
  };

  _deleteDetail = async perbaikan => {
    this.setState({ spinner: true });

    try {
      const response = await DetailPerbaikanService.delete(perbaikan.id);

      this._fetchDetailPerbaikan();
      this.setState({
        spinner: false,
        isAddingDetail: false,
        isAddingBill: false
      });
    } catch (error) {
      this.setState({ spinner: false });
      alert(error);
    }
  };

  _addBiaya = async () => {
    this.setState({ spinner: true });

    try {
      const response = await PesanService.addBiaya({
        id_pemesanan: this.state.pemesanan.id,
        biaya: this.state.biaya
      });

      this.setState({
        spinner: false,
        isAddingBill: false,
        isAddingDetail: false
      });
      this._fetchDetailPemesanan();
    } catch (error) {
      this.setState({
        spinner: false,
        isAddingBill: false,
        isAddingDetail: false
      });
      alert(error);
    }
  };

  _onRefresh = () => {
    this._fetchDetailPerbaikan();
    this._fetchDetailPemesanan();
  };

  _renderAddingDetailForm = () => {
    const {
      pemesanan,
      isAddingDetail,
      isAddingBill,
      auth,
      detail
    } = this.state;

    return isAddingDetail &&
      auth.akun.hak_akses === "tukang" &&
      !isAddingBill ? (
      <Block paddingHorizontal column>
        <FormGroup>
          <FormLabel text="Detail" />
          <FormInput
            placeholder="Deskripsi detail kegiatan perbaikan"
            onChangeText={text => this._handleChangeText("namaDetail", text)}
          />
        </FormGroup>
        <Button block fullRound textLight onPress={this._saveDetail}>
          Simpan Detail
        </Button>
      </Block>
    ) : (
      <Block>
        {detail.length >= 1 ? (
          <FlatList
            data={this.state.detail}
            keyExtractor={(item, index) => item.id}
            contentContainerStyle={{
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: colors.extraLightGrey
            }}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            renderItem={({ item }) => (
              <Block
                alignCenter
                spaceBetween
                style={{ paddingHorizontal: 30, paddingVertical: 10 }}
              >
                <Block>
                  <Icon name="check" size={15} />
                  <Text style={[text.fontRegular, spacing.ml2]}>
                    {item.nama}
                  </Text>
                </Block>
                {auth.akun.hak_akses === "tukang" ? (
                  <Block>
                    <Button
                      circleWithIcon={true}
                      icon="minus"
                      red={true}
                      onPress={() => this._deleteDetail(item)}
                    />
                  </Block>
                ) : null}
              </Block>
            )}
          />
        ) : (
          <Block paddingHorizontal>
            <Text style={[text.italic, text.fontRegular, text.textMuted]}>
              Belum ada detail perbaikan
            </Text>
          </Block>
        )}
      </Block>
    );
  };

  _renderButtonOrTextBiaya = () => {
    const { pemesanan, isAddingDetail, isAddingBill, auth } = this.state;
    const textBiaya = (
      <Text style={[text.italic, text.fontSmall, text.colorLight]}>
        Rp. {pemesanan.biaya ? pemesanan.biaya : "-"}
      </Text>
    );

    const buttonAddBiaya = (
      <Button
        textLight
        fullRound
        outline
        themeLight
        onPress={() => {
          this.setState({ isAddingBill: !this.state.isAddingBill });

          if (!this.state.isAddingBill) {
            this.setState({ isAddingDetail: this.state.isAddingBill });
          }
        }}
      >
        {isAddingBill && !isAddingDetail ? "Batalkan" : "Tambahkan Biaya"}
      </Button>
    );

    if (!pemesanan.biaya && auth.akun.hak_akses === "tukang") {
      return buttonAddBiaya;
    } else {
      return textBiaya;
    }
  };

  _renderAddBillingForm = () => {
    const { pemesanan, isAddingDetail, isAddingBill, auth } = this.state;

    const addBillingForm = (
      <Block padding column>
        <FormGroup>
          <FormLabel text="Biaya" />
          <FormInput
            placeholder="Biaya perbaikan"
            onChangeText={text => this._handleChangeText("biaya", text)}
          />
        </FormGroup>
        <Button block fullRound textLight onPress={this._addBiaya}>
          Simpan Biaya
        </Button>
      </Block>
    );

    return isAddingBill && auth.akun.hak_akses === "tukang" && !isAddingDetail
      ? addBillingForm
      : null;
  };

  render() {
    const {
      pemesanan,
      isAddingDetail,
      isAddingBill,
      auth,
      refreshing
    } = this.state;

    const biayaWrapperBlockStyles = [
      styles.biayaWrapper,
      (pemesanan.status === "menunggu_pembayaran" ||
        pemesanan.status === "perbaikan_dibatalkan") &&
        styles.biayaWrapperRed,
      (pemesanan.status === "menunggu_perbaikan" ||
        pemesanan.status === "sedang_perbaikan" ||
        pemesanan.status === "menunggu_penerimaan") &&
        styles.biayaWrapperGreen
    ];

    return (
      <Background color={colors.white}>
        <Spinner
          isVisible={this.state.spinner}
          type="bar"
          color={colors.black}
          whiteBackdrop
        />
        <Container noPaddingAndMargin>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={this._onRefresh}
              />
            }
          >
            <Block alignMiddle>
              <Illustration
                width={159}
                height={159}
                source={require("../../assets/images/pesan.jpg")}
              />
            </Block>
            <Block
              spaceBetween
              alignCenter
              paddingHorizontal
              style={spacing.mb1}
            >
              <Text style={[text.bold, text.fontSemiRegular]}>
                Detail Perbaikan
              </Text>
              {auth.akun.hak_akses === "tukang" ? (
                <Button
                  circleWithIcon={true}
                  icon={isAddingDetail && !isAddingBill ? "times" : "plus"}
                  red={isAddingDetail && !isAddingBill ? true : false}
                  onPress={() => {
                    this.setState({
                      isAddingDetail: !this.state.isAddingDetail
                    });

                    if (!this.state.isAddingDetail) {
                      this.setState({
                        isAddingBill: this.state.isAddingDetail
                      });
                    }
                  }}
                />
              ) : null}
            </Block>
            {this._renderAddingDetailForm()}
            <Block spaceBetween alignCenter style={biayaWrapperBlockStyles}>
              <Text
                style={[text.textBoldItalic, text.fontSmall, text.colorLight]}
              >
                Biaya
              </Text>
              {this._renderButtonOrTextBiaya()}
            </Block>

            {this._renderAddBillingForm()}
          </ScrollView>
        </Container>
      </Background>
    );
  }
}

export default DetailPerbaikan;

const styles = StyleSheet.create({
  separator: {
    width: "100%",
    height: 1,
    backgroundColor: colors.extraLightGrey
  },
  biayaWrapper: {
    marginTop: 30,
    paddingHorizontal: 30,
    paddingVertical: 40,
    backgroundColor: colors.primary
  },
  biayaWrapperGreen: {
    backgroundColor: colors.green
  },
  biayaWrapperRed: {
    backgroundColor: colors.red
  }
});
