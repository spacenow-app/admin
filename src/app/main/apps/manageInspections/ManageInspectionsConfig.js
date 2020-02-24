import React from "react";

export const ManageInspectionsConfig = {
  settings: {
    layout: {}
  },
  routes: [
    {
      path: "/apps/managment/inspections",
      component: React.lazy(() => import("./inspections/Inspections")),
      exact: true
    }
  ]
};
