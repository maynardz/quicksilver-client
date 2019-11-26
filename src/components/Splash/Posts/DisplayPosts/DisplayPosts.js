import React, {useState, useEffect} from 'react';

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
        marginBottom: theme.spacing(1)
    },
    postedBy: {
        fontSize: '10px',
        marginLeft: '1em'
    },
    content: {
        fontSize: '20px',
        marginLeft: '.5em'
    },
}));

const DisplayPosts = (props) => {
    const classes = useStyles();

    const [displayPost, setDisplayPost] = useState(false);
    const [grabPost, setGrabPost] = useState();

    useEffect(() => {
        props.getPosts();
    }, []);

    const postToggle = () => {
        return displayPost ? <DisplayPost setDisplayPost={setDisplayPost} grabPost={grabPost} sessionToken={props.sessionToken} getPosts={props.getPosts} /> : (
            props.posts.map((post, key) => {
                return (
                    <Animated animationIn='slideInLeft' key={key}>
                        <div onClick={() => setDisplayPost(true)} >
                            <Paper onClick={() => setGrabPost(post)} className={classes.root}>
                                <Typography className={classes.content} component="p">
                                    {post.title}
                                </Typography>
                                <Typography className={classes.postedBy} component="p">
                                    {`Posted by ${post.user_username}`}
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