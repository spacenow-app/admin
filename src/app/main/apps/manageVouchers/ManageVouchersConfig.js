import React from 'react';

export const ManageVouchersConfig = {
  settings: {
    layout: {}
  },
  routes: [
    {
      path: '/apps/managment/vouchers',
      component: React.lazy(() => import('./vouchers')),
      exact: true
    }
  ]
};
