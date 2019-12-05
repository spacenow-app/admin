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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core';

import _ from '@lodash';
import { SpacenowScrollbars } from '@spacenow';

import VouchersTableHead from './VouchersTableHead';

import * as Actions from '../store/actions';

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

  const { data } = useSelector(({ manageVouchers }) => manageVouchers.reducer);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState({ direction: 'asc', id: null });
  const [selected] = useState([]);
  const [confirmDisable, setConfirmDisable] = useState(false);
  const [voucherCode, setVoucherCode] = useState('');

  useEffect(() => {
    dispatch(Actions.listVouchers());
  }, [dispatch]);

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

  const handleDisableVoucher = (code) => {
    setVoucherCode(code);
    setConfirmDisable(true);
  };

  const handleDisableClose = () => setConfirmDisable(false);

  const handleDisableConfirm = () => {
    dispatch(Actions.desactiveVoucher(voucherCode)).then(
      setConfirmDisable(false)
    );
  };

  return (
    <>
      {/* Confirming a voucher to disable */}
      <Dialog
        open={confirmDisable}
        onClose={handleDisableClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'Disable Voucher?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {`Would you like to disable Voucher ${voucherCode}?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDisableClose} color='primary'>
            No
          </Button>
          <Button onClick={handleDisableConfirm} color='primary'>
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Vouchers table */}
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
                          variant='outlined'
                          color='secondary'
                          onClick={() => handleDisableVoucher(n.code)}
                          disabled={n.status === 'disabled'}
                        >
                          Disable
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
