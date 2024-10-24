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

// Create the Stack and Tab Navigators
const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootStackParamList>();

// Task Tabs for different types of tasks
const TaskTabs: React.FC<{ route: RouteProp<RootStackParamList, 'TaskListTabs'> }> = ({ route }) => {
  const { userId } = route.params; // Get userId from route params

  return (
    <Tab.Navigator>
      {/* Mes Tâches */}
      <Tab.Screen
        name="MesTaches"
        component={TaskListScreen}
        initialParams={{ userId, type: 'mesTaches' }}
        options={{ tabBarLabel: 'Mes Tâches' }} // Custom tab label
      />
      {/* Autres Tâches */}
      <Tab.Screen
        name="AutresTaches"
        component={TaskListScreen}
        initialParams={{ userId, type: 'autresTaches' }}
        options={{ tabBarLabel: 'Autres' }} // Custom tab label
      />
      {/* Tâches Archivées */}
      <Tab.Screen
        name="ArchiveesTaches"
        component={TaskListScreen}
        initialParams={{ userId, type: 'archiveTaches' }}
        options={{ tabBarLabel: 'Archivées' }} // Custom tab label
      />
    </Tab.Navigator>
  );
};

// Main App
const App = () => {
  return (
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
  );
};

export default App;
