import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

export type Task = {
  taskId: string;
  ownerId: string;
  title: string;
  description: string;
  isDone: boolean;
  date: string;
};

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Home: undefined;
  TaskList: { userId: string };
  TaskDetail: { task: Task };
  AddTask: { userId: string };
};

export type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;
export type SignupScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Signup'>;
export type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
export type TaskListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'TaskList'>;
export type TaskDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'TaskDetail'>;
export type AddTaskScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddTask'>;

export type LoginScreenRouteProp = RouteProp<RootStackParamList, 'Login'>;
export type SignupScreenRouteProp = RouteProp<RootStackParamList, 'Signup'>;
export type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;
export type TaskListScreenRouteProp = RouteProp<RootStackParamList, 'TaskList'>;
export type TaskDetailScreenRouteProp = RouteProp<RootStackParamList, 'TaskDetail'>;
export type AddTaskScreenRouteProp = RouteProp<RootStackParamList, 'AddTask'>;
