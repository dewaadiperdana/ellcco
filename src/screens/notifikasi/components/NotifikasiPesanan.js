import React, { Component } from 'react';
import { Text, ScrollView } from 'react-native';
import {
  Block,
  Separator,
  Button,
  ListItem,
  Spinner,
  Wrapper,
  Container
} from '../../../components';

import { text, spacing, colors } from '../../../components/styles';
import moment from 'moment';

const NotifikasiPesanan = props => {
  const data = JSON.parse(props.data.data);

  return (
    <Wrapper>
      <ScrollView>
        <Block column paddingHorizontal>
          <Text style={[
            text.fontSemiRegular,
            text.medium,
            spacing.mb2
          ]}>Pesanan</Text>
          <ListItem first>
            <Text style={text.medium}>Kode Pesanan</Text>
            <Text style={text.regular}>{data.pesanan.kode_pesanan}</Text>
          </ListItem>
          <ListItem>
            <Text style={text.medium}>Tanggal</Text>
            <Text style={[text.regular, text.alignLeft]}>{moment(data.pesanan.tanggal).format('LLL')}</Text>
          </ListItem>
          <ListItem>
            <Text style={text.medium}>Layanan</Text>
            <Text style={text.regular}>{data.pesanan.layanan.nama}</Text>
          </ListItem>
          <ListItem last>
            <Text style={text.medium}>Status</Text>
            <Text style={text.regular}>{data.pesanan.status.nama}</Text>
          </ListItem>
          <Text style={[spacing.mt1, text.regular]}>{data.pesanan.deskripsi_kerusakan}</Text>
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
            <Text style={text.regular}>{data.pelanggan.nama}</Text>
          </ListItem>
          <ListItem>
            <Text style={text.medium}>No. Telp</Text>
            <Text style={[text.regular, text.alignLeft]}>{data.pelanggan.no_telp}</Text>
          </ListItem>
          <ListItem last>
            <Text style={text.medium}>Kode Pengguna</Text>
            <Text style={text.regular}>{data.pelanggan.kode_pengguna}</Text>
          </ListItem>
          <Text style={spacing.mt1}>{data.pelanggan.alamat}</Text>
        </Block>
        <Separator />
        <Block padding>
          <Button fullRound block textLight onPress={() => props.onTerima(data.pesanan)}>Terima Pesanan</Button>
        </Block>
      </ScrollView>
    </Wrapper>
  );
}

export default NotifikasiPesanan;