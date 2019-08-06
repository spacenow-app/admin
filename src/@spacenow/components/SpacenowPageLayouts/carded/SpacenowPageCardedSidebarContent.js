import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { SpacenowScrollbars } from '@spacenow';
import clsx from 'clsx';
import { useSelector } from 'react-redux';

function SpacenowPageCardedSidebarContent(props) {
    const mainThemeDark = useSelector(({ spacenow }) => spacenow.settings.mainThemeDark);

    const classes = props.classes;

    return (
        <React.Fragment>
            {props.header && (
                <ThemeProvider theme={mainThemeDark}>
                    <div className={clsx(classes.sidebarHeader, props.variant)}>
                        {props.header}
                    </div>
                </ThemeProvider>
            )}

            {props.content && (
                <SpacenowScrollbars className={classes.sidebarContent} enable={props.innerScroll}>
                    {props.content}
                </SpacenowScrollbars>
            )}
        </React.Fragment>
    )
}

export default SpacenowPageCardedSidebarContent;
