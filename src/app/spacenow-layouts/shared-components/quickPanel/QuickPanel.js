import React from 'react';
import { Drawer, Typography } from '@material-ui/core';
import { SpacenowScrollbars } from '@spacenow';
import { useSelector, useDispatch } from 'react-redux';
import * as Actions from './store/actions/index'
import withReducer from 'app/store/withReducer';
import reducer from './store/reducers';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    root: {
        width: 280
    }
}));

function QuickPanel(props) {
    const dispatch = useDispatch();
    const state = useSelector(({ quickPanel }) => quickPanel.state);

    const classes = useStyles();

    return (
        <Drawer
            classes={{ paper: classes.root }}
            open={state}
            anchor="right"
            onClose={ev => dispatch(Actions.toggleQuickPanel())}
        >
            <SpacenowScrollbars>
                <Typography>Quick Panel</Typography>
            </SpacenowScrollbars>
        </Drawer>
    );
}

export default withReducer('quickPanel', reducer)(QuickPanel);
