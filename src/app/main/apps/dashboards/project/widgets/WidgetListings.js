import React, { useState } from 'react';
import { Icon, Typography, Select, Paper, IconButton, Menu, MenuList, MenuItem, ListItemText } from '@material-ui/core';

function WidgetListings(props) {

    const [selectedCategoryMenu, setSelectedCategoryMenu] = useState(null);
    const [currentCategoryDay, setCurrentCategoryDay] = useState({
        days: 10000,
        category: null
    });

    function openSelectedCategoryMenu(event) {
        setSelectedCategoryMenu(event.currentTarget);
    }

    function closeSelectedCategoryMenu() {
        setSelectedCategoryMenu(null);
    }

    function _setCategoryDay(category, days) {
        setCurrentCategoryDay({ category, days })
        props.handleChangeRange({ category, days })
        closeSelectedCategoryMenu()
    }

    if (props.widget.isLoading || props.categories.isLoading)
        return null
    return (
        props.widget.data && props.categories.data &&
        <Paper className="w-full rounded-8 shadow-none border-1">
            <div className="flex items-center justify-between pr-4 pl-16 pt-4">
                <Select
                    native
                    onChange={(ev) =>  _setCategoryDay(currentCategoryDay.category, ev.target.value)}
                    disableUnderline={true}
                >
                    <option key={0} value={null}>All</option>
                    <option key={1} value={1}>Day</option>
                    <option key={2} value={7}>Week</option>
                    <option key={3} value={30}>Month</option>
                </Select>
                <IconButton
                    aria-owns={selectedCategoryMenu ? "selectedCategoryMenu" : null}
                    aria-haspopup="true"
                    onClick={openSelectedCategoryMenu}
                >
                    <Icon>more_vert</Icon>
                </IconButton>
                <Menu
                    id="selectedCategoryMenu"
                    anchorEl={selectedCategoryMenu}
                    open={Boolean(selectedCategoryMenu)}
                    onClose={closeSelectedCategoryMenu}
                >
                    <MenuList>
                        <MenuItem onClick={() => _setCategoryDay(null, currentCategoryDay.days) }>
                            <ListItemText primary="All" />
                        </MenuItem>
                        {
                            props.categories && props.categories.data.map((category) => (
                                category.subCategories.map((subcategory, index) => (
                                    <MenuItem key={index} onClick={() => _setCategoryDay(currentCategoryDay.days, subcategory.listSettingsParentId)}>
                                        <ListItemText primary={`${category.itemName} -> ${subcategory.itemName}`} />
                                    </MenuItem>
                                ))
                            ))
                        }
                    </MenuList>
                </Menu>
            </div>
            <div className="text-center pt-12 pb-28">
                <Typography
                    className="text-72 leading-none text-orange">{props.widget.data.count}</Typography>
                <Typography className="text-16" color="textSecondary">Total Listings </Typography>
            </div>
        </Paper>
    );
}

export default React.memo(WidgetListings);