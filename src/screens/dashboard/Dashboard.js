import React, { Component } from 'react';
import { Text, StatusBar, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Background, Container, Block, Card, Button } from '../../components';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import NotificationProvider from '../../providers/NotificationProvider';
import SocketProvider from '../../providers/SocketProvider';
import ElectronicIcons from '../../config/fonticons/electronicicons';
import Storage from '../../helpers/Storage';

import { colors, text, spacing } from '../../components/styles';

class Dashboard extends Component {
  static navigationOptions = {
    header: null,
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      return <FontAwesome5 name="home" size={20} focused={focused} color={tintColor} />;
    },
  };

  constructor(props) {
    super(props);

    this.state = {
      auth: {}
    };

    this.getAuthUser();
  }

  getAuthUser = async () => {
    this.setState({
      auth: await Storage.get('auth')
    });
  }

  goto = route => {
    this.props.navigation.navigate(route);
  }

  render() {
    const { auth } = this.state;

    return (
      <Background color={colors.white}>
        <StatusBar barStyle="dark-content" hidden={false} backgroundColor={colors.white} translucent={true} />
        <Container>
          <NotificationProvider />
          <SocketProvider />
          
          <Block spaceBetween alignCenter style={[spacing.mt2, spacing.mb4]}>
            <Block column alignLeft>
              <Text style={[
                text.fontSmall,
                text.light,
                colors.black
              ]}>Hallo</Text>
              <Text style={[
                  text.fontSmall,
                  text.bold,
                  colors.black
              ]}>{auth.nama}</Text>
            </Block>
            <Block column alignRight>
              <TouchableWithoutFeedback onPress={() => this.goto('Notifikasi')}>
                <FontAwesome5 name="bell" size={25} />
              </TouchableWithoutFeedback>
            </Block>
          </Block>

          <Block style={spacing.mb1}>
            <Text style={[
              text.fontRegular,
              text.medium,
              text.alignCenter
            ]}>Alat elektronik anda rusak ?</Text>
          </Block>

          <Block column style={spacing.mb2}>
            <Block spaceBetween>
              <Card contentCenter={true} allowClick={true} onClick={() => alert('Clicked')}>
                <ElectronicIcons name="smart-tv" size={65} />
                <Text style={[
                  text.alignCenter,
                  text.fontRegular,
                  spacing.mt1
                ]}>Televisi</Text>
              </Card>
              <Card contentCenter={true} allowClick={true} onClick={() => alert('Clicked')}>
                <ElectronicIcons name="fan" size={65} />
                <Text style={[
                  text.alignCenter,
                  text.fontRegular,
                  spacing.mt1
                ]}>Kipas Angin</Text>
              </Card>
            </Block>
            <Block>
              <Card contentCenter={true} allowClick={true} onClick={() => alert('Clicked')}>
              <ElectronicIcons name="rice-cooker" size={65} />
                <Text style={[
                  text.alignCenter,
                  text.fontRegular,
                  spacing.mt1
                ]}>Rice Cooker</Text>
              </Card>
              <Card contentCenter={true} allowClick={true} onClick={() => alert('Clicked')}>
              <ElectronicIcons name="blender" size={65} />
                <Text style={[
                  text.alignCenter,
                  text.fontRegular,
                  spacing.mt1
                ]}>Blender</Text>
              </Card>
            </Block>
          </Block>
          <Button
            fullRound={true}
            block={true}
            textLight={true}
            onPress={() => this.goto('Pesan')}>Selengkapnya</Button>
        </Container>
      </Background>
    );
  }
}

export default Dashboard;