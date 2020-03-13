import React from 'react';
import { Typography, Select, Paper, Link } from '@material-ui/core';
import { ManageBookingsConfig } from '../../../manageBookings/ManageBookingsConfig';


function WidgetBookings(props) {

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
            </div>
            <Link underline="none" href={ManageBookingsConfig.routes[0].path} className="hover:text-blue text-orange">
            <div className="text-center pt-12 pb-28">
                <Typography
                    className="text-72 leading-none">{props.widget.data.count.all}</Typography>
                <Typography className="text-16" color="textSecondary">Total Bookings</Typography>
            </div>
            <div className="flex items-center justify-between p-16">
                <Typography className="text-16" color="textSecondary">Approved: {props.widget.data.count.approved}</Typography>
                <Typography className="text-16" color="textSecondary">Completed: {props.widget.data.count.completed}</Typography>
                <Typography className="text-16" color="textSecondary">Cancelled: {props.widget.data.count.cancelled}</Typography>
            </div>
            </Link>
        </Paper>
    );
}

export default React.memo(WidgetBookings);
