import React from "react";
import { Redirect } from "react-router-dom";

export const ListingConfig = {
  settings: {
    layout: {}
  },
  routes: [
    {
      path: "/apps/listing/:id",
      component: React.lazy(() => import("./spacenow/detail/Listing"))
    },
    {
      path: "/apps/listings/spacenow",
      component: React.lazy(() => import("./spacenow/Listings"))
    },
    {
      path: "/apps/listings/external/:userId",
      component: React.lazy(() => import("./external/Listings"))
    },
    {
      path: "/apps/listings/external",
      component: React.lazy(() => import("./external/Dashboard"))
    },
    {
      path: "/apps/listings",
      component: () => <Redirect to="/apps/listings/spacenow" />
    }
  ]
};
