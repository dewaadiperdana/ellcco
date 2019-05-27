import io from 'socket.io-client';
import React, { Component } from 'react';
import Sound from 'react-native-sound';
import { AppState, Vibration } from 'react-native';
import Storage from '../helpers/Storage';
import Socket from './Socket';
import Config from 'react-native-config';
import { connect } from 'react-redux';
import { fetchUnreadNotifications } from '../store/actions/notificationAction';

import {
  ON_NEW_ORDER,
  ON_ORDER_ACCEPTED,
  ON_NEW_SOCKET_ID,
  ON_REUQEST_JOIN_ROOM
} from '../config/events';

class SocketProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      appState: AppState.currentState,
      auth: {}
    };
    
    this.handleAppStateChange = this.handleAppStateChange.bind(this);

    // this.socket.on('connect', () => {
    //   this.registerSocketListener();
    //   this.emitNewSocketId();
    // });

    this.inAppNotificationSound = new Sound('stairs.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('Failed to load the sound', error);
        return;
      }
    });
  }

  componentDidMount() {
    Socket.connect();

    Socket.io.on('connect', this.sendNewSocket);
  }

  sendNewSocket = async () => {
    const auth = await Storage.get('auth');
    
    this.setState({ auth: auth });

    Socket.io.emit(ON_NEW_SOCKET_ID, JSON.stringify({
      hakAkses: auth.akun.hak_akses,
      idAkun: auth.akun.id,
      socket: Socket.io.id
    }));
  }

  handleAppStateChange = (nextAppState) => {
    this.setState({appState: nextAppState});
  }

  registerSocketListener = () => {
    this.socket.on(ON_NEW_ORDER, this.onNewOrderListener);
    this.socket.on(ON_ORDER_ACCEPTED, this.onOrderAcceptedListener);

    // Other listeners will be down here...
  }

  playInAppNotificationSound = () => {
    Vibration.vibrate(700);
    this.inAppNotificationSound.play();
  }

  onNewOrderListener = message => {
    if (this.state.appState === 'active') {
      this.playInAppNotificationSound();
      this.props.fetchUnreadNotifications();
    }
  }

  onOrderAcceptedListener = async message => {
    if (this.state.appState === 'active') {
      this.playInAppNotificationSound();
      this.props.fetchUnreadNotifications();
      
      const auth = await Storage.get('auth');

      this.socket.emit(ON_REUQEST_JOIN_ROOM, JSON.stringify({
        tipe: 'pelanggan',
        id: auth.id
      }));
    }
  }

  emitNewSocketId = async () => {
    const token = await Storage.get('fcm_token');
    const auth = await Storage.get('auth');

    this.socket.emit(ON_NEW_SOCKET_ID, JSON.stringify({
      id_pengguna: auth.id,
      socket: this.socket.id
    }));

    this.emitNewFcmToken();
  }

  emitNewFcmToken = async () => {
    const token = await Storage.get('fcm_token');
    const auth = await Storage.get('auth');

    if (token) {
      this.socket.emit(ON_NEW_FCM_TOKEN, JSON.stringify({
        id_pengguna: auth.id,
        token: token
      }));
    }
  }

  render() {
    return null;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUnreadNotifications: () => dispatch(fetchUnreadNotifications())
  };
};

export default connect(null, mapDispatchToProps)(SocketProvider);