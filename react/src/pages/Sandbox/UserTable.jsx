import React, { useState, useEffect } from "react";
import {
  Grid,
  Hidden,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";

const UserTable = ({
  users,
  handleEditUserClick,
  deleteUser,
  changeUserStatus,
  makeRegularUser,
}) => {
  const dispatch = useDispatch();
  const [expandedUserId, setExpandedUserId] = useState(null);
  const [isMobileView, setIsMobileView] = useState(false);

  const handleUpdateUserProfile = (userData) => {
    dispatch(authActions.updateUserProfile(userData));
  };

  const toggleExpandUserId = (userId) => {
    setExpandedUserId((prevId) => (prevId === userId ? null : userId));
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth > 800);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Grid container>
      <Grid item xs={12}>
        <TableContainer>
          <Table>
            <Hidden mdUp>
              <TableHead style={{ display: "none" }}>
                <TableRow>
                  <TableCell style={{ fontSize: "16px", fontWeight: "bold" }}>
                    User ID
                  </TableCell>
                  <TableCell style={{ fontSize: "16px", fontWeight: "bold" }}>
                    User Name
                  </TableCell>
                  <TableCell style={{ fontSize: "16px", fontWeight: "bold" }}>
                    User Phone
                  </TableCell>
                  <TableCell style={{ fontSize: "16px", fontWeight: "bold" }}>
                    User Type
                  </TableCell>
                  <TableCell style={{ fontSize: "16px", fontWeight: "bold" }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
            </Hidden>
            <TableBody>
              {users.map((userData) => (
                <TableRow key={userData._id}>
                  <TableCell
                    style={{
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                    onClick={() => toggleExpandUserId(userData._id)}
                  >
                    {isMobileView || expandedUserId === userData._id
                      ? userData._id
                      : userData._id.slice(0, 5)}
                  </TableCell>
                  <TableCell>{userData.name.first}</TableCell>
                  <TableCell>{userData.phone}</TableCell>
                  <TableCell>
                    {userData.isAdmin
                      ? "Admin"
                      : userData.isBusiness
                      ? "Business"
                      : "Regular"}
                  </TableCell>
                  <TableCell>
                    {!userData.isAdmin && (
                      <>
                        <Button
                          onClick={() => handleEditUserClick(userData)}
                          style={{ color: "blue" }}
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => {
                            deleteUser(userData._id);
                            handleUpdateUserProfile(userData);
                          }}
                          style={{ color: "red" }}
                        >
                          Delete
                        </Button>
                        {!userData.isBusiness && (
                          <Button
                            onClick={() => {
                              changeUserStatus(userData._id, true);
                              handleUpdateUserProfile(userData);
                            }}
                          >
                            Make Business User
                          </Button>
                        )}
                        {userData.isBusiness && (
                          <Button
                            onClick={() => {
                              makeRegularUser(userData._id);
                              handleUpdateUserProfile(userData);
                            }}
                          >
                            Make Regular User
                          </Button>
                        )}
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default UserTable;
