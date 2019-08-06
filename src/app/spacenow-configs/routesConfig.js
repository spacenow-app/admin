import React from 'react';
import { Redirect } from 'react-router-dom';
import { SpacenowUtils } from '@spacenow';
import { authConfigs } from 'app/auth/components/authConfigs';
import { pagesConfigs } from 'app/main/pages/pagesConfigs';
import { appsConfigs } from 'app/main/apps/appsConfigs';

const routeConfigs = [
    ...authConfigs,
    ...pagesConfigs,
    ...appsConfigs
];

const routes = [
    ...SpacenowUtils.generateRoutesFromConfigs(routeConfigs, ['admin']),
    {
        path: '/',
        component: () => <Redirect to="/apps/dashboard" />
    },
    {
        component: () => <Redirect to="/pages/errors/error-404" />
    }
];

export default routes;
