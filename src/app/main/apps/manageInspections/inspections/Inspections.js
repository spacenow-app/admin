import React from "react";
import { SpacenowPageSimple } from "@spacenow";
import withReducer from "app/store/withReducer";
import InspectionsTable from "./InspectionsTable";
import reducer from "../store/reducers";

const Inspections = () => (
  <SpacenowPageSimple
    classes={{
      content: "flex",
      header: "min-h-72 h-72"
    }}
    content={<InspectionsTable />}
    innerScroll
  />
);

export default withReducer("manageInspections", reducer)(Inspections);
