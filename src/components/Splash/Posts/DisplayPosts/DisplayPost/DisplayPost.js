import React, { useState, useEffect } from 'react'
import './DisplayPost.css';

import { makeStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
// import UpvoteIcon from '@material-ui/icons/ExpandLessOutlined';
// import DownvoteIcon from '@material-ui/icons/ExpandMoreOutlined';
import { CopyBlock, dracula, anOldHope, shadesOfPurple, obsidian } from 'react-code-blocks'

import { Animated } from "react-animated-css";

import Comments from './Comments/Comments';
import DeletePost from './DeletePost/DeletePost';
import UpdatePost from './UpdatePost/UpdatePost';

import APIURL from '../../../../../helpers/enviroment';

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
    },
    menu: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    vertIcon: {
        marginTop: theme.spacing(1),
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    formControl: {
        minWidth: 200,
    },
    titleTextField: {
        marginTop: theme.spacing(1),
        width: '100%',
        textIndent: '5px',
        borderColor: '#333',
        borderWidth: '0 0 1.5px',
        borderColor: 'white',
        background: 'none',
        color: 'white',
        fontSize: '16px',
        height: '50px'
    },
    contentTextField: {
        marginTop: theme.spacing(1),
        width: '100%',
        textIndent: '5px',
        borderColor: '#333',
        borderWidth: '0 0 1.5px',
        borderColor: 'white',
        background: 'none',
        color: 'white',
        fontSize: '16px',
        height: '150px'
    },
    spacing: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(2),
        // marginBottom: theme.spacing(1)
    }
}));

const DisplayPost = (props) => {
    // console.log(props);
    const classes = useStyles();

    // const [getUpvoteCount, setGetUpvoteCount] = useState(0);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openModal, setOpenModal] = React.useState(false);
    const [postToUpdate, setPostToUpdate] = useState({});
    const [updateOn, setUpdateOn] = useState(false);

    useEffect(() => {
        // let upvoteCount = props.grabPost.upvote;
        // setGetUpvoteCount(upvoteCount);
        let postToUpd = props.grabPost;
        setPostToUpdate(postToUpd);

        let location = window.location.href;

        return function cleanup() {
            return window.location.href !== location ? props.setDisplayPost(false) : null
        }
    }, []);

    // const upvote = () => {
    //     fetch(`${APIURL}/posts/post/${getPostId}`, {
    //         method: 'PUT',
    //         body: JSON.stringify({
    //             post: {
    //                 upvote: getUpvoteCount
    //             }
    //         }),
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': props.sessionToken
    //         }
    //     })
    //         .then(props.getPosts())
    //         .catch(err => console.log(err))
    // };

    // const handleUpvoteSubmit = (event) => {
    //     event.preventDefault();
    //     upvote();
    // };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleModalOpen = () => {
        setOpenModal(true);
    };

    const handleModalClose = () => {
        setOpenModal(false);
    };

    return (
        <Animated animationIn='fadeInUp'>
            <div>
                <Card className={classes.root}>
                    <CardContent>
                        <Typography className={classes.menu} variant="h4" gutterBottom>
                            {props.grabPost.title}
                            <DeletePost sessionToken={props.sessionToken} postId={props.postId} handleModalOpen={handleModalOpen} handleMenuClose={handleMenuClose} setUpdateOn={setUpdateOn} anchorEl={anchorEl} setAnchorEl={setAnchorEl} getPosts={props.getPosts} grabPost={props.grabPost} setDisplayPost={props.setDisplayPost} />
                        </Typography>
                        <hr style={{ backgroundColor: 'white' }} />
                        <Typography variant="body2">
                            {props.grabPost.content}
                        </Typography>
                        {
                            props.grabPost.code !== 'null' ? (
                                <div className={classes.spacing}>
                                    <CopyBlock language='javascript' text={props.grabPost.code} theme={obsidian} wrapLines={true} />
                                </div>
                            ) : null
                        }
                    </CardContent>
                    <div className={classes.spacer}>
                        {/* <div className={classes.icons}>
                            <form id="form" onSubmit={handleUpvoteSubmit}>
                                <button id="testbutton" type='submit' onClick={() => setGetUpvoteCount(getUpvoteCount - 1)}>
                                    <DownvoteIcon />
                                </button>
                            </form>
                            {getUpvoteCount}
                            <form id="form" onSubmit={handleUpvoteSubmit}>
                                <button id="testbutton" type='submit' onClick={() => setGetUpvoteCount(getUpvoteCount + 1)}>
                                    <UpvoteIcon />
                                </button>
                            </form>
                        </div> */}
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
                {
                    updateOn ? (
                        <UpdatePost sessionToken={props.sessionToken} postToUpdate={postToUpdate} openModal={openModal} handleModalClose={handleModalClose} postId={props.postId} getPosts={props.getPosts} handleMenuClose={handleMenuClose} setDisplayPost={props.setDisplayPost} />
                    ) : null
                }
                <Comments grabPost={props.grabPost} sessionToken={props.sessionToken} currentUser={props.currentUser} postId={props.postId} />
            </div>
        </Animated>
    )
}

export default DisplayPost;