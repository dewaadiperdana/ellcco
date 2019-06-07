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
      <Container centerContent>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
          contentContainerStyle={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Block alignCenter alignMiddle column>
            <Illustration
              width={189}
              height={189}
              source={require("../../assets/images/notifikasi.jpg")}
            />
            <Text
              style={[
                text.fontSemiRegular,
                text.italic,
                text.alignCenter,
                spacing.mt1
              ]}
            >
              Anda tidak memiliki notifikasi
            </Text>
          </Block>
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
