import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { modifierTache } from '../src/api';
import { Task, RootStackParamList, TaskDetailScreenNavigationProp, TaskDetailScreenRouteProp } from '../src/types';

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
    try {
      await modifierTache(task.ownerId, task.taskId, title, description, isDone);
      Alert.alert('Succès', 'Tâche mise à jour avec succès !');
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Erreur', 'Une erreur est survenue lors de la mise à jour de la tâche.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Détails de la Tâche</Text>
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

        {/* Bouton pour marquer la tâche comme terminée ou non */}
        <View style={styles.buttonContainer}>
          <Button
            title={isDone ? "Marquer comme non terminé" : "Marquer comme terminé"}
            onPress={() => setIsDone(!isDone)}
            color="#ADD8E6"
          />
        </View>

        {/* Bouton pour mettre à jour la tâche */}
        <View style={styles.buttonContainer}>
          <Button title="Mettre à jour la tâche" onPress={handleUpdateTask} color="#ADD8E6" />
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
  form: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  // Titre avec une couleur violette douce
  title: {
    fontSize: 24,
    marginBottom: 16,
    color: '#9370DB', // Violet léger pour le titre
  },
  // Champs de texte avec bordures et espacement
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    width: '100%',
    borderRadius: 5, // Coins arrondis pour les champs de texte
  },
  // Style des boutons
  buttonContainer: {
    marginTop: 10,
    width: '100%',
    borderRadius: 5,
    overflow: 'hidden', // Assure que le bouton a des coins arrondis
  },
});

export default TaskDetailScreen;
