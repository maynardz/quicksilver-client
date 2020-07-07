import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Alert, AlertTitle } from '@material-ui/lab';

import { Animated } from "react-animated-css";

import APIURL from '../../../../../../../helpers/enviroment';

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
        borderRadius: '5px',
        backgroundColor: 'white',
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
        borderRadius: '5px',
        borderColor: 'white',
        background: 'white',
        color: '#333',
        fontSize: '16px',
        height: '150px'
    },
    button: {
        backgroundColor: '#333',
        color: 'white',
        fontSize: '16px'
    },
    exitButton: {
        backgroundColor: '#333',
        color: 'white'
    },
    spacer: {
        display: 'flex',
        justifyContent: 'space-between'
    }
}));

const PostComment = props => {
    const classes = useStyles();
    // console.log(props);

    const [content, setContent] = useState('');
    const [code, setCode] = useState(null);

    const postComment = e => {
        e.preventDefault();

        fetch(`${APIURL}/comments/comment`, {
            method: 'POST',
            body: JSON.stringify({
                comment: {
                    post_id: props.grabPost.post_id,
                    content: content,
                    code: code
                }
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': props.sessionToken
            }
        })
            .then(res => res.json())
            .then(json => {
                props.setAlert(true);
                setContent('')
                props.setPostCommentToggle(false);
                props.getComments();
            })
            .catch(err => alert(err))
    }

    return (
        <div>
            {/* <Animated animationIn="slideInLeft"> */}
            <div className={classes.wrapper}>
                <form onSubmit={postComment}>
                    {/* <Typography>
                        <input id='titleInput' type="text" className={classes.titleTextField} placeholder="Title" />
                    </Typography> */}
                    <Typography>
                        <textarea id='contentInput' type="text" className={classes.contentTextField} placeholder={`Add a comment as ${props.currentUser}...`} onChange={(e) => setContent(e.target.value)} />
                    </Typography>
                    <Typography>
                        <textarea id='contentInput' type="text" multiline={true} className={classes.contentTextField} placeholder="Code snippet (optional)" onChange={(e) => setCode(e.target.value)} />
                    </Typography>
                    <div className={classes.spacer}>
                        <Button id='createCommentButton' type='submit' className={classes.button}>Submit</Button>
                        <Button onClick={() => props.setPostCommentToggle(false)} id='exitCreateCommentButton' type='submit' className={classes.exitButton}>Exit</Button>
                    </div>
                </form>
            </div>
            {/* </Animated> */}
        </div>
    )
}

export default PostComment;