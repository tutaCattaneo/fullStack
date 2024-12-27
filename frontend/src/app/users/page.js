'use client';
import LogoutButton from '../../components/LogoutButton'; // Ajusta el path si está en otro lugar

import { useState, useEffect } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from '../../services/userService';
import useAuth from '../../utils/useAuth'; // Sin llaves para exportación por defecto



export default function UsersPage() {
  useAuth();

  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '' });
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  const handleCreateUser = async () => {
    try {
      const user = await createUser(newUser);
      setUsers([...users, user]);
      setNewUser({ name: '', email: '', password: '' });
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateUser = async () => {
    try {
      const updatedUser = await updateUser(editingUser._id, editingUser);
      setUsers(users.map((user) => (user._id === updatedUser._id ? updatedUser : user)));
      setEditingUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">User Management</h1>
      <LogoutButton />

      {/* Create User Form */}
      <div className="card p-4 mb-4">
        <h2 className="mb-3">Add New User</h2>
        <div className="mb-3">
          <input
            type="text"
            placeholder="Name"
            className="form-control"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            placeholder="Email"
            className="form-control"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            placeholder="Password"
            className="form-control"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          />
        </div>
        <button className="btn btn-success w-100" onClick={handleCreateUser}>
          Add User
        </button>
      </div>

      {/* Edit User Form */}
      {editingUser && (
        <div className="card p-4 mb-4">
          <h2 className="mb-3">Edit User</h2>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Name"
              className="form-control"
              value={editingUser.name}
              onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              placeholder="Email"
              className="form-control"
              value={editingUser.email}
              onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
            />
          </div>
          <button className="btn btn-primary w-100" onClick={handleUpdateUser}>
            Save Changes
          </button>
        </div>
      )}

      {/* User List */}
      <div className="card p-4">
        <h2 className="mb-3">Users</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    className="btn btn-warning me-2"
                    onClick={() => setEditingUser(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
