import React from "react";
import { Redirect } from "react-router-dom";

export const ManagmentListingConfig = {
  settings: {
    layout: {}
  },
  routes: [
    {
      path: "/apps/managmentListing/listings/:id",
      component: React.lazy(() => import("./listings/Listings"))
    },
    {
      path: "/apps/managmentListing/listings",
      component: React.lazy(() => import("./listings/Listings"))
    },
    {
      path: "/apps/managmentListing",
      component: () => <Redirect to="/apps/managmentListing/listings" />
    }
  ]
};
