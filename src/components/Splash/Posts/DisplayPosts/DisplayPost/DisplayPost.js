import React, { useState, useEffect } from 'react'
import './DisplayPost.css';

import { makeStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import UpvoteIcon from '@material-ui/icons/ExpandLessOutlined';
import DownvoteIcon from '@material-ui/icons/ExpandMoreOutlined';

import { Animated } from "react-animated-css";

import Comments from './Comments/Comments';

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
        marginTop: theme.spacing(2.1),
        marginLeft: '1.8em',
        fontSize: '10px',
    },
    content: {
        fontSize: '20px',
        marginLeft: '.5em'
    },
    spacer: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: theme.spacing(2)
    },
    button: {
        color: 'white'
    },
    icons: {
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(1),
        marginBottom: theme.spacing(1)
    }
}));

const DisplayPost = (props) => {
    const classes = useStyles();

    const [getPostId, setGetPostId] = useState('');
    const [getUpvoteCount, setGetUpvoteCount] = useState(0);

    useEffect(() => {
        let postId = props.grabPost.id;
        setGetPostId(postId);
        let upvoteCount = props.grabPost.upvote;
        setGetUpvoteCount(upvoteCount)
    }, []);

    const upvote = () => {
        fetch(`http://localhost:3000/posts/post/${getPostId}`, {
            method: 'PUT',
            body: JSON.stringify({
                post: {
                    upvote: getUpvoteCount
                }
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': props.sessionToken
            }
        })
            // .then(setDisableButton(true))
            .catch(err => console.log(err))
    }

    const handleUpvoteSubmit = (event) => {
        event.preventDefault();
        upvote();
    }

    return (
        <Animated animationIn='fadeInUp'>
            <div>
                <Card className={classes.root}>
                    <CardContent>
                        <Typography variant="h4" gutterBottom>
                            {props.grabPost.title}
                        </Typography>
                        <hr style={{ backgroundColor: 'white' }} />
                        <Typography variant="body2">
                            {props.grabPost.content}
                        </Typography>
                    </CardContent>
                    <div className={classes.spacer}>
                        <div className={classes.icons}>
                            <form id="form">
                                <button id="testbutton" type='submit'>
                                    <DownvoteIcon />
                                </button>
                            </form>
                            {getUpvoteCount}
                            <form id="form" onSubmit={handleUpvoteSubmit}>
                                <button id="testbutton" type='submit' onClick={() => setGetUpvoteCount(getUpvoteCount + 1)}>
                                    <UpvoteIcon />
                                </button>
                            </form>
                        </div>
                        <Typography className={classes.postedBy} component="p">
                            {`Posted by ${props.grabPost.user_username}`}
                        </Typography>
                        <CardActions>
                            <Button id="exitPostButton" onClick={() => props.setDisplayPost(false)} className={classes.button} size="small">Exit</Button>
                        </CardActions>
                    </div>
                </Card>
            </div>
            <div>
                <Comments grabPost={props.grabPost} />
            </div>
        </Animated>
    )
}

export default DisplayPost;