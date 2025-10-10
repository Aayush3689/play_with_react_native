import { Animated, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const Splash = () => {
  const scale = useRef(new Animated.Value(0.5)).current;
  const navigation = useNavigation();

  // function that will drive the animation
  const scaleAnime = () => {
    Animated.timing(scale, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };


  // start the animation at the time of mounting and navigate to main screen in 1s
  useEffect(() => {
    scaleAnime();
    setTimeout(() => navigation.navigate('Home'), [1000]);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Animated.Text style={[styles.text, { transform: [{ scale }] }]}>
          Welcome
        </Animated.Text>
      </View>
    </SafeAreaView>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    fontSize: 24,
    fontWeight: 900,
  },
});
