import React from "react";
import { SpacenowPageCarded } from "@spacenow";
import withReducer from "app/store/withReducer";
import ListingsTable from "./ListingsTable";
import ListingsHeader from "./ListingsHeader";

function Listings() {
  return (
    <SpacenowPageCarded
      classes={{
        content: "flex",
        header: "min-h-72 h-72 sm:h-136 sm:min-h-136"
      }}
      header={<ListingsHeader />}
      content={<ListingsTable />}
      innerScroll
    />
  );
}

export default withReducer("managmentListing")(Listings);
