import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  Image,
  StatusBar,
  TouchableWithoutFeedback,
  FlatList,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Container, Block, Background, Wrapper } from '../../components';

import { colors, text, spacing } from '../../components/styles';

import styles from './styles';

const ListNotifikasi = props => {
  return (
    <Wrapper>
      <Container noFlex>
        <Block spaceBetween>
          <Block>
            <Image source={require('../../assets/images/notifikasi@129x129.png')} width={152} height={152} />
          </Block>
          <Block column alignLeft alignMiddle wrapContent style={spacing.ml2}>
            <Text style={[text.h1, text.alignLeft]}>Notifikasi</Text>
            <Text style={[text.paragraph, text.alignLeft]}>
              Daftar Notifikasi Yang Masuk Ke Akun Anda
            </Text>
          </Block>
        </Block>
      </Container>
      <Container noPaddingAndMargin>
        <ScrollView>
          <FlatList
            data={props.notifikasi}
            keyExtractor={(item, index) => item.id}
            contentContainerStyle={{ borderTopWidth: 1, borderBottomWidth: 1, borderColor: colors.extraLightGrey }}
            ItemSeparatorComponent={() => (
              <View style={styles.separator} />
            )}
            renderItem={({item}) => (
              <TouchableOpacity key={item.id} style={styles.notifikasi} onPress={() => props.gotoDetailNotifikasi(item)}>
                <Block spaceBetween alignCenter>
                  <Block column>
                    <Block alignCenter>
                      <Text style={[
                        text.fontRegular,
                        text.medium,
                        { color: item.dibaca ? colors.verylightgrey : colors.black }
                      ]}>{item.judul}</Text>
                      <FontAwesome5 style={[
                        spacing.ml1,
                        spacing.mr1,
                        { color: item.dibaca ? colors.verylightgrey : colors.black }
                      ]} name="angle-double-right" size={12} />
                      <Text style={[
                        text.fontRegular,
                        { color: item.dibaca ? colors.verylightgrey : colors.black }
                      ]}>{item.tanggal}</Text>
                    </Block>
                    <Text style={[
                      text.fontRegular,
                      { color: item.dibaca ? colors.verylightgrey : colors.black }
                    ]}>{item.deskripsi}</Text>
                  </Block>
                  <FontAwesome5 style={[
                    { color: item.dibaca ? colors.verylightgrey : colors.black }
                  ]} name="angle-right" size={20} />
                </Block>
              </TouchableOpacity>
            )}
          />
        </ScrollView>
      </Container>
    </Wrapper>
  );
}

export default ListNotifikasi;