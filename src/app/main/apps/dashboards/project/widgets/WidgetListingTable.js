import React from 'react';
import { Table, TableHead, TableCell, TableRow, Typography, Paper, TableBody } from '@material-ui/core';

function Widget10(props) {
    return (
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
                        {/* {props.rows.map(row => (
                            <TableRow key={row.id}>
                                {row.cells.map(cell => (
                                    <TableCell key={cell.id} component="th" scope="row">
                                        <Typography className={cell.classes}>
                                            {cell.value}
                                        </Typography>
                                    </TableCell>
                                )
                                )}
                            </TableRow>
                        ))} */}
                    </TableBody>
                </Table>
            </div>
        </Paper>
    );
}

export default React.memo(Widget10);
