import React from 'react';
import { Divider, List } from '@material-ui/core';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import SpacenowNavVerticalGroup from './vertical/SpacenowNavVerticalGroup';
import SpacenowNavVerticalCollapse from './vertical/SpacenowNavVerticalCollapse';
import SpacenowNavVerticalItem from './vertical/SpacenowNavVerticalItem';
import SpacenowNavVerticalLink from './vertical/SpacenowNavVerticalLink';
import SpacenowNavHorizontalGroup from './horizontal/SpacenowNavHorizontalGroup';
import SpacenowNavHorizontalCollapse from './horizontal/SpacenowNavHorizontalCollapse';
import SpacenowNavHorizontalItem from './horizontal/SpacenowNavHorizontalItem';
import SpacenowNavHorizontalLink from './horizontal/SpacenowNavHorizontalLink';

function SpacenowNavigation(props) {
    const { navigation, layout, active, dense, className } = props;

    const verticalNav = (
        <List className={clsx("navigation whitespace-no-wrap", className)}>
            {
                navigation.map((item) => (

                    <React.Fragment key={item.id}>

                        {item.type === 'group' && (
                            <SpacenowNavVerticalGroup item={item} nestedLevel={0} active={active} dense={dense} />
                        )}

                        {item.type === 'collapse' && (
                            <SpacenowNavVerticalCollapse item={item} nestedLevel={0} active={active} dense={dense} />
                        )}

                        {item.type === 'item' && (
                            <SpacenowNavVerticalItem item={item} nestedLevel={0} active={active} dense={dense} />
                        )}

                        {item.type === 'link' && (
                            <SpacenowNavVerticalLink item={item} nestedLevel={0} active={active} dense={dense} />
                        )}

                        {item.type === 'divider' && (
                            <Divider className="my-16" />
                        )}
                    </React.Fragment>
                ))
            }
        </List>
    );

    const horizontalNav = (
        <List className={clsx("navigation whitespace-no-wrap flex p-0", className)}>
            {
                navigation.map((item) => (

                    <React.Fragment key={item.id}>

                        {item.type === 'group' && (
                            <SpacenowNavHorizontalGroup item={item} nestedLevel={0} dense={dense} />
                        )}

                        {item.type === 'collapse' && (
                            <SpacenowNavHorizontalCollapse item={item} nestedLevel={0} dense={dense} />
                        )}

                        {item.type === 'item' && (
                            <SpacenowNavHorizontalItem item={item} nestedLevel={0} dense={dense} />
                        )}

                        {item.type === 'link' && (
                            <SpacenowNavHorizontalLink item={item} nestedLevel={0} dense={dense} />
                        )}

                        {item.type === 'divider' && (
                            <Divider className="my-16" />
                        )}
                    </React.Fragment>
                ))
            }
        </List>
    );

    if (navigation.length > 0) {
        switch (layout) {
            case 'horizontal':
                {
                    return horizontalNav;
                }
            case 'vertical':
            default:
                {
                    return verticalNav;
                }
        }
    }
    else {
        return null;
    }
}

SpacenowNavigation.propTypes = {
    navigation: PropTypes.array.isRequired
};

SpacenowNavigation.defaultProps = {
    layout: "vertical"
};

export default React.memo(SpacenowNavigation);
