const BASE_URL = 'https://server-1-t93s.onrender.com/api';

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
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

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
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const ajouterTache = async (utilisateurId: string, titre: string, description: string) => {
  try {
    const response = await fetch(`${BASE_URL}/tasks-management/add-task`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: utilisateurId,
        title: titre,
        description,
      }),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const obtenirTaches = async (utilisateurId: string) => {
  try {
    const response = await fetch(`${BASE_URL}/tasks-management/get-tasks/${utilisateurId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

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
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};
