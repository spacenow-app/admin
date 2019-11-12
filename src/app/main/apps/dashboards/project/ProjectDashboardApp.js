import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import { SpacenowAnimateGroup, SpacenowPageSimple } from "@spacenow";
import withReducer from "app/store/withReducer";
import * as Actions from "./store/actions";

import reducer from "./store/reducers";
import WidgetUsers from "./widgets/WidgetUsers";
import WidgetListings from "./widgets/WidgetListings";
// import WidgetListingsCategory from "./widgets/WidgetListingsCategory";
import WidgetBookings from "./widgets/WidgetBookings";

const useStyles = makeStyles(() => ({
  content: {
    "& canvas": {
      maxHeight: "100%"
    }
  }
}));

const ProjectDashboardApp = props => {
  const dispatch = useDispatch();
  const widgets = useSelector(
    ({ projectDashboardApp }) => projectDashboardApp.widgets
  );
  const classes = useStyles(props);

  useEffect(() => {
    dispatch(Actions.getTotalUsers());
    dispatch(Actions.getTotalBookingsByDate());
    dispatch(Actions.getTotalListings());
    dispatch(Actions.getAllCategories());
  }, [dispatch]);

  const _handleUsersByDate = (days) => {
    if(days)
      dispatch(Actions.getTotalUsersByDate(days));
    dispatch(Actions.getTotalUsers());
  }

  const _handleBookingsByDate = (days) => {
    dispatch(Actions.getTotalBookingsByDate(days));
  }

  const _handleListingsByDate = ({ days, category }) => {
    dispatch(Actions.getTotalListingsByDate(days, category));
  }

  if (!widgets) {
    return null;
  }

  return (
    <SpacenowPageSimple
      classes={{
        header: "min-h-160 h-160",
        toolbar: "min-h-48 h-48",
        rightSidebar: "w-288",
        content: classes.content
      }}
      content={
        <div className="p-12">
          <SpacenowAnimateGroup
            className="flex flex-wrap"
            enter={{
              animation: "transition.slideUpBigIn"
            }}
          >
            <div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
              { widgets.users && <WidgetUsers widget={widgets.users} handleChangeRange={(days) => _handleUsersByDate(days)}/> }
            </div>
            <div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
              { widgets.bookings && <WidgetBookings widget={widgets.bookings} handleChangeRange={(days) => _handleBookingsByDate(days)}/> }
            </div>
            <div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
              { widgets.listings && widgets.categories && <WidgetListings categories={widgets.categories} widget={widgets.listings} handleChangeRange={({days, category}) => _handleListingsByDate({days, category})}/> }
            </div>
          </SpacenowAnimateGroup>
        </div>
      }
    />
  );
};

export default withReducer("projectDashboardApp", reducer)(ProjectDashboardApp);
