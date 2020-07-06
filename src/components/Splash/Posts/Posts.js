import React, { useState, useEffect } from 'react';
import './Posts.css';

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
                    'Authorization': props.sessionToken
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
                createPostToggle ? <CreatePost sessionToken={props.sessionToken} getPosts={getPosts} setCreatePostToggle={setCreatePostToggle} /> : (
                    <div className={classes.align}>
                        <Animated animationIn='slideInLeft'>
                            <input id="postInput" className={classes.textField} onClick={() => setCreatePostToggle(true)} placeholder="Create Post" />
                        </Animated>
                    </div>
                )
            }
            {
                createPostToggle ? null : <DisplayPosts sessionToken={props.sessionToken} posts={posts} getPosts={getPosts} currentUser={props.currentUser} />
            }
        </div>
    )
}

export default Posts;