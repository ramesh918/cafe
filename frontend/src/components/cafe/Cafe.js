import React, { useState, useEffect } from 'react';
import CafeForm from './CafeForm';
import CafeList from './CafeList';
import Modal from 'react-modal';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import classes from './Cafe.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { cafeActions } from '../../store/cafe';

function Cafe() {
  const dispatch = useDispatch();
  const cafes = useSelector((state) => state.cafe.cafes);
  const locations = useSelector((state) => state.cafe.locations);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');

  const fetchCafes = async () => {
    // Define the API endpoint from where you want to fetch data
    const apiUrl = 'http://localhost:3333/cafes';

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      // Update the state with the fetched data
      dispatch(cafeActions.getCafes({ cafes: data }));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const fetchCafeLocations = async () => {
    // Define the API endpoint from where you want to fetch data
    const apiUrl = 'http://localhost:3333/cafes/locations';

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      // Update the state with the fetched data
      dispatch(cafeActions.getLocations({ locations: data }));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchCafes();
    fetchCafeLocations()
  }, []);

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  const handleLocationChange = async(event) => {
    setSelectedLocation(event.target.value);
    const location = event.target.value
    const apiUrl = `http://localhost:3333/cafes?location=${location}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      // Update the state with the fetched data
      dispatch(cafeActions.getCafes({ cafes: data }));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
   
  };



  return (
    <div>
      <Box display="flex" justifyContent="flex-end" alignItems="center">
      <FormControl variant="outlined" className={classes.locationSelect}>
          <InputLabel >Select Location</InputLabel>
          <Select
            labelId="location-select-label"
            label="Select Location"
            value={selectedLocation}
            onChange={handleLocationChange}
            id = "location-select"
            style={{width: "170px"}}
          >
            <MenuItem value="">All Locations</MenuItem>
            {locations.map((location) => (
              <MenuItem key={location} value={location}>
                {location}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={openForm}>
          Add Cafe
        </Button>
      </Box>

      <Modal
        isOpen={isFormOpen}
        onRequestClose={closeForm}
        ariaHideApp={false}
        contentLabel="Add Cafe"
        className={classes.modalContent}
      >
        <CafeForm onClose={closeForm} fetchCafes={fetchCafes} />
      </Modal>
      <CafeList cafes={cafes} fetchCafes={fetchCafes} />
    </div>
  );
}

export default Cafe;
