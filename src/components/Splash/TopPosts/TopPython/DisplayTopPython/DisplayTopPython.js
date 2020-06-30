import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import { Animated } from "react-animated-css";

const useStyles = makeStyles(theme => ({
    root: {
        marginLeft: theme.spacing(1),
        marginBottom: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(1),
        backgroundColor: '#333',
        color: 'white',
        textAlign: 'center'
    },
    card: {
        background: '#333'
    },
}));

const DisplayTopPython = (props) => {
    const classes = useStyles();

    const [holder, setHolder] = useState([]);

    useEffect(() => {
        setHolder(props.sorted);
    });

    return (
        <Animated animationIn='fadeInRight'>
            <Card className={classes.root}>
                <CardContent>
                    <h5>Top Python Posts</h5>
                    <hr style={{ backgroundColor: 'white' }} />
                    {
                        holder.slice(0, 5).map(post => {
                            return (
                                <Typography>
                                    {post.title}
                                </Typography>
                            )
                        })
                    }
                </CardContent>
            </Card>
        </Animated>
    )
}

export default DisplayTopPython;