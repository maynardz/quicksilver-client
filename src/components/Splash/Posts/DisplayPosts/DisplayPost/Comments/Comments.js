import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        // width: '100%',
        minWidth: 275,
        backgroundColor: theme.palette.background.paper,
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    inline: {
        display: 'block',
    },
    // title: {
    //     textAlign: 'center',
    //     marginTop: '2em',
    //     marginBottom: '2em'
    // }
}));

const Comments = (props) => {
    const classes = useStyles();

    const [comments, setComments] = useState([]);

    useEffect(() => {
        setComments(props.grabPost.comments)
    })

    return (
        <div>
            {/* <h3 className={classes.title}>Comments</h3> */}
            {
                comments.map(comment => {
                    return (
                        <List className={classes.root}>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt="profile picture" src="/static/images/avatar/1.jpg" />
                                </ListItemAvatar>
                                <ListItemText
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                className={classes.inline}
                                                color="textPrimary"
                                            >
                                                {comment.commenter_username}
                                            </Typography>
                                            {comment.content}
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </List>
                    )
                })
            }
        </div>
    )
}

export default Comments;