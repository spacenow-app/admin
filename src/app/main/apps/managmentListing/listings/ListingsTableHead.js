import React, {useState} from 'react';
import {TableHead, TableSortLabel, TableCell, TableRow, Tooltip, IconButton, Icon, Menu, MenuList, MenuItem, ListItemIcon, ListItemText,} from '@material-ui/core';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/styles';

const rows = [
    // {
    //     id            : 'image',
    //     align         : 'left',
    //     disablePadding: true,
    //     label         : '',
    //     sort          : false
    // },
    {
        id            : 'id',
        align         : 'left',
        disablePadding: false,
        label         : 'Id',
        sort          : true
    },
    {
        id            : 'title',
        align         : 'left',
        disablePadding: false,
        label         : 'Title',
        sort          : true
    },
    {
        id            : 'status',
        align         : 'left',
        disablePadding: false,
        label         : 'Status',
        sort          : true
    },
    {
        id            : 'ownerName',
        align         : 'left',
        disablePadding: false,
        label         : 'Owner Name',
        sort          : true
    },
    {
        id            : 'ownerEmail',
        align         : 'left',
        disablePadding: false,
        label         : 'Owner Email',
        sort          : true
    },
    {
        id            : 'city',
        align         : 'left',
        disablePadding: false,
        label         : 'City',
        sort          : true
    },
    {
        id            : 'state',
        align         : 'left',
        disablePadding: false,
        label         : 'State',
        sort          : true
    },
    {
        id            : 'country',
        align         : 'left',
        disablePadding: false,
        label         : 'Country',
        sort          : true
    },
    {
        id            : 'createdDate',
        align         : 'left',
        disablePadding: false,
        label         : 'Created Date',
        sort          : true
    },
    {
        id            : 'ready',
        align         : 'left',
        disablePadding: false,
        label         : 'Ready',
        sort          : true
    },
    {
        id            : 'publish',
        align         : 'left',
        disablePadding: false,
        label         : 'Publish',
        sort          : true
    },
    {
        id            : 'edit',
        align         : 'left',
        disablePadding: false,
        label         : 'Edit',
        sort          : true
    },
    {
        id            : 'delete',
        align         : 'left',
        disablePadding: false,
        label         : 'Delete',
        sort          : true
    },
    // {
    //     id            : 'active',
    //     align         : 'right',
    //     disablePadding: false,
    //     label         : 'Active',
    //     sort          : true
    // }
];

const useStyles = makeStyles(theme => ({
    actionsButtonWrapper: {
        background: theme.palette.background.paper
    }
}));

function ListingsTableHead(props)
{
    const classes = useStyles(props);
    const [selectedUsersMenu, setSelectedUsersMenu] = useState(null);

    const createSortHandler = property => event => {
        props.onRequestSort(event, property);
    };

    function openSelectedUsersMenu(event)
    {
        setSelectedUsersMenu(event.currentTarget);
    }

    function closeSelectedUsersMenu()
    {
        setSelectedUsersMenu(null);
    }

    return (
        <TableHead>
            <TableRow className="h-64">
                <TableCell padding="checkbox" className="relative pl-4 sm:pl-12">
                    {/* <Checkbox
                        indeterminate={props.numSelected > 0 && props.numSelected < props.rowCount}
                        checked={props.numSelected === props.rowCount}
                        onChange={props.onSelectAllClick}
                    /> */}
                    {props.numSelected > 0 && (
                        <div className={clsx("flex items-center justify-center absolute w-64 top-0 left-0 ml-68 h-64 z-10", classes.actionsButtonWrapper)}>
                            <IconButton
                                aria-owns={selectedUsersMenu ? 'selectedUsersMenu' : null}
                                aria-haspopup="true"
                                onClick={openSelectedUsersMenu}
                            >
                                <Icon>more_horiz</Icon>
                            </IconButton>
                            <Menu
                                id="selectedUsersMenu"
                                anchorEl={selectedUsersMenu}
                                open={Boolean(selectedUsersMenu)}
                                onClose={closeSelectedUsersMenu}
                            >
                                <MenuList>
                                    <MenuItem
                                        onClick={() => {
                                            closeSelectedUsersMenu();
                                        }}
                                    >
                                        <ListItemIcon className="min-w-40">
                                            <Icon>delete</Icon>
                                        </ListItemIcon>
                                        <ListItemText primary="Remove"/>
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        </div>
                    )}
                </TableCell>
                {rows.map(row => {
                    return (
                        <TableCell
                            key={row.id}
                            align={row.align}
                            padding={row.disablePadding ? 'none' : 'default'}
                            sortDirection={props.order.id === row.id ? props.order.direction : false}
                        >
                            {row.sort && (
                                <Tooltip
                                    title="Sort"
                                    placement={row.align === "right" ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={props.order.id === row.id}
                                        direction={props.order.direction}
                                        onClick={createSortHandler(row.id)}
                                    >
                                        {row.label}
                                    </TableSortLabel>
                                </Tooltip>
                            )}
                        </TableCell>
                    );
                }, this)}
            </TableRow>
        </TableHead>
    );
}

export default ListingsTableHead;
