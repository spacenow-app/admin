import React from "react";
import { SpacenowPageSimple } from "@spacenow";
import withReducer from "app/store/withReducer";
import ListingsTable from "./ListingsTable";
import reducer from "../store/reducers";

function Listings() {
  return (
    <SpacenowPageSimple
      classes={{
        content: "flex",
        header: "min-h-72 h-72"
      }}
      content={<ListingsTable />}
    />
  );
}

export default withReducer("managmentListing", reducer)(Listings);
