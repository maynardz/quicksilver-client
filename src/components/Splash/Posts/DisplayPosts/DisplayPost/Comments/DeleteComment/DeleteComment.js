import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Divider from '@material-ui/core/Divider';

import APIURL from '../../../../../../../helpers/enviroment';

const useStyles = makeStyles(theme => ({
    vertIcon: {
        marginTop: theme.spacing(3),
    }
}));

const DeleteComment = (props) => {
    console.log(props);
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
            <MoreVertIcon onClick={(e) => {
                console.log(props.commentId)
                props.toggleUpdateDeleteIcon(e)
            }} className={classes.vertIcon} />
            <Menu
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
            </Menu>
        </div>
    )
}

export default DeleteComment;