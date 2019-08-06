import React from 'react';
import { Icon, ListItem, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { SpacenowUtils } from '@spacenow';
import { withRouter } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from 'app/store/actions';
import SpacenowNavBadge from './../SpacenowNavBadge';

const useStyles = makeStyles(theme => ({
    root: {
        minHeight: 48,
        '&.active': {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.secondary.contrastText + '!important',
            pointerEvents: 'none',
            '& .list-item-text-primary': {
                color: 'inherit'
            },
            '& .list-item-icon': {
                color: 'inherit'
            }
        },
        '& .list-item-icon': {},
        '& .list-item-text': {
            padding: '0 0 0 16px'
        },
        color: theme.palette.text.primary,
        textDecoration: 'none!important',
        '&.dense': {
            padding: '8px 12px 8px 12px',
            minHeight: 40,
            '& .list-item-text': {
                padding: '0 0 0 8px'
            }
        }
    }
}));

function SpacenowNavHorizontalLink(props) {
    const dispatch = useDispatch();
    const userRole = useSelector(({ auth }) => auth.user.role);

    const classes = useStyles(props);
    const { item, dense } = props;

    if (!SpacenowUtils.hasPermission(item.auth, userRole)) {
        return null;
    }

    return (
        <ListItem
            button
            component="a"
            href={item.url}
            target={item.target ? item.target : "_blank"}
            className={clsx("list-item", classes.root, dense && "dense")}
            onClick={ev => dispatch(Actions.navbarCloseMobile())}
        >
            {item.icon && (
                <Icon className="list-item-icon text-16 flex-shrink-0" color="action">{item.icon}</Icon>
            )}
            <ListItemText className="list-item-text" primary={item.title} classes={{ primary: 'text-14 list-item-text-primary' }} />
            {item.badge && (
                <SpacenowNavBadge className="ml-8" badge={item.badge} />
            )}
        </ListItem>
    );
}

SpacenowNavHorizontalLink.propTypes = {
    item: PropTypes.shape(
        {
            id: PropTypes.string.isRequired,
            title: PropTypes.string,
            icon: PropTypes.string,
            url: PropTypes.string,
            target: PropTypes.string
        })
};

SpacenowNavHorizontalLink.defaultProps = {};

const NavHorizontalLink = withRouter(React.memo(SpacenowNavHorizontalLink));

export default NavHorizontalLink;
