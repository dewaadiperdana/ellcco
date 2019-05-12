import React, { Component } from 'react';
import { View, Text } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Container } from '../../components';

class Lainnya extends Component {
  static navigationOptions = {
    header: null,
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      return <FontAwesome5 name="bars" size={20} focused={focused} color={tintColor} />;
    },
  };

  render() {
    return (
      <Container centerContent>
        <Text>Lainnya</Text>
      </Container>
    );
  }
}

export default Lainnya;