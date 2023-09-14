import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import axios from "axios";

function EmployeeForm({ onClose, fetchEmployees, cafes }) {
  const [employeeData, setEmployeeData] = useState({
    name: "",
    email_address: "",
    phone_number: "",
    gender: "Male", // Default to "Male"
    cafeId: cafes.length > 0 ? cafes[0].id : "",
  });

  const [selectedCafe, setSelectedCafe] = useState(employeeData.cafeId);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  useEffect(() => {
    setSelectedCafe(employeeData.cafeId);
  }, [employeeData.cafeId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({
      ...employeeData,
      [name]: value,
    });

    // Reset validation errors
    if (name === "name") {
      setNameError("");
    } else if (name === "email_address") {
      setEmailError("");
    } else if (name === "phone_number") {
      setPhoneError("");
    }
  };

  const handleCafeChange = (event) => {
    const id = event.target.value;
    setSelectedCafe(id);
    setEmployeeData((prevEmployeeData) => ({
      ...prevEmployeeData,
      cafeId: id,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform validation before submitting
    let isValid = true;

    if (employeeData.name.trim() === "") {
      setNameError("Name is required.");
      isValid = false;
    }

    if (
      !/^\d{8}$/.test(employeeData.phone_number) ||
      !/^[89]/.test(employeeData.phone_number)
    ) {
      setPhoneError("Phone number must start with 8 or 9 and have 8 digits.");
      isValid = false;
    }

    if (
      employeeData.email_address.trim() !== "" &&
      !/^\S+@\S+\.\S+$/.test(employeeData.email_address)
    ) {
      setEmailError("Invalid email address format.");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    try {
      const data = JSON.stringify(employeeData);
      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://localhost:3333/employees",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));
      alert("Employee created successfully!");
      fetchEmployees();
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
          Add Employee
        </Typography>
        <TextField
          name="name"
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={employeeData.name}
          onChange={handleInputChange}
          required
          error={Boolean(nameError)}
          helperText={nameError}
        />
        <TextField
          name="email_address"
          label="Email Address"
          variant="outlined"
          margin="normal"
          fullWidth
          value={employeeData.email_address}
          onChange={handleInputChange}
          error={Boolean(emailError)}
          helperText={emailError}
        />
        <TextField
          name="phone_number"
          label="Phone Number"
          variant="outlined"
          fullWidth
          margin="normal"
          value={employeeData.phone_number}
          onChange={handleInputChange}
          required
          error={Boolean(phoneError)}
          helperText={phoneError}
        />
        <FormControl fullWidth>
          <InputLabel>Gender</InputLabel>
          <Select
            labelId="gender-select-label"
            label="Gender"
            name="gender"
            value={employeeData.gender}
            onChange={handleInputChange}
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Others">Others</MenuItem>
          </Select>
        </FormControl>
        <InputLabel>Select Cafe</InputLabel>
        <Select
          labelId="cafe-select-label"
          label="Select Cafe"
          onChange={handleCafeChange}
          id="cafe-select"
          style={{ width: "170px" }}
          value={selectedCafe}
        >
          {cafes.map((cafe) => (
            <MenuItem key={cafe.id} value={cafe.id}>
              {cafe.name}
            </MenuItem>
          ))}
        </Select>

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
            Create Employee
          </Button>
          <Button variant="contained" color="primary" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </Box>
  );
}

export default EmployeeForm;
