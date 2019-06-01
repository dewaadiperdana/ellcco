import React, { Component } from "react";
import {
  Text,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  View
} from "react-native";
import { Background, Container, Block, Card, Button } from "../../components";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import NotificationProvider from "../../providers/NotificationProvider";
import SocketProvider from "../../providers/SocketProvider";

import ElectronicIcons from "../../config/fonticons/electronicicons";
import Storage from "../../helpers/Storage";
import NotifikasiService from "../../services/NotifikasiService";

import { connect } from "react-redux";
import { fetchUnreadNotifications } from "../../store/actions/notificationAction";

import Auth from '../../models/auth';

import { colors, text, spacing } from "../../components/styles";

class DashboardPelanggan extends Component {
  static navigationOptions = {
    header: null,
    title: "Dashboard",
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      return (
        <FontAwesome5
          name="home"
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
      auth: new Auth({}),
      notifikasi: null
    };

    // this.getNotifikasiBelumDibaca();
  }

  componentDidMount() {
    // this.props.fetchUnreadNotifications();
    this.getAuthUser();
  }

  getAuthUser = async () => {
    this.setState({
      auth: await Storage.get("auth")
    });
  };

  getNotifikasiBelumDibaca = async () => {
    try {
      const notifikasi = await NotifikasiService.getNotifikasiBelumDibaca();

      this.setState({ notifikasi: notifikasi });
    } catch (error) {
      alert(error);
    }
  };

  goto = route => {
    this.props.navigation.navigate(route);
  };

  renderNotificationIcon = () => {
    const notificationIndicator =
      this.props.unreadNotifications.length > 0 ? (
        <View style={styles.notificationIndicator} />
      ) : null;

    return (
      <TouchableOpacity onPress={() => this.goto("Notifikasi")}>
        <Block alignMiddle alignCenter column>
          <FontAwesome name="bell" size={25} color={colors.black} />
          {notificationIndicator}
        </Block>
      </TouchableOpacity>
    );
  };

  render() {
    const { auth, notifikasi } = this.state;

    return (
      <Background color={colors.white}>
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor={colors.white}
          translucent={true}
        />
        <NotificationProvider />
        <SocketProvider />
        <Container>
          <Block spaceBetween alignCenter style={[spacing.mt2, spacing.mb4]}>
            <Block column alignLeft>
              <Text style={[text.fontSmall, text.light, colors.black]}>
                Halo
              </Text>
              <Text style={[text.fontSmall, text.bold, colors.black]}>
                {auth.akun.nama}
              </Text>
            </Block>
            <Block column alignRight>
              {this.renderNotificationIcon()}
            </Block>
          </Block>

          <Block column style={spacing.mb2}>
            <Block spaceBetween>
              <Card
                contentCenter={true}
                allowClick={true}
                onClick={() => alert("Clicked")}
              >
                <ElectronicIcons name="smart-tv" size={65} />
                <Text style={[text.alignCenter, text.fontRegular, spacing.mt1]}>
                  Televisi
                </Text>
              </Card>
              <Card
                contentCenter={true}
                allowClick={true}
                onClick={() => alert("Clicked")}
              >
                <ElectronicIcons name="fan" size={65} />
                <Text style={[text.alignCenter, text.fontRegular, spacing.mt1]}>
                  Kipas Angin
                </Text>
              </Card>
            </Block>
            <Block>
              <Card
                contentCenter={true}
                allowClick={true}
                onClick={() => alert("Clicked")}
              >
                <ElectronicIcons name="rice-cooker" size={65} />
                <Text style={[text.alignCenter, text.fontRegular, spacing.mt1]}>
                  Rice Cooker
                </Text>
              </Card>
              <Card
                contentCenter={true}
                allowClick={true}
                onClick={() => alert("Clicked")}
              >
                <ElectronicIcons name="blender" size={65} />
                <Text style={[text.alignCenter, text.fontRegular, spacing.mt1]}>
                  Blender
                </Text>
              </Card>
            </Block>
          </Block>
          <Button
            fullRound={true}
            block={true}
            textLight={true}
            onPress={() => this.goto("Pesan")}
          >
            Selengkapnya
          </Button>
        </Container>
      </Background>
    );
  }
}

const mapStateToProps = state => {
  return {
    unreadNotifications: state.notifications.unread
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUnreadNotifications: () => {
      dispatch(fetchUnreadNotifications());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardPelanggan);

const styles = StyleSheet.create({
  notificationIndicator: {
    width: 10,
    height: 10,
    borderRadius: 50,
    position: "absolute",
    left: -3,
    bottom: 3,
    backgroundColor: colors.red
  }
});