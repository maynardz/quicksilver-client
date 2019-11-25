import React, {useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
    wrapper: {
        marginLeft: theme.spacing(1),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
      selectEmpty: {
        marginTop: theme.spacing(2),
    },
  }));

const CreatePost = (props) => {
    const classes = useStyles();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [upvote, setUpvote] = useState(0);
    const [language, setLanguage] = useState('');

    const postPost = (e) => {
        e.preventDefault();

        fetch('http://localhost:3000/posts/post', {
            method: 'POST',
            body: JSON.stringify({post: {
                title: title,
                content: content,
                upvote: upvote,
                language: language
            }}),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': props.sessionToken
            }
        })
        .then(res => res.json())
        .then(json => console.log(json))
        .then(props.getPosts)
        .then(
            setTitle(''),
            setContent(''),
            setUpvote(0),
            setLanguage('')
        )
        .catch(err => console.log(err))
    }

    const handleChange = (event) => {
        setLanguage(event.target.value)
        console.log(language);
    }

    return(
        <div className={classes.wrapper}>
            <h1>CREATE POST</h1>
            <form onSubmit={postPost}>
                <input type="text" className={classes.textField} placeholder="Text (optional)" onChange={(e) => setTitle(e.target.value)} />
                <input type="text" className={classes.textField} placeholder="Text (optional)" onChange={(e) => setContent(e.target.value)} />
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Language</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={language}
                    onChange={handleChange}
                    >
                    <MenuItem value={'JavaScript'}>JavaScript</MenuItem>
                    <MenuItem value={'.Net'}>.Net</MenuItem>
                    <MenuItem value={'Python'}>Python</MenuItem>
                    </Select>
                </FormControl>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default CreatePost;