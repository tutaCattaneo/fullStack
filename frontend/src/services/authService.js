import apiClient from './apiClient';

export const login = async (email, password) => {
  const response = await apiClient.post('/auth/login', { email, password });
  if (response.data && response.data.access_token) {
    localStorage.setItem('accessToken', response.data.access_token); // Cambia aquí si usas otra clave
  } else {
    throw new Error('No token received');
  }
  return response.data;
};
