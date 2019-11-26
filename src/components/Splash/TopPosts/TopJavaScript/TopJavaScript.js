import React, {useState, useEffect} from 'react';
import DisplayTopJS from './DisplayTopJs/DisplayTopJS';

const TopJavaScript = (props) => {

    const [sorted, setSorted] = useState([]);
    const [checked, setChecked] = useState(false);

    const sortPosts = () => {
        setSorted(props.topJavaScript);
        sorted.sort((a, b) => {
            return a.upvote - b.upvote
        })
        sorted.reverse();
        setChecked(true);
    };

    useEffect(() => {
        sortPosts();
    });

    const checker = () => {
        return checked ? <DisplayTopJS sorted={sorted} /> : null
    };

    return(
        <div>
            {checker()}
        </div>
    )
}

export default TopJavaScript;