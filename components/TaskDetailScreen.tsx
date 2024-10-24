import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { modifierTache } from '../src/api';
import { TaskDetailScreenNavigationProp, TaskDetailScreenRouteProp } from '../src/types';

// Déclaration des props pour la navigation
type Props = {
  navigation: TaskDetailScreenNavigationProp;
  route: TaskDetailScreenRouteProp;
};

const TaskDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { task } = route.params;
  
  // Log task for debugging (from friend's version)
  console.log('Task:', task);

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [isDone, setIsDone] = useState(task.isDone);

  // Fonction de gestion de la mise à jour de la tâche
  const handleUpdateTask = async () => {
    // Validation: Check for empty fields (from friend's version)
    if (!title.trim() || !description.trim()) {
      Alert.alert('Erreur', 'Le titre et la description ne peuvent pas être vides.');
      return;
    }

    try {
      // Log data passed to API (from friend's version)
      console.log('ownerId:', task.ownerId);
      console.log('taskId:', task.taskId);
      console.log('title:', title);
      console.log('description:', description);
      console.log('isDone:', isDone);

      await modifierTache(task.ownerId, task.taskId, title, description, isDone);
      Alert.alert('Succès', 'Tâche mise à jour avec succès !');

      // Determine the type based on the task status or context
      const taskType = isDone ? 'archiveTaches' : 'mesTaches';

      // Navigation back to task list after update, with the correct type
      navigation.navigate('TaskList', { userId: task.ownerId, type: taskType });
    } catch (error) {
      console.error(error);
      Alert.alert('Erreur', 'Une erreur est survenue lors de la mise à jour de la tâche.');
    }
  };

  // Toggle function for marking task as completed/not completed (from friend's version)
  const toggleTaskCompletion = () => {
    setIsDone(prev => !prev);
    Alert.alert('État modifié', `Tâche ${isDone ? 'non terminée' : 'terminée'}`);
    handleUpdateTask();
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Détails de la Tâche</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Titre de la tâche"
        />
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={setDescription}
          placeholder="Description de la tâche"
        />

        {/* Button to toggle task completion */}
        <View style={styles.buttonContainer}>
          <Button
            title={isDone ? "Marquer comme non terminé" : "Marquer comme terminé"}
            onPress={toggleTaskCompletion}
            color="#ADD8E6"
          />
        </View>

        {/* Button to update task */}
        <View style={styles.buttonContainer}>
          <Button title="Mettre à jour la tâche" onPress={handleUpdateTask} color="#ADD8E6" />
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
    backgroundColor: '#E6E6FA',
  },
  form: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    color: '#9370DB',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    width: '100%',
    borderRadius: 5,
  },
  buttonContainer: {
    marginTop: 10,
    width: '100%',
    borderRadius: 5,
    overflow: 'hidden',
  },
});

export default TaskDetailScreen;
