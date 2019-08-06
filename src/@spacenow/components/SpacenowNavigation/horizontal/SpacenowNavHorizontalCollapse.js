import React, { useState } from 'react';
import { Grow, Paper, Icon, IconButton, ListItem, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { SpacenowUtils } from '@spacenow';
import { useDebounce } from '@spacenow/hooks';
import { withRouter } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Manager, Reference, Popper } from 'react-popper';
import * as ReactDOM from 'react-dom';
import SpacenowNavHorizontalGroup from './SpacenowNavHorizontalGroup';
import SpacenowNavHorizontalItem from './SpacenowNavHorizontalItem';
import SpacenowNavHorizontalLink from './SpacenowNavHorizontalLink';
import SpacenowNavBadge from './../SpacenowNavBadge';

const useStyles = makeStyles(theme => ({
    root: {
        '& .list-item-text': {
            padding: '0 0 0 16px'
        }
    },
    button: {
        color: theme.palette.text.primary,
        minHeight: 48,
        '&.open': {
            backgroundColor: 'rgba(0,0,0,.08)'
        },
        '&.dense': {
            padding: '8px 12px 8px 12px',
            minHeight: 40,
            '& .list-item-text': {
                padding: '0 0 0 8px'
            }
        }
    },
    popper: {
        zIndex: 999
    },
    popperClose: {
        pointerEvents: 'none'
    }
}));

function SpacenowNavHorizontalCollapse(props) {
    const userRole = useSelector(({ auth }) => auth.user.role);

    const classes = useStyles(props);
    const [opened, setOpened] = useState(false);
    const { item, nestedLevel, dense } = props;

    const handleToggle = useDebounce((open) => {
        setOpened(open);
    }, 150);

    if (!SpacenowUtils.hasPermission(item.auth, userRole)) {
        return null;
    }

    return (
        <ul className={clsx(classes.root, "relative pl-0")}>
            <Manager>
                <Reference>
                    {({ ref }) => (
                        <div ref={ref}>
                            <ListItem
                                button
                                className={clsx("list-item", classes.button, opened && "open", dense && "dense")}
                                onMouseEnter={() => handleToggle(true)}
                                onMouseLeave={() => handleToggle(false)}
                                aria-owns={opened ? 'menu-list-grow' : null}
                                aria-haspopup="true"
                            >
                                {item.icon && (
                                    <Icon color="action" className="text-16 flex-shrink-0">{item.icon}</Icon>
                                )}
                                <ListItemText className="list-item-text" primary={item.title} classes={{ primary: 'text-14' }} />
                                {item.badge && (
                                    <SpacenowNavBadge className="ml-8 mr-4" badge={item.badge} />
                                )}
                                <IconButton disableRipple className="w-16 h-16 ml-4 p-0">
                                    <Icon className="text-16 arrow-icon">keyboard_arrow_right</Icon>
                                </IconButton>
                            </ListItem>
                        </div>
                    )}
                </Reference>
                {ReactDOM.createPortal(
                    <Popper
                        placement="right"
                        eventsEnabled={opened}
                        positionFixed
                    >
                        {({ ref, style, placement, arrowProps }) => (
                            opened && (
                                <div
                                    ref={ref}
                                    style={{
                                        ...style,
                                        zIndex: 999 + nestedLevel + 1
                                    }}
                                    data-placement={placement}
                                    className={clsx(classes.popper, { [classes.popperClose]: !opened })}
                                >
                                    <Grow in={opened} id="menu-list-grow" style={{ transformOrigin: '0 0 0' }}>
                                        <Paper
                                            onMouseEnter={() => handleToggle(true)}
                                            onMouseLeave={() => handleToggle(false)}
                                        >
                                            {item.children && (
                                                <ul className={clsx(classes.children, "pl-0")}>
                                                    {
                                                        item.children.map((item) => (

                                                            <React.Fragment key={item.id}>

                                                                {item.type === 'group' && (
                                                                    <SpacenowNavHorizontalGroup item={item} nestedLevel={nestedLevel + 1} dense={dense} />
                                                                )}

                                                                {item.type === 'collapse' && (
                                                                    <NavHorizontalCollapse item={item} nestedLevel={nestedLevel + 1} dense={dense} />
                                                                )}

                                                                {item.type === 'item' && (
                                                                    <SpacenowNavHorizontalItem item={item} nestedLevel={nestedLevel + 1} dense={dense} />
                                                                )}

                                                                {item.type === 'link' && (
                                                                    <SpacenowNavHorizontalLink item={item} nestedLevel={nestedLevel + 1} dense={dense} />
                                                                )}

                                                            </React.Fragment>
                                                        ))
                                                    }
                                                </ul>
                                            )}
                                        </Paper>
                                    </Grow>
                                </div>
                            )
                        )}
                    </Popper>,
                    document.querySelector('#root')
                )}
            </Manager>
        </ul>
    );
}

SpacenowNavHorizontalCollapse.propTypes = {
    item: PropTypes.shape(
        {
            id: PropTypes.string.isRequired,
            title: PropTypes.string,
            icon: PropTypes.string,
            children: PropTypes.array
        })
};

SpacenowNavHorizontalCollapse.defaultProps = {};

const NavHorizontalCollapse = withRouter(React.memo(SpacenowNavHorizontalCollapse));

export default NavHorizontalCollapse;
