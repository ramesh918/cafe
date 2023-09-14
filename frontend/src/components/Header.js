import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { NavLink } from 'react-router-dom';
import './Header.css'; // Import the CSS file


function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Cafe Management
        </Typography>
        <NavLink
          to="/"
          exact
          className="nav-link"
          activeClassName="active"
        >
          Cafe
        </NavLink>
        <NavLink
          to="/employees"
          className="nav-link"
          activeClassName="active"
        >
          Employee
        </NavLink>
      </Toolbar>
    </AppBar>
  );
}


export default Header;