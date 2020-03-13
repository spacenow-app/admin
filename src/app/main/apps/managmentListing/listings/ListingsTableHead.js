import React, { useEffect } from 'react';

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
    ref: 'id',
    align: 'left',
    disablePadding: false,
    label: 'ID',
    sort: true
  },
  {
    id: 'title',
    ref: 'title',
    align: 'left',
    disablePadding: false,
    label: 'Title',
    sort: true
  },
  {
    id: 'status',
    ref: 'status',
    align: 'left',
    disablePadding: false,
    label: 'Status',
    sort: true
  },
  {
    id: 'ownerName',
    ref: 'user>profile>firstName',
    align: 'left',
    disablePadding: false,
    label: 'Owner',
    sort: true
  },
  {
    id: 'user',
    ref: 'user>email',
    align: 'left',
    disablePadding: false,
    label: 'Owner Email',
    sort: true
  },
  {
    id: 'city',
    ref: 'location>city',
    align: 'left',
    disablePadding: false,
    label: 'City',
    sort: true
  },
  {
    id: 'state',
    ref: 'location>state',
    align: 'left',
    disablePadding: false,
    label: 'State',
    sort: true
  },
  {
    id: 'country',
    ref: 'location>country',
    align: 'left',
    disablePadding: false,
    label: 'Country',
    sort: true
  },
  {
    id: 'createdDate',
    ref: 'createdAt',
    align: 'left',
    disablePadding: false,
    label: 'Created At',
    sort: true
  },
  {
    id: 'ready',
    ref: 'isReady',
    align: 'left',
    disablePadding: false,
    label: 'Ready',
    sort: true
  },
  {
    id: 'publish',
    ref: 'isPublished',
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
  var filter = window.location.search.substring(1);

  filter = filter.split("=");

  useEffect(() => {
    if (filter.length == 2) {
      dispatch(Actions.setListingsSearchValues(filter[0], filter[1]))
    }
  }, []);

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
                onChange={ev => dispatch(Actions.setListingsSearchValues(row.ref, ev.target.value))}
              />
            </TableCell>
          );
        }, this)}
      </TableRow>
    </TableHead>
  );
}

export default ListingsTableHead;
