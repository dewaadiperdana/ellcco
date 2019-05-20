import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Background, Container, Button, Wrapper } from '../../components';

import { colors, text, spacing } from '../../components/styles';

const HistoriKosong = props => {
  return (
    <Container centerContent>
      <Image source={require('../../assets/images/histori@258.png')} width={266} height={266} />
      <Text style={[
        text.medium,
        text.fontSmall,
        text.alignCenter,
        spacing.mt4,
        spacing.mb4
      ]}>Anda Belum Memesan Layanan</Text>
      <Button
        fullRound={true}
        block={true}
        green={true}
        textLight={true}
        onPress={props.gotoPesan}>Pesan Sekarang</Button>
    </Container>
  );
};

export default HistoriKosong;