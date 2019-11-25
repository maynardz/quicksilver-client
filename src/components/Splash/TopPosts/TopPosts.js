import React, {useState, useEffect} from 'react';
import APIURL from '../../../helpers/enviroment';

const TopPosts = (props) => {

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
        <div>
            <h1 style={{textAlign: 'center'}}>TOP POSTS</h1>
        </div>
    )
}

export default TopPosts;

// sort method to sort top posts