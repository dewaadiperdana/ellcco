import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Container } from "../../components";

import Storage from "../../helpers/Storage";

class Jasa extends Component {
  static navigationOptions = {
    header: null,
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      return (
        <FontAwesome5
          name="tools"
          size={20}
          focused={focused}
          color={tintColor}
        />
      );
    }
  };

  logout = async () => {
    Storage.delete("auth");

    this.props.navigation.navigate("AuthLoading");
  };

  render() {
    return (
      <Container centerContent>
        <Button title="Logout" onPress={this.logout} />
      </Container>
    );
  }
}

export default Jasa;
