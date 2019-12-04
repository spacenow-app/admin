import React from 'react';

import {
  TableHead,
  TableSortLabel,
  TableCell,
  TableRow,
  Tooltip
} from '@material-ui/core';

const rows = [
  {
    id: 'code',
    align: 'left',
    disablePadding: false,
    label: 'Code',
    sort: true
  },
  {
    id: 'type',
    align: 'left',
    disablePadding: false,
    label: 'Type',
    sort: true
  },
  {
    id: 'value',
    align: 'left',
    disablePadding: false,
    label: 'Value',
    sort: true
  },
  {
    id: 'usageCount',
    align: 'left',
    disablePadding: false,
    label: 'Usage Count',
    sort: true
  },

  {
    id: 'usageLimit',
    align: 'left',
    disablePadding: false,
    label: 'Usage Limit',
    sort: true
  },

  {
    id: 'expireAt',
    align: 'left',
    disablePadding: false,
    label: 'Expire At',
    sort: true
  },
  {
    id: 'status',
    align: 'left',
    disablePadding: false,
    label: 'Status',
    sort: true
  }
];

function VouchersTableHead(props) {
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
            </TableCell>
          );
        }, this)}
      </TableRow>
    </TableHead>
  );
}

export default VouchersTableHead;
