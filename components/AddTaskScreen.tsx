import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { ajouterTache } from '../src/api';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Alert } from 'react-native';
import { RootStackParamList, AddTaskScreenNavigationProp, AddTaskScreenRouteProp } from '../src/types';

// Déclaration des props pour la navigation
type Props = {
  navigation: AddTaskScreenNavigationProp;
  route: AddTaskScreenRouteProp;
};

const AddTaskScreen: React.FC<Props> = ({ route, navigation }) => {
  const { userId } = route.params; // Get the userId passed from HomeScreen
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAddTask = async () => {
    try {
      await ajouterTache(userId, title, description); // Use the userId when adding a task
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Ajouter une Tâche</Text>
      <TextInput
        style={styles.input}
        placeholder="Titre"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <Button title="Ajouter la Tâche" onPress={handleAddTask} />
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
    backgroundColor: '#E6E6FA', // Fond violet pastel&#8203;:contentReference[oaicite:0]{index=0}
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
    color: '#9370DB', // Violet léger pour le titre&#8203;:contentReference[oaicite:1]{index=1}
  },
  // Champs de texte avec bordures et espacement
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    width: '100%',          
    borderRadius: 5,        // Coins arrondis pour les champs de texte&#8203;:contentReference[oaicite:2]{index=2}
  },
  // Style des boutons
  buttonContainer: {
    marginTop: 10,
    width: '100%',
    borderRadius: 5,
    overflow: 'hidden', // Assure que le bouton a des coins arrondis
  },
});

export default AddTaskScreen;
