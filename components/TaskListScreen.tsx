import React, { useEffect, useState, useRef } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { obtenirTaches } from '../src/api';
import { Task, RootStackParamList } from '../src/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { useUser } from './UserContext'; // Importer useUser pour obtenir les infos de l'utilisateur connecté

// Définition des types de props
type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'TaskList'>;
  route: RouteProp<RootStackParamList, 'TaskList'>;
};

const TaskListScreen: React.FC<Props> = ({ route, navigation }) => {
  const { userId, type } = route.params; // Récupérer userId et type depuis les paramètres de la route
  const [taches, setTaches] = useState<Task[]>([]); // État pour stocker les tâches
  const flatListRef = useRef<FlatList>(null); // Référence pour le défilement

  // Obtenir les informations de l'utilisateur connecté via le contexte
  const { user } = useUser();

  useEffect(() => {
    const fetchTaches = async () => {
      try {
        // Récupérer toutes les tâches pour cet utilisateur en fonction de leur statut d'achèvement
        const response = await obtenirTaches(userId, false); // Récupérer les tâches non terminées
        
        let data = [];

        // Filtrer les tâches en fonction de l'onglet sélectionné
        if (type === 'mesTaches') {
          data = response.tasks.filter((task: Task) => task.isOwner && !task.isDone); // Afficher les tâches créées par l'utilisateur et non terminées
        } else if (type === 'autresTaches') {
          data = response.tasks.filter((task: Task) => !task.isOwner && !task.isDone); // Afficher les tâches créées par d'autres utilisateurs et non terminées
        } else if (type === 'archiveTaches') {
          data = response.tasks.filter((task: Task) => task.isDone); // Afficher les tâches terminées
        }

        setTaches(data); // Mettre à jour l'état avec les tâches
      } catch (error) {
        console.error("Erreur lors de la récupération des tâches:", error);
      }
    };

    fetchTaches(); // Récupérer les tâches au montage
  }, [userId, type]);

  // Naviguer vers l'écran TaskDetail lors de la sélection d'une tâche
  const handleTachePress = (tache: Task) => {
    navigation.navigate('TaskDetail', { task: tache });
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        {/* Afficher le prénom et nom de l'utilisateur connecté */}
        {user && (
          <Text style={styles.userInfo}>Vous êtes connecté en tant que: {user.firstName} {user.lastName}</Text>
        )}

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

              {/* Afficher le nom du créateur si la tâche n'appartient pas à l'utilisateur connecté */}
              {!item.isOwner && (
                <Text style={styles.taskOwner}>
                  Créée par: {item.firstName} {item.lastName}
                </Text>
              )}

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
    backgroundColor: '#E6E6FA', // Fond violet pastel
  },
  form: {
    backgroundColor: '#FFFFFF', 
    padding: 20,                
    borderRadius: 10,           
    width: '80%',
    alignItems: 'center',
    maxHeight: '90%', // S'assurer que le contenu ne dépasse pas sur les petits écrans
  },
  userInfo: {
    fontSize: 16,
    marginBottom: 8,
    color: '#9370DB', // Violet léger pour les infos utilisateur
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    color: '#9370DB', // Violet léger pour le titre
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
  taskOwner: {
    fontSize: 12,
    color: '#9370DB', // Violet léger pour correspondre au thème général
    fontStyle: 'italic',
    marginTop: 5,
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
    borderRadius: 5,
    overflow: 'hidden',
  },
});

export default TaskListScreen;
