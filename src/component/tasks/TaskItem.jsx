import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import TaskButton from '@component/buttons/TaskButton';
import Icon from '@component/icons/Icons.jsx';

const { width } = Dimensions.get('window');

const TaskItem = ({ item, onTaskDelete, onTaskComplete }) => {
  console.log('TaskItem is rendered');

  return (
    <View style={styles.taskWrapper}>
      <View style={styles.taskContainer}>
        {/* left part */}
        <View style={styles.taskRowLeft}>
          <CheckBox
            disabled={false}
            value={!!(item.status === 'completed')}
            onValueChange={onTaskComplete}
            tintColors={{ true: '#00C853', false: '#C0C0C0' }}
            // onChange={() => handleCompleteTask(item.id)}
          />

          <Text style={styles.taskItem} numberOfLines={1}>
            {item.title}
          </Text>
        </View>

        {/* right part */}
        <View style={styles.taskRowRight}>
          <TaskButton style={{ marginBottom: 5 }} onPress={onTaskDelete}>
            <Icon
              name={'trash-o'}
              type={'FontAwesome'}
              color={'red'}
              size={25}
            />
          </TaskButton>
        </View>
      </View>
    </View>
  );
};

export default React.memo(TaskItem);

const styles = StyleSheet.create({
  taskWrapper: {
    alignItems: 'center',
  },

  taskContainer: {
    borderWidth: 1,
    marginTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    width: width * 0.9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 5,
  },

  taskRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    width: '60%',
  },

  taskItem: {
    fontSize: 18,
  },

  taskIcon: {
    marginTop: 2,
  },

  taskRowRight: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
});
