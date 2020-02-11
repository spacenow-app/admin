import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tab, Tabs } from '@material-ui/core';
import { makeStyles } from "@material-ui/styles";
import { SpacenowAnimateGroup, SpacenowPageSimple } from "@spacenow";
import withReducer from "app/store/withReducer";
import * as Actions from "./store/actions";

import reducer from "./store/reducers";
import WidgetUsers from "./widgets/WidgetUsers";
import WidgetListings from "./widgets/WidgetListings";
import WidgetListingTable from "./widgets/WidgetListingTable";
import WidgetListingTableLocation from "./widgets/WidgetListingTableLocation";
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
  const [tabValue, setTabValue] = useState(0);
  const widgets = useSelector(
    ({ projectDashboardApp }) => projectDashboardApp.widgets
  );
  const classes = useStyles(props);

  useEffect(() => {
    dispatch(Actions.getTotalUsers());
    dispatch(Actions.getTotalBookingsByDate());
    dispatch(Actions.getTotalListingsByDate(10000));
    dispatch(Actions.getAllCategories());
    dispatch(Actions.getListingsCategories());
    dispatch(Actions.getListingsLocations());
  }, [dispatch]);

  const _handleUsersByDate = (days) => {
    if (days)
      dispatch(Actions.getTotalUsersByDate(days));
    dispatch(Actions.getTotalUsers());
  }

  const _handleBookingsByDate = (days) => {
    dispatch(Actions.getTotalBookingsByDate(days));
  }

  const _handleListingsByDate = ({ days, category }) => {
    dispatch(Actions.getTotalListingsByDate(days, category));
  }

  const _handleChangeTab = (event, tabValue) => {
    setTabValue(tabValue);
  }

  const columns = [
    {
      'id': 'total-listings',
      'title': 'Total Listings'
    },
    {
      'id': 'active',
      'title': 'Active'
    },
    {
      'id': 'deleted',
      'title': 'Deleted'
    },
    {
      'id': 'published',
      'title': 'Published'
    },
  ]

  const columnsLocation = [{
    'id': 'location',
    'title': 'Location'
  }].concat(columns)

  const columnsCategory = [{
    'id': 'category',
    'title': 'Category'
  }].concat(columns)

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
            <div className="widget flex w-full sm:w-1/2 md:w-1/3 p-12">
              {widgets.users && <WidgetUsers widget={widgets.users} handleChangeRange={(days) => _handleUsersByDate(days)} />}
            </div>
            <div className="widget flex w-full sm:w-1/2 md:w-1/3 p-12">
              {widgets.bookings && <WidgetBookings widget={widgets.bookings} handleChangeRange={(days) => _handleBookingsByDate(days)} />}
            </div>
            <div className="widget flex w-full sm:w-1/2 md:w-1/3 p-12">
              {widgets.listings && widgets.categories && <WidgetListings categories={widgets.categories} widget={widgets.listings} handleChangeRange={({ days, category }) => _handleListingsByDate({ days, category })} />}
            </div>
          </SpacenowAnimateGroup>
          <Tabs
            value={tabValue}
            onChange={_handleChangeTab}
            indicatorColor="secondary"
            textColor="secondary"
            variant="scrollable"
            scrollButtons="off"
            className="w-full border-b-1 px-24"
          >
            <Tab className="text-14 font-600 normal-case" label="Listings By Category" />
            <Tab className="text-14 font-600 normal-case" label="Listings By Locations" />
          </Tabs>
          {tabValue === 0 &&
            (
              <SpacenowAnimateGroup
                className="flex flex-wrap"
                enter={{
                  animation: "transition.slideUpBigIn"
                }}
              >
                <div className="widget flex w-full p-12">
                  <WidgetListingTable title={"Listings By Category"} columns={columnsCategory} widget={widgets.listingsCategories} />
                </div>
              </SpacenowAnimateGroup>
            )}
          {tabValue === 1 &&
            (
              <SpacenowAnimateGroup
                className="flex flex-wrap"
                enter={{
                  animation: "transition.slideUpBigIn"
                }}
              >
                <div className="widget flex w-full p-12">
                  <WidgetListingTableLocation title={"Listings By Location"} columns={columnsLocation} widget={widgets.listingsLocations} />
                </div>
              </SpacenowAnimateGroup>
            )}
        </div>
      }
    />
  );
};

export default withReducer("projectDashboardApp", reducer)(ProjectDashboardApp);
