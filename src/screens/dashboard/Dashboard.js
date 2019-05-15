import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Container } from '../../components';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import NotificationProvider from '../../providers/NotificationProvider';
import SocketProvider from '../../providers/SocketProvider';

class Dashboard extends Component {
  static navigationOptions = {
    header: null,
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      return <FontAwesome5 name="home" size={20} focused={focused} color={tintColor} />;
    },
  };

  render() {
    return (
      <Container centerContent>
        <NotificationProvider />
        <SocketProvider />
        
        <Text>Dashboard</Text>
      </Container>
    );
  }
}

export default Dashboard;