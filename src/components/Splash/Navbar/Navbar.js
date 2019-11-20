import React, { useState } from 'react';
import './Navbar.css';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { Animated } from "react-animated-css";

const useStyles = makeStyles({
    root: {
      flexGrow: 1,
      backgroundColor: '#333'
    },
    title: {
      flexGrow: 1,
      fontFamily: 'quicksilver',
      fontSize: '28px'
    }
});

const Navbar = (props) => {
    const classes = useStyles();

    return(
        <Animated animationIn="fadeInDown">
            <AppBar position="static" className={classes.root}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        quicksilver
                    </Typography>
                    <Button id="logoutButton" color="inherit" onClick={props.clearToken}>Logout</Button>
                </Toolbar>
            </AppBar>
        </Animated>
    )
}

export default Navbar;