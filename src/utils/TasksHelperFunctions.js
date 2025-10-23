// import { getAllTasks, addTask } from '@storage/asyncStorage/Tasks';

// // handle load tasks with status pending into the screen
// export const loadTasks = useCallback(async ({ setTasks }) => {
//   const stored = await getAllTasks();
//   const filterPendingTasks = stored.filter(task => task.status === 'pending');
//   setTasks(filterPendingTasks);
// }, []);

// // handle add a task into the state
// export const handleAddTask = async (task, setTasks) => {
//   const newTask = await addTask(task);
//   setTasks(prev => [...prev, newTask]);
//   showToa
// };
