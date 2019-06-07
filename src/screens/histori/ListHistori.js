import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  RefreshControl
} from "react-native";
import {
  Container,
  Block,
  Wrapper,
  Illustration,
  Badge
} from "../../components";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import moment from "moment";

import { colors, text, spacing } from "../../components/styles";

import styles from "./styles";

class ListHistori extends Component {
  state = {
    refreshing: false,
    histori: []
  };

  static getDerivedStateFromProps(props, state) {
    return { ...props };
  }

  render() {
    return (
      <Container noPaddingAndMargin>
        <Block alignCenter spaceBetween padding style={[spacing.mt3]}>
          <Block>
            <Illustration
              width={152}
              height={152}
              source={require("../../assets/images/histori.jpg")}
            />
          </Block>
          <Block column wrapContent alignLeft alignMiddle style={spacing.ml2}>
            <Text style={[text.fontSemiRegular, text.medium, spacing.mb1]}>
              Histori
            </Text>
            <Text style={[text.paragraph]}>
              Catatan Layanan Yang Pernah Anda Pesan
            </Text>
          </Block>
        </Block>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.props.onRefresh}
            />
          }
        >
          <Block style={[spacing.mt2]}>
            <FlatList
              data={this.state.histori}
              keyExtractor={(item, index) => item.id}
              contentContainerStyle={{
                borderTopWidth: 1,
                borderBottomWidth: 1,
                borderColor: colors.extraLightGrey
              }}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.listHistori}
                  onPress={() => this.props.gotoDetail(item)}
                >
                  <Block spaceBetween alignCenter>
                    <Block column>
                      <Block>
                        <FontAwesome5
                          name="question-circle"
                          size={16}
                          color={colors.black}
                          style={spacing.mr1}
                        />
                        <Text style={text.medium}>{item.kerusakan}</Text>
                      </Block>
                      <Block style={[spacing.mt1, spacing.mb1]}>
                        <FontAwesome5
                          name="calendar"
                          size={16}
                          color={colors.black}
                          style={spacing.mr1}
                        />
                        <Text style={text.medium}>
                          {moment(item.tanggal).format("LLL")}
                        </Text>
                      </Block>
                      <Block>
                        <Badge
                          blue={item.status === "perbaikan_selesai"}
                          red={
                            item.status === "menunggu_pembayaran" ||
                            item.status === "perbaikan_dibatalkan"
                          }
                        >
                          {item.status}
                        </Badge>
                      </Block>
                    </Block>
                    <FontAwesome5 name="angle-right" size={35} />
                  </Block>
                </TouchableOpacity>
              )}
            />
          </Block>
        </ScrollView>
      </Container>
    );
  }
}

export default ListHistori;
