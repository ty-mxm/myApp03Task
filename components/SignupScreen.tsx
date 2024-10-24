import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { inscription } from '../src/api';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, SignupScreenNavigationProp, SignupScreenRouteProp } from '../src/types';

// Déclaration des props pour la navigation
type Props = {
  navigation: SignupScreenNavigationProp;
  route: SignupScreenRouteProp;
};

const SignupScreen: React.FC<Props> = ({ navigation }) => {
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');

  // Fonction de gestion de l'inscription
  const handleInscription = async () => {
    try {
      const response = await inscription(prenom, nom, email, motDePasse);
      console.log(response);
      // Redirection vers la page de connexion après succès
      navigation.navigate('Login');
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        Alert.alert('Erreur', 'Cet email est déjà utilisé. Veuillez en choisir un autre.');
      } else {
        Alert.alert('Erreur', 'Une erreur est survenue lors de l\'inscription. Veuillez réessayer.');
      }
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Inscription</Text>
        <TextInput
          style={styles.input}
          placeholder="Prénom"
          value={prenom}
          onChangeText={setPrenom}
        />
        <TextInput
          style={styles.input}
          placeholder="Nom"
          value={nom}
          onChangeText={setNom}
        />
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
          value={motDePasse}
          onChangeText={setMotDePasse}
          secureTextEntry
        />
        
        {/* Bouton pour l'inscription avec le même style que la page de connexion */}
        <View style={styles.buttonContainer}>
          <Button title="S'inscrire" onPress={handleInscription} color="#ADD8E6" />
        </View>

        {/* Bouton pour rediriger vers la page de connexion */}
        <View style={styles.buttonContainer}>
          <Button title="Se connecter" onPress={() => navigation.navigate('Login')} color="#ADD8E6" />
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
  // Style des boutons
  buttonContainer: {
    marginTop: 10,
    width: '100%',
    borderRadius: 5,
    overflow: 'hidden', // Assure que le bouton a des coins arrondis
  },
});

export default SignupScreen;
