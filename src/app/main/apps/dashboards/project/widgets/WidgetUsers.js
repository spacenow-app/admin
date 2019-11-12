import React, { useState } from 'react';
import { Icon, Typography, Select, Paper, IconButton, Menu, MenuList, MenuItem, ListItemText } from '@material-ui/core';

function WidgetUsers(props) {

    const [currentUser, setCurrentUser] = useState({
        key: 'count',
        value: 'Users'
    });
    const [selectedUserMenu, setSelectedUserMenu] = useState(null);

    function handleCurrentUser(key, value)
    {
        setCurrentUser({
            key,
            value
        })
    }

    function openSelectedUserMenu(event) {
        setSelectedUserMenu(event.currentTarget);
    }

    function closeSelectedUserMenu() {
        setSelectedUserMenu(null);
    }

    if (props.widget.isLoading)
        return null
    return (
        props.widget.data &&
        <Paper className="w-full rounded-8 shadow-none border-1">
            <div className="flex items-center justify-between pr-4 pl-16 pt-4">
                <Select
                    native
                    onChange={(ev) => props.handleChangeRange(ev.target.value)}
                    disableUnderline={true}
                >
                    <option key={0} value={null}>All</option>
                    <option key={1} value={1}>Day</option>
                    <option key={2} value={7}>Week</option>
                    <option key={3} value={30}>Month</option>
                </Select>

                <IconButton
                    aria-owns={selectedUserMenu ? "selectedUserMenu" : null}
                    aria-haspopup="true"
                    onClick={openSelectedUserMenu}
                >
                    <Icon>more_vert</Icon>
                </IconButton>
                <Menu
                    id="selectedUserMenu"
                    anchorEl={selectedUserMenu}
                    open={Boolean(selectedUserMenu)}
                    onClose={closeSelectedUserMenu}
                >
                    <MenuList>
                        <MenuItem onClick={() => handleCurrentUser("count", "Users") }>
                            <ListItemText primary="All" />
                        </MenuItem>
                        <MenuItem onClick={() => handleCurrentUser("guests", "Guests") }>
                            <ListItemText primary="Guests" />
                        </MenuItem>
                        <MenuItem onClick={() => handleCurrentUser("hosts", "Hosts") }>
                            <ListItemText primary="Hosts" />
                        </MenuItem>
                    </MenuList>
                </Menu>
            </div>
            <div className="text-center pt-12 pb-28">
                <Typography
                    className="text-72 leading-none text-orange">{props.widget.data[currentUser.key]}</Typography>
                <Typography className="text-16" color="textSecondary">Total {currentUser.value}</Typography>
            </div>
            {/*  <div className="flex items-center px-16 h-52 border-t-1">
                <Typography className="text-15 flex w-full" color="textSecondary">
                    <span className="truncate">{props.widget.data.extra.label}</span>
                    :
                    <b className="pl-8">{props.widget.data.extra.count}</b>
                </Typography>
            </div> */}
        </Paper>
    );
}

export default React.memo(WidgetUsers);
