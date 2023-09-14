import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import SuccessModal from "../employee/SuccessModal";
function CafeForm({ onClose, fetchCafes, fetchCafeLocations }) {
  const [cafeData, setCafeData] = useState({
    name: "",
    description: "",
    location: "",
    logo: "logo", // Store the image URL here
  });


  const [successModalOpen, setSuccessModalOpen] = useState(false);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCafeData({
      ...cafeData,
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
        setCafeData({
          ...cafeData,
          logo: data.imageUrl, // Assuming the API returns the imageURL
        });
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };


  const openSuccessModal = () => {
    setSuccessModalOpen(true);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you can submit cafeData to your backend or perform any required actions
    console.log("Cafe Data:", cafeData);
    try {
      const data = JSON.stringify(cafeData);


      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://localhost:3333/cafes",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };


      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));
      // alert("Cafe created successfully!");
      openSuccessModal();
      fetchCafes()
      fetchCafeLocations()
      // onClose();
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="50vh" // Ensure the form takes the full viewport height // Centers the form vertically on the page
    >
      <form
        onSubmit={handleSubmit}
        style={{
          padding: "10px", // Add padding to the form
          border: "1px solid #ccc", // Add a border to the form
          borderRadius: "10px", // Add border radius for rounded corners
          backgroundColor: "#fff", // Set background color for the form
        }}
      >
        <Typography variant="h6" gutterBottom>
         <b>Add Cafe</b> 
        </Typography>
        <TextField
          name="name"
          label="Name"
          variant="outlined"
          fullWidth
          margin="dense"
          size="small"
          value={cafeData.name}
          onChange={handleInputChange}
          required
        />
        <TextField
          name="description"
          label="Description"
          variant="outlined"
          margin="dense"
          fullWidth
          size="small"
          value={cafeData.description}
          onChange={handleInputChange}
          required
        />
        <TextField
          name="location"
          label="Location"
          variant="outlined"
          fullWidth
          margin="dense"
          size="small"
          value={cafeData.location}
          onChange={handleInputChange}
          required
        />
        <input
          type="file"
          accept="image/*"
          id="logo-upload"
          style={{ display: "none" }}
          onChange={handleImageUpload}
        />
        <label htmlFor="logo-upload">
          <Button
            variant="outlined"
            component="span"
            startIcon={<CloudUploadIcon />}
          >
            Upload Logo
          </Button>
        </label>
        {cafeData.logo && (
          <img
            src={cafeData.logo}
            alt=""
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
            style={{ marginRight: "5px", backgroundColor:"green" }}
          >
            Create Cafe
          </Button>
          <Button variant="contained" color="primary" onClick={onClose} style={{  backgroundColor:"red" }}>
            Cancel
          </Button>
        </div>
      </form>
      <SuccessModal isOpen={successModalOpen} onClose={() => setSuccessModalOpen(false)} message={`Cafe created successfully!`}/>
    </Box>
  );
}


export default CafeForm;



