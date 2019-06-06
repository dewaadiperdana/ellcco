import React, { Component } from "react";
import { TouchableWithoutFeedback } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { colors, text, spacing, fonts } from "../../components/styles";

class EditProfil extends Component {
  static navigationOptions = {
    title: "Edit Profil",
    headerStyle: {
      marginTop: 20
    },
    headerTitleStyle: {
      fontFamily: fonts.bold,
      color: colors.black
    },
    headerLeft: ({ onPress }) => (
      <TouchableWithoutFeedback onPress={() => onPress()}>
        <Icon size={18} color={colors.black} name="arrow-left" />
      </TouchableWithoutFeedback>
    ),
    headerLeftContainerStyle: {
      paddingLeft: 30
    }
  };

  render() {
    return null;
  }
}

export default EditProfil;
