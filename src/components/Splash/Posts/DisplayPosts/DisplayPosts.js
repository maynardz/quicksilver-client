import React, { useState, useEffect } from 'react';

import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect
} from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { Animated } from "react-animated-css";

import DisplayPost from './DisplayPost/DisplayPost';

const useStyles = makeStyles(theme => ({
    root: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    postedBy: {
        fontSize: '10px',
        marginLeft: '1em'
    },
    content: {
        fontSize: '20px',
        marginLeft: '.5em'
    },
    flex: {
        display: 'flex',
        justifyContent: 'space-between',
        marginRight: '.5em'
    }
}));

const DisplayPosts = (props) => {
    // console.log(props);
    const classes = useStyles();

    const [displayPost, setDisplayPost] = useState(false);
    const [grabPost, setGrabPost] = useState({});
    const [postId, setPostId] = useState('');

    const postToggle = () => {
        return displayPost ? (
            <Route path={`/post=${postId}`}>
                <DisplayPost setDisplayPost={setDisplayPost} grabPost={grabPost} sessionToken={props.sessionToken} getPosts={props.getPosts} currentUser={props.currentUser} postId={postId} />
            </Route>
        ) : (
                displayPost === false ? (
                    <Switch>
                        <Redirect from={`/post=${postId}`} to='/' />
                        <Route path='/'>
                            {
                                props.posts.map((post, index) => {
                                    let postId = post.post_id;
                                    let date = post.created_at;
                                    let day = date.slice(8, 10);
                                    let month = date.slice(5, 7);
                                    let year = date.slice(0, 4);
                                    let full = `${month}-${day}-${year}`;
                                    return (
                                        <Animated key={index} animationIn='slideInLeft'>
                                            <div onClick={() => setDisplayPost(true)} >
                                                <Link to={`/post=${postId}`}>
                                                    <Paper onClick={() => { setGrabPost(post); setPostId(postId) }} className={classes.root}>
                                                        <Typography className={classes.content} component="p">
                                                            {post.title}
                                                        </Typography>
                                                        <div className={classes.flex}>
                                                            <Typography className={classes.postedBy} component="p">
                                                                {`Posted by ${post.user_username} on ${full}`}
                                                            </Typography>
                                                            <Typography className={classes.postedBy}>
                                                                {post.language}
                                                            </Typography>
                                                        </div>
                                                    </Paper>
                                                </Link>
                                            </div>
                                        </Animated>
                                    )
                                })
                            }
                        </Route>
                    </Switch>
                ) : null
            )
    }

    return (
        <div>
            {postToggle()}
        </div>
    )
}

export default DisplayPosts;