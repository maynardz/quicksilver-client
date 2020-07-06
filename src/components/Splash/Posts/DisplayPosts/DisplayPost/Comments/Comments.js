import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Popover from '@material-ui/core/Popover';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';

import { Alert } from '@material-ui/lab';

import UserIcon from '../../../../../../assets/user_icon.png';

import PostComment from './PostComment/PostComment';

import APIURL from '../../../../../../helpers/enviroment';

const useStyles = makeStyles((theme) => ({
    alert: {
        width: '100%',
        '& > * + *': {
            // marginTop: theme.spacing(2),
        },
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginBottom: theme.spacing(1)
    },
    root: {
        // width: '100%',
        minWidth: 275,
        backgroundColor: theme.palette.background.paper,
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    inline: {
        display: 'block',
    },
    icons: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    popover: {
        pointerEvents: 'none',
    },
    popTypog: {
        padding: '1em'
    }
}));

const Comments = (props) => {
    const classes = useStyles();

    const [comments, setComments] = useState([]);
    const [moreToggle, setMoreToggle] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [postCommentToggle, setPostCommentToggle] = useState(false);
    const [alert, setAlert] = useState(false);

    useEffect(() => {
        getComments();
    }, [])

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const getComments = () => {
        const url = `${APIURL}/comments/comment/${props.grabPost.post_id}`
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': props.sessionToken
            }
        })
            .then(res => res.json())
            .then(json => setComments(json))
    };

    const open = Boolean(anchorEl);

    const timeout = () => {
        if (alert === true) {
            setTimeout(() => {
                setAlert(false)
            }, 3000);
            return (
                <Alert className={classes.alert} onClose={() => setAlert(false)}>Comment posted!</Alert>
            )
        } else {
            return;
        }
    }

    return (
        <div>
            {
                postCommentToggle ? <PostComment setPostCommentToggle={setPostCommentToggle} sessionToken={props.sessionToken} grabPost={props.grabPost} currentUser={props.currentUser} getComments={getComments} setAlert={setAlert} /> : null
            }
            {
                moreToggle === false ? (
                    <div>
                        <MoreHorizIcon
                            aria-owns={open ? 'mouse-over-popover' : undefined}
                            aria-haspopup="true"
                            onMouseEnter={handlePopoverOpen}
                            onMouseLeave={handlePopoverClose}
                            className={classes.icons}
                            onClick={() => setMoreToggle(true)} />
                        <Popover
                            id="mouse-over-popover"
                            className={classes.popover}
                            open={open}
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            onClose={handlePopoverClose}
                            disableRestoreFocus
                        >
                            <Typography className={classes.popTypog}>Show Comments</Typography>
                        </Popover>
                        <ChatBubbleIcon className={classes.icons} onClick={() => {
                            setPostCommentToggle(true);
                            setMoreToggle(true)
                        }} />
                    </div>
                ) : moreToggle ? (
                    <div>
                        <MoreHorizIcon
                            aria-owns={open ? 'mouse-over-popover' : undefined}
                            aria-haspopup="true"
                            onMouseEnter={handlePopoverOpen}
                            onMouseLeave={handlePopoverClose}
                            className={classes.icons}
                            onClick={() => setMoreToggle(false)} />
                        <ChatBubbleIcon className={classes.icons} onClick={() => {
                            setPostCommentToggle(true);
                            setMoreToggle(true);
                        }} />
                        <Popover
                            id="mouse-over-popover"
                            className={classes.popover}
                            open={open}
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            onClose={handlePopoverClose}
                            disableRestoreFocus
                        >
                            <Typography className={classes.popTypog}>Hide Comments</Typography>
                        </Popover>
                        {timeout()}
                        {
                            comments.length === 0 ? <h6 style={{ textAlign: 'center' }}>There are no comments on this post yet :(</h6> : (
                                comments.map(comment => {
                                    return (
                                        <List className={classes.root}>
                                            <ListItem alignItems="flex-start">
                                                <ListItemAvatar>
                                                    <Avatar alt="profile picture" src={UserIcon} />
                                                </ListItemAvatar>
                                                <ListItemText
                                                    secondary={
                                                        <React.Fragment>
                                                            <Typography
                                                                component="span"
                                                                variant="body2"
                                                                className={classes.inline}
                                                                color="textPrimary"
                                                            >
                                                                {comment.commenter_username}
                                                            </Typography>
                                                            {comment.content}
                                                        </React.Fragment>
                                                    }
                                                />
                                            </ListItem>
                                            <Divider variant="inset" component="li" />
                                        </List>
                                    )
                                })
                            )
                        }
                    </div>
                ) : null
            }
        </div>
    )
}

export default Comments;