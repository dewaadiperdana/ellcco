import React, { Component } from 'react';
import { View, Text, Button, Image, StatusBar, TouchableWithoutFeedback, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Container, Block, Background } from '../../components';

import { colors, text, spacing } from '../../components/styles';

import styles from './styles';
import Storage from '../../helpers/Storage';

const NotifikasiKosong = props => {
  return (
    <Container centerContent>
      <Block column alignCenter>
        <Image source={require('../../assets/images/notifikasi@189x189.png')} width={189} height={189} />
        <Text style={[
          text.fontSmall,
          text.medium,
          text.alignCenter
        ]}>Anda Belum Memiliki Notifikasi</Text>
      </Block>
    </Container>
  );
}

export default NotifikasiKosong;