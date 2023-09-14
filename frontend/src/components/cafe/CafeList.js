import React, { Fragment, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button, // Add Button from Material-UI
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import classes from "./CafeList.module.css";
import modelClasses from "./Cafe.module.css";
import axios from "axios";
import UpdateCafeForm from "./CafeUpdateForm";
import Modal from "react-modal";
import { Link } from "react-router-dom"; // Import Link from React Router

const CafeList = ({ cafes, fetchCafes }) => {
  const [isUpdateFormOpen, setUpdateFormOpen] = useState(false);
  const [selectedCafeData, setSelectedCafeData] = useState(null);

  const openUpdateForm = (cafe) => {
    setSelectedCafeData(cafe);
    setUpdateFormOpen(true);
  };

  const closeUpdateForm = () => {
    setSelectedCafeData(null);
    setUpdateFormOpen(false);
  };

  const handleEdit = (id) => {
    setUpdateFormOpen(true);

    const cafeToEdit = cafes.find((cafe) => cafe.id === id);
    if (cafeToEdit) {
      openUpdateForm(cafeToEdit);
    }
  };

  const handleDelete = async (id) => {
    try {
      let config = {
        method: "delete",
        url: `http://localhost:3333/cafes/${id}`,
        headers: {},
      };
      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));
      fetchCafes();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Fragment>
      <TableContainer
        component={Paper}
        className={classes.tableContainer}
        style={{ maxHeight: "400px", overflowY: "auto" }}
      >
        <Table className={classes.table}>
          <TableHead className={classes.tableHeader}>
            <TableRow>
              <TableCell className={classes.tableCell}>Logo</TableCell>
              <TableCell className={classes.tableCell}>Name</TableCell>
              <TableCell className={classes.tableCell}>Description</TableCell>
              <TableCell className={classes.tableCell}>EmployeeCount</TableCell>
              <TableCell className={classes.tableCell}>Location</TableCell>
              <TableCell className={classes.tableCell}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cafes.map((cafe) => (
              <TableRow key={cafe.id} className={classes.tableRow}>
                <TableCell className={classes.tableCell}>
                  {cafe.logo && (
                    <img
                      src={cafe.logo}
                      alt="Cafe Logo"
                      style={{ maxWidth: "100px", borderRadius: "4px" }}
                    />
                  )}
                </TableCell>
                <TableCell className={classes.tableCell}>{cafe.name}</TableCell>
                <TableCell className={classes.tableCell}>
                  {cafe.description}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {/* Wrap EmployeeCount in a Link */}
                  <Link to={`/employees/${cafe.id}`}>
                    <Button variant="contained" color="primary">
                      {cafe.employeeCount}
                    </Button>
                  </Link>
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {cafe.location}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <IconButton
                    color="primary"
                    onClick={() => handleEdit(cafe.id)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDelete(cafe.id)}
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
          <UpdateCafeForm
            cafeData={selectedCafeData}
            onUpdate={() => {
              fetchCafes();
            }}
            onClose={closeUpdateForm}
          />
        )}
      </Modal>
    </Fragment>
  );
};

export default CafeList;
