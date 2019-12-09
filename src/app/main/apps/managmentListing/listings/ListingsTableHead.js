import React, { useState } from 'react';
import {
  TableHead,
  TableSortLabel,
  TableCell,
  TableRow,
  Tooltip
} from '@material-ui/core';

import { makeStyles } from '@material-ui/styles';

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
    id: 'ownerEmail',
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

const useStyles = makeStyles((theme) => ({
  actionsButtonWrapper: {
    background: theme.palette.background.paper
  }
}));

function ListingsTableHead(props) {
  const classes = useStyles(props);

  const [selectedUsersMenu, setSelectedUsersMenu] = useState(null);

  const createSortHandler = (property) => (event) => {
    props.onRequestSort(event, property);
  };

  function openSelectedUsersMenu(event) {
    setSelectedUsersMenu(event.currentTarget);
  }

  function closeSelectedUsersMenu() {
    setSelectedUsersMenu(null);
  }

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
            </TableCell>
          );
        }, this)}
      </TableRow>
    </TableHead>
  );
}

export default ListingsTableHead;
