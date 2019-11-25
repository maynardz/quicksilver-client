import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import { Animated } from "react-animated-css";

const useStyles = makeStyles(theme => ({
    root: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(1),
        backgroundColor: '#333',
        color: 'white'
    },
    card: {
        minWidth: 275,
        background: '#333'
      },
    postedBy: {
        marginTop: '1.6em',
        marginLeft: '1.8em',
        fontSize: '10px',
    },
    content: {
        fontSize: '20px',
        marginLeft: '.5em'
    },
    spacer: {
        display: 'flex',
        justifyContent: 'space-between'
    }
}));

const DisplayPost = (props) => {
    const classes = useStyles();
    console.log(props)
    return(
        <Animated animationIn='fadeInUp'>
            <div className={classes.wrapper}>
                <Card className={classes.root}>
                    <CardContent>
                        <Typography variant="h4" gutterBottom>
                            {props.grabPost.title}
                        </Typography>
                        <Typography variant="body2">
                            {props.grabPost.content}
                        </Typography>
                    </CardContent>
                    <div className={classes.spacer}>
                        <Typography className={classes.postedBy} component="p">
                            {`Posted by ${props.grabPost.user_username} at ${props.slicedDate}`}
                        </Typography>
                        <CardActions>
                        <Button onClick={() => props.setDisplayPost(false)} size="small" style={{color: 'white'}}>Exit</Button>
                        </CardActions>
                    </div>
                </Card>
            </div>
        </Animated>
    )
}

export default DisplayPost;