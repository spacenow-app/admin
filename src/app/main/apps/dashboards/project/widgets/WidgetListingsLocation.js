import React from 'react';
import { Typography, Select, Paper } from '@material-ui/core';

function WidgetListingsLocation(props) {

    if (props.widget.isLoading || props.categories.isLoading)
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
                    {
                        props.categories.data.map((category) => (
                            <option key={0} value={null}>{category.otherItemName}</option>
                        ))
                    }
                </Select>
            </div>
            <div className="text-center pt-12 pb-28">
                <Typography
                    className="text-72 leading-none text-orange">{props.widget.data.count}</Typography>
                <Typography className="text-16" color="textSecondary">Total Listings Locations</Typography>
            </div>
        </Paper>
    );
}

export default React.memo(WidgetListingsLocation);
