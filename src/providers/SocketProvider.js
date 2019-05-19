import io from 'socket.io-client';
import React, { Component } from 'react';
import Sound from 'react-native-sound';
import { AppState, Vibration } from 'react-native';
import Storage from '../helpers/Storage';
import Socket from '../helpers/Socket';
import Config from 'react-native-config';
import { ON_NEW_FCM_TOKEN, ON_NEW_ORDER, ON_ORDER_ACCEPTED } from '../config/events';

class SocketProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      appState: AppState.currentState
    };
    
    this.handleAppStateChange = this.handleAppStateChange.bind(this);
    this.socket = io(Config.APP_URL);

    this.socket.on('connect', () => {
      this.registerSocketListener();
      this.emitNewSocketId();
    });

    this.inAppNotificationSound = new Sound('stairs.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('Failed to load the sound', error);
        return;
      }
    });
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

      // What todo next?
    }
  }

  onOrderAcceptedListener = message => {
    if (this.state.appState === 'active') {
      this.playInAppNotificationSound();
    }
  }

  emitNewSocketId = async () => {
    const token = await Storage.get('fcm_token');
    const auth = await Storage.get('auth');

    this.socket.emit('on_new_socket_id', JSON.stringify({
      id_pengguna: auth.id,
      socket: this.socket.id
    }));

    this.emitNewFcmToken();
  }

  emitNewFcmToken = async () => {
    const token = await Storage.get('fcm_token');
    const auth = await Storage.get('auth');

    if (token) {
      this.socket.emit('on_new_fcm_token', JSON.stringify({
        id_pengguna: auth.id,
        token: token
      }));
    }
  }

  render() {
    return null;
  }
}

export default SocketProvider;