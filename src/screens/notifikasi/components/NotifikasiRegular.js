import React from 'react';
import { Text } from 'react-native';
import {
  Block,
} from '../../../components';

import { colors, text, spacing } from '../../../components/styles';

import moment from 'moment';

const NotifikasiRegular = props => {
  return (
    <Block column alignLeft paddingHorizontal>
      <Text style={[text.fontSemiRegular, text.medium]}>{props.data.judul}</Text>
      <Text style={[text.fontRegular, text.regular, spacing.mb2]}>{moment(props.data.tanggal).format('LLL')}</Text>
      <Text style={[text.fontRegular, text.light]}>{props.data.deskripsi}</Text>
    </Block>
  );
};

export default NotifikasiRegular;