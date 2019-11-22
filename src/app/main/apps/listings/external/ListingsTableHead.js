import React from 'react';
import {TableHead, TableSortLabel, TableCell, TableRow, Tooltip } from '@material-ui/core';

const rows = [
  {
    id: "picture",
    align: "left",
    disablePadding: false,
    label: "",
  },
  {
    id: "title",
    align: "left",
    disablePadding: false,
    label: "Title",
    sort: true
  },
  {
    id: "clicks",
    align: "left",
    disablePadding: false,
    label: "Clicks",
    sort: true
  },
  {
    id: "created",
    align: "left",
    disablePadding: false,
    label: "Created",
    sort: true
  },
];

function ListingsTableHead(props) {

  const createSortHandler = property => event => {
    props.onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow className="h-64">
        {rows.map(row => {
          return (
            <TableCell
              key={row.id}
              align={row.align}
              padding={row.disablePadding ? "none" : "default"}
              sortDirection={
                props.order.id === row.id ? props.order.direction : false
              }
            >
              {row.sort && (
                <Tooltip
                  title="Sort"
                  placement={
                    row.align === "right" ? "bottom-end" : "bottom-start"
                  }
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
