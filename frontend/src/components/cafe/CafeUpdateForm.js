import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";

function UpdateCafeForm({ cafeData, onUpdate, onClose }) {
  const [updatedCafeData, setUpdatedCafeData] = useState(cafeData);

  useEffect(() => {
    // Reset the form data when cafeData changes (e.g., when editing a different cafe)
    setUpdatedCafeData(cafeData);
  }, [cafeData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedCafeData({
      ...updatedCafeData,
      [name]: value,
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Replace this with your API endpoint for uploading the image
      const apiUrl = "http://localhost:3333/logo/upload";

      const formData = new FormData();
      formData.append("logo", file);

      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        setUpdatedCafeData({
          ...updatedCafeData,
          logo: data.imageUrl ?data.imageUrl: "logo" , // Assuming the API returns the imageURL
        });
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you can submit updatedCafeData to your backend or perform any required actions
    console.log("Updated Cafe Data:", updatedCafeData);
    try {
      delete updatedCafeData.employeeCount;
      updatedCafeData.logo = updatedCafeData.logo || "logo"
      const data = JSON.stringify(updatedCafeData);
      
      const config = {
        method: "put", // Change to PUT for updating data
        maxBodyLength: Infinity,
        url: `http://localhost:3333/cafes/${updatedCafeData.id}`, // Use the correct API endpoint for updating
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));
      alert("Cafe updated successfully!");
      onUpdate(updatedCafeData); // Notify the parent component about the update
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="50vh"
    >
      <form
        onSubmit={handleSubmit}
        style={{
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Update Cafe
        </Typography>
        <TextField
          name="name"
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={updatedCafeData.name}
          onChange={handleInputChange}
          required
        />
        <TextField
          name="description"
          label="Description"
          variant="outlined"
          margin="normal"
          fullWidth
          value={updatedCafeData.description}
          onChange={handleInputChange}
          required
        />
        <TextField
          name="location"
          label="Location"
          variant="outlined"
          fullWidth
          margin="normal"
          value={updatedCafeData.location}
          onChange={handleInputChange}
          required
        />
        <input
          type="file"
          accept="image/*"
          id="logo-upload-update"
          style={{ display: "none" }}
          onChange={handleImageUpload}
        />
        <label htmlFor="logo-upload-update">
          <Button
            variant="outlined"
            component="span"
            startIcon={<CloudUploadIcon />}
          >
            Upload Logo
          </Button>
        </label>
        {updatedCafeData.logo && (
          <img
            src={updatedCafeData.logo}
            alt="Cafe Logo"
            style={{ maxWidth: "100px", marginTop: "10px" }}
          />
        )}
        <div
          style={{
            marginTop: "10px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginRight: "5px" }}
          >
            Update Cafe
          </Button>
          <Button variant="contained" color="primary" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </Box>
  );
}

export default UpdateCafeForm;
