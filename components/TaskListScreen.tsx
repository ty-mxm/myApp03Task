import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { obtenirTaches } from '../src/api';
import { Task, RootStackParamList, TaskListScreenNavigationProp, TaskListScreenRouteProp } from '../src/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type Props = {
  navigation: TaskListScreenNavigationProp;
  route: TaskListScreenRouteProp;
};

const TaskListScreen: React.FC<Props> = ({ route, navigation }) => {
  const { userId } = route.params;
  const [taches, setTaches] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTaches = async () => {
      try {
        const data = await obtenirTaches(userId);
        setTaches(data.tasks);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTaches();
  }, [userId]);

  const handleTachePress = (tache: Task) => {
    navigation.navigate('TaskDetail', { task: tache });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Liste des Tâches</Text>
      <FlatList
        data={taches}
        keyExtractor={(item) => item.taskId}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text>{item.title}</Text>
            <Button title="Voir" onPress={() => handleTachePress(item)} />
          </View>
        )}
      />
      <Button title="Ajouter une tâche" onPress={() => navigation.navigate('AddTask', { userId })} />
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
