import React from 'react';
import './Login.css';

import { makeStyles } from '@material-ui/core/styles';
import { Animated } from "react-animated-css";

const useStyles = makeStyles({
    textField: {
      width: 400,
      maxWidth: '80vw',
      outline: 0,
      borderWidth: '0 0 1.5px',
      borderColor: 'white',
      background: 'none',
      color: 'white',
      marginTop: '2.5em',
      fontSize: '16px',
      height: '50px',
      display: 'block',
      margin: '0 auto'
    },
});

const Login = (props) => {
    const classes = useStyles();

    return(
        <Animated animationIn="pulse">
            <input id="loginInput" type="text" className={classes.textField} placeholder="username" value={props.username} onChange={ (e) => props.setUsername(e.target.value) } />
            <input id="loginInput" type="password" className={classes.textField} placeholder="password" value={props.password} onChange={ (e) => props.setPassword(e.target.value)} />
        </Animated>
    )
}

export default Login;