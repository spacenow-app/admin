import React from 'react';
import { Redirect } from 'react-router-dom';

export const ManagmentConfig = {
    settings: {
        layout: {}
    },
    routes: [
        {
            path: '/apps/managment/users',
            component: React.lazy(() => import('./users/Users'))
        },
        {
            path: '/apps/managment',
            component: () => <Redirect to="/apps/managment/users" />
        },
    ]
};
