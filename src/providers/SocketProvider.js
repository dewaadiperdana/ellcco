import io from 'socket.io-client';
import React, { Component } from 'react';
import Sound from 'react-native-sound';
import AsyncStorage from '@react-native-community/async-storage';
import { AppState, Vibration } from 'react-native';

class SocketProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      appState: AppState.currentState
    };
    
    this.handleAppStateChange = this.handleAppStateChange.bind(this);
    this.socket = io('http://192.168.43.13:3000');

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
    this.socket.on('on_new_order', this.onNewOrderListener);

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

  emitNewSocketId = () => {
    // this.socket.emit('on_new_socket_id', JSON.stringify({
    //   id_pengguna: '1e2e3b32-00be-4826-b123-d84495fa5b86',
    //   socket: this.socket.id
    // }));

    this.emitNewFcmToken();
  }

  emitNewFcmToken = async () => {
    const token = await AsyncStorage.getItem('fcm_token');

    if (token) {
      this.socket.emit('on_new_fcm_token', JSON.stringify({
        id_pengguna: 'xxx',
        token: token
      }));
    }
  }

  render() {
    return null;
  }
}

export default SocketProvider;