import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';

import APIURL from '../../../../../../helpers/enviroment';

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

const UpdatePost = (props) => {
    console.log(props);
    const classes = useStyles();

    const [editLanguage, setEditLanguage] = useState(props.postToUpdate.language);
    const [editTitle, setEditTitle] = useState(props.postToUpdate.title);
    const [editContent, setEditContent] = useState(props.postToUpdate.content);
    console.log(editLanguage, editTitle, editContent)

    const updatePost = (e) => {
        // console.log(e)
        e.preventDefault();
        fetch(`${APIURL}/posts/post/${props.getPostId}`, {
            method: 'PUT',
            body: JSON.stringify({
                post: {
                    title: editTitle,
                    content: editContent,
                    language: editLanguage
                }
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': props.sessionToken
            }
        })
            .then(res => res.json())
            .then(
                props.getPosts(),
                props.handleModalClose(),
                props.handleMenuClose(),
                props.setDisplayPost(false)
            )
            .catch(err => alert(err))
    };

    const handleChange = (event) => {
        setEditLanguage(event.target.value)
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
                        <form onSubmit={updatePost}>
                            <Card className={classes.card}>
                                <CardContent>
                                    <Typography>
                                        <FormControl className={classes.formControl}>
                                            <InputLabel id="select-language">Language</InputLabel>
                                            <Select
                                                labelId="select-language"
                                                id="select-language"
                                                value={editLanguage}
                                                onChange={handleChange}
                                            >
                                                <MenuItem value={'JavaScript'}>JavaScript</MenuItem>
                                                <MenuItem value={'.Net'}>.Net</MenuItem>
                                                <MenuItem value={'Python'}>Python</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Typography>
                                    <Typography>
                                        <input className={classes.titleTextField} id='titleInput' type="text" placeholder="Title" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                                    </Typography>
                                    <Typography>
                                        <textarea className={classes.contentTextField} id='contentInput' type="text" placeholder="Text (optional)" value={editContent} onChange={(e) => setEditContent(e.target.value)} />
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

export default UpdatePost