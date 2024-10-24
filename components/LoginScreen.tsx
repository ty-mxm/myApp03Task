import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { connexion } from '../src/api'; 
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, LoginScreenNavigationProp, LoginScreenRouteProp } from '../src/types';
import { useUser } from './UserContext'; // Use the custom hook instead of accessing UserContext directly

// Déclaration des props pour la navigation
type Props = {
  navigation: LoginScreenNavigationProp;
  route: LoginScreenRouteProp;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setUser } = useUser(); 

  // Fonction de gestion de la connexion
  const handleLogin = async () => {
    try {
      const response = await connexion(email, password); // Response includes user info (userId, firstName, lastName)
      const userId = response.userId;
      const firstName = response.firstName;
      const lastName = response.lastName;
  
      // Update the global user context with the user's data
      setUser({ firstName, lastName });
  
      // Redirect to TaskListTabs and pass the userId
      navigation.navigate('TaskListTabs', { userId, type: 'mesTaches' });
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

export default LoginScreen;
