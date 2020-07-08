import React, { useState } from 'react';
import './Splash.css';

import { Row, Col } from 'reactstrap';

import Navbar from './Navbar/Navbar';
import Posts from './Posts/Posts';

const Splash = (props) => {

    return (
        <div>
            <Navbar updateToken={props.updateToken} clearLocalStorage={props.clearLocalStorage} setLoginToggle={props.setLoginToggle} sessionToken={props.sessionToken} />
            <div className='no-gutters'>
                <Row>
                    <Col md="12">
                        <Posts sessionToken={props.sessionToken} currentUser={props.currentUser} />
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Splash;