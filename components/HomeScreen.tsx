import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, HomeScreenNavigationProp, HomeScreenRouteProp } from '../src/types';

type Props = {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const userId = 'exemple-id-utilisateur'; // Remplacez par l'ID de l'utilisateur connecté

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Accueil</Text>
      <Text>Bienvenue sur l'écran d'accueil !</Text>
      <Button title="Voir les tâches" onPress={() => navigation.navigate('TaskList', { userId })} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
});

export default HomeScreen;
