import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  Image,
  StatusBar,
  TouchableWithoutFeedback,
  FlatList,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
  Container,
  Block,
  Background,
  Separator,
  Spinner
} from '../../components';

import { colors, text, spacing } from '../../components/styles';

import styles from './styles';
import Storage from '../../helpers/Storage';

import NotifikasiService from '../../services/NotifikasiService';

import NotifikasiRegular from './detailnotifikasi/NotifikasiRegular';
import NotifikasiPesanan from './detailnotifikasi/NotifikasiPesanan';

class DetailNotifikasi extends Component {
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
      spinner: false,
      notifikasi: {}
    };
  }

  componentDidMount() {
    this.tandaiSudahDibaca();
  }

  tandaiSudahDibaca = async () => {
    const { navigation } = this.props;
    const notifikasi = navigation.getParam('notifikasi');

    if (notifikasi.dibaca === false) {
      this.setState({ spinner: true, notifikasi: notifikasi });

      try {
        await NotifikasiService.tandaiSudahDibaca(notifikasi.id);

        this.setState({ spinner: false });
      } catch (error) {
        this.setState({ spinner: false });
        alert('Maaf, sedang terjadi kesalahan');
      }
    }
  }

  renderNotifikasiContent = () => {
    const { navigation } = this.props;
    const notifikasi = navigation.getParam('notifikasi');

    switch(notifikasi.tipe) {
      case 'regular':
        return <NotifikasiRegular data={notifikasi} />;
        break;
      case 'pesanan':
        return <NotifikasiPesanan data={notifikasi} />;
        break;
    }
  }

  render() {
    return (
      <Background color={colors.white}>
        <Spinner isVisible={this.state.spinner} color={colors.white} type="bar" />
        <Container noPaddingAndMargin>
          <Block column alignCenter paddingHorizontal>
            <Image source={require('../../assets/images/notifikasi@189x189.png')} width={189} height={189} />
            <Text style={[
              text.fontSmall,
              text.medium
            ]}>Detail Notifikasi</Text>
          </Block>
          <Block paddingHorizontal>
            <FontAwesome5 name="trash" size={20} color={colors.black} style={[spacing.mt2]} />          
          </Block>
          <Separator />
          {this.renderNotifikasiContent()}
        </Container>
      </Background>
    );
  }
}

export default DetailNotifikasi;