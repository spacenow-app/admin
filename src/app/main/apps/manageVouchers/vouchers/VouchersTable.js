import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import clsx from 'clsx';

import {
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  KeyboardDatePicker
} from '@material-ui/core';

import _ from '@lodash';
import { SpacenowScrollbars } from '@spacenow';

import VouchersTableHead from './VouchersTableHead';

const MOCK_VOUCHERS = [
  {
    id: '3f25c160-cb70-4526-81f4-e197904344af',
    usageCount: 0,
    status: 'active',
    code: 'SN251959',
    type: 'percentual',
    value: 10,
    usageLimit: 2,
    expireAt: '2019-12-04T13:00:00.000Z',
    updatedAt: '2019-12-04T01:36:18.312Z',
    createdAt: '2019-12-04T01:36:18.312Z'
  },
  {
    id: '3f25c160-cb70-4526-81f4-e197904344af',
    usageCount: 0,
    status: 'disabled',
    code: 'SN123456',
    type: 'value',
    value: 15,
    usageLimit: 1,
    expireAt: '2019-12-04T13:00:00.000Z',
    updatedAt: '2019-12-04T01:36:18.312Z',
    createdAt: '2019-12-04T01:36:18.312Z'
  }
];

const statusMap = {
  active: {
    name: 'Active',
    color: 'bg-green text-white'
  },
  disabled: {
    name: 'Disabled',
    color: 'bg-red text-white'
  }
};

const VouchersTable = () => {
  const dispatch = useDispatch();

  const data = useSelector(
    ({ manageVouchers }) => manageVouchers.data || MOCK_VOUCHERS
  );

  const [page, setPage] = useState(0);
  const [dialog, setDialog] = useState({ isOpen: false, object: null });
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState({ direction: 'asc', id: null });
  const [selected, setSelected] = useState([]);

  const handleChangePage = (event, page) => {
    setPage(page);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
  };

  const handleRequestSort = (event, property) => {
    const id = property;
    let direction = 'desc';
    if (order.id === property && order.direction === 'desc') {
      direction = 'asc';
    }
    setOrder({ direction, id });
  };

  const statusContainer = (status) => {
    const statusItem = statusMap[status];
    return (
      <div
        className={clsx(
          'inline text-12 p-4 rounded truncate',
          statusItem.color
        )}
      >
        {statusItem.name}
      </div>
    );
  };

  const handleOpen = (voucherObj) => {
    setDialog({ isOpen: true, object: voucherObj });
  };

  const handleClose = () => {
    setDialog({ isOpen: false, object: null });
  };

  return (
    <>
      <Dialog
        open={dialog.isOpen}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>{`Voucher ${dialog.object &&
          dialog.object.code}`}</DialogTitle>
        <DialogContent>
          <InputLabel id='select-type'>Type</InputLabel>
          <Select labelId='select-type' id='select-type' fullWidth>
            <MenuItem value={'percentual'}>Percentual</MenuItem>
            <MenuItem value={'zerofee'}>Zero Fee</MenuItem>
            <MenuItem value={'value'}>Value</MenuItem>
          </Select>
          <TextField
            margin='dense'
            id='value'
            label='Value'
            type='number'
            fullWidth
          />
          <TextField
            margin='dense'
            id='limit'
            label='Limit'
            type='number'
            fullWidth
          />
          <TextField
            margin='dense'
            id='expireAt'
            label='Expire At'
            type='date'
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleClose} color='primary'>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <div className='w-full flex flex-col'>
        <SpacenowScrollbars className='flex-grow overflow-x-auto'>
          <Table className='min-w-xl' aria-labelledby='tableTitle'>
            <VouchersTableHead
              numSelected={selected.length}
              order={order}
              onRequestSort={handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {_.orderBy(
                data,
                [
                  (o) => {
                    switch (order.id) {
                      case 'id': {
                        return o.id[0];
                      }
                      default: {
                        return o[order.id];
                      }
                    }
                  }
                ],
                [order.direction]
              )
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((n) => {
                  const isSelected = selected.indexOf(n.id) !== -1;
                  return (
                    <TableRow
                      className='h-64 cursor-pointer'
                      hover
                      role='checkbox'
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      selected={isSelected}
                    >
                      <TableCell component='th' scope='row'>
                        {n.code}
                      </TableCell>
                      <TableCell component='th' scope='row'>
                        {n.type}
                      </TableCell>
                      <TableCell component='th' scope='row'>
                        {n.value}
                      </TableCell>
                      <TableCell component='th' scope='row'>
                        {n.usageCount}
                      </TableCell>
                      <TableCell component='th' scope='row'>
                        {n.usageLimit}
                      </TableCell>
                      <TableCell component='th' scope='row'>
                        {moment(n.expireAt).format('DD/MM/YYYY')}
                      </TableCell>
                      <TableCell component='th' scope='row'>
                        {statusContainer(n.status)}
                      </TableCell>
                      <TableCell component='th' scope='row'>
                        <Button
                          size='small'
                          variant='text'
                          color='primary'
                          onClick={() => handleOpen(n)}
                        >
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </SpacenowScrollbars>
        <TablePagination
          component='div'
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page'
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page'
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </div>
    </>
  );
};

export default withRouter(VouchersTable);
