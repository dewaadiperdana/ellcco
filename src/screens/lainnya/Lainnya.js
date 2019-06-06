import React, { Component } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Container, ListItem, Block } from "../../components";

import { colors, text, spacing } from "../../components/styles";

import Storage from "../../helpers/Storage";

class Lainnya extends Component {
  static navigationOptions = {
    title: "Lainnya",
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      return (
        <FontAwesome5
          name="bars"
          size={20}
          focused={focused}
          color={tintColor}
        />
      );
    }
  };

  _logout = async () => {
    Storage.delete("auth");
    Storage.delete("fcm_token");

    this.props.navigation.navigate("AuthLoading");
  };

  _goto = screen => {
    this.props.navigation.navigate(screen);
  };

  render() {
    return (
      <Container noPaddingAndMargin>
        <Block column paddingVertical>
          <View style={styles.header}>
            <Text style={[text.bold, text.fontSemiRegular]}>Menu Lainnya</Text>
          </View>
          <ListItem>
            <TouchableOpacity onPress={() => this._goto("EditProfil")}>
              <Block paddingHorizontal>
                <Text style={[text.medium]}>Edit Profil</Text>
              </Block>
            </TouchableOpacity>
          </ListItem>
          <ListItem>
            <TouchableOpacity onPress={this._logout}>
              <Block paddingHorizontal>
                <Text style={[text.medium]}>Keluar</Text>
              </Block>
            </TouchableOpacity>
          </ListItem>
        </Block>
      </Container>
    );
  }
}

export default Lainnya;

const styles = StyleSheet.create({
  header: {
    marginTop: -10,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: colors.verylightgrey,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 2
  }
});
