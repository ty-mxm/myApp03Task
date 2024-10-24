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

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [isDone, setIsDone] = useState(task.isDone);

  // Fonction de gestion de la mise à jour de la tâche
  const handleUpdateTask = async () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert('Erreur', 'Le titre et la description ne peuvent pas être vides.');
      return;
    }

    try {
      
      await modifierTache(task.taskId, title, description, isDone, task.isOwner); // Pass task.taskId here
      Alert.alert('Succès', 'Tâche mise à jour avec succès !');

      const taskType = isDone ? 'archiveTaches' : 'mesTaches';
      navigation.navigate('TaskListTabs', { userId: task.ownerId, type: taskType });
    } catch (error) {
      console.error(error);
      Alert.alert('Erreur', 'Une erreur est survenue lors de la mise à jour de la tâche.');
    }
  };

  
  const toggleTaskCompletion = () => {
    setIsDone(prev => !prev);
    handleUpdateTask();
  };

  
  const isTaskModifiable = task.isOwner; // Vérifie si l'utilisateur est le créateur de la tâche

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Détails de la Tâche</Text>

        {/* Les champs d'entrée ne sont activés que si l'utilisateur est le créateur */}
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Titre de la tâche"
          editable={isTaskModifiable} // Disable input if not the owner
        />
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={setDescription}
          placeholder="Description de la tâche"
          editable={isTaskModifiable} // Désactiver l'entrée si l'utilisateur n'est pas le créateur
        />

        {/* Afficher uniquement le bouton pour basculer l'état d'achèvement si la tâche est modifiable */}
        {isTaskModifiable && (
          <View style={styles.buttonContainer}>
            <Button
              title={isDone ? "Marquer comme non terminé" : "Marquer comme terminé"}
              onPress={toggleTaskCompletion}
              color="#ADD8E6"
            />
          </View>
        )}

        {/* Only show the button to update the task if the user is the owner */}
        {isTaskModifiable && (
          <View style={styles.buttonContainer}>
            <Button title="Mettre à jour la tâche" onPress={handleUpdateTask} color="#ADD8E6" />
          </View>
        )}

        {/* Afficher uniquement le bouton de mise à jour de la tâche si l'utilisateur est le créateur  */}
        {!isTaskModifiable && (
          <Text style={styles.infoText}>
            Vous ne pouvez pas modifier cette tâche car elle a été créée par un autre utilisateur.
          </Text>
        )}
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
  infoText: {
    marginTop: 16,
    color: '#FF4500', 
    fontSize: 14,
  },
});

export default TaskDetailScreen;
