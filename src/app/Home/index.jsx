import {
  Animated,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import FloatButton from '@component/buttons/FloatButton.jsx';
import FormModal from '@component/modals/FormModal.jsx';
import Icon from '@component/icons/Icons.jsx';
import { getTasks } from '@utils/Tasks.js';

const { width, height } = Dimensions.get('window');

const Home = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const toggelModal = () => setModalVisible(!modalVisible);
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    const stored = await getTasks();
    setTasks(stored);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topHeadingContainer}>
        <Text style={styles.topHeadingText}>To Do Manager</Text>
      </View>

      {/* Tasks list */}
      <View style={{flex: 1}} >
        <FlatList
          data={tasks}
          contentContainerStyle={{ paddingBottom: 60 }}
          renderItem={({ item, index }) => (
            <View style={styles.taskWrapper}>
              <View style={styles.taskContainer}>
                {/* left part */}
                <View style={styles.taskRowLeft}>
                  <Icon
                    name={'star'}
                    type={'FontAwesome'}
                    color={'#000'}
                    size={20}
                    style={styles.taskIcon}
                  />
                  <Text style={styles.taskItem}>{item.task}</Text>
                </View>

                {/* right part */}
                <View style={styles.taskRowRight}>
                  {/* completed btn */}
                  <TouchableOpacity style={[styles.taskCompBtn]}>
                    <Text>comp</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.taskDelBtn}>
                    <Text>Del</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
          keyExtractor={item => item.id}
        />
      </View>

      {/* add todo form */}
      {modalVisible && (
        <FormModal visible={modalVisible} onClose={toggelModal} modalVisible />
      )}

      {/* float button */}
      {!modalVisible && (
        <FloatButton actions={[toggelModal]} backgroundColor="#ce1616ff">
          <Icon
            name={'plus'}
            type={'FontAwesome'}
            color={'#ffffffff'}
            size={30}
          />
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
    borderBottomColor: '#c6c6c66b',
    elevation: 1,
    zIndex: 999,
    backgroundColor: '#fff'
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

  taskWrapper: {
    alignItems: 'center',
  },

  taskContainer: {
    backgroundColor: 'yellow',
    marginTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10,
    width: width * 0.9,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  taskRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  taskItem: {
    fontSize: 18,
  },

  taskIcon: {
    marginTop: 2,
  },

  taskDelBtn: {
    backgroundColor: 'red',
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 20,
    paddingLeft: 20,
    borderRadius: 5,
  },

  taskRowRight: {
    flexDirection: 'row',
    gap: 10,
  },

  taskCompBtn: {
    backgroundColor: 'aqua',
  },
});
