import React from 'react';
import withReducer from 'app/store/withReducer';

import { SpacenowPageSimple } from '@spacenow';

import reducer from './../store/reducers';

import Table from './VouchersTable';

const Vouchers = () => (
  <SpacenowPageSimple
    classes={{
      content: 'flex',
      header: "min-h-72 h-72"
    }}
    content={<Table />}
    innerScroll
  />
);

export default withReducer('manageVouchers', reducer)(Vouchers);
