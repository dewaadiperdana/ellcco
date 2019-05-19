import React from 'react';
import { Text, ScrollView } from 'react-native';
import {
  Container,
  Block,
  Background,
  Separator,
  Button,
  ListItem
} from '../../../components';

import { colors, text, spacing } from '../../../components/styles';

const NotifikasiPesanan = props => {
  return (
    <ScrollView>
      <Block column paddingHorizontal>
        <Text style={[
          text.fontSemiRegular,
          text.medium,
          spacing.mb2
        ]}>Pesanan</Text>
        <ListItem first>
          <Text style={text.medium}>Kode Pesanan</Text>
          <Text style={text.regular}>PS-XXXXXX</Text>
        </ListItem>
        <ListItem>
          <Text style={text.medium}>Tanggal</Text>
          <Text style={[text.regular, text.alignLeft]}>17 Mei 2019</Text>
        </ListItem>
        <ListItem>
          <Text style={text.medium}>Layanan</Text>
          <Text style={text.regular}>Televisi</Text>
        </ListItem>
        <ListItem>
          <Text style={text.medium}>Kerusakan</Text>
          <Text style={text.regular}>Mati Total</Text>
        </ListItem>
        <ListItem last>
          <Text style={text.medium}>Status</Text>
          <Text style={text.regular}>Menunggu Penerimaan</Text>
        </ListItem>
        <Text style={spacing.mt1}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel odio eu nibh interdum sodales eu quis tortor. Nulla luctus augue auctor pretium porta. Donec ac purus vestibulum nulla faucibus lobortis
        </Text>
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
          <Text style={text.regular}>Adi Perdana</Text>
        </ListItem>
        <ListItem>
          <Text style={text.medium}>No. Telp</Text>
          <Text style={[text.regular, text.alignLeft]}>085XXXXXXXXX</Text>
        </ListItem>
        <ListItem last>
          <Text style={text.medium}>Kode Pengguna</Text>
          <Text style={text.regular}>PL-XXXXXX</Text>
        </ListItem>
        <Text style={spacing.mt1}>
          Jl. Denpasar Gilimanuk No. XXX, Gang. XXX, Br. Sembung Kumpi, Sembung Gede, Kerambitan, Tabanan.
        </Text>
      </Block>
      <Separator />
      <Block paddingHorizontal>
        <Button fullRound block textLight>Terima Pesanan</Button>
      </Block>
    </ScrollView>
  );
};

export default NotifikasiPesanan;