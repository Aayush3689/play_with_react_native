import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';

const TASKS_IDS_LIST_KEY = 'tasks';

// save the updated task ID list...
const saveTaskIds = async ids => {
  await AsyncStorage.setItem(TASKS_IDS_LIST_KEY, JSON.stringify(ids));
};

// get all the ids...
const getIds = async () => {
  try {
    const storedTasksIds = await AsyncStorage.getItem(TASKS_IDS_LIST_KEY);
    return storedTasksIds ? JSON.parse(storedTasksIds) : [];
  } catch (error) {
    console.log('error in getIds', error);
    return error;
  }
};

// add a task ...
const addTask = async taskData => {
  try {
    if (!taskData) return null;

    const string = uuid();
    const id = `task_${string}`;
    const task = { id: string, ...taskData };

    // save the task---
    await AsyncStorage.setItem(id, JSON.stringify(task));

    // updat the ids array---
    const ids = await getIds();
    const updatedIdsArray = [...ids, id];
    await saveTaskIds(updatedIdsArray);

    return task;
  } catch (error) {
    console.log('errro in add tasks', error);
    return error;
  }
};

// get a single task...
const getTask = async id => {
  try {
    const task = await AsyncStorage.getItem(`task_${id}`);
    return task ? JSON.parse(task) : null;
  } catch (error) {
    console.log('error in getTasks', error);
    return error;
  }
};

// get all the tasks...
const getAllTasks = async () => {
  try {
    const ids = await getIds();
    if (ids.length === 0) return [];

    const tasksArray = await AsyncStorage.multiGet(ids);

    // multiget will return array of arrays... and the below map function will return object means all the tasks
    const tasks = tasksArray.map(([key, value]) => JSON.parse(value));
    return tasks;
  } catch (error) {
    console.log('error in getAllTask', error);
    return error;
  }
};

// delete a task...
const deleteTask = async id => {
  try {
    const taskKey = `task_${id}`;
    await AsyncStorage.removeItem(taskKey);

    // update the ids array---
    const ids = await getIds();
    const updatedIdsArray = ids.filter(key => key !== taskKey);
    await saveTaskIds(updatedIdsArray);
  } catch (error) {
    console.log('error in deleteTask', error);
    return error;
  }
};

// update a task...
const updateTask = async (id, update) => {
  try {
    const existingTask = await getTask(id);
    const updatedTask = { ...existingTask, ...update };
    await AsyncStorage.setItem(`task_${id}`, JSON.stringify(updatedTask));
    return updatedTask;
  } catch (error) {
    console.log('error in updateTask', error);
    return error;
  }
};

module.exports = {
  addTask,
  deleteTask,
  getIds,
  getAllTasks,
  getTask,
  updateTask,
};
