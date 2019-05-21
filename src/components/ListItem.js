import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { colors, spacing, text } from './styles';

const ListItem = props => {
  const listItemBlockStyles = [
    styles.listItemContainer,
    props.last && styles.listItemContainerLast,
    props.first && styles.listItemContainerFirst
  ];

  return (
    <View style={listItemBlockStyles}>
      {props.children}
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  listItemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colors.semiLightGrey,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  listItemContainerLast: {
    borderBottomWidth: 0,
    borderBottomColor: colors.transparent
  },
  listItemContainerFirst: {
    paddingTop: 0
  }
});