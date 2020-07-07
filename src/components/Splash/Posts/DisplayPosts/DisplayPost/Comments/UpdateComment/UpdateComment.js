import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import APIURL from '../../../../../../../helpers/enviroment';

const useStyles = makeStyles(theme => ({
    card: {
        minWidth: 275,
        background: '#333'
    },
    spacer: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: theme.spacing(2)
    },
    button: {
        color: 'white'
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

const UpdateComment = (props) => {
    const classes = useStyles();

    const [editContent, setEditContent] = useState(props.commentToUpdate.content);
    const [editCode, setEditCode] = useState(props.commentToUpdate.code);

    const updateComment = (e) => {
        // console.log(e)
        e.preventDefault();
        fetch(`${APIURL}/comments/comment/${props.commentToUpdate.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                post: {
                    content: editContent,
                    code: editCode
                }
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': props.sessionToken
            }
        })
            .then(res => res.json())
            .then(
                props.getComments(),
                props.handleModalClose(),
                props.handleMenuClose(),
            )
            .catch(err => alert(err))
    };

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={props.openModal}
            onClose={props.handleModalClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={props.openModal}>
                <div className={classes.paper}>
                    <div>
                        <form onSubmit={updateComment}>
                            <Card className={classes.card}>
                                <CardContent>
                                    <Typography>
                                        <textarea className={classes.contentTextField} id='contentInput' type="text" placeholder="Text (optional)" value={editContent} onChange={(e) => setEditContent(e.target.value)} />
                                    </Typography>
                                    <Typography>
                                        <textarea id='contentInput' type="text" multiline={true} className={classes.contentTextField} placeholder="Code snippet (optional)" value={editCode} onChange={(e) => setEditCode(e.target.value)} />
                                    </Typography>
                                </CardContent>
                                <div className={classes.spacer}>
                                    <CardActions>
                                        <Button className={classes.button} id='createPostButton' type='submit'>Submit</Button>
                                    </CardActions>
                                    <CardActions>
                                        <Button onClick={props.handleModalClose} className={classes.button} id='exitCreatePostButton'>Cancel</Button>
                                    </CardActions>
                                </div>
                            </Card>
                        </form>
                    </div>
                </div>
            </Fade>
        </Modal>
    )
}

export default UpdateComment;