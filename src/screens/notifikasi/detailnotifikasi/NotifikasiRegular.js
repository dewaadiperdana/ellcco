import React from 'react';
import { Text } from 'react-native';
import {
  Container,
  Block,
  Background,
  Separator
} from '../../../components';

import { colors, text, spacing } from '../../../components/styles';

const NotifikasiRegular = props => {
  return (
    <Block column alignLeft paddingHorizontal>
      <Text style={[text.fontSemiRegular, text.medium]}>Pesanan</Text>
      <Text style={[text.fontRegular, text.regular, spacing.mb2]}>17 Mei 2019</Text>
      <Text style={[text.fontRegular, text.light]}>Pesanan anda telah diterima</Text>
    </Block>
  );
};

export default NotifikasiRegular;