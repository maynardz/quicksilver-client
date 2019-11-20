import React from 'react';
import './Signup.css'

import { makeStyles } from '@material-ui/core/styles';
import { Animated } from "react-animated-css";

const useStyles = makeStyles({
    textField: {
      width: 400,
      outline: 0,
      borderWidth: '0 0 1.5px',
      borderColor: 'white',
      background: 'none',
      color: 'white',
      marginTop: '2.5em',
      fontSize: '16px',
      height: '50px'
    },
});

const Signup = (props) => {
    const classes = useStyles();

    return(
        <div>
            <Animated animationIn="pulse">
                <input id="signupInput" type="text" className={classes.textField} placeholder="choose a username" value={props.username} onChange={ (e) => props.setUsername(e.target.value) } />
                <input id="signupInput" type="password" className={classes.textField} placeholder="choose a password" value={props.password} onChange={ (e) => props.setPassword(e.target.value)} />
            </Animated>
        </div>
    )
}

export default Signup;