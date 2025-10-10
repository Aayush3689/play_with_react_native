import { Animated, Dimensions, StyleSheet, Text, View } from 'react-native';
import React, { useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import FloatButton from '@component/buttons/FloatButton.jsx';
import FormModal from '@component/modals/FormModal.jsx';
import Icon from '@component/icons/Icons.jsx';

const { width, height } = Dimensions.get('window');

const Home = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const toggelModal = () => setModalVisible(!modalVisible);

  const scale = useRef(new Animated.Value(0.5)).current;

  const scaleAnime = () => {
    console.log(scale);
    scale.setValue(0.5);
    Animated.timing(scale, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topHeadingContainer}>
        <Text style={styles.topHeadingText}>To Do Manager</Text>
      </View>

      {/* add todo form */}
      <FormModal visible={modalVisible} onClose={toggelModal} scale={scale} />

      {/* float button */}
      {!modalVisible && (
        <FloatButton
          actions={[toggelModal, scaleAnime]}
          backgroundColor="#e10d0dff"
        >
          <Icon name={'plus'} type={'FontAwesome'} color={'#fff'} size={30} />
        </FloatButton>
      )}
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },

  topHeadingContainer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.4,
    borderBottomColor: '#c6c6c61c',
  },

  topHeadingText: {
    fontSize: 24,
    fontWeight: 700,
  },

  buttonText: {
    fontSize: width * 0.15,
    lineHeight: width * 0.15,
    color: '#fff',
  },
});
