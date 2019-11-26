import React, {useState, useEffect} from 'react';
import APIURL from '../../../helpers/enviroment';

import { makeStyles } from '@material-ui/core/styles';

import TopJavaScript from './TopJavaScript/TopJavaScript';
import TopNet from './TopNet/TopNet';
import TopPython from './TopPython/TopPython';

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(8.2),
    },
}));

const TopPosts = (props) => {
    const classes = useStyles();

    const [topJavaScript, setTopJavaScript] = useState([]);
    const [topNet, setTopNet] = useState([]);
    const [topPython, setTopPython] = useState([]);

    useEffect(() => {
        const url = `${APIURL}/posts/post/JavaScript`
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': props.sessionToken
            }
        })
        .then(res => res.json())
        .then(json => setTopJavaScript(json))
    }, []);

    useEffect(() => {
        const url = `${APIURL}/posts/post/.Net`
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': props.sessionToken
            }
        })
        .then(res => res.json())
        .then(json => setTopNet(json))
    }, []);

    useEffect(() => {
        const url = `${APIURL}/posts/post/Python`
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': props.sessionToken
            }
        })
        .then(res => res.json())
        .then(json => setTopPython(json))
    }, []);


    return(
        <div className={classes.root}>
            <TopJavaScript topJavaScript={topJavaScript} />
            <TopNet topNet={topNet} />
            <TopPython topPython={topPython} />
        </div>
    )
}

export default TopPosts;

// sort method to sort top posts