import React, { useState } from 'react';
import { Icon, Typography, Select, Paper, IconButton, Menu, MenuList, MenuItem, ListItemText, Link } from '@material-ui/core';
import { ManagmentListingConfig } from '../../../managmentListing/ManagmentListingConfig';

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
                    onChange={(ev) => _setCategoryDay(currentCategoryDay.category, ev.target.value)}
                    disableUnderline={true}
                >
                    <option key={0} value={10000}>All</option>
                    <option key={1} value={1}>Day</option>
                    <option key={2} value={7}>Week</option>
                    <option key={3} value={30}>Month</option>
                </Select>
                <IconButton
                    aria-owns={selectedCategoryMenu ? "selectedCategoryMenu" : null}
                    aria-haspopup="true"
                    onClick={openSelectedCategoryMenu}
                    className="p-0"
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
                        <MenuItem onClick={() => _setCategoryDay(null, currentCategoryDay.days)}>
                            <ListItemText primary="All" />
                        </MenuItem>
                        {
                            props.categories && props.categories.data.map((category) => (
                                category.subCategories.map((item) =>
                                    <MenuItem key={item.id} onClick={() => _setCategoryDay(item.id, currentCategoryDay.days)}>
                                        <ListItemText primary={`${category.itemName} -> ${item.subCategory && item.subCategory.itemName}`} />
                                    </MenuItem>
                                )
                            ))
                        }
                    </MenuList>
                </Menu>
            </div>
            <Link underline="none" href={ManagmentListingConfig.routes[1].path} className="hover:text-blue text-orange">
            <div className="text-center pt-12 pb-28">
                <Typography
                    className="text-72 leading-none">{props.widget.data.count.all}</Typography>
                <Typography className="text-16" color="textSecondary">Total Listings </Typography>
            </div>
            <div className="flex items-center justify-between p-16">
                <Typography className="text-16" color="textSecondary">Actives: {props.widget.data.count.active}</Typography>
                <Typography className="text-16" color="textSecondary">Published: {props.widget.data.count.published}</Typography>
                <Typography className="text-16" color="textSecondary">Deleted: {props.widget.data.count.deleted}</Typography>
            </div>
            </Link>
        </Paper>
    );
}

export default React.memo(WidgetListings);
