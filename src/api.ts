import axios from 'axios';

const BASE_URL = 'https://server-1-t93s.onrender.com/api';

export const signup = async (firstName: string, lastName: string, email: string, password: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/signup`, {
      firstName,
      lastName,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addTask = async (userId: string, title: string, description: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/tasks-management/add-task`, {
      userId,
      title,
      description,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTasks = async (userId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/tasks-management/get-tasks/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateTask = async (userId: string, taskId: string, title?: string, description?: string, isDone?: boolean) => {
  try {
    const response = await axios.put(`${BASE_URL}/tasks-management/update-task`, {
      userId,
      taskId,
      title,
      description,
      isDone,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
