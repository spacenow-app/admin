import React from 'react';
import { Table, TableHead, TableCell, TableRow, Typography, Paper, TableBody } from '@material-ui/core';

function Widget10(props) {

    if (props.widget.isLoading)
        return null

    return (
        props.widget.data &&
        <Paper className="w-full rounded-8 shadow-none border-1">
            <div className="flex items-center justify-between px-16 h-64 border-b-1">
                <Typography className="text-16">{props.title}</Typography>
            </div>
            <div className="table-responsive">
                <Table className="w-full min-w-full">
                    <TableHead>
                        <TableRow>
                            {props.columns.map(column => (
                                <TableCell key={column.id} className="whitespace-no-wrap">
                                    {column.title}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.widget.data.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row">
                                    <Typography>
                                        {row.state}
                                    </Typography>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <Typography>
                                        {row.count.all}
                                    </Typography>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <Typography>
                                        {row.count.active}
                                    </Typography>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <Typography>
                                        {row.count.deleted}
                                    </Typography>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <Typography>
                                        {row.count.published}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </Paper>
    );
}

export default React.memo(Widget10);
