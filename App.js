import React, {Component} from 'react';
import {AppState, Platform, StyleSheet, Text, View, Alert, Picker, Button} from 'react-native';
import firebase from 'react-native-firebase';
import type { RemoteMessage, Notification, NotificationOpen } from 'react-native-firebase';
import SocketIOClient from 'socket.io-client';
import AsyncStorage from '@react-native-community/async-storage';

export default class App extends Component {
  constructor(props) {
    super(props);
  
    this.state = {};

    this.socket = SocketIOClient('http://192.168.43.13:3000');
  }

  async componentDidMount() {
    this.checkPermission();
    this.createNotificationListeners();
  }

  componentWillUnmount() {
    this.notificationListener();
    this.notificationOpenedListener();
  }

  async createNotificationListeners() {
    this.notificationListener = firebase.notifications().onNotification(async (notification) => {
      const channelId = new firebase.notifications.Android.Channel("my_channel", "My Channel", firebase.notifications.Android.Importance.Max);

      firebase.notifications().android.createChannel(channelId);

      let localNotification = new firebase.notifications.Notification({
        data: notification.data,
        sound: 'default',
        show_in_foreground: true,
        title: notification.title,
        body: notification.body
      })
      .android.setPriority(firebase.notifications.Android.Priority.Max)
      .android.setChannelId("my_channel")
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
      console.log('new message');
      const newNotification = new firebase.notifications.Notification()
        .android.setChannelId(message.data.channelId)
        .setNotificationId(message.messageId)
        .setTitle(message.data.title)
        .setBody(message.data.body)
        .setSound("default")
        .setData(message.Data)
        .android.setAutoCancel(true)
        .android.setSmallIcon('ic_launcher')
        .android.setCategory(firebase.notifications.Android.Category.Alarm)

      // Build a channel
      const channelId = new firebase.notifications.Android.Channel(message.data.channelId, "My channel", firebase.notifications.Android.Importance.Max);

      // Create the channel
      await firebase.notifications().android.createChannel(channelId);
      await firebase.notifications().displayNotification(newNotification);
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

    console.log(fcmToken);

    this.socket.emit('on_new_fcm_token', JSON.stringify({
      id_pengguna: '21de8431-cc71-4222-80b3-649983a76175',
      token: fcmToken
    }));
  }

  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      this.getToken();
    } catch (error) {
      console.log('permission rejected');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Choose your notification time in seconds
        </Text>
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
