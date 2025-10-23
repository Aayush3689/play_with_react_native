import { FlatList } from 'react-native';
import React, { useCallback } from 'react';
import TaskItem from './TaskItem';
import { useTaskActions } from '../../hooks/tasks/useTaskActions';

const TaskList = ({ tasks }) => {
  const { handleCompleteTask, handleDeleteTask } = useTaskActions();

  return (
    <FlatList
      data={tasks}
      renderItem={useCallback(
        ({ item }) => (
          <TaskItem
            item={item}
            onTaskComplete={() => handleCompleteTask(item.id)}
            onTaskDelete={() => handleDeleteTask(item.id)}
          />
        ),
        [handleCompleteTask, handleDeleteTask],
      )}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={{ paddingBottom: 5 }}
    />
  );
};

export default React.memo(TaskList);
