import React from 'react';
import withReducer from 'app/store/withReducer';

import { SpacenowPageCarded } from '@spacenow';

import reducer from './../store/reducers';

import Header from './VouchersHeader';
import Table from './VouchersTable';

const Vouchers = () => (
  <SpacenowPageCarded
    classes={{
      content: 'flex',
      header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
    }}
    header={<Header />}
    content={<Table />}
    innerScroll
  />
);

export default withReducer('manageVouchers', reducer)(Vouchers);
