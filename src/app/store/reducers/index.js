import {combineReducers} from 'redux';
import spacenow from './spacenow';
import auth from 'app/auth/store/reducers';
import quickPanel from 'app/spacenow-layouts/shared-components/quickPanel/store/reducers';

const createReducer = (asyncReducers) =>
    combineReducers({
        auth,
        spacenow,
        quickPanel,
        ...asyncReducers
    });

export default createReducer;
