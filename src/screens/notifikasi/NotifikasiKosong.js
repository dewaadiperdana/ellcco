import React, { Component } from "react";
import { Text, ScrollView, RefreshControl } from "react-native";
import { Container, Block, Illustration } from "../../components";

import { text, spacing } from "../../components/styles";

import { connect } from "react-redux";
import { fetchAllNotifications } from "../../store/actions/notificationAction";

class NotifikasiKosong extends Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false
    };
  }

  _onRefresh = () => {
    this.props.fetchAllNotifications();
  };

  render() {
    return (
      <Container>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        >
          <Container centerContent>
            <Illustration
              width={189}
              height={189}
              source={require("../../assets/images/notifikasi.jpg")}
            />
            <Text
              style={[
                text.fontSmall,
                text.medium,
                text.alignCenter,
                spacing.mt1
              ]}
            >
              Anda Belum Memiliki Notifikasi
            </Text>
          </Container>
        </ScrollView>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAllNotifications: () => {
      dispatch(fetchAllNotifications());
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(NotifikasiKosong);
