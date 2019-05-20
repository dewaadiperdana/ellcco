import React, { Component } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Background, Spinner } from '../../components';

import { colors } from '../../components/styles';

import styles from './styles';

import NotifikasiService from '../../services/NotifikasiService';
import NotifikasiKosong from './NotifikasiKosong';
import ListNotifikasi from './ListNotifikasi';
import Storage from '../../helpers/Storage';

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
      notifikasi: []
    };
  }

  componentDidMount() {
    this.getNotifikasi();
  }

  getNotifikasi = async () => {
    this.setState({ spinner: true });

    const auth = await Storage.get('auth');

    try {
      const notifikasi = await NotifikasiService.getNotifikasi(auth.id);  
      
      this.setState({ spinner: false, notifikasi: notifikasi });
    } catch (error) {
      alert('Maaf, sedang terjadi kesalahan');
      this.setState({ spinner: false });
    }
    
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
        <Spinner isVisible={this.state.spinner} type="bar" color={colors.white} />
        {notifikasiComponent}
      </Background>
    );
  }
}

export default Notifikasi;