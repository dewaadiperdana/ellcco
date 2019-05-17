import React from 'react';
import { View, StyleSheet } from 'react-native';
import { spacing } from './styles';

const Block = props => {
  const blockStyles = [
    styles.block,
    'style' in props ? props.style : {},
    props.column && styles.blockColumn,
    props.spaceAround && styles.blockSpaceAround,
    props.spaceBetween && styles.blockSpaceBetween,
    props.alignLeft && styles.blockAlignLeft,
    props.alignCenter && styles.blockAlignCenter,
    props.alignRight && styles.blockAlignRight,
    props.alignTop && styles.blockAlignTop,
    props.alignMiddle && styles.blockAlignMiddle,
    props.alignBottom && styles.blockAlignBottom
  ];

  return (
    <View style={blockStyles}>
      {props.children}
    </View>
  );
};

export default Block;

const styles = StyleSheet.create({
  block: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  blockSpaceAround: { justifyContent: 'space-around' },
  blockSpaceBetween: { justifyContent: 'space-between' },
  blockColumn: { flexDirection: 'column' },
  blockAlignLeft: { alignItems: 'flex-start' },
  blockAlignCenter: { alignItems: 'center' },
  blockAlignRight: { alignItems: 'flex-end' },
  blockAlignTop: { justifyContent: 'flex-start' },
  blockAlignMiddle: { justifyContent: 'center' },
  blockAlignBottom: { justifyContent: 'flex-end' }
});