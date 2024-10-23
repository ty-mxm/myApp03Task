import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { obtenirTaches } from '../src/api';
import { Task, RootStackParamList } from '../src/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

// Déclaration des props pour la navigation et la route
type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'TaskList'>;
  route: RouteProp<RootStackParamList, 'TaskList'>;
};

const TaskListScreen: React.FC<Props> = ({ route, navigation }) => {
  const { userId } = route.params; // Get the userId passed from HomeScreen
  const [taches, setTaches] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTaches = async () => {
      try {
        const data = await obtenirTaches(userId); // Fetch tasks for the correct user
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
      <View style={styles.content}>
        <Text style={styles.title}>Liste des Tâches</Text>
        <FlatList
          data={taches}
          keyExtractor={(item) => item.taskId}
          renderItem={({ item }) => (
            <View style={styles.taskItem}>
              <Text>{item.title}</Text>
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
  // Centrer le contenu de l'écran
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E6E6FA', // Fond violet pastel
  },
  // Formulaire centré avec un fond blanc et bordures arrondies
  content: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
  },
  // Titre avec une couleur violette douce
  title: {
    fontSize: 24,
    marginBottom: 16,
    color: '#9370DB', // Violet léger pour le titre
  },
  // Chaque tâche avec un espacement et une bordure en bas
  taskItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  // Style des boutons
  buttonContainer: {
    marginTop: 20,
    width: '100%',
    borderRadius: 5,
    overflow: 'hidden',
  },
});

export default TaskListScreen;
