import React, { Component } from "react";
import {
  Text,
  TouchableWithoutFeedback,
  ScrollView,
  RefreshControl,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {
  Background,
  Container,
  Spinner,
  Block,
  ListItem,
  Separator,
  Illustration,
  Badge,
  Button,
  CustomModal
} from "../../components";
import moment from "moment";
import Storage from "../../helpers/Storage";
import PesanService from "../../services/PesanService";
import Pemesanan from "../../models/pemesanan";
import Auth from "../../models/auth";
import { colors, text, spacing } from "../../components/styles";

class DetailPesanan extends Component {
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
      detail: new Pemesanan({}),
      spinner: false,
      auth: new Auth({}),
      statuses: [],
      editStatus: false,
      refreshing: false
    };
  }

  componentDidMount() {
    this._getAuth();
    this.getDetailPesanan();
  }

  _getAuth = async () => {
    const auth = await Storage.get("auth");

    this.setState({ auth: new Auth(auth) });
  };

  getDetailPesanan = async () => {
    const { navigation } = this.props;
    const pesanan = navigation.getParam("pesanan");

    this.setState({ spinner: true });

    try {
      const detail = await PesanService.detail(pesanan.id);

      this.setState({ spinner: false, detail: detail });
      this._fetchStatusPemesanan();
    } catch (error) {
      this.setState({ spinner: false });
      throw error;
    }
  };

  _goto = (screen, params) => {
    this.props.navigation.navigate(screen, params);
  };

  _fetchStatusPemesanan = async () => {
    this.setState({ spinner: true });

    try {
      const statuses = await PesanService.getStatusPemesanan(
        this.state.detail.id
      );

      this.setState({ spinner: false, statuses: statuses, editStatus: false });
    } catch (error) {
      this.setState({ spinner: false, editStatus: false });
      alert(error);
    }
  };

  _updateStatus = async status => {
    try {
      await PesanService.updateStatus(this.state.detail.id, status);

      this.setState({ editStatus: false });

      this._onRefresh();
    } catch (error) {
      alert(error);
    }
  };

  _onRefresh = () => {
    this._getAuth();
    this.getDetailPesanan();
    this._fetchStatusPemesanan();
  };

  renderDetailPesanan = () => {
    const { detail } = this.state;

    return (
      <Block column paddingHorizontal>
        <ListItem first>
          <Text style={text.medium}>Kode Pesanan</Text>
          <Text style={text.regular}>{detail.kode}</Text>
        </ListItem>
        <ListItem>
          <Text style={text.medium}>Tanggal</Text>
          <Text style={text.regular}>
            {moment(detail.tanggal).format("LLL")}
          </Text>
        </ListItem>
        <ListItem>
          <Text style={text.medium}>Layanan</Text>
          <Text style={text.regular}>
            {"jasa" in detail ? detail.jasa.nama : "-"}
          </Text>
        </ListItem>
        <ListItem>
          <Text style={text.medium}>Kerusakan</Text>
          <Text style={text.regular}>{detail.kerusakan}</Text>
        </ListItem>
        <ListItem last>
          <Text style={text.medium}>Status</Text>
          <Badge
            blue={detail.status === "perbaikan_selesai"}
            red={
              detail.status === "perbaikan_dibatalkan" ||
              detail.status === "menunggu_pembayaran"
            }
          >
            {detail.status}
          </Badge>
        </ListItem>
        <Text style={[text.regular, spacing.mt1]}>{detail.deskripsi}</Text>
      </Block>
    );
  };

  renderDetailPelanggan = () => {
    const { detail } = this.state;

    return "pelanggan" in detail ? (
      <Block column paddingHorizontal>
        <Text style={[text.medium, text.fontSemiRegular, spacing.mb2]}>
          Pemesan
        </Text>
        <ListItem first>
          <Text style={text.medium}>Nama</Text>
          <Text style={text.regular}>{detail.pelanggan.nama}</Text>
        </ListItem>
        <ListItem>
          <Text style={text.medium}>No. Telp</Text>
          <Text style={text.regular}>{detail.pelanggan.no_telp}</Text>
        </ListItem>
        <ListItem last>
          <Text style={text.medium}>Kode Pengguna</Text>
          <Text style={text.regular}>{detail.pelanggan.kode}</Text>
        </ListItem>
        <Text style={[text.regular, spacing.mt1]}>
          {detail.pelanggan.alamat}
        </Text>
      </Block>
    ) : null;
  };

  renderDetailTukang = () => {
    const { detail } = this.state;

    return "tukang" in detail && detail.tukang !== null ? (
      <Block column paddingHorizontal>
        <Text style={[text.medium, text.fontSemiRegular, spacing.mb2]}>
          Penerima
        </Text>
        <ListItem first>
          <Text style={text.medium}>Nama</Text>
          <Text style={text.regular}>{detail.tukang.nama}</Text>
        </ListItem>
        <ListItem>
          <Text style={text.medium}>No. Telp</Text>
          <Text style={text.regular}>{detail.tukang.no_telp}</Text>
        </ListItem>
        <ListItem last>
          <Text style={text.medium}>Kode Pengguna</Text>
          <Text style={text.regular}>{detail.tukang.kode}</Text>
        </ListItem>
        <Text style={[text.regular, spacing.mt1]}>{detail.tukang.alamat}</Text>
      </Block>
    ) : (
      <Block alignMiddle padding>
        <Text style={[text.medium, text.fontSemiRegular, spacing.mb2]}>
          Pesanan ini belum diterima
        </Text>
      </Block>
    );
  };

  render() {
    const { auth } = this.state;

    return (
      <Background color={colors.white}>
        <Spinner
          isVisible={this.state.spinner}
          whiteBackdrop
          type="bar"
          color={colors.black}
        />
        <Container noPaddingAndMargin>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }
          >
            <CustomModal
              isVisible={this.state.editStatus}
              title="Edit Status Pesanan"
              onClosePress={() => this.setState({ editStatus: false })}
            >
              <ScrollView>
                <FlatList
                  data={this.state.statuses}
                  keyExtractor={(item, index) => item.status}
                  contentContainerStyle={styles.editStatusListContainer}
                  ItemSeparatorComponent={() => (
                    <View style={styles.separator} />
                  )}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      key={item.status}
                      onPress={() => this._updateStatus(item.status)}
                    >
                      <Block
                        spaceBetween
                        alignCenter
                        style={styles.editStatusListItem}
                      >
                        <Text style={text.fontRegular}>{item.status}</Text>
                        {item.selected ? (
                          <FontAwesome5
                            name="check"
                            size={10}
                            color={colors.black}
                          />
                        ) : null}
                      </Block>
                    </TouchableOpacity>
                  )}
                />
              </ScrollView>
            </CustomModal>
            <Container>
              <Block column alignCenter alignMiddle style={spacing.mb2}>
                <Illustration
                  width={159}
                  height={159}
                  source={require("../../assets/images/pesan.jpg")}
                />
                <Text style={[text.medium, text.fontSmall]}>
                  Detail Pesanan
                </Text>
                <Block row alignMiddle style={spacing.mt1}>
                  <Button
                    circleWithIcon={true}
                    icon="tasks"
                    onPress={() =>
                      this._goto("DetailPerbaikan", {
                        pemesanan: this.state.detail
                      })
                    }
                  />
                  <Button
                    circleWithIcon={true}
                    icon="comments"
                    green
                    style={[spacing.ml1, spacing.mr1]}
                    onPress={() =>
                      this._goto("Obrolan", {
                        pemesanan: this.state.detail
                      })
                    }
                  />
                  {auth.akun.hak_akses === "tukang" ? (
                    <Button
                      circleWithIcon={true}
                      icon="edit"
                      purple
                      onPress={() => this.setState({ editStatus: true })}
                    />
                  ) : null}
                </Block>
              </Block>
            </Container>
            {this.renderDetailPesanan()}
            <Separator />
            {this.renderDetailPelanggan()}
            <Separator />
            {this.renderDetailTukang()}
          </ScrollView>
        </Container>
      </Background>
    );
  }
}

export default DetailPesanan;

const styles = StyleSheet.create({
  editStatusListContainer: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.extraLightGrey
  },
  editStatusListItem: {
    padding: 10
  },
  separator: {
    width: "100%",
    height: 1,
    backgroundColor: colors.extraLightGrey
  }
});
