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
    id: 'avatar',
    align: 'left',
    disablePadding: true,
    label: '',
    sort: false
  },
  {
    id: 'id',
    align: 'left',
    disablePadding: false,
    label: 'Profile ID',
    sort: true
  },
  {
    id: 'firstName',
    align: 'left',
    disablePadding: false,
    label: 'First name',
    sort: true
  },
  {
    id: 'lastName',
    align: 'left',
    disablePadding: false,
    label: 'Last name',
    sort: true
  },

  {
    id: 'email',
    align: 'left',
    disablePadding: false,
    label: 'Email',
    sort: true
  },

  {
    id: 'phoneNumber',
    align: 'left',
    disablePadding: false,
    label: 'Phone',
    sort: true
  },
  {
    id: 'createdAt',
    align: 'left',
    disablePadding: false,
    label: 'Created At',
    sort: true
  },
  {
    id: 'voucherCode',
    align: 'left',
    disablePadding: false,
    label: 'Voucher',
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
    id: 'provider',
    align: 'left',
    disablePadding: false,
    label: 'Provider',
    sort: true
  },
  {
    id: 'emailConfirmed',
    align: 'center',
    disablePadding: false,
    label: 'Email Confirmed',
    sort: true
  }
];

function UsersTableHead(props) {
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

export default UsersTableHead;
