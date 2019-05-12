import React, { Component } from 'react';
import { View, Text } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Container } from '../../components';

class Pesan extends Component {
  static navigationOptions = {
    header: null,
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      return <FontAwesome5 name="shopping-bag" size={20} focused={focused} color={tintColor} />;
    },
  };

  render() {
    return (
      <Container centerContent>
        <Text>Pesanan</Text>
      </Container>
    );
  }
}

export default Pesan;