import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { Animated } from "react-animated-css";

const useStyles = makeStyles(theme => ({
    wrapper: {
        margin: theme.spacing(1),
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
        color: '#333',
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
        color: '#333',
        fontSize: '16px',
        height: '150px'
    },
    button: {
        color: '#333',
        fontSize: '16px'
    },
    exitButton: {
        color: '#333'
    },
    spacer: {
        display: 'flex',
        justifyContent: 'space-between'
    }
}));

const PostComment = props => {
    const classes = useStyles();

    return (
        <div>
            {/* <Animated animationIn="slideInLeft"> */}
                <div className={classes.wrapper}>
                    <form>
                        <Typography>
                            <input id='titleInput' type="text" className={classes.titleTextField} placeholder="Title" />
                        </Typography>
                        <Typography>
                            <textarea id='contentInput' type="text" className={classes.contentTextField} placeholder="Text (optional)" />
                        </Typography>
                        <div className={classes.spacer}>
                            <Button id='createPostButton' type='submit' className={classes.button}>Submit</Button>
                            <Button onClick={() => props.setPostCommentToggle(false)} id='exitCreatePostButton' type='submit' className={classes.exitButton}>Exit</Button>
                        </div>
                    </form>
                </div>
            {/* </Animated> */}
        </div>
    )
}

export default PostComment;