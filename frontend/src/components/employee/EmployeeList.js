import React, { Fragment, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import classes from '../cafe/CafeList.module.css';
import Modal from 'react-modal';
import modelClasses from '../cafe/Cafe.module.css';
import UpdateEmployeeForm from './UpdateEmployeeForm';
import DeleteConfirmationModal from './DeleteConfirmationModal';


const EmployeeList = ({ employees, onDelete, fetchEmployees, cafes }) => {
  const [isUpdateFormOpen, setUpdateFormOpen] = useState(false);
  const [selectedEmployeeData, setSelectedEmployeeData] = useState(null);
  const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false); // State for delete confirmation modal
  const [employeeToDelete, setEmployeeToDelete] = useState(null); // Employee to be deleted


  const openUpdateForm = (employee) => {
    setSelectedEmployeeData(employee);
    setUpdateFormOpen(true);
  };


  const closeUpdateForm = () => {
    setSelectedEmployeeData(null);
    setUpdateFormOpen(false);
  };


  const handleEdit = (id) => {
    setUpdateFormOpen(true);


    const employeeEdit = employees.find((employee) => employee.id === id);
    if (employeeEdit) {
      openUpdateForm(employeeEdit);
    }
  };


  const showDeleteConfirmation = (employee) => {
    setEmployeeToDelete(employee);
    setDeleteConfirmationOpen(true);
  };


  const cancelDeleteConfirmation = () => {
    setEmployeeToDelete(null);
    setDeleteConfirmationOpen(false);
  };


  const confirmDeleteEmployee = () => {
    onDelete(employeeToDelete.id);
    setDeleteConfirmationOpen(false);
  };


  return (
    <Fragment>
      <TableContainer
        component={Paper}
        className={classes.tableContainer}
        style={{ maxHeight: '800px', overflowY: 'auto' }}
      >
        <Table className={classes.table}>
          <TableHead className={classes.tableHeader}>
            <TableRow>
              <TableCell>Employee ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email Address</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Gender</TableCell> {/* Add Gender column */}
              <TableCell>Days Worked</TableCell>
              <TableCell>Café Name</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.id}</TableCell>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.email_address}</TableCell>
                <TableCell>{employee.phone_number}</TableCell>
                <TableCell>{employee.gender}</TableCell> {/* Display Gender */}
                <TableCell>{employee.days_worked}</TableCell>
                <TableCell>{employee.cafe}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    component={Link}
                    onClick={() => handleEdit(employee.id)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => showDeleteConfirmation(employee)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>


      <Modal
        isOpen={isUpdateFormOpen}
        onRequestClose={closeUpdateForm}
        ariaHideApp={false}
        contentLabel="Update Cafe"
        className={modelClasses.modalContent}
      >
        {isUpdateFormOpen && (
          <UpdateEmployeeForm
            cafes={cafes}
            employee={selectedEmployeeData}
            onClose={closeUpdateForm}
            fetchEmployees={fetchEmployees}
          />
        )}
      </Modal>


      <DeleteConfirmationModal
        isOpen={isDeleteConfirmationOpen}
        onCancel={cancelDeleteConfirmation}
        onConfirmDelete={confirmDeleteEmployee}
      />
    </Fragment>
  );
};


export default EmployeeList;



