import React from 'react';

import Navbar from './Navbar/Navbar';

const Splash = (props) => {
    return(
        <div>
            <Navbar clearToken={props.clearToken} />
        </div>
    )
}

export default Splash;