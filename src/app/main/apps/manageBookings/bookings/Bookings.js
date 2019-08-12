import React from "react";
import { SpacenowPageCarded } from "@spacenow";
import withReducer from "app/store/withReducer";
import BookingsTable from "./BookingsTable";
import BookingsHeader from "./BookingsHeader";
import reducer from "../store/reducers";

const Bookings = () => (
  <SpacenowPageCarded
    classes={{
      content: "flex",
      header: "min-h-72 h-72 sm:h-136 sm:min-h-136"
    }}
    header={<BookingsHeader />}
    content={<BookingsTable />}
    innerScroll
  />
);

export default withReducer("manageBookings", reducer)(Bookings);
