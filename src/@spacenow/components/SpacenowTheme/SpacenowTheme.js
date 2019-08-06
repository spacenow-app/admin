import React from 'react';
import {ThemeProvider} from '@material-ui/styles';
import {useSelector} from 'react-redux';

function SpacenowTheme(props)
{
    const mainTheme = useSelector(({spacenow}) => spacenow.settings.mainTheme);

    // console.warn('SpacenowTheme:: rendered',mainTheme);
    return (
        <ThemeProvider theme={mainTheme}>
            {props.children}
        </ThemeProvider>
    )
}

export default React.memo(SpacenowTheme);
