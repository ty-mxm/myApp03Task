// App.tsx ou votre fichier principal
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './components/LoginScreen';
import SignupScreen from './components/SignupScreen';
import HomeScreen from './components/HomeScreen';
import TaskListScreen from './components/TaskListScreen';
import TaskDetailScreen from './components/TaskDetailScreen';
import AddTaskScreen from './components/AddTaskScreen';
import { RootStackParamList } from './src/types';

const Stack = createStackNavigator<RootStackParamList>(); // Utiliser le paramètre de type

const App = () => {
  return (
    <NavigationContainer>
<Stack.Navigator>
  <Stack.Screen name="Home" component={HomeScreen} />
  <Stack.Screen name="AddTask" component={AddTaskScreen} />
  <Stack.Screen name="TaskList" component={TaskListScreen} />
  <Stack.Screen name="Login" component={LoginScreen} />
  <Stack.Screen name="Signup" component={SignupScreen} />
  <Stack.Screen name="TaskDetail" component={TaskDetailScreen} />
</Stack.Navigator>

    </NavigationContainer>
  );
};

export default App;
