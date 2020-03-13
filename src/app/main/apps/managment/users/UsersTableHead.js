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
    id: 'avatar',
    align: 'left',
    disablePadding: true,
    label: '',
    sort: false
  },
  {
    id: 'id',
    ref: 'profile>profileId',
    align: 'left',
    disablePadding: false,
    label: 'Profile ID',
    sort: true
  },
  {
    id: 'firstName',
    ref: 'profile>firstName',
    align: 'left',
    disablePadding: false,
    label: 'First name',
    sort: true
  },
  {
    id: 'lastName',
    ref: 'profile>lastName',
    align: 'left',
    disablePadding: false,
    label: 'Last name',
    sort: true
  },

  {
    id: 'email',
    ref: 'email',
    align: 'left',
    disablePadding: false,
    label: 'Email',
    sort: true
  },

  {
    id: 'phoneNumber',
    ref: 'user>profile>phoneNumber',
    align: 'left',
    disablePadding: false,
    label: 'Phone',
    sort: true
  },
  {
    id: 'createdAt',
    ref: 'user>profile>createdAt',
    align: 'left',
    disablePadding: false,
    label: 'Created At',
    sort: true
  },
  {
    id: 'voucherCode',
    ref: 'voucherCode',
    align: 'left',
    disablePadding: false,
    label: 'Voucher',
    sort: true
  },
  {
    id: 'status',
    ref: 'userBanStatus',
    align: 'left',
    disablePadding: false,
    label: 'Status',
    sort: true
  },
  {
    id: 'role',
    ref: 'role',
    align: 'left',
    disablePadding: false,
    label: 'Type',
    sort: true
  },
  {
    id: 'provider',
    ref: 'provider',
    align: 'left',
    disablePadding: false,
    label: 'Provider',
    sort: true
  },
  {
    id: 'emailConfirmed',
    ref: 'emailConfirmed',
    align: 'center',
    disablePadding: false,
    label: 'Email Confirmed',
    sort: false
  }
];

function UsersTableHead(props) {
  const dispatch = useDispatch();
  const createSortHandler = (property) => (event) => {
    props.onRequestSort(event, property);
  };

  var filter = window.location.search.substring(1);

  filter = filter.split("=");

  useEffect(() => {
    if (filter.length == 2) {
      dispatch(Actions.setUsersSearchValues(filter[0], filter[1]))
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
              {row.sort ? (
                <>
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
                <Input
                  placeholder="Filter"
                  style={{font: 'caption'}}
                  disableUnderline
                  fullWidth
                  onChange={ev => dispatch(Actions.setUsersSearchValues(row.ref, ev.target.value))}
                />
                </>
              ): row.label}
            </TableCell>
          );
        }, this)}
      </TableRow>
    </TableHead>
  );
}

export default UsersTableHead;
