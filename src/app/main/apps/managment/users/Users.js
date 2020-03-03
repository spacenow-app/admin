import React from 'react';
import { SpacenowPageSimple } from '@spacenow';
import withReducer from 'app/store/withReducer';
import UsersTable from './UsersTable';
import reducer from '../store/reducers';


function Users() {
    return (
        <SpacenowPageSimple
            classes={{
                content: "flex",
                header: "min-h-72 h-72 sm:h-136 sm:min-h-136"
            }}
            content={<UsersTable />}
            innerScroll
        />
    );
}

export default withReducer('managment', reducer)(Users);
