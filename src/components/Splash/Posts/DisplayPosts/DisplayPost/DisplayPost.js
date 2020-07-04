import React, { useState, useEffect } from 'react'
import './DisplayPost.css';

import { makeStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import UpvoteIcon from '@material-ui/icons/ExpandLessOutlined';
import DownvoteIcon from '@material-ui/icons/ExpandMoreOutlined';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

import { Animated } from "react-animated-css";

import Comments from './Comments/Comments';

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
}));

const DisplayPost = (props) => {
    const classes = useStyles();

    const [getPostId, setGetPostId] = useState('');
    const [getUpvoteCount, setGetUpvoteCount] = useState(0);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openModal, setOpenModal] = React.useState(false);
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        let postId = props.grabPost.post_id;
        setGetPostId(postId);
        let upvoteCount = props.grabPost.upvote;
        setGetUpvoteCount(upvoteCount);
    }, []);

    const upvote = () => {
        fetch(`${APIURL}/posts/post/${getPostId}`, {
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
            .then(props.getPosts())
            .catch(err => console.log(err))
    };

    const deletePost = () => {
        fetch(`${APIURL}/posts/post/${getPostId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': props.sessionToken
            }
        })
            .then(res => res.json())
            .then(json => console.log(json))
            .then(props.getPosts())
            .catch(err => console.log(err))
    };

    const updatePost = () => {
        // fetch(`${APIURL}/posts/post/${getPostId}`, {
        //     method: 'PUT',
        //     body: JSON.stringify({
        //         title:
        //     })
        // }
    };

    const handleUpvoteSubmit = (event) => {
        event.preventDefault();
        upvote();
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
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
                            {
                                props.grabPost.user_id === localStorage.getItem('userID') ? (
                                    <div>
                                        <MoreVertIcon onClick={handleClick} className={classes.vertIcon} />
                                        <Menu
                                            id="simple-menu"
                                            anchorEl={anchorEl}
                                            keepMounted
                                            open={Boolean(anchorEl)}
                                            onClose={handleClose}
                                        >
                                            <MenuItem onClick={() => {
                                                handleModalOpen();
                                                updatePost();
                                            }}>Update</MenuItem>
                                            <MenuItem style={{ color: 'red' }} onClick={() => {
                                                deletePost();
                                                handleClose();
                                                props.setDisplayPost(false);
                                            }}>Delete</MenuItem>
                                        </Menu>
                                    </div>
                                ) : null
                            }
                        </Typography>
                        <hr style={{ backgroundColor: 'white' }} />
                        <Typography variant="body2">
                            {props.grabPost.content}
                        </Typography>
                    </CardContent>
                    <div className={classes.spacer}>
                        <div className={classes.icons}>
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
                <Comments grabPost={props.grabPost} sessionToken={props.sessionToken} currentUser={props.currentUser} />
            </div>
            {
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={openModal}
                    onClose={handleModalClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={openModal}>
                        <div className={classes.paper}>
                            <div>
                                <form>
                                    <Card className={classes.card}>
                                        <CardContent>
                                            <Typography>
                                                <FormControl className={classes.formControl}>
                                                    <InputLabel id="select-language">Language</InputLabel>
                                                    <Select
                                                        labelId="select-language"
                                                        id="select-language"
                                                    // value={language}
                                                    // onChange={handleChange}
                                                    >
                                                        <MenuItem value={'JavaScript'}>JavaScript</MenuItem>
                                                        <MenuItem value={'.Net'}>.Net</MenuItem>
                                                        <MenuItem value={'Python'}>Python</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Typography>
                                            <Typography>
                                                <input className={classes.titleTextField} id='titleInput' type="text" placeholder="Title" />
                                            </Typography>
                                            <Typography>
                                                <textarea className={classes.contentTextField} id='contentInput' type="text" placeholder="Text (optional)" />
                                            </Typography>
                                        </CardContent>
                                        <div className={classes.spacer}>
                                            <CardActions>
                                                <Button className={classes.button} id='createPostButton' type='submit'>Submit</Button>
                                            </CardActions>
                                            <CardActions>
                                                <Button onClick={handleModalClose} className={classes.button} id='exitCreatePostButton' type='submit' >Cancel</Button>
                                            </CardActions>
                                        </div>
                                    </Card>
                                </form>
                            </div>
                        </div>
                    </Fade>
                </Modal>
            }
        </Animated>
    )
}

export default DisplayPost;