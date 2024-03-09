import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

const EditStatusPage = ({
  isOpen,
  handleClose,
  editedUser,
  handleInputChange,
  handleSave,
  isAdmin, 
}) => {
  const generateTextField = (label, key, value, isPassword) =>
    (!isPassword || isAdmin) && (
      <TextField
        key={key}
        label={label}
        value={value}
        onChange={(e) => handleInputChange(key, e.target.value)}
        fullWidth
        InputLabelProps={{
          style: { textAlign: "left" },
        }}
        style={{ marginBottom: 10, marginTop: 5 }}
        type={isPassword ? "password" : "text"}
      />
    );

  const fields = [
    {
      label: "First Name",
      key: "name.first",
      value: editedUser?.name?.first || "",
    },
    {
      label: "Middle Name",
      key: "name.middle",
      value: editedUser?.name?.middle || "",
    },
    {
      label: "Last Name",
      key: "name.last",
      value: editedUser?.name?.last || "",
    },
    { label: "Email", key: "email", value: editedUser?.email || "" },
    { label: "Phone", key: "phone", value: editedUser?.phone || "" },
    { label: "Alt", key: "image.alt", value: editedUser?.image?.alt || "" },
    { label: "URL", key: "image.url", value: editedUser?.image?.url || "" },
    {
      label: "State",
      key: "address.state",
      value: editedUser?.address?.state || "",
    },
    {
      label: "Country",
      key: "address.country",
      value: editedUser?.address?.country || "",
    },
    {
      label: "City",
      key: "address.city",
      value: editedUser?.address?.city || "",
    },
    {
      label: "Street",
      key: "address.street",
      value: editedUser?.address?.street || "",
    },
    {
      label: "House Number",
      key: "address.houseNumber",
      value: editedUser?.address?.houseNumber || "",
    },
    { label: "Zip", key: "address.zip", value: editedUser?.address?.zip || "" },
    { label: "Password", key: "password", value: "", isPassword: true }, 
  ];

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        {fields.map((field) =>
          generateTextField(
            field.label,
            field.key,
            field.value,
            field.isPassword
          )
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditStatusPage;
