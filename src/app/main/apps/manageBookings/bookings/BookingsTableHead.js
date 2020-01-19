import React from "react";
import {
  TableHead,
  TableSortLabel,
  TableCell,
  TableRow,
  Tooltip,
  Input
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import * as Actions from "../store/actions";

const rows = [
  {
    id: "bookingId",
    align: "left",
    disablePadding: false,
    label: "Id",
    sort: true
  },
  {
    id: "listingId",
    align: "left",
    disablePadding: false,
    label: "Listing",
    sort: true
  },
  {
    id: "listing",
    align: "left",
    disablePadding: false,
    label: "Title",
    sort: true
  },
  {
    id: "totalPrice",
    align: "left",
    disablePadding: false,
    label: "Total",
    sort: true
  },
  {
    id: "bookingType",
    align: "left",
    disablePadding: false,
    label: "Type",
    sort: true
  },

  {
    id: "basePrice",
    align: "left",
    disablePadding: false,
    label: "Price",
    sort: true
  },

  {
    id: "bookingState",
    align: "left",
    disablePadding: false,
    label: "State",
    sort: true
  },
  {
    id: "priceType",
    align: "left",
    disablePadding: false,
    label: "Period",
    sort: true
  },
  {
    id: "paymentState",
    align: "left",
    disablePadding: false,
    label: "State",
    sort: true
  },
  {
    id: "guest",
    align: "left",
    disablePadding: false,
    label: "Guest",
    sort: true
  },
  {
    id: "host",
    align: "left",
    disablePadding: false,
    label: "Host",
    sort: true
  },
  {
    id: "chargeId",
    align: "left",
    disablePadding: false,
    label: "Charge",
    sort: true
  },
  {
    id: "checkIn",
    align: "left",
    disablePadding: false,
    label: "Check-In",
    sort: true
  },
  {
    id: "checkOut",
    align: "left",
    disablePadding: false,
    label: "Check-Out",
    sort: true
  },
  {
    id: "createdAt",
    align: "left",
    disablePadding: false,
    label: "Transaction Date",
    sort: true
  }
];

function UsersTableHead(props) {
  const dispatch = useDispatch();
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
              <Input
                placeholder="Filter"
                style={{font: 'caption'}}
                disableUnderline
                fullWidth
                onChange={ev => dispatch(Actions.setBookingsSearchValues(row.id, ev.target.value))}
              />
            </TableCell>
          );
        }, this)}
      </TableRow>
    </TableHead>
  );
}

export default UsersTableHead;
