const navigationConfig = [
  {
    id: "applications",
    title: "Applications",
    type: "group",
    icon: "apps",
    children: [
      {
        id: "dashboard",
        title: "Dashboard",
        type: "item",
        icon: "dashboard",
        url: "/apps/dashboard"
      },
      {
        id: "users",
        title: "Users",
        type: "item",
        icon: "person",
        url: "/apps/managment/users",
        exact: true
      },
      {
        id: "bookings",
        title: "Bookings",
        type: "item",
        icon: "credit_card",
        url: "/apps/managment/bookings",
        exact: true
      },
      {
        id: "Listings",
        title: "Listings",
        type: "item",
        icon: "list",
        url: "/apps/managmentListing/listings",
        exact: true
      }
    ]
  }
];

export default navigationConfig;
