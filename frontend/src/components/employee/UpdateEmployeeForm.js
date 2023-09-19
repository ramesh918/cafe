import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  FormControl
} from "@mui/material";
import axios from "axios";
import SuccessModal from './SuccessModal';
import ErrorModal from './ErrorModal';

function UpdateEmployeeForm({ onClose, fetchEmployees, employee, cafes, fetchCafes }) {
  const [employeeData, setEmployeeData] = useState({
    name: employee.name || "",
    email_address: employee.email_address || "",
    phone_number: employee.phone_number || "",
    gender: employee.gender || "Male",
    cafeId: employee.cafeId || (cafes.length > 0 ? cafes[0].id : ""),
  });

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("no erro")

  useEffect(() => {
    const matchingCafe = cafes.find(cafe => cafe.name === employee.cafe);
    const cafeId = matchingCafe ? matchingCafe.id : "";
    setEmployeeData({
      name: employee.name || "",
      email_address: employee.email_address || "",
      phone_number: employee.phone_number || "",
      gender: employee.gender || "Male",
      cafeId: cafeId
    });
  }, [employee, cafes]);

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

  const openSuccessModal = () => {
    setSuccessModalOpen(true);
  };
 

  const openErrorModal = (msg) => {
    setErrorModalOpen(true);
    setErrorMessage(msg)
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
        method: "put", // Use the "put" method for updating
        maxBodyLength: Infinity,
        url: `http://localhost:3333/employees/${employee.id}`, // Use the correct endpoint for updating an employee
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));
      openSuccessModal();
      fetchEmployees();
      fetchCafes()
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
          <b>Update Employee</b>
        </Typography>
        <TextField
          name="name"
          label="Name"
          variant="outlined"
          fullWidth
          margin="dense"
          size="small"
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
          margin="dense"
          size="small"
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
          size="small"
          margin="dense"
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
            margin="dense"
           size="small"
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
          margin="dense"
          size="small"
          name="cafeId"
          onChange={handleInputChange}
          id="cafe-select"
          style={{ width: "170px" }}
          value={employeeData.cafeId}
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
            style={{ marginRight: "5px", backgroundColor: "green" }}
          >
            Update Employee
          </Button>
          <Button variant="contained" color="primary" onClick={onClose} style={{backgroundColor:"red"}}>
            Cancel
          </Button>
        </div>
      </form>
      <SuccessModal isOpen={successModalOpen} onClose={() => setSuccessModalOpen(false)} message={`Employee updated successfully!`}/>
      <ErrorModal isOpen={errorModalOpen} onClose={() => setErrorModalOpen(false)} errorMessage={errorMessage}/>
   
    </Box>
  );
}

export default UpdateEmployeeForm;
