import React from 'react';

export const ProjectDashboardAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes: [
        {
            path: '/apps/dashboard',
            component: React.lazy(() => import('./ProjectDashboardApp'))
        }
    ]
};
