import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  RefreshControl
} from "react-native";
import { connect } from 'react-redux';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Container, Block, Wrapper, Illustration } from "../../components";

import moment from "moment";

import { colors, text, spacing } from "../../components/styles";
import { fetchAllNotifications } from '../../store/actions/notificationAction';

import styles from "./styles";

class ListNotifikasi extends Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false
    };
  }

  _onRefresh = () => {
    this.props.fetchAllNotifications();
  }

  render() {
    const { notifikasi } = this.props;

    return (
      <Wrapper>
        <Container noFlex>
          <Block spaceBetween>
            <Block>
              <Illustration
                width={152}
                height={152}
                source={require("../../assets/images/notifikasi.jpg")}
              />
            </Block>
            <Block column alignLeft alignMiddle wrapContent style={spacing.ml2}>
              <Text style={[text.h2, text.alignLeft]}>Notifikasi</Text>
              <Text style={[text.paragraph, text.alignLeft]}>
                Daftar Notifikasi Yang Masuk Ke Akun Anda
              </Text>
            </Block>
          </Block>
        </Container>
        <Container noPaddingAndMargin>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }
          >
            <FlatList
              data={notifikasi}
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
                  style={styles.notifikasi}
                  onPress={() => this.props.gotoDetailNotifikasi(item)}
                >
                  <Block spaceBetween alignCenter>
                    <Block column>
                      <Block alignCenter>
                        <Text
                          style={[
                            text.fontRegular,
                            text.medium,
                            {
                              color: item.dibaca
                                ? colors.verylightgrey
                                : colors.black
                            }
                          ]}
                        >
                          {item.judul}
                        </Text>
                        <FontAwesome5
                          style={[
                            spacing.ml1,
                            spacing.mr1,
                            {
                              color: item.dibaca
                                ? colors.verylightgrey
                                : colors.black
                            }
                          ]}
                          name="angle-double-right"
                          size={12}
                        />
                        <Text
                          style={[
                            text.fontRegular,
                            {
                              color: item.dibaca
                                ? colors.verylightgrey
                                : colors.black
                            }
                          ]}
                        >
                          {moment(item.tanggal).format("LL")}
                        </Text>
                      </Block>
                      <Text
                        style={[
                          text.fontRegular,
                          {
                            color: item.dibaca
                              ? colors.verylightgrey
                              : colors.black
                          }
                        ]}
                      >
                        {item.deskripsi}
                      </Text>
                    </Block>
                    <FontAwesome5
                      style={[
                        {
                          color: item.dibaca ? colors.verylightgrey : colors.black
                        }
                      ]}
                      name="angle-right"
                      size={20}
                    />
                  </Block>
                </TouchableOpacity>
              )}
            />
          </ScrollView>
        </Container>
      </Wrapper>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAllNotifications: () => { dispatch(fetchAllNotifications()) }
  };
};

export default connect(null, mapDispatchToProps)(ListNotifikasi);