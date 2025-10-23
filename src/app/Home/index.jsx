import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import FloatButton from '@component/buttons/FloatButton.jsx';
import FormModal from '@component/modals/FormModal.jsx';
import Icon from '@component/icons/Icons.jsx';
import TaskList from '../../component/tasks/TaskList';
import { useTaskActions } from '@hooks/tasks/useTaskActions';
import { useTask } from '@context/TaskContext';

const { width } = Dimensions.get('window');

const Home = () => {
  // prettier-ignore
  const { 
    handleLoadTasks, 
    handleDeleteTask, 
    handleCompleteTask } = useTaskActions();

  // const [tasks, setTasks] = useState([]);
  const { tasks } = useTask();
  const [modalVisible, setModalVisible] = useState(false);
  const toggelModal = () => setModalVisible(!modalVisible);

  console.log('re-render....');
  useEffect(() => {
    handleLoadTasks();
  }, []);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.topHeadingContainer}>
          <Text style={styles.topHeadingText}>To Do Manager</Text>
        </View>

        {/* Tasks list */}
        <View style={{ flex: 1 }}>
          <TaskList
            tasks={tasks}
            onComplete={handleCompleteTask}
            onDelete={handleDeleteTask}
          />
        </View>

        {/* float button */}
        {!modalVisible && (
          <FloatButton actions={[toggelModal]} backgroundColor="#ce1616ff">
            <Icon name={'plus'} type={'FontAwesome'} color={'#fff'} size={30} />
          </FloatButton>
        )}
      </SafeAreaView>

      {/* add todo form */}
      {modalVisible && (
        <FormModal
          visible={modalVisible}
          onClose={toggelModal}
        />
      )}
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#fff',
  },

  topHeadingContainer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.4,
    borderBottomColor: '#c6c6c66b',
    elevation: 1,
    zIndex: 999,
    backgroundColor: '#fff',
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
