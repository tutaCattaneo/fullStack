import apiClient from './apiClient';

export const getUsers = async () => {
  const response = await apiClient.get('/users');
  return response.data;
};

export const createUser = async (user) => {
  const response = await apiClient.post('/users', user);
  return response.data;
};

export const updateUser = async (id, user) => {
  const response = await apiClient.put(`/users/${id}`, user);
  return response.data;
};

export const deleteUser = async (id) => {
  await apiClient.delete(`/users/${id}`);
};
