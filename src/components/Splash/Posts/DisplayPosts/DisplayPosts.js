import React, {useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { Animated } from "react-animated-css";
import DisplayPost from './DisplayPost/DisplayPost';

const useStyles = makeStyles(theme => ({
    root: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(1)
    },
    postedBy: {
        fontSize: '10px',
        marginLeft: '1em'
    },
    content: {
        fontSize: '20px',
        marginLeft: '.5em'
    },
    // spacer: {
    //     display: 'flex',
    //     justifyContent: 'end',
    //     marginTop: '-1.2em',
    // },
}));

const DisplayPosts = (props) => {
    const classes = useStyles();

    const [displayPost, setDisplayPost] = useState(false);
    const [grabPost, setGrabPost] = useState();
    console.log(displayPost);

    // const upvote = () => {
    //     fetch(`http://localhost:3000/posts/post/${}`, {
    //         method: 'PUT',
    //         body: JSON.stringify(),
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': props.token
    //         }

    //     })
    //     .then(res => res.json())
    //     .then(json => console.log(json))
    //     .catch(err => console.log(err))
    // }

    const postToggle = () => {
        return displayPost ? <DisplayPost setDisplayPost={setDisplayPost} grabPost={grabPost} /> : (
            props.posts.map((post, key) => {
                // console.log(post)
                return (
                    <Animated animationIn='slideInLeft' key={key}>
                        <div onClick={() => setDisplayPost(true)} >
                            <Paper onClick={() => setGrabPost(post)} className={classes.root}>
                                <Typography className={classes.content} component="p">
                                        {post.title}
                                    </Typography>
                                    <Typography className={classes.postedBy} component="p">
                                        {`Posted by ${post.user_username} at`}
                                    </Typography>
                            </Paper>
                        </div>
                    </Animated>
                )
            })
        )
    }

    return(
        <div>
            {postToggle()}
        </div>
    )
}

export default DisplayPosts;