import React, { useState, useEffect } from 'react';
import './Posts.css';

import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect
} from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

import { Animated } from "react-animated-css";

import DisplayPosts from './DisplayPosts/DisplayPosts';
import CreatePost from './CreatePost/CreatePost';
import APIURL from '../../../helpers/enviroment';

const useStyles = makeStyles(theme => ({
    textField: {
        marginLeft: theme.spacing(1),
        marginTop: theme.spacing(1),
        width: '60vw',
        textIndent: '5px',
        borderColor: '#333',
        borderRadius: '5px',
        background: 'rgba(255, 255, 255, 0.5)',
        color: '#333',
        fontSize: '16px',
        height: '50px',
        textAlign: 'center'
    },
    align: {
        textAlign: 'center'
    }
}));

const Posts = (props) => {
    const classes = useStyles();

    const [posts, setPosts] = useState([]);
    const [createPostToggle, setCreatePostToggle] = useState(false);
    console.log(posts)

    useEffect(() => {
        getPosts();
    }, []);

    const getPosts = () => {
        setTimeout(() => {
            fetch(`${APIURL}/posts/post`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': props.sessionToken
                }
            })
                .then(res => res.json())
                .then(json => {
                    setPosts(json);
                })
        }, 500);
    };

    return (
        <div>
            {
                createPostToggle ? (
                    <Switch>
                        <Route exact path='/create/post'>
                            <CreatePost sessionToken={props.sessionToken} getPosts={getPosts} setCreatePostToggle={setCreatePostToggle} />
                        </Route>
                    </Switch>
                ) : (
                        <div className={classes.align}>
                            <Animated animationIn='slideInLeft'>
                                <Link to='/create/post'>
                                    <input id="postInput" className={classes.textField} onClick={() => {
                                        props.sessionToken === undefined ? (
                                            alert('please login or signup to continue')
                                        ) : setCreatePostToggle(true)
                                    }} placeholder="Create Post" />
                                </Link>
                            </Animated>
                        </div>
                    )
            }
            {
                createPostToggle ? null : (
                    <DisplayPosts sessionToken={props.sessionToken} posts={posts} getPosts={getPosts} currentUser={props.currentUser} />
                )
            }
        </div>
    )
}

export default Posts;