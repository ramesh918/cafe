import React, { Fragment, useEffect, useState } from 'react';
import EmployeeList from './EmployeeList'; // Assuming you have the EmployeeList component
import { useParams } from 'react-router-dom'; // Import useParams to access route parameters
import axios from 'axios'; // For making API requests
import { useSelector, useDispatch } from 'react-redux';
import { employeeActions } from '../../store/employee';
import Modal from 'react-modal';
import EmployeeForm from './EmployeeForm';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem'; // Import MenuItem for the cafe selection
import Select from '@mui/material/Select'; // Import Select for the cafe selection
import FormControl from '@mui/material/FormControl'; // Import FormControl for styling
import InputLabel from '@mui/material/InputLabel'; // Import InputLabel for the cafe selection label
import classes from '../cafe/Cafe.module.css';


const Employee = () => {
  const dispatch = useDispatch();
  const cafes = useSelector((state) => state.cafe.cafes);
  const employees = useSelector((state) => state.employees.employees);
  const { cafeId } = useParams(); // Get the cafeId from the route parameters
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCafe, setSelectedCafe] = useState(cafeId || ''); // Initialize with the cafeId from route parameters


  const fetchEmployees = async () => {
    try {
      const searchString = selectedCafe ? `?cafe=${selectedCafe}` : '';
      const response = await axios.get(
        `http://localhost:3333/employees${searchString}`
      );
      dispatch(employeeActions.getEmployees({ employees: response.data }));
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };


  useEffect(() => {
    // Fetch employee data based on the selectedCafe
    fetchEmployees();
  }, [selectedCafe]);


  const openForm = () => {
    setIsFormOpen(true);
  };


  const closeForm = () => {
    setIsFormOpen(false);
  };


  const handleCafeChange = (event) => {
    const cafeId = event.target.value;
    setSelectedCafe(cafeId);
  };


  const handleDeleteEmployee = async (employeeId) => {
    try {
      await axios.delete(`http://localhost:3333/employees/${employeeId}`);
      // Update the employees list after deletion
      fetchEmployees();
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };


  return (
    <Fragment>
      <div className={classes.header} style={{
        marginTop: "0.5%",
        marginLeft: "45%"
      }}>
        <FormControl className={classes.select}>
        <InputLabel >Select Cafe</InputLabel>
          <Select
           labelId="cafe-select-label"
            value={selectedCafe}
            label="Select Cafe"
            onChange={handleCafeChange}
            style={{width: "170px"}}
          >
            <MenuItem value="">All Cafes</MenuItem>
            {cafes.map((cafe) => (
              <MenuItem key={cafe.id} value={cafe.id}>
                {cafe.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={openForm} style={{
              marginLeft: "9px",
              padding: "15px",
              backgroundColor: "green"
        }}>
          Add Employee
        </Button>
      </div>
      <Modal
        isOpen={isFormOpen}
        onRequestClose={closeForm}
        ariaHideApp={false}
        contentLabel="Add Cafe"
        className={classes.modalContent}
      >
        <EmployeeForm onClose={closeForm} fetchEmployees={fetchEmployees} cafes={cafes} />
      </Modal>
      <EmployeeList employees={employees} onDelete={handleDeleteEmployee} fetchEmployees={fetchEmployees} cafes={cafes} />
    </Fragment>
  );
};


export default Employee;



