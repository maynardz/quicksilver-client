import React, {useState, useEffect} from 'react';
import './Posts.css';

import DisplayPosts from './DisplayPosts/DisplayPosts';
import CreatePost from './CreatePost/CreatePost';
import APIURL from '../../../helpers/enviroment';

const Posts = (props) => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getPosts();
    }, [])

    const getPosts = () => {
        const url = `${APIURL}/posts/post`
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': props.sessionToken
            }
        })
        .then(res => res.json())
        .then(json => setPosts(json))
    };

    return(
        <div>
            <CreatePost sessionToken={props.sessionToken} getPosts={getPosts} />
            <DisplayPosts posts={posts} />
        </div>
    )
}

export default Posts;