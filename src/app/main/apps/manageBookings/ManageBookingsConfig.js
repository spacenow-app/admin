import React from "react";

export const ManageBookingsConfig = {
  settings: {
    layout: {}
  },
  routes: [
    {
      path: "/apps/managment/bookings",
      component: React.lazy(() => import("./bookings/Bookings")),
      exact: true
    }
  ]
};
