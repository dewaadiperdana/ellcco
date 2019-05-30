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

class NotifikasiPesanan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      spinner: false,
      notifikasi: props.data,
      detail: {}
    };
  }

  componentDidMount() {
    this.getDetailPesanan();
  }

  getDetailPesanan = async () => {
    this.setState({ spinner: true });

    const data = JSON.parse(this.state.notifikasi.data);

    try {
      const pesanan = await PesanService.detail(data.id);
      this.setState({ spinner: false, detail: pesanan });
    } catch (error) {
      this.setState({ spinner: false });
      alert(error);
    }
  }

  render() {
    const { detail, spinner, notifikasi } = this.state;
    const pesanan = JSON.parse(notifikasi.data);

    return (
      <Wrapper>
        <Spinner isVisible={spinner} whiteBackdrop color={colors.black} type="bar" />
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
              <Text style={text.regular}>{'jasa' in detail ? detail.jasa.nama : '-'}</Text>
            </ListItem>
            <ListItem last>
              <Text style={text.medium}>Status</Text>
              <Badge>
                {'status' in detail ? detail.status.replace('-', ' ') : '-'}
              </Badge>
            </ListItem>
            <Text style={[spacing.mt1, text.regular]}>{detail.deskripsi_kerusakan}</Text>
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
              <Text style={text.regular}>{'pelanggan' in detail ? detail.pelanggan.nama : '-'}</Text>
            </ListItem>
            <ListItem>
              <Text style={text.medium}>No. Telp</Text>
              <Text style={[text.regular, text.alignLeft]}>{'pelanggan' in detail ? detail.pelanggan.no_telp : ''}</Text>
            </ListItem>
            <ListItem last>
              <Text style={text.medium}>Kode Pengguna</Text>
              <Text style={text.regular}>{'pelanggan' in detail ? detail.pelanggan.kode : '-'}</Text>
            </ListItem>
            <Text style={spacing.mt1}>{'pelanggan' in detail ? detail.pelanggan.alamat : '-'}</Text>
          </Block>
          <Separator />
          <Block padding>
            <Button fullRound block textLight onPress={() => this.props.onTerima(pesanan)}>Terima Pesanan</Button>
          </Block>
        </ScrollView>
      </Wrapper>
    );
  }
}

export default NotifikasiPesanan;