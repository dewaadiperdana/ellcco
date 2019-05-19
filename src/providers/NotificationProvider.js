import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import Storage from '../helpers/Storage';
import Socket from '../helpers/Socket';
import SocketProvider from './SocketProvider';

class NotificationProvider extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    this.checkPermission();
    this.createNotificationListeners();
  }

  async componentWillUnmount() {
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
    let fcmToken = await Storage.get('fcm_token');

    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();

      if (fcmToken) {
        await Storage.put('fcm_token', fcmToken);
      }
    }

    console.log(`FCM Token: ${fcmToken}`);
  }

  async requestPermission() {
    try {
      const permission = await firebase.messaging().requestPermission();

      this.getToken();
    } catch (error) {
      console.log('Permission rejected');
    }
  }

  render() {
    return null;
  }
}

export default NotificationProvider;