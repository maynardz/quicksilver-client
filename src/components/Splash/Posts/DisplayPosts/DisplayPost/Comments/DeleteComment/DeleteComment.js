import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import UpdateIcon from '@material-ui/icons/Update';
import DeleteIcon from '@material-ui/icons/Delete';

import Chip from '@material-ui/core/Chip';

import APIURL from '../../../../../../../helpers/enviroment';

const useStyles = makeStyles(theme => ({
    vertIcon: {
        marginTop: theme.spacing(3),
    }
}));

const DeleteComment = (props) => {
    // console.log(props);
    const classes = useStyles();

    const deleteComment = (commentId) => {
        fetch(`${APIURL}/comments/comment/${commentId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': props.sessionToken
            }
        })
            .then(res => res.json())
            .then(json => console.log(json))
            .then(props.getComments())
            .catch(err => console.log(err))
    };

    return (
        <div>
            {
                props.userId === localStorage.getItem('userID') ? (
                    props.buttonToggle !== true ? (
                        <MoreVertIcon onClick={(e) => {
                            console.log(props.commentId)
                            props.setButtonToggle(true);
                        }} className={classes.vertIcon} />
                    ) : (
                        <div>
                            <UpdateIcon onClick={() => {
                                props.handleModalOpen();
                                props.setUpdateOn(true);
                                props.editCommentToUpdate(props.comment);
                            }} />
                            <DeleteIcon onClick={() => deleteComment(props.commentId)}/>
                        </div>
                    )
                ) : null
            }
            {/* <Menu
                id="simple-menu"
                anchorEl={props.upDelAnchorEl}
                keepMounted
                open={Boolean(props.upDelAnchorEl)}
                onClose={props.handleMenuClose}
            >
                <MenuItem onClick={() => {
                    props.handleModalOpen();
                    props.editCommentToUpdate(props.comment)
                    props.setUpdateOn(true);
                }}>Update</MenuItem>
                <MenuItem style={{ color: 'red' }} onClick={() => {
                    deleteComment(props.commentId);
                    props.handleMenuClose();
                }}>Delete</MenuItem>
            </Menu> */}
        </div>
    )
}

export default DeleteComment;