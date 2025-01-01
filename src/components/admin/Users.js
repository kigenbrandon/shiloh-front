import React, { useState, useEffect } from "react";
import {
  Box, Paper, Typography, Button, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Modal, TextField, IconButton
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SearchBar from "../Searchbar";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({ username: "", email: "", role: "", password: "" });
  const navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem("userData"));
  const token = userData?.access_token;
  const refreshToken = userData?.refresh_token;

  useEffect(() => {
    if (userData?.user?.role !== "admin") {
      navigate("/home");
    } else {
      fetchUsers();
    }
  }, [userData, navigate]);

  const fetchUsers = async () => {
    try {
      await checkTokenExpiration();
      const response = await axios.get("https://shiloh-server.onrender.com/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleCreateUser = async () => {
    try {
      await checkTokenExpiration();
      await axios.post("https://shiloh-server.onrender.com/users", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsCreateModalOpen(false);
      setFormData({ username: "", email: "", role: "", password: "" });
      fetchUsers();
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handleEditUser = async () => {
    try {
      await checkTokenExpiration();
      await axios.put(`https://shiloh-server.onrender.com/users/${selectedUser.id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsEditModalOpen(false);
      setFormData({ username: "", email: "", role: "", password: "" });
      fetchUsers();
    } catch (error) {
      console.error("Error editing user:", error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await checkTokenExpiration();
      await axios.delete(`https://shiloh-server.onrender.com/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const checkTokenExpiration = async () => {
    const tokenExpiration = JSON.parse(localStorage.getItem("tokenExpiration"));
    const now = new Date().getTime();

    if (tokenExpiration && now >= tokenExpiration) {
      await refreshTokenHandler();
    }
  };

  const refreshTokenHandler = async () => {
    try {
      const response = await axios.post(
        "https://shiloh-server.onrender.com/users/refresh",
        {},
        { headers: { Authorization: `Bearer ${refreshToken}` } }
      );
      const { access_token, refresh_token } = response.data;

      const updatedUserData = { ...userData, access_token, refresh_token };
      localStorage.setItem("userData", JSON.stringify(updatedUserData));
      localStorage.setItem("tokenExpiration", JSON.stringify(new Date().getTime() + 60 * 60 * 1000));
    } catch (error) {
      console.error("Error refreshing token:", error);
      navigate("/login");
    }
  };

  const modalFields = [
    { name: "username", label: "Username" },
    { name: "email", label: "Email" },
    { name: "role", label: "Role" },
    { name: "password", label: "Password", isOptional: true },
  ];

  return (
    userData?.user?.role === "admin" && (
      <Box sx={{ display: "flex", height: "100%" }}>
        <Box sx={{ flexGrow: 1, padding: 4 }}>
          <SearchBar fetchData={fetchUsers} placeholder="Search users..." dataKey="username" />
          <Paper sx={{ padding: 3, boxShadow: 3, marginBottom: 4 }}>
            <Typography variant="h6" gutterBottom>Users List</Typography>
            <Button variant="contained" color="primary" onClick={() => setIsCreateModalOpen(true)}>
              Create New User
            </Button>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Username</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.id}</TableCell>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => {
                            setSelectedUser(user);
                            setFormData(user);
                            setIsEditModalOpen(true);
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDeleteUser(user.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>

        <Modal open={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}>
          <Box sx={{ padding: 4, maxWidth: 400, margin: "auto", backgroundColor: "white", borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>Create New User</Typography>
            {modalFields.map(({ name, label, isOptional }) => (
              <TextField
                key={name}
                label={label}
                name={name}
                value={formData[name] || ""}
                onChange={handleInputChange}
                fullWidth
                sx={{ marginBottom: 2 }}
                type={isOptional ? "password" : "text"}
              />
            ))}
            <Button variant="contained" color="primary" onClick={handleCreateUser} fullWidth>
              Create
            </Button>
          </Box>
        </Modal>

        <Modal open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
          <Box sx={{ padding: 4, maxWidth: 400, margin: "auto", backgroundColor: "white", borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>Edit User</Typography>
            {modalFields.map(({ name, label, isOptional }) => (
              <TextField
                key={name}
                label={label}
                name={name}
                value={formData[name] || ""}
                onChange={handleInputChange}
                fullWidth
                sx={{ marginBottom: 2 }}
                type={isOptional ? "password" : "text"}
              />
            ))}
            <Button variant="contained" color="primary" onClick={handleEditUser} fullWidth>
              Update
            </Button>
          </Box>
        </Modal>
      </Box>
    )
  );
};

export default Users;
