const BASE_URL = 'https://server-1-t93s.onrender.com/api';

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

    return await response.json();
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

    return await response.json();
  } catch (error) {
    throw error;
  }
};

// Ajouter une nouvelle tâche
export const ajouterTache = async (taskData: any, title: string, description: string) => {
  const response = await fetch('https://server-1-t93s.onrender.com/api/tasks-management/add-task', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
  });

  const data = await response.json();
  if (!response.ok) {
      throw new Error(`Erreur lors de l'ajout de la tâche: ${data.error}`);
  }
  return data;
};


// Obtenir les tâches d'un utilisateur
// Exemple de fonction de récupération des tâches
export const obtenirTaches = async (userId: any) => {
  const response = await fetch(`https://server-1-t93s.onrender.com/api/tasks-management/get-tasks/${userId}`);
  const data = await response.json();
  // Gérer les erreurs
  if (!response.ok) {
      throw new Error(`Erreur lors de la récupération des tâches: ${data.error}`);
  }
  return data;
};


// Modifier une tâche existante
export const modifierTache = async (utilisateurId: string, tacheId: string, titre?: string, description?: string, estFait?: boolean) => {
  try {
    const response = await fetch(`${BASE_URL}/tasks-management/update-task`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: utilisateurId,
        taskId: tacheId,
        title: titre,
        description,
        isDone: estFait,
      }),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Erreur lors de la mise à jour de la tâche: ${errorMessage}`);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};
