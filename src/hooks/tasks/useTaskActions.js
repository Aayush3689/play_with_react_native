import { useCallback } from 'react';
import {
  getAllTasks,
  addTask,
  deleteTask,
  updateTask,
} from '@storage/asyncStorage/Tasks';
import { useTask } from '@context/TaskContext';
import { showToast } from '@utils/toast';
import { Alert } from 'react-native';

export const useTaskActions = () => {
  const { setTasks } = useTask();

  // handle load tasks with status pending into the screen
  const handleLoadTasks = useCallback(async () => {
    const stored = await getAllTasks();
    const filterPendingTasks = stored.filter(task => task.status === 'pending');
    setTasks(filterPendingTasks);
  }, [setTasks]);

  // hook that will handle add task
  const handleAddTask = useCallback(async task => {
    const newTask = await addTask(task);
    setTasks(prev => [...prev, newTask]);
    showToast('Task is created successfully');
  }, []);

  // handle delete a task
  const handleDeleteTask = useCallback(id => {

    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete the task?',
      [
        {
          text: 'cancel',
        },
        {
          text: 'ok',
          onPress: async () => {
            try {
              await deleteTask(id);
              setTasks(prev => prev.filter(task => task.id !== id));
              showToast('Task Deleted');
            } catch (error) {
              console.log('error in handleDeleteTask', error);
              return error;
            }
          },
        },
      ],
      { cancelable: true },
    );
  }, []);

  // handle complete a task by updating status to completed
  const handleCompleteTask = useCallback(id => {
    const update = { status: 'completed' };

    Alert.alert(
      'Mark as Completed?',
      'Are you sure you want to mark this task as completed?',
      [
        {
          text: 'cancel',
        },
        {
          text: 'complete',
          onPress: async () => {
            try {
              await updateTask(id, update);
              setTasks(prev => prev.filter(t => t.id !== id));
              showToast('Marked as completed');
            } catch (error) {
              console.log('error in handle complete task', error);
              return error;
            }
          },
        },
      ],
    );
  }, []);
  return {
    handleAddTask,
    handleDeleteTask,
    handleLoadTasks,
    handleCompleteTask,
  };
};
