import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

const TaskButton = ({ children, style, onPress}) => {
  return (
    <TouchableOpacity style={[styles.btnContainer, style]} onPress={onPress} >
      <Text>{children}</Text>
    </TouchableOpacity>
  );
};

export default TaskButton;

const styles = StyleSheet.create({
  btnContainer: {
    // padding: 5,
  },
});
