import React, { useState, useEffect } from 'react';

import './CreatePost.css';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import { Animated } from "react-animated-css";

import APIURL from '../../../../helpers/enviroment';

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
    card: {
        backgroundColor: '#333'
    },
    button: {
        color: 'white',
        fontSize: '16px'
    },
    exitButton: {
        color: 'white'
    },
    spacer: {
        display: 'flex',
        justifyContent: 'space-between'
    }
}));

const CreatePost = (props) => {
    const classes = useStyles();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [code, setCode] = useState(null);
    const [upvote, setUpvote] = useState(0);
    const [language, setLanguage] = useState('');

    useEffect(() => {

        let location = window.location.href;

        return function cleanup() {
            return window.location.href !== location ? props.setCreatePostToggle(false) : null
        }
    }, []);

    const postPost = (e) => {
        e.preventDefault();

        fetch(`${APIURL}/posts/post`, {
            method: 'POST',
            body: JSON.stringify({
                post: {
                    title: title,
                    content: content,
                    upvote: upvote,
                    code: code,
                    language: language
                }
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': props.sessionToken
            }
        })
            .then(res => res.json())
            .then(json => console.log(json))
            .then(props.getPosts())
            .then(
                setTitle(''),
                setContent(''),
                setUpvote(0),
                setLanguage(''),

                props.setCreatePostToggle(false)
            )
            .catch(err => console.log(err))
    }

    const handleChange = (event) => {
        setLanguage(event.target.value)
        console.log(language);
    }

    return (
        <Animated animationIn="slideInUp">
            <div className={classes.wrapper}>
                <form onSubmit={postPost}>
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="select-language">Language</InputLabel>
                                    <Select
                                        labelId="select-language"
                                        id="select-language"
                                        value={language}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={'JavaScript'}>JavaScript</MenuItem>
                                        <MenuItem value={'.Net'}>.Net</MenuItem>
                                        <MenuItem value={'Python'}>Python</MenuItem>
                                    </Select>
                                </FormControl>
                            </Typography>
                            <Typography>
                                <input id='titleInput' type="text" className={classes.titleTextField} placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
                            </Typography>
                            <Typography>
                                <textarea id='contentInput' type="text" className={classes.contentTextField} placeholder="Text (optional)" onChange={(e) => setContent(e.target.value)} />
                            </Typography>
                            <Typography>
                                <textarea id='contentInput' type="text" multiline={true} className={classes.contentTextField} placeholder="Code snippet (optional)" onChange={(e) => setCode(e.target.value)} />
                            </Typography>
                        </CardContent>
                        <div className={classes.spacer}>
                            <CardActions>
                                <Button id='createPostButton' type='submit' className={classes.button}>Submit</Button>
                            </CardActions>
                            <CardActions>
                                <Button onClick={() => props.setCreatePostToggle(false)} id='exitCreatePostButton' type='submit' className={classes.exitButton}>Exit</Button>
                            </CardActions>
                        </div>
                    </Card>
                </form>
            </div>
        </Animated>
    )
}

export default CreatePost;