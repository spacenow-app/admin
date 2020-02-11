/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react';
import {
  Avatar,
  FormControl,
  Icon,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
  Tooltip
} from '@material-ui/core';
import moment from 'moment';
import { SpacenowScrollbars, SpacenowUtils } from '@spacenow';
import { withRouter } from 'react-router-dom';
import _ from '@lodash';
import UsersTableHead from './UsersTableHead';
import * as Actions from '../store/actions';
import { useDispatch, useSelector } from 'react-redux';

function UsersTable(props) {
  const dispatch = useDispatch();

  const users = useSelector(({ managment }) => managment.users.data);
  const searchText = useSelector(({ managment }) => managment.users.searchText);

  const [selected] = useState([]);
  const [data, setData] = useState(users);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState({ direction: 'asc', id: null });
  const [confirmUserBan, setConfirmUserBan] = useState({
    open: false,
    user: {},
    status: 0,
    msg: '',
    warning: ''
  });
  const [confirmRemovingVoucher, setConfirmRemovingVoucher] = useState({
    open: false,
    user: {}
  });
  const [defineNewVoucher, setDefineNewVoucher] = useState({
    open: false,
    user: {},
    voucherCode: null
  });

  useEffect(() => {
    dispatch(Actions.getUsers());
  }, [dispatch]);

  useEffect(() => {
    setData(
      searchText.length === 0
        ? users
        : SpacenowUtils.filterArrayByString(users, searchText)
    );
  }, [users, searchText]);

  function handleRequestSort(event, property) {
    const id = property;
    let direction = 'desc';
    if (order.id === property && order.direction === 'desc') {
      direction = 'asc';
    }
    setOrder({ direction, id });
  }

  function handleChangePage(event, page) {
    setPage(page);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
  }

  function handleChangeUserData(event, item) {
    dispatch(
      Actions.updateUser({ ...item, [event.target.name]: event.target.value })
    );
  }

  function handleToBanOrActiveUser(e, user) {
    e.preventDefault();
    if (user.userBanStatus === e.target.value) return;
    let msgOne = `Do you confirm the activation of the user ${user.email}?`;
    let msgWarn = `All listings of this user will be activate but not published.`;
    if (e.target.value == 1) {
      msgOne = `Are you sure you want to ban the user ${user.email}?`;
      msgWarn = `All listing of this user will be disabled as well.`;
    }
    setConfirmUserBan({
      open: true,
      user: user,
      status: e.target.value,
      msg: msgOne,
      warning: msgWarn
    });
  }

  function handleConfirmUserBanUpdate() {
    dispatch(
      Actions.updateUser({
        ...confirmUserBan.user,
        userBanStatus: confirmUserBan.status
      })
    );
    setConfirmUserBan({ open: false, user: {} });
  }

  function handleRemoveVoucher(user) {
    setConfirmRemovingVoucher({ open: true, user });
  }

  function handleConfirmRemoveVoucher() {
    dispatch(
      Actions.updateUser({
        ...confirmRemovingVoucher.user,
        voucherCode: null
      })
    );
    setConfirmRemovingVoucher({ open: false, user: {} });
  }

  function handleAddNewVoucher(user) {
    setDefineNewVoucher({ open: true, voucherCode: null, user });
  }

  const handleValue = (event) => {
    setDefineNewVoucher((o) => {
      return { ...o, voucherCode: event.target.value };
    });
    event.persist();
  };

  function handleConfirmAddVoucher() {
    dispatch(
      Actions.updateUser({
        ...defineNewVoucher.user,
        voucherCode: defineNewVoucher.voucherCode
      })
    );
    setDefineNewVoucher({ open: false, voucherCode: null, user: {} });
  }

  return (
    <>
      {/* Dialog to confirm activation/ban */}
      <Dialog
        open={confirmUserBan.open}
        onClose={() => setConfirmUserBan({ open: false, user: {} })}
        aria-labelledby='form-dialog-title'
        fullWidth
      >
        <DialogTitle id='form-dialog-title'>
          {confirmUserBan.user.email}
        </DialogTitle>
        <DialogContent fullWidth>
          <DialogContentText id='form-dialog-title'>
            {confirmUserBan.msg}
            <br />
            {confirmUserBan.warning}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setConfirmUserBan({ open: false, user: {} })}
            variant='outlined'
            color='default'
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmUserBanUpdate}
            variant='outlined'
            color='default'
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      {/* Dialog to confirm remove a voucher */}
      <Dialog
        open={confirmRemovingVoucher.open}
        onClose={() => setConfirmRemovingVoucher({ open: false, user: {} })}
        aria-labelledby='form-dialog-title'
        fullWidth
      >
        <DialogTitle id='form-dialog-title'>
          {confirmRemovingVoucher.user.email}
        </DialogTitle>
        <DialogContent fullWidth>
          <DialogContentText id='form-dialog-title'>
            {`Do you confirm to remove this voucher?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setConfirmRemovingVoucher({ open: false, user: {} })}
            variant='outlined'
            color='default'
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmRemoveVoucher}
            variant='outlined'
            color='default'
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      {/* Dialog to add a new voucher */}
      <Dialog
        open={defineNewVoucher.open}
        onClose={() => setDefineNewVoucher({ open: false, user: {} })}
        aria-labelledby='form-dialog-title'
        fullWidth
      >
        <DialogTitle id='form-dialog-title'>
          {defineNewVoucher.user.email}
        </DialogTitle>
        <DialogContent fullWidth>
          <DialogContentText id='form-dialog-title'>
            {`Adding a new Voucher`}
          </DialogContentText>
          <FormControl fullWidth>
            <TextField
              margin='dense'
              id='voucherCode'
              label='Voucher Code'
              type='text'
              value={defineNewVoucher.voucherCode}
              onChange={handleValue}
              fullWidth
              InputLabelProps={{ shrink: true }}
              autoFocus
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDefineNewVoucher({ open: false, user: {} })}
            variant='outlined'
            color='default'
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmAddVoucher}
            variant='outlined'
            color='default'
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      {/* Users */}
      <div className='w-full flex flex-col table-wrapper'>
        <SpacenowScrollbars className='flex-grow overflow-x-auto'>
          <Table className='min-w-xl' aria-labelledby='tableTitle'>
            <UsersTableHead
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
                      <TableCell className='w-48 px-2 sm:px-8'>
                        {n.profile && n.profile.picture ? (
                          <Avatar src={n.profile.picture} />
                        ) : (
                          <Avatar src='assets/images/avatars/spacenow.svg' />
                        )}
                      </TableCell>
                      <TableCell component='th' scope='row'>
                        {n.profile && n.profile.profileId}
                      </TableCell>
                      <TableCell component='th' scope='row'>
                        {n.profile && n.profile.firstName}
                      </TableCell>
                      <TableCell component='th' scope='row'>
                        {n.profile && n.profile.lastName}
                      </TableCell>
                      <TableCell component='th' scope='row'>
                        {n.email}
                      </TableCell>
                      <TableCell component='th' scope='row'>
                        {n.profile && n.profile.phoneNumber}
                      </TableCell>
                      <TableCell component='th' scope='row'>
                        {n.profile &&
                          moment(n.profile.createdAt).format('DD/MM/YYYY')}
                      </TableCell>
                      <TableCell component='th' scope='row'>
                        {n.voucherCode ? (
                          <Tooltip title='Click to remove'>
                            <Button
                              size='small'
                              variant='outlined'
                              color='inherit'
                              onClick={() => handleRemoveVoucher(n)}
                            >
                              {n.voucherCode}
                            </Button>
                          </Tooltip>
                        ) : (
                          <Button
                            size='small'
                            variant='outlined'
                            color='secondary'
                            onClick={() => handleAddNewVoucher(n)}
                          >
                            Add
                          </Button>
                        )}
                      </TableCell>
                      <TableCell component='th' scope='row'>
                        <FormControl>
                          <Select
                            value={n.userBanStatus}
                            name='userBanStatus'
                            className='w-full'
                            onChange={(event) =>
                              handleToBanOrActiveUser(event, n)
                            }
                          >
                            <MenuItem value={0}>Active</MenuItem>
                            <MenuItem value={1}>Banned</MenuItem>
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell component='th' scope='row'>
                        <FormControl>
                          <Select
                            value={n.role}
                            name='role'
                            className='w-full'
                            onChange={(event) =>
                              handleChangeUserData(event, n)
                            }
                          >
                            <MenuItem value={'user'}>User</MenuItem>
                            <MenuItem value={'host'}>Host</MenuItem>
                            <MenuItem value={'admin'}>Admin</MenuItem>
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell component='th' scope='row'>
                        <FormControl>
                          <Select
                            value={n.provider}
                            name='provider'
                            className='w-full'
                            onChange={(event) => handleChangeUserData(event, n)}
                          >
                            <MenuItem value=''>
                              <em>Select</em>
                            </MenuItem>
                            <MenuItem value={'wework'}>WeWork</MenuItem>
                            <MenuItem value={'spacenow'}>Spacenow</MenuItem>
                            <MenuItem value={'generic'}>Generic</MenuItem>
                            <MenuItem value={'external'}>External</MenuItem>
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell component='th' scope='row' align='center'>
                        {n.userVerifiedInfo.isEmailConfirmed ? (
                          <Icon className='text-green text-20'>
                            check_circle
                          </Icon>
                        ) : (
                          <Icon className='text-red text-20'>
                            remove_circle
                          </Icon>
                        )}
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
}

export default withRouter(UsersTable);
