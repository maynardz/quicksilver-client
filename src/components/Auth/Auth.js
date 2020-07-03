import React, { useState } from 'react';
import './Auth.css';
import quicksilver_logo_2 from '../../assets/quicksilver_logo_2.png';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { Animated } from "react-animated-css";

import Signup from './Signup/Signup';
import Login from './Login/Login';

import APIURL from '../../helpers/enviroment';

const useStyles = makeStyles((theme) => ({
    card: {
        maxWidth: 600,
        minWidth: 300,
        minHeight: 812,
        maxHeight: 812,
        // padding: '2em',
        backgroundColor: '#333',
        margin: '0 auto',
        WebkitBoxShadow: '0px 35px 50px 0px rgba(0,0,0,0.75)',
        MozBoxShadow: '0px 35px 50px 0px rgba(0,0,0,0.75)',
        boxShadow: '0px 35px 50px 0px rgba(0,0,0,0.75)',
    },
    outer: {
        display: 'table',
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        minWidth: 300,
        minHeight: 812,
        // background: 'rgb(255, 255, 255)',
        background: 'linear-gradient(245deg, rgba(255,255,255,1) 0%, rgba(209,209,209,1) 100%)',
    },
    middle: {
        display: 'table-cell',
        verticalAlign: 'middle'
    },
    inner: {
        // marginLeft: 'auto',
        // marginRight: 'auto',
    },
    logo: {
        height: '175px',
        width: 'auto',
        marginTop: '6em',
        marginBottom: '-2em'
    },
    button: {
        backgroundColor: 'white',
        color: '#333',
        margin: '0 auto',
        marginTop: '4em',
        minWidth: 300
    },
    pStyles: {
        color: 'white',
        marginTop: '7em',
        fontSize: '14px'
    }
}));

const Auth = (props) => {
    const classes = useStyles();

    const [login, setLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const formToggle = () => {
        setLogin(!login);

        setUsername('');
        setPassword('');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = login ? `${APIURL}/auth/login` : `${APIURL}/auth/signup`;

        const bodyObj = login ? {
            user: {
                username: username,
                password: password
            }
        } : {
                user: {
                    username: username,
                    password: password,
                    role: 'user'
                }
            }

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(bodyObj),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(json => {
                console.log(json)
                props.updateLocalStorage(json.sessionToken, json.user.username);
            })
            .catch(err => alert('Incorrect Password'))
    }

    return (
        <div id="centered" className={classes.outer}>
            <div className={classes.middle}>
                <div className={classes.inner}>
                    <form onSubmit={handleSubmit}>
                        <Animated animationIn='zoomInDown' animationInDuration={2800}>
                            <Card id="card" className={classes.card}>
                                <CardContent>
                                    <img className={classes.logo} src={quicksilver_logo_2} alt="quicksilver logo" />
                                </CardContent>
                                {
                                    login ? <Login username={username} setUsername={setUsername} password={password} setPassword={setPassword} /> : <Signup username={username} setUsername={setUsername} password={password} setPassword={setPassword} />
                                }
                                <CardActions>
                                    <Button id="subButton" type="submit" className={classes.button} size="large">Submit</Button>
                                </CardActions>
                                <Typography>
                                    {
                                        login ? <p id="formToggle" onClick={formToggle} className={classes.pStyles}>Need to signup?</p> : <p id="formToggle" onClick={formToggle} className={classes.pStyles}>Back to login</p>
                                    }
                                </Typography>
                            </Card>
                        </Animated>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Auth;