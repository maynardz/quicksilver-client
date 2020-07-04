import React, { useState } from 'react';
import './Splash.css';

import { Row, Col } from 'reactstrap';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

import Navbar from './Navbar/Navbar';
import Posts from './Posts/Posts';
import TopPosts from './TopPosts/TopPosts';

const useStyles = makeStyles({
    fullList: {
        minWidth: 275,
        backgroundColor: '#555',
        height: '100%'
    },
});

const Splash = (props) => {
    const classes = useStyles();

    const [state, setState] = useState({
        right: false,
    });

    const toggleDrawer = (side, open) => event => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        };
        setState({ ...state, [side]: open });
    };

    // const fullList = side => (
    //     <div
    //         className={classes.fullList}
    //         role="presentation"
    //         onClick={toggleDrawer(side, false)}
    //         onKeyDown={toggleDrawer(side, false)}
    //     >
    //         <List>
    //             <TopPosts sessionToken={props.sessionToken} />
    //         </List>
    //     </div>
    // );

    // const grid = () => {
    //     return state.right !== false ? (
    //         <div className='no-gutters'>
    //             <Row>
    //                 <Col md="8">
    //                     <Posts sessionToken={props.sessionToken} />
    //                 </Col>
    //                 <Col md="4">
    //                     <SwipeableDrawer
    //                         anchor="right"
    //                         open={state.right}
    //                         onClose={toggleDrawer('right', false)}
    //                         onOpen={toggleDrawer('right', true)}
    //                     >
    //                         {fullList('right')}
    //                     </SwipeableDrawer>
    //                 </Col>
    //             </Row>
    //         </div>
    //     ) : (
    //             <div className='no-gutters'>
    //                 <Row>
    //                     <Col md="12">
    //                         <Posts sessionToken={props.sessionToken} />
    //                     </Col>
    //                     <SwipeableDrawer
    //                         anchor="right"
    //                         open={state.right}
    //                         onClose={toggleDrawer('right', false)}
    //                         onOpen={toggleDrawer('right', true)}
    //                     >
    //                         {fullList('right')}
    //                     </SwipeableDrawer>
    //                 </Row>
    //             </div>
    //         )
    // }

    return (
        <div>
            <Navbar updateToken={props.updateToken} clearLocalStorage={props.clearLocalStorage} toggleDrawer={toggleDrawer} />
            {/* {grid()} */}
            <div className='no-gutters'>
                <Row>
                    <Col md="12">
                        <Posts sessionToken={props.sessionToken} currentUser={props.currentUser} />
                    </Col>
                </Row>
                <Row>
                    <Col md="4">
                    <SwipeableDrawer
                        anchor="right"
                        open={state.right}
                        onClose={toggleDrawer('right', false)}
                        onOpen={toggleDrawer('right', true)}
                    >
                        {/* {fullList('right')} */}
                    </SwipeableDrawer>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Splash;