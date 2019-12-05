import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import * as Actions from '../store/actions';

import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Icon,
  Typography
} from '@material-ui/core';

import { SpacenowAnimate } from '@spacenow';

const VOUCHER_INIT = {
  code: '',
  type: 'percentual',
  value: 0,
  usageLimit: 1,
  expireAt: new Date()
};

function Header() {
  const dispatch = useDispatch();

  const [openDialog, setOpenDialog] = useState(false);
  const [voucherObj, setVoucherObj] = useState(VOUCHER_INIT);

  const reset = () => setVoucherObj(VOUCHER_INIT);

  const handleOpen = () => {
    reset();
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleConfirm = () => {
    dispatch(Actions.createVoucher(voucherObj)).then(setOpenDialog(false));
  };

  const handleType = (event) => {
    setVoucherObj((o) => {
      return { ...o, type: event.target.value };
    });
    event.persist();
  };

  const handleValue = (event) => {
    setVoucherObj((o) => {
      return { ...o, value: parseFloat(event.target.value, 10) };
    });
    event.persist();
  };

  const handleLimit = (event) => {
    setVoucherObj((o) => {
      return { ...o, usageLimit: parseInt(event.target.value, 10) };
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
      {/* Dialog to create a new voucher */}
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
        fullWidth
      >
        <DialogTitle id='form-dialog-title'>Voucher</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <InputLabel id='select-type'>Type</InputLabel>
            <Select
              id='select-type'
              value={voucherObj.type}
              onChange={handleType}
              fullWidth
            >
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
          <Button onClick={handleClose} variant='outlined' color='default'>
            Cancel
          </Button>
          <Button onClick={handleConfirm} variant='outlined' color='default'>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Vouchers module head */}
      <div className='flex flex-1 w-full items-center justify-between'>
        <div className='flex items-center'>
          <SpacenowAnimate animation='transition.expandIn' delay={300}>
            <Icon className='text-32 mr-0 sm:mr-12'>credit_card</Icon>
          </SpacenowAnimate>
          <SpacenowAnimate animation='transition.slideLeftIn' delay={300}>
            <Typography className='hidden sm:flex' variant='h6'>
              Vouchers
            </Typography>
          </SpacenowAnimate>
        </div>
        <Button
          size='small'
          variant='contained'
          color='default'
          onClick={handleOpen}
        >
          NEW
        </Button>
      </div>
    </>
  );
}

export default Header;
