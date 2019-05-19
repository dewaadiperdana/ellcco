import React from 'react';
import { View, StyleSheet } from 'react-native';

const Block = props => {
  const blockStyles = [
    styles.block,
    props.column && styles.blockColumn,
    props.spaceAround && styles.blockSpaceAround,
    props.spaceBetween && styles.blockSpaceBetween,
    props.alignLeft && styles.blockAlignLeft,
    props.alignCenter && styles.blockAlignCenter,
    props.alignRight && styles.blockAlignRight,
    props.alignTop && styles.blockAlignTop,
    props.alignMiddle && styles.blockAlignMiddle,
    props.alignBottom && styles.blockAlignBottom,
    props.wrapContent && styles.blockWrapContent,
    props.padding && styles.blockPadding,
    props.paddingHorizontal && styles.blockPaddingHorizontal,
    props.paddingVertical && styles.blockPaddingVertical,
    'style' in props ? props.style : {},
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
    margin: 0,
    padding: 0
  },
  blockPadding: { padding: 30 },
  blockPaddingHorizontal: { paddingHorizontal: 30 },
  blockPaddingVertical: { paddingVertical: 30 },
  blockSpaceAround: { justifyContent: 'space-around' },
  blockSpaceBetween: { justifyContent: 'space-between' },
  blockColumn: { flexDirection: 'column' },
  blockAlignLeft: { alignItems: 'flex-start' },
  blockAlignCenter: { alignItems: 'center' },
  blockAlignRight: { alignItems: 'flex-end' },
  blockAlignTop: { justifyContent: 'flex-start' },
  blockAlignMiddle: { justifyContent: 'center' },
  blockAlignBottom: { justifyContent: 'flex-end' },
  blockWrapContent: { flexWrap: 'wrap', flexShrink: 1, width: '50%' }
});