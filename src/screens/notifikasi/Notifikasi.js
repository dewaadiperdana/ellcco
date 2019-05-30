import React, { Component } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';
import { Background, Spinner } from '../../components';

import { colors } from '../../components/styles';

import NotifikasiService from '../../services/NotifikasiService';
import NotifikasiKosong from './NotifikasiKosong';
import ListNotifikasi from './ListNotifikasi';
import Storage from '../../helpers/Storage';

import { fetchAllNotifications } from '../../store/actions/notificationAction';

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
    this.props.fetchAllNotifications();
  }

  gotoDetailNotifikasi = item => {
    this.props.navigation.navigate('DetailNotifikasi', {
      notifikasi: item
    });
  }

  render() {
    const notifikasiComponent = this.props.allNotifications.length >= 1 ? (
      <ListNotifikasi gotoDetailNotifikasi={this.gotoDetailNotifikasi} notifikasi={this.props.allNotifications} />
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

const mapStateToProps = state => {
  return {
    allNotifications: state.notifications.all
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAllNotifications: () => { dispatch(fetchAllNotifications()) }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifikasi);