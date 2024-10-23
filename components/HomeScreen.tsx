import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, HomeScreenNavigationProp, HomeScreenRouteProp } from '../src/types';

// Déclaration des props pour la navigation
type Props = {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const userId = 'exemple-id-utilisateur'; // Remplacez par l'ID de l'utilisateur connecté

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Accueil</Text>
        <Text>Bienvenue sur l'écran d'accueil !</Text>
        
        {/* Bouton pour voir les tâches */}
        <View style={styles.buttonContainer}>
          <Button title="Voir les tâches" onPress={() => navigation.navigate('TaskList', { userId })} color="#ADD8E6" />
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
    backgroundColor: '#E6E6FA', // Fond violet pastel&#8203;:contentReference[oaicite:0]{index=0}
  },
  // Contenu centré avec un fond blanc et bordures arrondies
  content: {
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
  // Style des boutons
  buttonContainer: {
    marginTop: 10,
    width: '100%',
    borderRadius: 5,
    overflow: 'hidden', // Assure que le bouton a des coins arrondis
  },
});

export default HomeScreen;
