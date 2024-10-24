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

// Changer le mot de passe
export const changerMotDePasse = async (userId: string, ancienMotDePasse: string, nouveauMotDePasse: string) => {
  try {
    const response = await fetch(`${BASE_URL}/user/change-password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        oldPassword: ancienMotDePasse,
        newPassword: nouveauMotDePasse,
      }),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Erreur lors du changement de mot de passe: ${errorMessage}`);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

// Mise à jour des informations utilisateur
export const miseAJourUtilisateur = async (userId: string, prenom: string, nom: string) => {
  try {
    const response = await fetch(`${BASE_URL}/user/update-user`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        firstName: prenom,
        lastName: nom,
      }),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Erreur lors de la mise à jour des informations utilisateur: ${errorMessage}`);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};



// Ajouter une nouvelle tâche
export const ajouterTache = async (userId: string, title: string, description: string) => {
  try {
    const response = await fetch('https://server-1-t93s.onrender.com/api/tasks-management/add-task', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        title,  // Keep 'title' as it's used in your version
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


// Obtenir les tâches d'un utilisateur
export const obtenirTaches = async (userId: string, isDone: boolean) => {
  try {
    const response = await fetch(`${BASE_URL}/tasks-management/get-tasks/${userId}?isDone=${isDone}`);
    
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Erreur lors de la récupération des tâches: ${errorMessage}`);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const obtenirTachesAutres = async (isDone: boolean) => {
  try {
    const response = await fetch(`${BASE_URL}/tasks-management/get-other-users-tasks?isDone=${isDone}`);
    
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Erreur lors de la récupération des tâches des autres utilisateurs: ${errorMessage}`);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const obtenirTachesArchivees = async (isDone: boolean) => {
  try {
    const response = await fetch(`${BASE_URL}/tasks-management/get-archived-tasks?isDone=${isDone}`);
    
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Erreur lors de la récupération des tâches archivées: ${errorMessage}`);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};



// Modifier une tâche existante
export const modifierTache = async (userId: string, taskId: string, titre?: string, description?: string, estFait?: boolean) => {
  try {
    // Construction du corps de la requête
    const body = {
      userId,
      taskId,
      ...(titre && { title: titre }), // Ajoute le titre uniquement s'il existe
      ...(description && { description }), // Ajoute la description uniquement si elle existe
      ...(estFait !== undefined && { isDone: estFait }), // Ajoute isDone uniquement s'il est défini
    };

    // Log du corps de la requête pour le débogage
    console.log('Request body:', body);

    // Envoi de la requête PUT à l'API
    const response = await fetch(`${BASE_URL}/tasks-management/update-task`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    // Vérification de la réponse
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Erreur lors de la mise à jour de la tâche: ${errorMessage}`);
    }

    // Retourne la réponse JSON si la requête est réussie
    return await response.json();
  } catch (error) {
    // Log de l'erreur pour le débogage
    console.error('Error updating task:', error);
    throw error;
  }
};
