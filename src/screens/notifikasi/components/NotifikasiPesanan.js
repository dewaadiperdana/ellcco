import React, { Component } from 'react';
import { Text, ScrollView } from 'react-native';
import {
  Block,
  Separator,
  Button,
  ListItem,
  Spinner,
  Wrapper,
  Container,
  Badge
} from '../../../components';

import { text, spacing, colors } from '../../../components/styles';
import moment from 'moment';
import PesanService from '../../../services/PesanService';
import Pemesanan from '../../../models/pemesanan';
import Storage from '../../../helpers/Storage';
import Auth from '../../../models/auth';

class NotifikasiPesanan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      spinner: false,
      notifikasi: props.data,
      detail: new Pemesanan({}),
      auth: new Auth({})
    };
  }

  static getDerivedStateFromProps(props, state) {
    console.log(props);
    return {...props};
  }

  componentDidMount() {
    this.getAuth();
  }

  getAuth = async () => {
    const auth = await Storage.get('auth');

    this.setState({ auth: auth });
  }

  // getDetailPesanan = async () => {
  //   this.setState({ spinner: true });

  //   const data = JSON.parse(this.state.notifikasi.data);

  //   try {
  //     const pesanan = await PesanService.detail(data.id);
  //     this.setState({ spinner: false, detail: pesanan });
  //   } catch (error) {
  //     this.setState({ spinner: false });
  //     alert(error);
  //   }
  // }

  render() {
    const { spinner, notifikasi, auth } = this.state;
    const { detail } = this.props;
    const pesanan = JSON.parse(notifikasi.data);

    return (
      <Wrapper>
        <Spinner isVisible={spinner} color={colors.black} type="bar" />
        <ScrollView>
          <Block column paddingHorizontal>
            <Text style={[
              text.fontSemiRegular,
              text.medium,
              spacing.mb2
            ]}>Pesanan</Text>
            <ListItem first>
              <Text style={text.medium}>Kode Pesanan</Text>
              <Text style={text.regular}>{detail.kode}</Text>
            </ListItem>
            <ListItem>
              <Text style={text.medium}>Tanggal</Text>
              <Text style={[text.regular, text.alignLeft]}>{moment(detail.tanggal).format('LLL')}</Text>
            </ListItem>
            <ListItem>
              <Text style={text.medium}>Layanan</Text>
              <Text style={text.regular}>{detail.jasa.nama}</Text>
            </ListItem>
            <ListItem>
              <Text style={text.medium}>Kerusakan</Text>
              <Text style={text.regular}>{detail.kerusakan}</Text>
            </ListItem>
            <ListItem last>
              <Text style={text.medium}>Status</Text>
              <Badge>
                {detail.status.replace('-', ' ')}
              </Badge>
            </ListItem>
            <Text style={[spacing.mt1, text.regular]}>{detail.deskripsi}</Text>
          </Block>
          <Separator />
          <Block column paddingHorizontal>
            <Text style={[
              text.fontSemiRegular,
              text.medium,
              spacing.mb2
            ]}>Pemesan</Text>
            <ListItem first>
              <Text style={text.medium}>Nama</Text>
              <Text style={text.regular}>{detail.pelanggan.nama}</Text>
            </ListItem>
            <ListItem>
              <Text style={text.medium}>No. Telp</Text>
              <Text style={[text.regular, text.alignLeft]}>{detail.pelanggan.no_telp}</Text>
            </ListItem>
            <ListItem last>
              <Text style={text.medium}>Kode Pengguna</Text>
              <Text style={text.regular}>{detail.pelanggan.kode}</Text>
            </ListItem>
            <Text style={spacing.mt1}>{detail.pelanggan.alamat}</Text>
          </Block>
          <Separator />
          {auth.akun.hak_akses === 'tukang' ? (
            <Block padding>
              <Button fullRound block textLight onPress={() => this.props.onTerima(pesanan)}>Terima Pesanan</Button>
            </Block>
          ) : null}
        </ScrollView>
      </Wrapper>
    );
  }
}

export default NotifikasiPesanan;