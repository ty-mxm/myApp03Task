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

    // This will return user data, including firstName and lastName
    return await response.json();
  } catch (error) {
    throw error;
  }
};

// Ajouter une nouvelle tâche
export const ajouterTache = async (userId: string, title: string, description: string) => {
  try {
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
export const obtenirTaches = async (userId: string, isDone: boolean) => {
  try {
    const response = await fetch(`${BASE_URL}/tasks-management/get-tasks/${userId}?isDone=${isDone}`);
    
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
export const modifierTache = async (userId: string, taskId: string, titre?: string, description?: string, estFait?: boolean) => {
  try {
    const body = {
      userId,
      taskId,
      ...(titre && { title: titre }),        // Only include title if it's provided
      ...(description && { description }),   // Only include description if it's provided
      ...(estFait !== undefined && { isDone: estFait }), // Only include isDone if it's defined
    };

    // Log the request body to check what's being sent
    console.log('Request body:', body);

    const response = await fetch(`${BASE_URL}/tasks-management/update-task`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body), // Stringify the request body
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
