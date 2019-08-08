import React from 'react';

export const ServiceFeeAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes: [
        {
            path: '/apps/managmentFee',
            component: React.lazy(() => import('./ServiceFeeApp'))
        }
    ]
};
