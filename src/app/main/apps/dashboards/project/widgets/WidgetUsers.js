import React from 'react';
import { Typography, Select, Paper, Link } from '@material-ui/core';
import { ManagmentConfig } from "../../../managment/ManagmentConfig";

function WidgetUsers(props) {

    ////Used only if menu to select between users/guests/hosts
    // const [currentUser, setCurrentUser] = useState({
    //     key: 'count',
    //     value: 'Users'
    // });
    // const [selectedUserMenu, setSelectedUserMenu] = useState(null);

    // function handleCurrentUser(key, value)
    // {
    //     setCurrentUser({
    //         key,
    //         value
    //     })
    // }

    // function openSelectedUserMenu(event) {
    //     setSelectedUserMenu(event.currentTarget);
    // }

    // function closeSelectedUserMenu() {
    //     setSelectedUserMenu(null);
    // }

    function handleClickLink(q) {
        window.location = ManagmentConfig.routes[0].path + '?' + q;
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

                {/* <IconButton
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
                </Menu> */}
            </div>
            <div className="text-center pt-12 pb-28 hover:text-blue text-orange cursor-pointer" onClick={ () => handleClickLink() } >
                <Typography
                    className="text-72 leading-none">{props.widget.data.count}</Typography>
                <Typography className="text-16" color="textSecondary">Total Users</Typography>

            </div>
            <div className="flex items-center justify-between p-16 cursor-pointer">
                <Typography className="text-16 hover:text-blue" onClick={ () => handleClickLink("role=host") } color="textSecondary">Hosts: {props.widget.data.hosts}</Typography>
                <Typography className="text-16 hover:text-blue" onClick={ () => handleClickLink("role=guest") } color="textSecondary">Guests: {props.widget.data.guests}</Typography>
            </div>
        </Paper>
    );
}

export default React.memo(WidgetUsers);
