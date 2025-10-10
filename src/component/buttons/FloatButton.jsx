import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const FloatButton = ({
  actions = [],
  size = width * 0.15,
  backgroundColor = 'red',
  children,
}) => {
  const handleActions = () => {
    actions.forEach(fn => typeof fn === 'function' && fn());
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor,
          },
        ]}
        onPress={handleActions}
      >
        {children}
      </TouchableOpacity>
    </View>
  );
};

export default FloatButton;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: height * 0.05,
    right: width * 0.07,
  },

  button: {
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});
