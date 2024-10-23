import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { connexion } from '../src/api'; 
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, LoginScreenNavigationProp, LoginScreenRouteProp } from '../src/types';

// Déclaration des props pour la navigation
type Props = {
  navigation: LoginScreenNavigationProp;
  route: LoginScreenRouteProp;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Fonction de gestion de la connexion
  const handleLogin = async () => {
    try {
      const response = await connexion(email, password); // Make API call to log in the user
      const userId = response.userId; // Assuming the response includes the userId
      navigation.navigate('Home', { userId }); // Pass userId to HomeScreen
    } catch (error) {
      console.error(error);
      Alert.alert('Erreur', 'Échec de la connexion. Vérifiez vos identifiants.');
    }
  };
  
  

  return (
    // Centrer le formulaire avec Flexbox
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Connexion</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        
          {/* Vue conteneur pour le style personnalisé des boutons */}
          <View style={styles.buttonContainer}>
          <Button title="Se connecter" onPress={handleLogin} color="#ADD8E6" />
          </View>

          <View style={styles.buttonContainer}>
          <Button title="S'inscrire" onPress={() => navigation.navigate('Signup')} color="#ADD8E6" />
          </View>
      </View>
    </View>
  );
};

// Application des styles
const styles = StyleSheet.create({
  // Centrer le contenu de l'écran verticalement et horizontalement
  container: {
    flex: 1,
    justifyContent: 'center', // Aligne le contenu au centre verticalement&#8203;:contentReference[oaicite:2]{index=2}
    alignItems: 'center',     // Aligne le contenu au centre horizontalement&#8203;:contentReference[oaicite:3]{index=3}
    backgroundColor: '#E6E6FA', // Couleur pastel violet clair pour le fond&#8203;:contentReference[oaicite:4]{index=4}
  },
  // Formulaire compact avec un fond blanc et bordures arrondies
  form: {
    backgroundColor: '#FFFFFF', // Fond blanc pour le contraste du formulaire
    padding: 20,                // Espacement intérieur pour le contenu&#8203;:contentReference[oaicite:5]{index=5}
    borderRadius: 10,           // Bordures arrondies pour un effet plus doux&#8203;:contentReference[oaicite:6]{index=6}
    width: '80%',               // Largeur du formulaire
    alignItems: 'center',        // Centrer le texte et les champs
  },
  // Titre avec une couleur violette douce
  title: {
    fontSize: 24,
    marginBottom: 16,
    color: '#9370DB', // Violet léger pour le titre&#8203;:contentReference[oaicite:7]{index=7}
  },
  // Champs de texte avec des bordures et du padding
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    width: '100%',          // Largeur complète du champ de texte
    borderRadius: 5,        // Légère arrondie pour les bords des champs&#8203;:contentReference[oaicite:8]{index=8}
  },
  // Conteneur autour du bouton pour appliquer la marge et aligner avec d'autres éléments
buttonContainer: {
  marginTop: 10,
  width: '100%',
  borderRadius: 5,
  overflow: 'hidden', // Assure que le bouton a des coins arrondis
},
});

export default LoginScreen;
