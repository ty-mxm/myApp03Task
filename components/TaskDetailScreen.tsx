import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { modifierTache } from '../src/api';
import { Task, RootStackParamList, TaskDetailScreenNavigationProp, TaskDetailScreenRouteProp } from '../src/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type Props = {
  navigation: TaskDetailScreenNavigationProp;
  route: TaskDetailScreenRouteProp;
};

const TaskDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { task } = route.params;
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [isDone, setIsDone] = useState(task.isDone);

  const handleUpdateTask = async () => {
    try {
      await modifierTache(task.ownerId, task.taskId, title, description, isDone);
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Detail</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />
      <Button title={isDone ? "Mark as Undone" : "Mark as Done"} onPress={() => setIsDone(!isDone)} />
      <Button title="Update Task" onPress={handleUpdateTask} />
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default TaskDetailScreen;
