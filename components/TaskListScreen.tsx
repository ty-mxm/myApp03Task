import React, { useEffect, useState, useRef } from 'react';
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
  const { userId } = route.params; // Récupérer l'ID de l'utilisateur
  const [taches, setTaches] = useState<Task[]>([]); // État pour les tâches
  const flatListRef = useRef<FlatList>(null); // Référence pour faire défiler la liste

  // Fonction pour obtenir les tâches de l'utilisateur via l'API
  useEffect(() => {
    const fetchTaches = async () => {
      try {
        const data = await obtenirTaches(userId); // Appel API pour obtenir les tâches
        setTaches(data.tasks); // Mettre à jour l'état avec les tâches récupérées
        scrollToEnd(); // Faire défiler vers la dernière tâche
      } catch (error) {
        console.error(error);
      }
    };

    fetchTaches(); // Appeler la fonction pour obtenir les tâches à chaque chargement
  }, [userId]);

  // Fonction pour faire défiler jusqu'à la dernière tâche
  const scrollToEnd = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true }); // Scroller jusqu'à la fin de la liste
    }
  };

  // Fonction pour naviguer vers les détails d'une tâche
  const handleTachePress = (tache: Task) => {
    navigation.navigate('TaskDetail', { task: tache });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Liste des Tâches</Text>
      
      {/* Liste déroulante des tâches avec FlatList */}
      <FlatList
        ref={flatListRef} // Référence pour faire défiler
        data={taches}
        keyExtractor={(item) => item.taskId}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text style={styles.taskTitle}>{item.title}</Text>
            <Text style={styles.taskDescription}>{item.description}</Text>
            <Text style={styles.taskDate}>{item.date}</Text>
            <Text style={styles.taskStatus}>
              État: {item.isDone ? 'Terminée' : 'En cours'}
            </Text>
            <Button title="Voir" onPress={() => handleTachePress(item)} color="#ADD8E6" />
          </View>
        )}
        contentContainerStyle={styles.listContent}
        onContentSizeChange={scrollToEnd} // Défilement automatique lors du changement de contenu
      />
      
      {/* Bouton pour ajouter une nouvelle tâche */}
      <Button 
        title="Ajouter une tâche" 
        onPress={() => navigation.navigate('AddTask', { userId })} 
        color="#ADD8E6"
      />
    </View>
  );
};

// Application des styles
const styles = StyleSheet.create({
  container: {
    flex: 1, // Utiliser tout l'espace vertical
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#E6E6FA', // Fond violet pastel
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
    flexDirection: 'column', // Empiler les éléments en colonne
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  taskDescription: {
    fontSize: 14,
    color: '#555',
  },
  taskDate: {
    fontSize: 12,
    color: '#888',
  },
  taskStatus: {
    fontSize: 12,
    color: '#007BFF', // Couleur pour le statut
  },
  listContent: {
    paddingBottom: 20,
    flexGrow: 1, // Permet à la liste de croître et de défiler
  },
});

export default TaskListScreen;
