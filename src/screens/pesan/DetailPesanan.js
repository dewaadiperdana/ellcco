import React, { Component } from 'react';
import { View, Text, Image, TouchableWithoutFeedback, ScrollView } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Background, Container, Button, Spinner, Block, ListItem, Separator } from '../../components';
import moment from 'moment';

import Storage from '../../helpers/Storage';
import PesanService from '../../services/PesanService';

import { colors, text, spacing } from '../../components/styles';

class DetailPesanan extends Component {
  static navigationOptions = {
    headerLeft: ({ onPress }) => (
      <TouchableWithoutFeedback onPress={() => onPress()}>
        <FontAwesome5 size={18} color={colors.black} name="arrow-left" />
      </TouchableWithoutFeedback>
    ),
    headerLeftContainerStyle: {
      paddingLeft: 30,
      marginTop: 25,
    },
    headerStyle: {
      borderBottomColor: 'transparent',
      shadowColor: 'transparent',
      elevation: 0,
      shadowOpacity: 0,
      backgroundColor: colors.transparent,
    }
  };

  constructor(props) {
    super(props);

    this.state = {
      detail: {},
      spinner: false
    };
  }

  componentDidMount() {
    this.getDetailPesanan();
  }

  getDetailPesanan = async () => {
    const { navigation } = this.props;
    const pesanan = navigation.getParam('pesanan');

    this.setState({ spinner: true });

    try {
      const detail = await PesanService.detail(pesanan.id, pesanan.id_pelanggan, pesanan.id_tukang);

      this.setState({ spinner: false, detail: detail });
    } catch (error) {
      this.setState({ spinner: false });
      throw error;
    }
  }

  renderDetailPesanan = () => {
    return ('pesanan' in this.state.detail) ? (
      <Block column paddingHorizontal>
        <ListItem first>
          <Text style={text.medium}>Kode Pesanan</Text>
          <Text style={text.regular}>{this.state.detail.pesanan.kode_pesanan}</Text>
        </ListItem>
        <ListItem>
          <Text style={text.medium}>Tanggal</Text>
          <Text style={text.regular}>{moment(this.state.detail.pesanan.tanggal).format('LLL')}</Text>
        </ListItem>
        <ListItem>
          <Text style={text.medium}>Layanan</Text>
          <Text style={text.regular}>{this.state.detail.pesanan.layanan.nama}</Text>
        </ListItem>
        <ListItem>
          <Text style={text.medium}>Kerusakan</Text>
          <Text style={text.regular}>{this.state.detail.pesanan.nama_kerusakan}</Text>
        </ListItem>
        <ListItem last>
          <Text style={text.medium}>Status</Text>
          <Text style={text.regular}>{this.state.detail.pesanan.status.nama}</Text>
        </ListItem>
        <Text style={[text.regular, spacing.mt1]}>{this.state.detail.pesanan.deskripsi_kerusakan}</Text>
      </Block>
    ) : null;
  }

  renderDetailPemesan = () => {
    return 'pelanggan' in this.state.detail ? (
      <Block column paddingHorizontal>
        <Text style={[text.medium, text.fontSemiRegular, spacing.mb2]}>Pemesan</Text>
        <ListItem first>
          <Text style={text.medium}>Nama</Text>
          <Text style={text.regular}>{this.state.detail.pelanggan.nama}</Text>
        </ListItem>
        <ListItem>
          <Text style={text.medium}>No. Telp</Text>
          <Text style={text.regular}>{this.state.detail.pelanggan.no_telp}</Text>
        </ListItem>
        <ListItem last>
          <Text style={text.medium}>Kode Pengguna</Text>
          <Text style={text.regular}>{this.state.detail.pelanggan.kode_pengguna}</Text>
        </ListItem>
        <Text style={[text.regular, spacing.mt1]}>{this.state.detail.pelanggan.alamat}</Text>
      </Block>
    ) : null;
  }

  renderDetailPenerima = () => {
    return ('tukang' in this.state.detail && this.state.detail.tukang !== null) ? (
      <Block column padding>
        <Text style={[text.medium, text.fontSemiRegular, spacing.mb2]}>Penerima</Text>
        <ListItem first>
          <Text style={text.medium}>Nama</Text>
          <Text style={text.regular}>{this.state.detail.tukang.nama}</Text>
        </ListItem>
        <ListItem>
          <Text style={text.medium}>No. Telp</Text>
          <Text style={text.regular}>{this.state.detail.tukang.no_telp}</Text>
        </ListItem>
        <ListItem last>
          <Text style={text.medium}>Kode Pengguna</Text>
          <Text style={text.regular}>{this.state.detail.tukang.kode_pengguna}</Text>
        </ListItem>
        <Text style={[text.regular, spacing.mt1]}>{this.state.detail.tukang.alamat}</Text>
      </Block>
    ) : (
      <Block alignMiddle padding>
        <Text style={[text.medium, text.fontSemiRegular, spacing.mb2]}>Pesanan ini belum diterima</Text>
      </Block>
    );
  }

  render() {
    return (
      <Background color={colors.white}>
        <Spinner isVisible={this.state.spinner} type="bar" color="white" />
        <Container noPaddingAndMargin>
          <ScrollView>
            <Container>
              <Block column alignCenter alignMiddle style={spacing.mb2}>
                <Image source={require('../../assets/images/pesan@159x159.png')} width={159} height={159} />
                <Text style={[text.medium, text.fontSmall]}>Detail Pesanan</Text>
              </Block>
            </Container>
            {this.renderDetailPesanan()}
            <Separator />
            {this.renderDetailPemesan()}
            <Separator />
            {this.renderDetailPenerima()}
          </ScrollView>
        </Container>
      </Background>
    );
  }
}

export default DetailPesanan;