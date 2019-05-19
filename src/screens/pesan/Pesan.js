import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Container, Spinner, Block, Background } from '../../components';
import LayananService from '../../services/LayananService';
import styles from './styles';

import { text, colors, spacing } from '../../components/styles';

class Pesan extends Component {
  static navigationOptions = {
    header: null,
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      return <FontAwesome5 name="shopping-bag" size={20} focused={focused} color={tintColor} />;
    },
  };

  constructor(props) {
    super(props);

    this.state = {
      layanan: [],
      spinner: false
    };
  }

  componentDidMount() {
    this.getAllLayanan();
  }

  getAllLayanan = async () => {
    this.setState({ spinner: true });

    try {
      const layanan = await LayananService.getLayanan();

      this.setState({ layanan: layanan, spinner: false });
    } catch (error) {
      this.setState({ spinner: false });
    }
  }

  onPressMenu = item => {
    this.props.navigation.navigate('FormPesan', {
      layanan: item
    });
  }

  render() {
    return (
      <Background color={colors.white}>
        <Spinner isVisible={this.state.spinner} type="bar" color="white" />
        <Container style={{flex: 0}}>
          <Block spaceBetween>
            <Block>
              <Image source={require('../../assets/images/pesan@152x152.png')} width={152} height={152} />
            </Block>
            <Block column alignLeft alignMiddle wrapContent style={spacing.ml2}>
              <Text style={[text.h1, text.alignLeft]}>Pesan</Text>
              <Text style={[text.paragraph, text.alignLeft]}>
                Silahkan pilih layanan yang tertera dibawah
              </Text>
            </Block>
          </Block>
          <Text style={[text.fontSemiRegular, text.medium, spacing.mt2]}>Layanan Perbaikan</Text>
        </Container>
        <Container noPaddingAndMargin={true}>
          <ScrollView>
            <FlatList
              data={this.state.layanan}
              keyExtractor={(item, index) => item.id}
              contentContainerStyle={{ borderTopWidth: 1, borderBottomWidth: 1, borderColor: colors.extraLightGrey }}
              ItemSeparatorComponent={() => (
                <View style={styles.separator} />
              )}
              renderItem={({item}) => (
                <TouchableOpacity key={item.id} style={styles.menuLayanan} onPress={() => this.onPressMenu(item)}>
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