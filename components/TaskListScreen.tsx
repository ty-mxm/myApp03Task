import React, { useEffect, useState, useRef } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { obtenirTaches, obtenirTachesAutres, obtenirTachesArchivees } from '../src/api';
import { Task, RootStackParamList } from '../src/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

// Props type definition
type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'TaskList'>;
  route: RouteProp<RootStackParamList, 'TaskList'>;
};

const TaskListScreen: React.FC<Props> = ({ route, navigation }) => {
  const { userId, type } = route.params; // Retrieve userId and type from route params
  const [taches, setTaches] = useState<Task[]>([]); // Task state
  const flatListRef = useRef<FlatList>(null); // Reference for scrolling

  useEffect(() => {
    const fetchTaches = async () => {
      try {
        let data;
        if (type === 'mesTaches') {
          data = await obtenirTaches(userId, false);
        } else if (type === 'autresTaches') {
          data = await obtenirTachesAutres(false);
        } else if (type === 'archiveTaches') {
          data = await obtenirTachesArchivees(true);
        }
        setTaches(data.tasks); // Update state with tasks
      } catch (error) {
        console.error(error);
      }
    };

    fetchTaches(); // Fetch tasks on mount
  }, [userId, type]);

  // Navigate to TaskDetail on press
  const handleTachePress = (tache: Task) => {
    navigation.navigate('TaskDetail', { task: tache });
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Liste des Tâches</Text>
        <FlatList
          ref={flatListRef}
          data={taches}
          keyExtractor={(item) => item.taskId}
          renderItem={({ item }) => (
            <View style={styles.taskItem}>
              <Text style={styles.taskTitle}>{item.title}</Text>
              <Text style={styles.taskDescription}>{item.description}</Text>
              <Text style={styles.taskDate}>{item.date}</Text>
              <Button title="Voir" onPress={() => handleTachePress(item)} color="#ADD8E6" />
            </View>
          )}
        />
        <View style={styles.buttonContainer}>
          <Button 
            title="Ajouter une tâche" 
            onPress={() => navigation.navigate('AddTask', { userId })} 
            color="#ADD8E6"
          />
        </View>
      </View>
    </View>
  );
};

// Application des styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#E6E6FA', // Pastel violet background
  },
  form: {
    backgroundColor: '#FFFFFF', 
    padding: 20,                
    borderRadius: 10,           
    width: '80%',
    alignItems: 'center',
    maxHeight: '90%', // Ensure it doesn't overflow on smaller screens
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    color: '#9370DB', // Light violet for the title
  },
  taskItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
    flexDirection: 'column', 
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
  },
  taskDescription: {
    fontSize: 14,
    color: '#555',
  },
  taskDate: {
    fontSize: 12,
    color: '#888',
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
    borderRadius: 5,
    overflow: 'hidden',
  },
});

export default TaskListScreen;
