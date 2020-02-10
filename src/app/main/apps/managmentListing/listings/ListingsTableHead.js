import React from 'react';

import {
  TableHead,
  TableSortLabel,
  TableCell,
  TableRow,
  Tooltip,
  Input
} from '@material-ui/core';
import { useDispatch } from "react-redux";
import * as Actions from "../store/actions";

const rows = [
  {
    id: 'id',
    align: 'left',
    disablePadding: false,
    label: 'ID',
    sort: true
  },
  {
    id: 'title',
    align: 'left',
    disablePadding: false,
    label: 'Title',
    sort: true
  },
  {
    id: 'status',
    align: 'left',
    disablePadding: false,
    label: 'Status',
    sort: true
  },
  {
    id: 'ownerName',
    align: 'left',
    disablePadding: false,
    label: 'Owner',
    sort: true
  },
  {
    id: 'user',
    align: 'left',
    disablePadding: false,
    label: 'Owner Email',
    sort: true
  },
  {
    id: 'city',
    align: 'left',
    disablePadding: false,
    label: 'City',
    sort: true
  },
  {
    id: 'state',
    align: 'left',
    disablePadding: false,
    label: 'State',
    sort: true
  },
  {
    id: 'country',
    align: 'left',
    disablePadding: false,
    label: 'Country',
    sort: true
  },
  {
    id: 'createdDate',
    align: 'left',
    disablePadding: false,
    label: 'Created At',
    sort: true
  },
  {
    id: 'ready',
    align: 'left',
    disablePadding: false,
    label: 'Ready',
    sort: true
  },
  {
    id: 'publish',
    align: 'left',
    disablePadding: false,
    label: 'Publish',
    sort: true
  }
];

function ListingsTableHead(props) {
  const dispatch = useDispatch();
  const createSortHandler = (property) => (event) => {
    props.onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow className='h-64'>
        {rows.map((row) => {
          return (
            <TableCell
              key={row.id}
              align={row.align}
              padding={row.disablePadding ? 'none' : 'default'}
              sortDirection={
                props.order.id === row.id ? props.order.direction : false
              }
            >
              {row.sort && (
                <Tooltip
                  title='Sort'
                  placement={
                    row.align === 'right' ? 'bottom-end' : 'bottom-start'
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
              <Input
                placeholder="Filter"
                style={{font: 'caption'}}
                disableUnderline
                fullWidth
                onChange={ev => dispatch(Actions.setListingsSearchValues(row.id, ev.target.value))}
              />
            </TableCell>
          );
        }, this)}
      </TableRow>
    </TableHead>
  );
}

export default ListingsTableHead;
