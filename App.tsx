import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './components/LoginScreen';
import SignupScreen from './components/SignupScreen';
import HomeScreen from './components/HomeScreen';
import TaskListScreen from './components/TaskListScreen';
import TaskDetailScreen from './components/TaskDetailScreen';
import AddTaskScreen from './components/AddTaskScreen';
import { RootStackParamList } from './src/types';
import { RouteProp } from '@react-navigation/native';
import { UserProvider } from './components/UserContext'; // Import de UserProvider pour gérer l'état global de l'utilisateur


const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootStackParamList>();

// Onglets des tâches pour différents types de tâches
const TaskTabs: React.FC<{ route: RouteProp<RootStackParamList, 'TaskListTabs'> }> = ({ route }) => {
  const { userId } = route.params; // Récupérer userId à partir des paramètres de la route

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#E6E6FA', 
          borderTopWidth: 0,          
          height: 60,                 
        },
        tabBarLabelStyle: {
          fontSize: 14,               
          fontWeight: '600',          
          paddingBottom: 8,           
        },
        tabBarActiveTintColor: '#9370DB', 
        tabBarInactiveTintColor: '#555',  
      }}
    >
      
      <Tab.Screen
        name="Mes tâches"
        component={TaskListScreen}
        initialParams={{ userId, type: 'mesTaches' }}
        options={{ tabBarLabel: 'Mes tâches 📝 ' }} 
      />
      
      <Tab.Screen
        name="Tâches par d'autres utilisateurs"
        component={TaskListScreen}
        initialParams={{ userId, type: 'autresTaches' }}
        options={{ tabBarLabel: 'Autres 📋' }} 
      />
      
      <Tab.Screen
        name="Tâches archivées"
        component={TaskListScreen}
        initialParams={{ userId, type: 'archiveTaches' }}
        options={{ tabBarLabel: 'Archivées 📦' }} 
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <UserProvider> 
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="AddTask" component={AddTaskScreen} />
          <Stack.Screen name="TaskListTabs" component={TaskTabs} />
          <Stack.Screen name="TaskDetail" component={TaskDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
};

export default App;
