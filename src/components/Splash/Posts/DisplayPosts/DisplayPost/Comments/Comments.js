import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Popover from '@material-ui/core/Popover';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { Alert } from '@material-ui/lab';

import UserIcon from '../../../../../../assets/user_icon.png';

import { CopyBlock, dracula, anOldHope, shadesOfPurple, obsidian } from 'react-code-blocks';

import PostComment from './PostComment/PostComment';
import DeleteComment from './DeleteComment/DeleteComment';
import UpdateComment from './UpdateComment/UpdateComment';

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
        marginBottom: theme.spacing(1),
        display: 'flex',
        justifyContent: 'space-between',
        borderRadius: '5px'
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
    },
    vertIcon: {
        marginTop: theme.spacing(3),
    },
    spacing: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(2),
        // marginBottom: theme.spacing(1)
    }
}));

const Comments = (props) => {
    // console.log(props);
    const classes = useStyles();

    const [comments, setComments] = useState([]);
    const [moreToggle, setMoreToggle] = useState(false);
    const [postCommentToggle, setPostCommentToggle] = useState(false);
    const [commentToUpdate, setCommentToUpdate] = useState({});
    const [updateOn, setUpdateOn] = useState(false);
    const [openModal, setOpenModal] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [commentAlert, setCommentAlert] = useState(false);
    const [buttonToggle, setButtonToggle] = useState(false);


    useEffect(() => {
        getComments();
    }, [])

    const getComments = () => {
        setTimeout(() => {
            fetch(`${APIURL}/comments/comment/${props.postId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': props.sessionToken
                }
            })
                .then(res => res.json())
                .then(json => setComments(json))
        }, 500);
    };

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const handleModalOpen = () => {
        setOpenModal(true);
    };

    const handleModalClose = () => {
        setOpenModal(false);
    };

    const editCommentToUpdate = (commentId) => {
        setCommentToUpdate(commentId);
        console.log(commentId);
    };

    const timeout = () => {
        if (commentAlert === true) {
            setTimeout(() => {
                setCommentAlert(false)
            }, 3000);
            return (
                <Alert className={classes.alert} onClose={() => setCommentAlert(false)}>Comment posted!</Alert>
            )
        } else {
            return;
        }
    };

    const open = Boolean(anchorEl);

    return (
        <div>
            <div>
                {
                    postCommentToggle ? <PostComment setPostCommentToggle={setPostCommentToggle} sessionToken={props.sessionToken} grabPost={props.grabPost} currentUser={props.currentUser} getComments={getComments} setCommentAlert={setCommentAlert} /> : null
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
                            {
                                comments.length === 0 ? (
                                    `${comments.length} comments`
                                ) : comments.length === 1 ? (
                                    `${comments.length} comment`
                                ) : comments.length > 1 ? (
                                    `${comments.length} comments`
                                ) : null
                            }
                            <ChatBubbleIcon className={classes.icons} onClick={() => {
                                if (props.sessionToken === undefined) {
                                    alert('please login or signup to comment')
                                } else {
                                    setPostCommentToggle(true);
                                    setMoreToggle(true)
                                }
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
                                if (props.sessionToken === undefined) {
                                    alert('please login or signup to comment')
                                } else {
                                    setPostCommentToggle(true);
                                    setMoreToggle(true)
                                }
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
                        </div>
                    ) : null
                }
            </div>
            {
                moreToggle ? (
                    comments.map((comment) => {
                        // console.log(comment)
                        return (
                            <List key={comment.id} className={classes.root}>
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
                                                {
                                                    comment.code !== 'null' ? (
                                                        <div className={classes.spacing}>
                                                            <CopyBlock language='javascript' text={comment.code} theme={obsidian} wrapLines={true} />
                                                        </div>
                                                    ) : null
                                                }
                                            </React.Fragment>
                                        }
                                    />
                                </ListItem>
                                <div>
                                    <DeleteComment sessionToken={props.sessionToken} commentId={comment.id} getComments={getComments} userId={comment.user_id} handleModalOpen={handleModalOpen} editCommentToUpdate={editCommentToUpdate} setUpdateOn={setUpdateOn} comment={comment} buttonToggle={buttonToggle} setButtonToggle={setButtonToggle} />
                                </div>
                                {
                                    updateOn ? (
                                        <UpdateComment sessionToken={props.sessionToken} openModal={openModal} handleModalClose={handleModalClose} commentToUpdate={commentToUpdate} getComments={getComments} userId={comment.user_id} commentId={comment.id} setButtonToggle={setButtonToggle} />
                                    ) : null
                                }
                            </List>
                        )
                    })
                ) : null
            }
        </div>
    )
}

export default Comments;