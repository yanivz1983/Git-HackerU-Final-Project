import React, { Fragment, useEffect, useState } from "react";
import { Typography, Divider, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import UserTable from "./UserTable";
import EditStatusPage from "./EditStatusPage";
import "../../css/stylesSamdbox.css";

const SandboxPage = () => {
  const user = useSelector((state) => state.authSlice);
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [editedUser, setEditedUser] = useState(null);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const { data } = await axios.get("http://localhost:8080/users");
        setUsers(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchAllUsers();
  }, []);

  const updateUserProfile = async (userId, updatedData) => {
    try {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, ...updatedData } : user
        )
      );
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:8080/users/${userId}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const changeUserStatus = async (userId, isBusiness) => {
    try {
      const { data } = await axios.patch(
        `http://localhost:8080/users/${userId}`,
        {
          isBusiness,
        }
      );

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, isBusiness } : user
        )
      );
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  const makeRegularUser = (userId) => {
    changeUserStatus(userId, false);
  };

  const handleInputChange = (field, value) => {
    setEditedUser((prevUser) => {
      const newUser = JSON.parse(JSON.stringify(prevUser));

      const keys = field.split(".");

      let currentObject = newUser;
      for (let i = 0; i < keys.length - 1; i++) {
        currentObject = currentObject[keys[i]] || {};
      }
      currentObject[keys[keys.length - 1]] = value;

      return newUser;
    });
  };

  const handleEditUserClick = (user) => {
    setSelectedUser(user);
    setEditedUser(user);
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
  };

  const handleEditDialogSave = async () => {
    try {
      if (editedUser) {
        await axios.put(
          `http://localhost:8080/users/${editedUser._id}`,
          editedUser
        );
      } else {
        console.error("Edited user is null");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      handleEditDialogClose();
    }
  };

  const handleSave = () => {
    updateUserProfile(editedUser._id, editedUser);
    setEditedUser(null);
    handleEditDialogSave();
  };

  return (
    <Fragment>
      <Typography
        sx={{
          fontFamily: "serif",
          textAlign: "center",
          py: 5,
          fontSize: "3rem",
          fontWeight: "bold",
          color: "#333",
          textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
        }}
        variant="h1"
      >
        SANDBOX
      </Typography>
      <Divider
        sx={{
          mt: 4,
          mb: 10,
          mx: "auto",
          width: "50%",
          backgroundColor: "linear-gradient(to right, #ccc, #999, #ccc)",
          height: "4px",
          borderRadius: "4px",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      />
      {user.isAuthenticated && (
        <div>
          <Button onClick={() => updateUserProfile(user.id, {})}>
            Update Profile
          </Button>
        </div>
      )}

      {user.isAdmin && (
        <UserTable
          users={users}
          handleEditUserClick={handleEditUserClick}
          deleteUser={deleteUser}
          changeUserStatus={changeUserStatus}
          makeRegularUser={makeRegularUser}
        />
      )}

      <EditStatusPage
        isOpen={isEditDialogOpen}
        handleClose={handleEditDialogClose}
        editedUser={editedUser}
        handleInputChange={handleInputChange}
        handleSave={handleSave}
        isAdmin={user.isAdmin}
      />
    </Fragment>
  );
};

export default SandboxPage;
