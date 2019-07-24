import React, { Component } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TextInput,
  ScrollView,
  RefreshControl,
  StyleSheet,
  Dimensions
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { connect } from "react-redux";
import { colors, text, spacing, fonts } from "../../components/styles";
import {
  Background,
  Container,
  Block,
  Button,
  ChatBubble
} from "../../components";

import RuangObrolanService from "../../services/RuangObrolanService";
import { fetchPesanObrolan } from "../../store/actions/ruangObrolanAction";
import Pemesanan from "../../models/pemesanan";
import RuangObrolan from "../../models/ruangobrolan";
import Storage from "../../helpers/Storage";
import Socket from "../../providers/Socket";
import { ON_CHAT_MESSAGE } from "../../config/events";

class Obrolan extends Component {
  static navigationOptions = {
    title: "Obrolan",
    headerLeft: ({ onPress }) => (
      <TouchableWithoutFeedback onPress={() => onPress()}>
        <Icon size={18} color={colors.black} name="arrow-left" />
      </TouchableWithoutFeedback>
    ),
    headerStyle: {
      marginTop: 20
    },
    headerLeftContainerStyle: {
      paddingLeft: 30
    }
  };

  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
      pemesanan: new Pemesanan(props.navigation.getParam("pemesanan")),
      ruangObrolan: new RuangObrolan({}),
      message: ""
    };
  }

  componentDidMount() {
    this._getRuangObrolanAndPesanObrolan();
    this._listenOnNewChatMessage();
    // this._scrollChatMessagesToVeryBottom();
  }

  // _scrollChatMessagesToVeryBottom = () => {
  //   this.refs._chatMessagesScrollViewRef.scrollToEnd({ animated: true });
  // };

  _getRuangObrolanAndPesanObrolan = async () => {
    try {
      const ruangObrolan = await RuangObrolanService.get(
        this.state.pemesanan.id
      );

      this.setState({ ruangObrolan: ruangObrolan });

      this.props.fetchPesanObrolan(ruangObrolan.id);
    } catch (error) {
      alert(error);
    }
  };

  _renderChatMessages = () => {
    const messages = this.props.pesanObrolan.map(item => {
      return (
        <ChatBubble
          key={item.id}
          own={item.owned}
          text={item.isi}
          date={item.tanggal}
        />
      );
    });

    return messages;
  };

  _onRefresh = () => {
    this._getRuangObrolanAndPesanObrolan();
  };

  _sendMessage = async () => {
    const auth = await Storage.get("auth");

    Socket.io.emit(
      ON_CHAT_MESSAGE,
      JSON.stringify({
        ruang_obrolan: this.state.ruangObrolan.kode,
        role: auth.akun.hak_akses,
        title: auth.akun.nama,
        message: {
          isi: this.state.message,
          [`id_${auth.akun.hak_akses}`]: auth.akun.id,
          id_ruang_obrolan: this.state.ruangObrolan.id
        }
      })
    );

    this._getRuangObrolanAndPesanObrolan();
    // this._scrollChatMessagesToVeryBottom();

    this.setState({ message: "" });
  };

  _listenOnNewChatMessage = () => {
    Socket.io.on(ON_CHAT_MESSAGE, payload => {
      this._getRuangObrolanAndPesanObrolan();
      // this._scrollChatMessagesToVeryBottom();
    });
  };

  render() {
    return (
      <Background color={colors.white}>
        <View style={styles.chatContainer}>
          <View style={styles.chatMessagesContainer}>
            <ScrollView
              // ref="_chatMessagesScrollViewRef"
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this._onRefresh}
                />
              }
            >
              {this._renderChatMessages()}
            </ScrollView>
          </View>
          <View style={styles.chatInputContainer}>
            <ScrollView>
              <TextInput
                style={styles.chatInput}
                multiline={true}
                onChangeText={text => this.setState({ message: text })}
                value={this.state.message}
              />
              <Button
                circleWithIcon={true}
                icon="paper-plane"
                style={styles.chatButton}
                onPress={this._sendMessage}
              />
            </ScrollView>
          </View>
        </View>
      </Background>
    );
  }
}

const mapStateToProps = state => {
  return {
    pesanObrolan: state.ruangObrolan.pesanObrolan
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPesanObrolan: idRuangObrolan => {
      dispatch(fetchPesanObrolan(idRuangObrolan));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Obrolan);

const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "space-between"
  },
  chatMessagesContainer: {
    width: "100%",
    height: "85%",
    padding: 10
  },
  chatInputContainer: {
    height: "15%",
    padding: 10,
    borderTopWidth: 1,
    borderColor: colors.chatMessageGrey
  },
  chatInput: {
    paddingVertical: 10,
    paddingLeft: 25,
    paddingRight: 65,
    borderWidth: 1,
    borderColor: colors.extraLightGrey,
    borderRadius: 50,
    fontFamily: fonts.regular,
    backgroundColor: colors.white
  },
  chatButton: {
    position: "absolute",
    top: "50%",
    right: 10,
    marginTop: -15
  }
});