import React from "react";
import { SpacenowPageSimple } from "@spacenow";
import withReducer from "app/store/withReducer";
import BookingsTable from "./BookingsTable";
import reducer from "../store/reducers";

const Bookings = () => (
  <SpacenowPageSimple
    classes={{
      content: "flex",
      header: "min-h-72 h-72"
    }}
    content={<BookingsTable />}
    innerScroll
  />
);

export default withReducer("manageBookings", reducer)(Bookings);
