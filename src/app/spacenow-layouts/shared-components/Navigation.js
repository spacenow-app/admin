import React from 'react';
import {SpacenowNavigation} from '@spacenow';
import clsx from 'clsx';
import {useSelector} from 'react-redux';

function Navigation(props)
{
    const navigation = useSelector(({spacenow}) => spacenow.navigation);

    return (
        <SpacenowNavigation className={clsx("navigation", props.className)} navigation={navigation} layout={props.layout} dense={props.dense}/>
    );
}

Navigation.defaultProps = {
    layout: "vertical"
};

export default Navigation;
