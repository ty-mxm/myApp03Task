import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
 
const BASE_URL = 'https://server-1-t93s.onrender.com/api';
 
interface Task {
  taskId: string;
  title: string;
  description: string;
  isDone: boolean;
  createdAt: string;
  firstName: string;
  lastName: string;
  isOwner: boolean;
}
 
// Inscription d'un nouvel utilisateur
export const inscription = async (prenom: string, nom: string, email: string, motDePasse: string) => {
  try {
    const response = await fetch(`${BASE_URL}/user/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: prenom,
        lastName: nom,
        email,
        password: motDePasse,
      }),
    });
 
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Erreur lors de l'inscription: ${errorMessage}`);
    }
 
    const data = await response.json();
    await AsyncStorage.setItem('userId', data.userId); // Stocker l'ID utilisateur
    return data;
  } catch (error) {
    throw error;
  }
};
 
// Connexion d'un utilisateur
export const connexion = async (email: string, motDePasse: string) => {
  try {
    const response = await fetch(`${BASE_URL}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password: motDePasse,
      }),
    });
 
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Erreur lors de la connexion: ${errorMessage}`);
    }
 
    const data = await response.json();
    await AsyncStorage.setItem('userId', data.userId); // Stocker l'ID utilisateur
    return data;
  } catch (error) {
    throw error;
  }
};
 
// Ajouter une nouvelle tâche
export const ajouterTache = async (title: string, description: string) => {
  try {
    const userId = await AsyncStorage.getItem('userId');
    if (!userId) {
      throw new Error('User not found');
    }
 
    const response = await fetch(`${BASE_URL}/tasks-management/add-task`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        title,
        description,
      }),
    });
 
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Erreur lors de l'ajout de la tâche: ${errorMessage}`);
    }
 
    return await response.json();
  } catch (error) {
    throw error;
  }
};
 
// Obtenir toutes les tâches d'un utilisateur (My, Other Users', and Archived)
export const obtenirTaches = async (userId: string, p0: boolean) => {
  try {
    const response = await fetch(`${BASE_URL}/tasks-management/get-tasks/${userId}`);
 
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Erreur lors de la récupération des tâches: ${errorMessage}`);
    }
 
    return await response.json(); // Return all tasks, filtering will be done client-side
  } catch (error) {
    throw error;
  }
};
 
// Modifier une tâche existante
export const modifierTache = async (taskId: string, title: string, description: string, isDone: boolean, isOwner: boolean) => {
  try {
    const userId = await AsyncStorage.getItem('userId');
    if (!userId) {
      throw new Error('User not found');
    }
 
    if (!taskId) {
      throw new Error('Task ID is required');
    }
 
    if (typeof isDone !== 'boolean') {
      throw new Error('isDone must be a boolean');
    }
 
    console.log("Updating task with userId:", userId, "taskId:", taskId, "title:", title, "description:", description, "isDone:", isDone, "isOwner:", isOwner);
 
    const response = await fetch(`${BASE_URL}/tasks-management/update-task`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: userId,
        taskId: taskId,
        title: title,
        description: description,
        isDone: isDone,
        isOwner: isOwner,  // Ajout de isOwner ici
      }),
    });
 
    if (!response.ok) {
      const error = await response.json();
      console.error('Erreur lors de la mise à jour de la tâche:', error);
      throw new Error('Erreur lors de la mise à jour de la tâche');
    } else {
      const data = await response.json();
      console.log('Tâche mise à jour avec succès:', data);
      return data;
    }
  } catch (error) {
    throw error;
  }
};
 
// Charger les tâches et les séparer en actives et complétées
export const loadTasks = async (includeCompleted: boolean): Promise<{
  activeTasks: Task[];
  completedTasks: Task[];
}> => {
  try {
    const userId = await AsyncStorage.getItem('userId');
    if (!userId) {
      throw new Error('User not found');
    }
 
    const data = await obtenirTaches(userId, includeCompleted);
    const activeTasks: Task[] = [];
    const completedTasks: Task[] = [];
 
    data.tasks.forEach((task: any) => {
      const mappedTask: Task = {
        taskId: task.taskId,
        title: task.title,
        description: task.description,
        isDone: task.isDone,
        createdAt: moment.utc(task.date).utcOffset('-04:00').format('YYYY-MM-DD HH:mm:ss'), // Adjust timestamp
        firstName: task.firstName || '',
        lastName: task.lastName || '',
        isOwner: task.isOwner
      };
 
      if (task.isDone) {
        completedTasks.push(mappedTask);
      } else {
        activeTasks.push(mappedTask);
      }
    });
 
    // Sort tasks from newest to oldest based on createdAt
    activeTasks.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    completedTasks.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
 
    return { activeTasks, completedTasks };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    console.error(`Error loading tasks: ${errorMessage}`);
    return { activeTasks: [], completedTasks: [] };
  }
};