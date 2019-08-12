import React from "react";
import {
  TableHead,
  TableSortLabel,
  TableCell,
  TableRow,
  Tooltip
} from "@material-ui/core";

const rows = [
  {
    id: "bookingId",
    align: "left",
    disablePadding: false,
    label: "Booking Id",
    sort: true
  },
  {
    id: "listingId",
    align: "left",
    disablePadding: false,
    label: "Listing Id",
    sort: true
  },
  {
    id: "totalPrice",
    align: "left",
    disablePadding: false,
    label: "Total Price",
    sort: true
  },
  {
    id: "bookingType",
    align: "left",
    disablePadding: false,
    label: "Booking Type",
    sort: true
  },

  {
    id: "basePrice",
    align: "left",
    disablePadding: false,
    label: "Base Price",
    sort: true
  },

  {
    id: "bookingState",
    align: "left",
    disablePadding: false,
    label: "Booking State",
    sort: true
  },
  {
    id: "priceType",
    align: "left",
    disablePadding: false,
    label: "Price Type",
    sort: true
  },
  {
    id: "paymentState",
    align: "left",
    disablePadding: false,
    label: "Payment State",
    sort: true
  },
  {
    id: "guestId",
    align: "left",
    disablePadding: false,
    label: "Guest Id",
    sort: true
  },
  {
    id: "hostId",
    align: "left",
    disablePadding: false,
    label: "Host Id",
    sort: true
  },
  {
    id: "chargeId",
    align: "left",
    disablePadding: false,
    label: "Charge Id",
    sort: true
  },
  {
    id: "checkIn",
    align: "left",
    disablePadding: false,
    label: "Check In",
    sort: true
  },
  {
    id: "checkOut",
    align: "left",
    disablePadding: false,
    label: "Check Out",
    sort: true
  }
];

function UsersTableHead(props) {
  const createSortHandler = property => event => {
    props.onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow className="h-64">
        {rows.map(row => {
          return (
            <TableCell
              key={row.id}
              align={row.align}
              padding={row.disablePadding ? "none" : "default"}
              sortDirection={
                props.order.id === row.id ? props.order.direction : false
              }
            >
              {row.sort && (
                <Tooltip
                  title="Sort"
                  placement={
                    row.align === "right" ? "bottom-end" : "bottom-start"
                  }
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={props.order.id === row.id}
                    direction={props.order.direction}
                    onClick={createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              )}
            </TableCell>
          );
        }, this)}
      </TableRow>
    </TableHead>
  );
}

export default UsersTableHead;
