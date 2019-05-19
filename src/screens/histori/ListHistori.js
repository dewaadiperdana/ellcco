import React, { Component } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Background, Container, Button, Block, Wrapper } from '../../components';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { colors, text, spacing } from '../../components/styles';

import styles from './styles';

const ListHistori = props => {
	return (
    <Wrapper>
      <Block spaceAround padding style={[spacing.mt3]}>
        <Block>
          <Image source={require('../../assets/images/histori@151.png')} width={152} height={152} />
        </Block>
        <Block column wrapContent alignLeft alignMiddle style={spacing.ml2}>
          <Text style={text.h1}>Histori</Text>
          <Text style={[text.paragraph, spacing.mb2]}>Catatan Layanan Yang Pernah Anda Pesan</Text>
        </Block>
      </Block>
      <Block style={[spacing.mt2]}>
        <ScrollView>
          <FlatList
          data={props.histori}
          keyExtractor={(item, index) => item.id}
          contentContainerStyle={{ borderTopWidth: 1, borderBottomWidth: 1, borderColor: colors.extraLightGrey }}
          ItemSeparatorComponent={() => (
            <View style={styles.separator} />
          )}
          renderItem={({item}) => (
            <TouchableOpacity style={styles.listHistori}>
              <Block spaceBetween alignCenter>
                <Block column>
                  <Block>
                    <FontAwesome5 name="question-circle" size={16} color={colors.black} style={spacing.mr1} />
                    <Text style={text.medium}>{item.nama_kerusakan}</Text>
                  </Block>
                  <Block style={[spacing.mt1, spacing.mb1]}>
                    <FontAwesome5 name="calendar" size={16} color={colors.black} style={spacing.mr1} />
                    <Text style={text.medium}>{item.tanggal}</Text>
                  </Block>
                  <Block>
                    <FontAwesome5 name={item.icon_status} size={16} color={colors.black} style={spacing.mr1} />
                    <Text style={text.medium}>{item.nama_status}</Text>
                  </Block>
                </Block>
                <FontAwesome5 name="angle-right" size={35} />
              </Block>
            </TouchableOpacity>
          )} />
        </ScrollView>
      </Block>
    </Wrapper>
  );
};

export default ListHistori;