import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {
  Container,
  Spinner,
  Block,
  Background,
  Illustration
} from "../../components";
import JasaService from "../../services/JasaService";
import styles from "./styles";
import Socket from "../../providers/Socket";

import { text, colors, spacing } from "../../components/styles";

class Pesan extends Component {
  static navigationOptions = {
    header: null,
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      return (
        <FontAwesome5
          name="shopping-bag"
          size={20}
          focused={focused}
          color={tintColor}
        />
      );
    }
  };

  constructor(props) {
    super(props);

    this.state = {
      jasa: [],
      spinner: false
    };
  }

  componentDidMount() {
    this._fetchJasa();
  }

  _fetchJasa = async () => {
    this.setState({ spinner: true });

    try {
      const jasa = await JasaService.index();

      this.setState({ jasa: jasa, spinner: false });
    } catch (error) {
      this.setState({ spinner: false });
      alert(error);
    }
  };

  onPressMenu = item => {
    this.props.navigation.navigate("FormPesan", {
      jasa: item
    });
  };

  render() {
    return (
      <Background color={colors.white}>
        <Spinner
          isVisible={this.state.spinner}
          type="bar"
          color={colors.black}
          whiteBackdrop
        />
        <Container style={{ flex: 0 }}>
          <Block spaceBetween>
            <Block>
              <Illustration
                width={152}
                height={152}
                source={require("../../assets/images/pesan.jpg")}
              />
            </Block>
            <Block column alignLeft alignMiddle wrapContent style={spacing.ml2}>
              <Text style={[text.h1, text.alignLeft]}>Pesan</Text>
              <Text style={[text.paragraph, text.alignLeft]}>
                Silahkan pilih jasa yang tertera dibawah
              </Text>
            </Block>
          </Block>
          <Text style={[text.fontSemiRegular, text.medium, spacing.mt2]}>
            Jasa Perbaikan
          </Text>
        </Container>
        <Container noPaddingAndMargin={true}>
          <ScrollView>
            <FlatList
              data={this.state.jasa}
              keyExtractor={(item, index) => item.id}
              contentContainerStyle={{
                borderTopWidth: 1,
                borderBottomWidth: 1,
                borderColor: colors.extraLightGrey
              }}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              renderItem={({ item }) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.menu}
                  onPress={() => this.onPressMenu(item)}
                >
                  <Block spaceBetween>
                    <Text style={text.fontRegular}>{item.nama}</Text>
                    <FontAwesome5 name="angle-right" size={20} />
                  </Block>
                </TouchableOpacity>
              )}
            />
          </ScrollView>
        </Container>
      </Background>
    );
  }
}

export default Pesan;
