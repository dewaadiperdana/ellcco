import React, { Component } from 'react';
import {
  Text,
  TouchableWithoutFeedback,
  Image,
  ScrollView,
  StatusBar
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {
  Container,
  Background,
  Block,
  FormInput,
  FormGroup,
  FormLabel,
  Button
} from '../../components';

import { colors, text, spacing } from '../../components/styles';

export default class FormPesan extends Component {
  static navigationOptions = {
    tabBarVisible: false,
    headerLeft: ({ onPress }) => (
      <TouchableWithoutFeedback onPress={() => onPress()}>
        <FontAwesome5 size={18} color={colors.black} name="arrow-left" />
      </TouchableWithoutFeedback>
    ),
    headerLeftContainerStyle: {
      paddingLeft: 30,
      marginTop: 25,
    },
    headerStyle: {
      borderBottomColor: 'transparent',
      shadowColor: 'transparent',
      elevation: 0,
      shadowOpacity: 0,
      backgroundColor: colors.transparent,
    }
  };

  render() {
    const { navigation } = this.props;

    const layanan = navigation.getParam('layanan');

    return (
      <Background color={colors.white}>
        <StatusBar barStyle="dark-content" hidden={false} backgroundColor={colors.white} translucent={true} />
        <Container>
          <ScrollView>
            <Block column alignCenter style={[spacing.mb2]}>
              <Image source={require('../../assets/images/pesan@159x159.png')} width={159} height={159} />
              <Text style={[
                text.fontSemiRegular,
                text.medium
              ]}>Lengkapi Data Pesanan Anda</Text>
            </Block>
            <Block alignCenter style={spacing.mb1}>
              <Text style={text.bold}>Perbaikan</Text>
              <FontAwesome5
                name="angle-double-right"
                size={11}
                color={colors.black}
                style={[spacing.ml1, spacing.mr1]} />
              <Text style={text.regular}>{layanan.nama}</Text>
            </Block>
            <FormGroup>
              <FormLabel text="Bagaimana kerusakan alat anda?"/>
              <FormInput placeholder="Misalkan : TV mati total" />
            </FormGroup>
            <FormGroup>
              <FormLabel text="Ceritakan bagaimana kerusakan alat anda"/>
              <FormInput placeholder="Misalkan : Ketika dihidupkan tidak ada indikator nyala, layar mati..." multiline={true} />
            </FormGroup>
            <Button fullRound block textLight>Pesan</Button>
          </ScrollView>
        </Container>
      </Background>
    );
  }
}