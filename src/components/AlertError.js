import React from 'react';
import { Alert, View } from 'react-native';

const AlertError = (props) => {
  const { isVisible, text, onOkPress } = props;

  const alert = isVisible === true ? (
    Alert.alert(
      'Error',
      text,
      [
        {text: 'Oke', onPress: onOkPress},
      ],
      {cancelable: false},
    )
  ) : null;

  return (
    <View>{alert}</View>
  );
}

export default AlertError;