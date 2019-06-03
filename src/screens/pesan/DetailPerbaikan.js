import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  FlatList,
  StyleSheet,
  ScrollView,
  RefreshControl
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { colors, text, spacing } from '../../components/styles';
import {
  Container,
  Background,
  Block,
  Button,
  Illustration,
  FormGroup,
  FormInput,
  FormLabel
} from '../../components';
import Pemesanan from '../../models/pemesanan';
import Perbaikan from '../../models/perbaikan';
import Auth from '../../models/auth';
import Storage from '../../helpers/Storage';

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
      isAddingDetail: false,
      isAddingBill: false,
      namaDetail: '',
      biaya: '',
      detail: [
        new Perbaikan({
          id: 1,
          id_pemesanan: 2,
          nama: 'Ganti elco'
        }),
        new Perbaikan({
          id: 2,
          id_pemesanan: 2,
          nama: 'Setting blablabla'
        })
      ],
      pemesanan: new Pemesanan(props.navigation.getParam('pemesanan'))
    };
  }

  componentDidMount() {
    this._getAuth();
  }

  _getAuth = async () => {
    const auth = await Storage.get('auth');
    this.setState({ auth: auth });
  }

  _handleChangeText = (key, text) => {
    this.setState({ [key]: text });
  }

  _saveDetail = () => {
    alert(this.state.namaDetail);
  }

  _renderAddingDetailForm = () => {
    const {
      pemesanan,
      isAddingDetail,
      isAddingBill,
      auth
    } = this.state;

    return (isAddingDetail && auth.akun.hak_akses === 'tukang' && !isAddingBill) ? (
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
            <Block alignCenter style={{ paddingHorizontal: 30, paddingVertical: 10 }}>
              <Icon name="check" size={15} />
              <Text style={[text.fontRegular, spacing.ml2]}>{item.nama}</Text>
            </Block>
          )}
        />
      </Block>
    )
  }

  _renderButtonOrTextBiaya = () => {
    const {
      pemesanan,
      isAddingDetail,
      isAddingBill,
      auth
    } = this.state;
    const textBiaya = (
      <Text style={[text.italic, text.fontSmall, text.colorLight]}>
        Rp. {pemesanan.biaya ? pemesanan.biaya : '-'}
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
        }}>
        {isAddingBill && !isAddingDetail ? 'Batalkan' : 'Tambahkan Biaya'}
      </Button>
    );

    if (!pemesanan.biaya && auth.akun.hak_akses === 'tukang') {
      return buttonAddBiaya;
    } else {
      return textBiaya; 
    }
  }

  _renderAddBillingForm = () => {
    const {
      pemesanan,
      isAddingDetail,
      isAddingBill,
      auth
    } = this.state;

    const addBillingForm = (
      <Block padding column>
        <FormGroup>
          <FormLabel text="Biaya" />
          <FormInput
            placeholder="Biaya perbaikan"
            onChangeText={text => this._handleChangeText("biaya", text)}
          />
        </FormGroup>
        <Button block fullRound textLight onPress={() => alert('simpan biaya')}>
          Simpan Biaya
        </Button>
      </Block>
    );

    return (isAddingBill && auth.akun.hak_akses === 'tukang' && !isAddingDetail) ? addBillingForm : null;
  }

  _onRefresh = () => {
    alert('Refreshing');
  }

  render() {
    const { pemesanan, isAddingDetail, isAddingBill, auth, refreshing } = this.state;

    const biayaWrapperBlockStyles = [
      styles.biayaWrapper,
      (pemesanan.status === 'menunggu_pembayaran' || pemesanan.status === 'perbaikan_dibatalkan') && styles.biayaWrapperRed,
      (pemesanan.status === 'menunggu_perbaikan' || pemesanan.status === 'sedang_perbaikan' || pemesanan.status === 'menunggu_penerimaan') && styles.biayaWrapperGreen
    ];

    return (
      <Background color={colors.white}>
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
            <Block spaceBetween alignCenter paddingHorizontal style={spacing.mb1}>
              <Text style={[text.bold, text.fontSemiRegular]}>Detail Perbaikan</Text>
              <Button
                circleWithIcon={true}
                icon={isAddingDetail && !isAddingBill ? 'times' : 'plus'}
                red={isAddingDetail && !isAddingBill ? true : false}
                onPress={() => {
                  this.setState({ isAddingDetail: !this.state.isAddingDetail });

                  if (!this.state.isAddingDetail) {
                    this.setState({ isAddingBill: this.state.isAddingDetail });
                  }
                }} />
            </Block>
            {this._renderAddingDetailForm()}
            <Block spaceBetween alignCenter style={biayaWrapperBlockStyles}>
              <Text style={[text.textBoldItalic, text.fontSmall, text.colorLight]}>Biaya</Text>
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
    width: '100%',
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