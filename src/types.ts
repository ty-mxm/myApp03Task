import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type Task = {
  taskId: string;
  ownerId: string;
  title: string;
  description: string;
  isDone: boolean;
  date: string;
  isOwner: boolean;
};

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Home: { userId: string };
  TaskListTabs: { userId: string; type: 'mesTaches' | 'autresTaches' | 'archiveTaches' };
  TaskDetail: { task: Task };
  AddTask: { userId: string };
  TaskList: { userId: string; type: 'mesTaches' | 'autresTaches' | 'archiveTaches' };
  'Mes tâches': { userId: string; type: 'mesTaches' };
  'Tâches par d\'autres utilisateurs': { userId: string; type: 'autresTaches' };
  'Tâches archivées': { userId: string; type: 'archiveTaches' };
};

export type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;
export type SignupScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Signup'>;
export type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
export type TaskListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'TaskListTabs'>;
export type TaskDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'TaskDetail'>;
export type AddTaskScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddTask'>;

export type LoginScreenRouteProp = RouteProp<RootStackParamList, 'Login'>;
export type SignupScreenRouteProp = RouteProp<RootStackParamList, 'Signup'>;
export type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;
export type TaskListScreenRouteProp = RouteProp<RootStackParamList, 'TaskListTabs'>;
export type TaskDetailScreenRouteProp = RouteProp<RootStackParamList, 'TaskDetail'>;
export type AddTaskScreenRouteProp = RouteProp<RootStackParamList, 'AddTask'>;

export interface User {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
