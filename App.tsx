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
import { UserProvider } from './components/UserContext'; // Import UserProvider to manage global user state

// Create the Stack and Tab Navigators
const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootStackParamList>();

// Task Tabs for different types of tasks
const TaskTabs: React.FC<{ route: RouteProp<RootStackParamList, 'TaskListTabs'> }> = ({ route }) => {
  const { userId } = route.params; // Get userId from route params

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#E6E6FA', // Pastel violet background for consistency
          borderTopWidth: 0,          // Removes the border at the top of the tab bar
          height: 60,                 // Increases height for a more spacious feel
        },
        tabBarLabelStyle: {
          fontSize: 14,               // Font size for tab labels
          fontWeight: '600',          // Semi-bold for better readability
          paddingBottom: 8,           // Adds space between the label and the edge of the tab bar
        },
        tabBarActiveTintColor: '#9370DB', // Active tab color (violet)
        tabBarInactiveTintColor: '#555',  // Inactive tab color (gray)
      }}
    >
      {/* Mes Tâches with Emoji */}
      <Tab.Screen
        name="Mes tâches"
        component={TaskListScreen}
        initialParams={{ userId, type: 'mesTaches' }}
        options={{ tabBarLabel: 'Mes tâches 📝 ' }} // Emoji added to the label
      />
      {/* Autres Tâches with Emoji */}
      <Tab.Screen
        name="Tâches par d'autres utilisateurs"
        component={TaskListScreen}
        initialParams={{ userId, type: 'autresTaches' }}
        options={{ tabBarLabel: 'Autres 📋' }} // Emoji added to the label
      />
      {/* Tâches Archivées with Emoji */}
      <Tab.Screen
        name="Tâches archivées"
        component={TaskListScreen}
        initialParams={{ userId, type: 'archiveTaches' }}
        options={{ tabBarLabel: 'Archivées 📦' }} // Emoji added to the label
      />
    </Tab.Navigator>
  );
};

// Main App
const App = () => {
  return (
    <UserProvider> {/* Wrap your app in UserProvider */}
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
