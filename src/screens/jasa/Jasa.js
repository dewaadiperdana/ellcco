import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
  RefreshControl
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {
  Container,
  Illustration,
  Block,
  Background,
  Button,
  Spinner
} from "../../components";
import { connect } from "react-redux";
import { fetchServingAndNotServingList } from "../../store/actions/pelayananAction";
import { text, colors, spacing } from "../../components/styles";
import Storage from "../../helpers/Storage";
import PelayananService from "../../services/PelayananService";
import {
  ON_LEAVE_ORDER_CHANNEL,
  ON_JOIN_ORDER_CHANNEL
} from "../../config/events";
import Socket from "../../providers/Socket";

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

  constructor(props) {
    super(props);

    this.state = {
      refreshing: false
    };
  }

  componentDidMount() {
    this.props.fetchServingAndNotServingList();
  }

  _onRefresh = () => {
    this.props.fetchServingAndNotServingList();
  };

  _addPelayanan = async jasa => {
    this.setState({ spinner: true });

    try {
      const response = await PelayananService.add(jasa);

      Socket.io.emit(ON_JOIN_ORDER_CHANNEL, JSON.stringify(response));

      this.props.fetchServingAndNotServingList();
      this.setState({ spinner: true });
    } catch (error) {
      this.setState({ spinner: true });
      alert(error);
    }
  };

  _deletePelayanan = async pelayanan => {
    this.setState({ spinner: true });

    try {
      const response = await PelayananService.delete(pelayanan.id);

      Socket.io.emit(ON_LEAVE_ORDER_CHANNEL, JSON.stringify(pelayanan));

      this.props.fetchServingAndNotServingList();
      this.setState({ spinner: true });
    } catch (error) {
      this.setState({ spinner: true });
      alert(error);
    }
  };

  render() {
    const { isServing, notServing, loading } = this.props;

    return (
      <Background color={colors.white}>
        <Container noPaddingAndMargin>
          <Spinner
            isVisible={loading}
            type="bar"
            color={colors.black}
            whiteBackdrop
          />
          <Block alignMiddle style={{ marginTop: 30 }}>
            <Illustration
              width={200}
              height={200}
              source={require("../../assets/images/histori.jpg")}
            />
          </Block>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }
          >
            <Block column>
              <Block padding>
                <Text style={[text.fontSemiRegular, text.bold]}>
                  Jasa yang dilayani
                </Text>
              </Block>
              {isServing.length <= 0 ? (
                <Block paddingHorizontal>
                  <Text style={[text.fontRegular, text.italic, text.textMuted]}>
                    Anda belum melayani jasa, tambahkan salah satu jasa untuk
                    segera mendapatkan notifikasi ketika ada pesanan
                  </Text>
                </Block>
              ) : (
                <FlatList
                  data={isServing}
                  keyExtractor={(item, index) => item.id}
                  contentContainerStyle={{
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderColor: colors.extraLightGrey
                  }}
                  ItemSeparatorComponent={() => (
                    <View style={styles.separator} />
                  )}
                  renderItem={({ item }) => (
                    <Block
                      spaceBetween
                      alignCenter
                      style={{ paddingHorizontal: 30, paddingVertical: 10 }}
                    >
                      <Text style={[text.italic, text.fontRegular]}>
                        {item.nama}
                      </Text>
                      <Button
                        circleWithIcon={true}
                        icon="trash-alt"
                        red
                        onPress={() =>
                          this._deletePelayanan(item.PelayananJasa)
                        }
                      />
                    </Block>
                  )}
                />
              )}
            </Block>
            <Block column>
              <Block padding>
                <Text style={[text.fontSemiRegular, text.bold]}>
                  Daftar jasa
                </Text>
              </Block>
              <FlatList
                data={notServing}
                keyExtractor={(item, index) => item.id}
                contentContainerStyle={{
                  borderTopWidth: 1,
                  borderBottomWidth: 1,
                  borderColor: colors.extraLightGrey
                }}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                renderItem={({ item }) => (
                  <Block
                    spaceBetween
                    alignCenter
                    style={{ paddingHorizontal: 30, paddingVertical: 10 }}
                  >
                    <Text style={text.fontRegular}>{item.nama}</Text>
                    <Button
                      circleWithIcon={true}
                      icon="plus"
                      green
                      onPress={() => this._addPelayanan(item.id)}
                    />
                  </Block>
                )}
              />
            </Block>
          </ScrollView>
        </Container>
      </Background>
    );
  }
}

const mapStateToProps = state => {
  return {
    isServing: state.pelayanan.isServing,
    notServing: state.pelayanan.notServing,
    loading: state.pelayanan.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchServingAndNotServingList: () => {
      dispatch(fetchServingAndNotServingList());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Jasa);

const styles = StyleSheet.create({
  separator: {
    width: "100%",
    height: 1,
    backgroundColor: colors.extraLightGrey
  }
});
