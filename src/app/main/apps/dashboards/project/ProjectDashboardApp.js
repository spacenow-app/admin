import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
// import { Typography } from '@material-ui/core';
import { SpacenowAnimateGroup, SpacenowPageSimple } from '@spacenow';
import withReducer from 'app/store/withReducer';
import * as Actions from './store/actions';

import reducer from './store/reducers';
import Widget4 from './widgets/Widget4';

const useStyles = makeStyles(() => ({
    content: {
        '& canvas': {
            maxHeight: '100%'
        }
    },
}));

const ProjectDashboardApp = (props) => {

    const dispatch = useDispatch();
    const widgets = useSelector(({ projectDashboardApp }) => projectDashboardApp.widgets);
    const classes = useStyles(props);

    useEffect(() => {
        dispatch(Actions.getWidgets());
    }, [dispatch]);

    if (!widgets) {
        return null;
    }

    return (
        <SpacenowPageSimple
            classes={{
                header: "min-h-160 h-160",
                toolbar: "min-h-48 h-48",
                rightSidebar: "w-288",
                content: classes.content,
            }}
            content={
                <div className="p-12">
                    <SpacenowAnimateGroup
                        className="flex flex-wrap"
                        enter={{
                            animation: "transition.slideUpBigIn"
                        }}
                    >
                        <div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
                            <Widget4 widget={widgets.widget4} />
                        </div>
                        <div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
                            <Widget4 widget={widgets.widget2} />
                        </div>
                        <div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
                            <Widget4 widget={widgets.widget4} />
                        </div>
                        <div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
                            <Widget4 widget={widgets.widget4} />
                        </div>
                    </SpacenowAnimateGroup>
                </div>
            }
        />
    );
}

export default withReducer('projectDashboardApp', reducer)(ProjectDashboardApp);
