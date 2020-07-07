import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import APIURL from '../../../../../../helpers/enviroment';

const useStyles = makeStyles(theme => ({

}));

const DeletePost = (props) => {
    const classes = useStyles();

    const deletePost = () => {
        fetch(`${APIURL}/posts/post/${props.postId}`, {
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

    const toggleUpdateDeleteIcon = (event) => {
        props.setAnchorEl(event.currentTarget);
    };

    return (
        <div>
            {
                props.grabPost.user_id === localStorage.getItem('userID') ? (
                    <div>
                        <MoreVertIcon onClick={toggleUpdateDeleteIcon} className={classes.vertIcon} />
                        <Menu
                            id="simple-menu"
                            anchorEl={props.anchorEl}
                            keepMounted
                            open={Boolean(props.anchorEl)}
                            onClose={props.handleMenuClose}
                        >
                            <MenuItem onClick={() => {
                                props.handleModalOpen();
                                props.setUpdateOn(true);
                            }}>Update</MenuItem>
                            <MenuItem style={{ color: 'red' }} onClick={() => {
                                deletePost();
                                props.handleMenuClose();
                                props.setDisplayPost(false);
                            }}>Delete</MenuItem>
                        </Menu>
                    </div>
                ) : null
            }
        </div>
    )
}

export default DeletePost;