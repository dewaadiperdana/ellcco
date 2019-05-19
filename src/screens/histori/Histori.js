import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Background, Container, Button, Spinner } from '../../components';

import HistoriKosong from './HistoriKosong';
import ListHistori from './ListHistori';
import HistoriService from '../../services/HistoriService';
import Storage from '../../helpers/Storage';

import { colors, text, spacing } from '../../components/styles';

class Histori extends Component {
  static navigationOptions = {
    header: null,
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      return <FontAwesome5 name="clipboard" size={20} focused={focused} color={tintColor} />;
    },
  };

  constructor(props) {
    super(props);

    this.state = {
      histori: [],
      spinner: false
    };
  }

  componentDidMount() {
    this.getHistori();
  }

  getHistori = async () => {
    this.setState({ spinner: true });

    const auth = await Storage.get('auth');

    try {
      const histori = await HistoriService.getHistori(auth.hak_akses, auth.id, auth.token);
      console.log(histori);

      this.setState({ spinner: false, histori: histori });
    } catch (error) {
      this.setState({ spinner: false });
      console.log(error);
    }
  }

  gotoPesan = () => {
    this.props.navigation.navigate('Pesan');
  }

  render() {
    const historiContent = this.state.histori === null ? (
      <Container centerContent>
        <HistoriKosong gotoPesan={this.gotoPesan} />
      </Container>
    ) : (
      <Container noPaddingAndMargin>
        <ListHistori histori={this.state.histori} />
      </Container>
    );

    return (
      <Background color={colors.white}>
        <Spinner isVisible={this.state.spinner} type="bar" color="white" />
        {historiContent}
      </Background>
    );
  }
}

export default Histori;