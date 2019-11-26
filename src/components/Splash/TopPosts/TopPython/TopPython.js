import React, {useState, useEffect} from 'react';
import DisplayTopPython from './DisplayTopPython/DisplayTopPython';

const TopPython = (props) => {

    const [sorted, setSorted] = useState([]);
    const [checked, setChecked] = useState(false);

    const sortPosts = () => {
        setSorted(props.topPython);
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
        return checked ? <DisplayTopPython sorted={sorted} /> : null
    };

    return(
        <div>
            {checker()}
        </div>
    )
}

export default TopPython;