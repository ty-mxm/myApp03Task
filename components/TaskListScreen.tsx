import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { getTasks } from '../src/api';
import { Task } from '../src/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Home: undefined;
  TaskList: { userId: string };
  TaskDetail: { task: Task };
  AddTask: { userId: string };
};

type TaskListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'TaskList'>;
type TaskListScreenRouteProp = RouteProp<RootStackParamList, 'TaskList'>;

type Props = {
  navigation: TaskListScreenNavigationProp;
  route: TaskListScreenRouteProp;
};

const TaskListScreen: React.FC<Props> = ({ route, navigation }) => {
  const { userId } = route.params;
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks(userId);
        setTasks(data.tasks);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTasks();
  }, [userId]);

  const handleTaskPress = (task: Task) => {
    navigation.navigate('TaskDetail', { task });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task List</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.taskId}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text>{item.title}</Text>
            <Button title="View" onPress={() => handleTaskPress(item)} />
          </View>
        )}
      />
      <Button title="Add Task" onPress={() => navigation.navigate('AddTask', { userId })} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  taskItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default TaskListScreen;
