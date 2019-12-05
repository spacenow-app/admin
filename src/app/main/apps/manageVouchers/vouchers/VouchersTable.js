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
    id: '1',
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
    id: '2',
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

  const data = useSelector(({ manageVouchers }) => manageVouchers.data || MOCK_VOUCHERS);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState({ direction: 'asc', id: null });
  const [selected, setSelected] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [voucherObj, setVoucherObj] = useState({ code: '', type: 'percentual', value: 0, usageLimit: 1, expireAt: new Date() });

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
      <div className={clsx('inline text-12 p-4 rounded truncate', statusItem.color)}>
        {statusItem.name}
      </div>
    );
  };

  const handleOpen = (voucher) => {
    setVoucherObj(voucher)
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleConfirm = () => {
    console.log('Voucher: ', voucherObj)
    setOpenDialog(false);
  };

  const handleType = (event) => {
    setVoucherObj((o) => {
      return { ...o, type: event.target.value };
    });
    event.persist();
  };

  const handleValue = (event) => {
    setVoucherObj((o) => {
      return { ...o, value: event.target.value };
    });
    event.persist();
  };

  const handleLimit = (event) => {
    setVoucherObj((o) => {
      return { ...o, usageLimit: event.target.value };
    });
    event.persist();
  };

  const handleExpire = (event) => {
    setVoucherObj((o) => {
      return { ...o, expireAt: event.target.value };
    });
    event.persist();
  };

  return (
    <>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Voucher</DialogTitle>
        <DialogContent>
          <FormControl>
            <InputLabel id='select-type'>Type</InputLabel>
            <Select id='select-type' value={voucherObj.type} onChange={handleType} fullWidth>
              <MenuItem value={'percentual'}>Percentual</MenuItem>
              <MenuItem value={'zerofee'}>Zero Fee</MenuItem>
              <MenuItem value={'value'}>Value</MenuItem>
            </Select>
            <TextField
              margin='dense'
              id='value'
              label='Value'
              type='number'
              value={voucherObj.value}
              onChange={handleValue}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              margin='dense'
              id='limit'
              label='Limit (Usage Count)'
              type='number'
              value={voucherObj.usageLimit}
              onChange={handleLimit}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              margin='dense'
              id='expireAt'
              label='Expire At'
              type='date'
              value={voucherObj.expireAt}
              onChange={handleExpire}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleConfirm} color='primary'>
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
