import React, {Component} from 'react';
import {AppState, Platform, StyleSheet, Text, View, Alert, Picker, Button, Vibration} from 'react-native';
import firebase from 'react-native-firebase';
import type { RemoteMessage, Notification, NotificationOpen } from 'react-native-firebase';
import io from 'socket.io-client';
import AsyncStorage from '@react-native-community/async-storage';
import Sound from 'react-native-sound';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notifikasi: null,
      appState: AppState.currentState
    };

    this.socket = io('http://192.168.43.13:3000');
    
    this.socket.on('connect', () => {
      this.registerSocketListener();

      this.socket.emit('on_new_socket_id', JSON.stringify({
        id_pengguna: '1e2e3b32-00be-4826-b123-d84495fa5b86',
        socket: this.socket.id
      }));
    });

    this.handleAppStateChange = this.handleAppStateChange.bind(this);

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
    this.socket.on('on_new_order', message => {
      if (this.state.appState === 'active') {
        this.setState({ notifikasi: message });

        this.playInAppNotificationSound();
      }
    });
  }

  playInAppNotificationSound = () => {
    Vibration.vibrate(700);
    this.inAppNotificationSound.play();
  }

  async componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
    this.checkPermission();
    this.createNotificationListeners();

    const channelId = new firebase.notifications.Android.Channel("ellcco", "Ellcco Channel", firebase.notifications.Android.Importance.High)
      .setSound('stairs.mp3');
    firebase.notifications().android.createChannel(channelId);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
    this.notificationListener();
    this.notificationOpenedListener();
  }

  async createNotificationListeners() {
    this.notificationListener = firebase.notifications().onNotification(async (notification) => {
      let localNotification = new firebase.notifications.Notification({
        data: notification.data,
        title: notification.title,
        body: notification.body
      })
      .android.setPriority(firebase.notifications.Android.Priority.Max)
      .android.setChannelId("default_notification_channel_id")
      .android.setVibrate(1000);

      firebase.notifications().displayNotification(localNotification);
    });

    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      console.log('notification in background');
      const { title, body } = notificationOpen.notification;
    });

    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
      const { title, body } = notificationOpen.notification;
    }

    this.messageListener = firebase.messaging().onMessage(async (message) => {
      // const channelId = new firebase.notifications.Android.Channel("ellcco", "Ellcco Channel", firebase.notifications.Android.Importance.Max);

      // firebase.notifications().android.createChannel(channelId);

      // let localNotification = new firebase.notifications.Notification({
      //   data: message.data,
      //   sound: 'stairs.mp3',
      //   show_in_foreground: true,
      //   title: message.title,
      //   body: message.body
      // })
      // .android.setPriority(firebase.notifications.Android.Priority.Max)
      // .android.setChannelId("ellcco")
      // .android.setVibrate(1000);

      // firebase.notifications().displayNotification(localNotification);
    });
  }

  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');

    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();

      if (fcmToken) {
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }

    this.socket.emit('on_new_fcm_token', JSON.stringify({
      id_pengguna: '1e2e3b32-00be-4826-b123-d84495fa5b86',
      token: fcmToken
    }));
  }

  async requestPermission() {
    try {
      const permission = await firebase.messaging().requestPermission();
      this.getToken();
    } catch (error) {
      console.log('permission rejected');
    }
  }

  render() {
    const notifikasi = this.state.notifikasi === null ? (
      <Text>No notification</Text>
    ) : (<Text>{this.state.notifikasi}</Text>);
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Ellcco
        </Text>
        {notifikasi}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  picker: {
    width: 100
  }
});
cd 