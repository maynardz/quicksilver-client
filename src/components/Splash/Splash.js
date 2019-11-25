import React from 'react';
import './Splash.css';

import { Row, Col } from 'reactstrap';

import Navbar from './Navbar/Navbar';
import Posts from './Posts/Posts';
import TopPosts from './TopPosts/TopPosts';

const Splash = (props) => {
    return(
        <div>
            <Navbar updateToken={props.updateToken} clearToken={props.clearToken} />
            <div className='no-gutters'>
                <Row>
                    <Col md="8">
                        <Posts sessionToken={props.sessionToken} />
                    </Col>
                    <Col md="4">
                        <TopPosts sessionToken={props.sessionToken}/>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Splash;