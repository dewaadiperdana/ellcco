import React, { Component } from 'react';
import { View, Text, Button, Image, StatusBar, TouchableWithoutFeedback, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Container, Block, Background } from '../../components';

import { colors, text, spacing } from '../../components/styles';

import styles from './styles';
import Storage from '../../helpers/Storage';

import NotifikasiKosong from './NotifikasiKosong';
import ListNotifikasi from './ListNotifikasi';

class Notifikasi extends Component {
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
      notifikasi: [
        {
          id: 'alsdkas',
          judul: 'Pesanan',
          tanggal: '17 Mei 2019',
          deskripsi: 'Pesanan anda telah diterima',
          dibaca: false,
          tipe: 'regular'
        },
        {
          id: 'a0sdapasod',
          judul: 'Pesanan',
          tanggal: '17 Mei 2019',
          deskripsi: 'Pesanan anda telah diterima',
          dibaca: true,
          tipe: 'regular'
        },
        {
          id: 'asd09asdkl',
          judul: 'Pesanan',
          tanggal: '17 Mei 2019',
          deskripsi: 'Pesanan anda telah diterima',
          dibaca: true,
          tipe: 'pesanan'
        }
      ]
    };
  }

  gotoDetailNotifikasi = item => {
    this.props.navigation.navigate('DetailNotifikasi', {
      notifikasi: item
    });
  }

  render() {
    const notifikasiComponent = this.state.notifikasi ? (
      <ListNotifikasi gotoDetailNotifikasi={this.gotoDetailNotifikasi} notifikasi={this.state.notifikasi} />
    ) : (
      <NotifikasiKosong />
    );

    return (
      <Background color={colors.white}>
        <StatusBar barStyle="dark-content" hidden={false} backgroundColor={colors.white} translucent={true} />
        {notifikasiComponent}
      </Background>
    );
  }
}

export default Notifikasi;