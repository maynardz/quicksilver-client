import React, {useState, useEffect} from 'react';
import DisplayTopNet from './DisplayTopNet/DisplayTopNet';

const TopNet = (props) => {

    const [sorted, setSorted] = useState([]);
    const [checked, setChecked] = useState(false);

    const sortPosts = () => {
        setSorted(props.topNet);
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
        return checked ? <DisplayTopNet sorted={sorted} /> : null
    };

    return(
        <div>
            {checker()}
        </div>
    )
}

export default TopNet;