import { combineReducers } from "redux";
import spacenow from "./spacenow";
import auth from "app/auth/store/reducers";
import quickPanel from "app/spacenow-layouts/shared-components/quickPanel/store/reducers";
import widgets from "app/main/apps/dashboards/project/store/reducers/widgets.reducer";

const createReducer = asyncReducers =>
  combineReducers({
    auth,
    spacenow,
    quickPanel,
    widgets,
    ...asyncReducers
  });

export default createReducer;
