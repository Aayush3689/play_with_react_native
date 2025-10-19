import AsyncStorage from '@react-native-async-storage/async-storage';

// get all the tasks from the storage....
const getTasks = async () => {
  try {
    const tasks = await AsyncStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
  } catch (error) {
    console.log('error in getTasks', error);
  }
};

// save a task into the storage....
const saveTask = async task => {
  try {
    const existingTasks = await AsyncStorage.getItem('tasks');
    const tasks = existingTasks ? JSON.parse(existingTasks) : [];
    tasks.push(task);
    await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
  } catch (error) {
    console.log('errro in save tasks', error);
  }
};

// delete a task from the storage
const deleteTask = async () => {
  
}

module.exports = {
  getTasks,
  saveTask
};
