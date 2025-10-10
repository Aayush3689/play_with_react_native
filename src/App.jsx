import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigaion from './navigations/MainNavigaion.jsx';

const App = () => {
  return (
    <NavigationContainer>
      <MainNavigaion />
    </NavigationContainer>
  );
};

export default App;
