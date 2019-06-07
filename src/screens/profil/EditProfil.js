import React, { Component } from "react";
import {
  TouchableWithoutFeedback,
  ScrollView,
  RefreshControl,
  Text,
  StyleSheet
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { colors, text, spacing, fonts } from "../../components/styles";
import {
  Background,
  Container,
  Block,
  FormGroup,
  FormInput,
  FormLabel,
  Button,
  Spinner,
  Alert,
  Separator
} from "../../components";

import Storage from "../../helpers/Storage";
import Auth from "../../models/auth";
import PenggunaService from "../../services/PenggunaService";
import FormError from "../../helpers/FormError";

class EditProfil extends Component {
  static navigationOptions = {
    title: "Edit Profil",
    headerStyle: {
      marginTop: 20
    },
    headerTitleStyle: {
      fontFamily: fonts.bold,
      color: colors.black
    },
    headerLeft: ({ onPress }) => (
      <TouchableWithoutFeedback onPress={() => onPress()}>
        <Icon size={18} color={colors.black} name="arrow-left" />
      </TouchableWithoutFeedback>
    ),
    headerLeftContainerStyle: {
      paddingLeft: 30
    }
  };

  constructor(props) {
    super(props);

    this.state = {
      auth: new Auth({}),
      spinner: false,
      refreshing: false,
      alertSuccess: false,
      errors: new FormError({})
    };
  }

  componentDidMount() {
    this._getAuth();
  }

  _getAuth = async () => {
    const auth = await Storage.get("auth");

    this.setState({ auth: new Auth(auth) });
  };

  _handleChangeText(key, value) {
    this.setState({
      auth: {
        akun: {
          ...this.state.auth.akun,
          [key]: value
        }
      }
    });
  }

  _resetState = () => {
    this.setState({
      errors: new FormError({}),
      spinner: false,
      alertSuccess: false
    });
  };

  _onRefresh = () => {
    this._getAuth();
    this._resetState();
  };

  _saveProfile = async () => {
    this.setState({ spinner: true });

    try {
      const profile = await PenggunaService.editProfile(this.state.auth.akun);

      await Storage.delete("auth");
      await Storage.put("auth", new Auth(profile));

      this.setState({
        spinner: false,
        alertSuccess: true,
        auth: new Auth(profile),
        errors: new FormError({})
      });
    } catch (error) {
      this.setState({ spinner: false, errors: new FormError(error) });
    }
  };

  render() {
    const { auth, spinner, refreshing, alertSuccess, errors } = this.state;

    return (
      <Background>
        <Alert
          isVisible={alertSuccess}
          title="Berhasil"
          text="Profile anda telah tersimpan"
          onClosePress={() => this.setState({ alertSuccess: false })}
        />
        <Alert
          isVisible={errors.has("modal")}
          title="Error"
          text={errors.get("modal")}
          onClosePress={() => this.setState({ alertSuccess: false })}
        />
        <Spinner
          isVisible={spinner}
          color={colors.black}
          type="bar"
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
            <Block style={styles.infoWrapper}>
              <Block style={spacing.mr1}>
                <Icon name="info-circle" color={colors.white} size={20} />
              </Block>
              <Block column>
                <Block alignCenter style={spacing.mb1}>
                  <Text style={[text.bold, text.fontSmallest, text.colorLight]}>
                    Kode Pengguna
                  </Text>
                  <Icon
                    name="angle-double-right"
                    color={colors.white}
                    size={10}
                    style={{ marginHorizontal: 5 }}
                  />
                  <Text
                    style={[text.fontSmallest, text.colorLight, text.alignLeft]}
                  >
                    {auth.akun.kode}
                  </Text>
                </Block>
                <Block alignCenter>
                  <Text style={[text.bold, text.fontSmallest, text.colorLight]}>
                    Status
                  </Text>
                  <Icon
                    name="angle-double-right"
                    color={colors.white}
                    size={10}
                    style={{ marginHorizontal: 5 }}
                  />
                  <Text
                    style={[text.fontSmallest, text.colorLight, text.alignLeft]}
                  >
                    {auth.akun.aktif ? "Aktif" : "Tidak Aktif"}
                  </Text>
                </Block>
              </Block>
            </Block>
            <Block column paddingHorizontal>
              <FormGroup>
                <FormLabel text="Nama" />
                <FormInput
                  error={errors.has("nama")}
                  feedback={errors.get("nama")}
                  value={auth.akun.nama}
                  placeholder="Nama anda"
                  onChangeText={text => this._handleChangeText("nama", text)}
                />
              </FormGroup>
              <FormGroup>
                <FormLabel text="Email" />
                <FormInput
                  error={errors.has("email")}
                  feedback={errors.get("email")}
                  value={auth.akun.email}
                  placeholder="Email anda"
                  onChangeText={text => this._handleChangeText("email", text)}
                />
              </FormGroup>
              <FormGroup>
                <FormLabel text="No. telp" />
                <FormInput
                  error={errors.has("no_telp")}
                  feedback={errors.get("no_telp")}
                  value={auth.akun.no_telp}
                  placeholder="No. telp anda"
                  onChangeText={text => this._handleChangeText("no_telp", text)}
                />
              </FormGroup>
              <FormGroup>
                <FormLabel text="Alamat lengkap" />
                <FormInput
                  error={errors.has("alamat")}
                  feedback={errors.get("alamat")}
                  value={auth.akun.alamat}
                  placeholder="Alamat lengkap anda"
                  multiline={true}
                  onChangeText={text => this._handleChangeText("alamat", text)}
                />
              </FormGroup>
              <Button fullRound block textLight onPress={this._saveProfile}>
                Simpan
              </Button>
            </Block>
          </ScrollView>
        </Container>
      </Background>
    );
  }
}

export default EditProfil;

const styles = StyleSheet.create({
  infoWrapper: {
    padding: 15,
    backgroundColor: colors.primary,
    borderRadius: 5,
    margin: 30
  }
});
