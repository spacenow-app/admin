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
    id: "id",
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
    id: "guestId",
    align: "left",
    disablePadding: false,
    label: "Guest",
    sort: true
  },
  {
    id: "messages",
    align: "left",
    disablePadding: false,
    label: "Message",
    sort: true
  },
  {
    id: "status",
    align: "left",
    disablePadding: false,
    label: "Status",
    sort: true
  },
  {
    id: "date",
    align: "left",
    disablePadding: false,
    label: "Requested date",
    sort: true
  },
  {
    id: "time",
    align: "left",
    disablePadding: false,
    label: "Requested time",
    sort: true
  },
  {
    id: "createdAt",
    align: "left",
    disablePadding: false,
    label: "Created At",
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
                style={{ font: 'caption' }}
                disableUnderline
                fullWidth
                onChange={ev => dispatch(Actions.setInspectionsSearchValues(row.id, ev.target.value))}
              />
            </TableCell>
          );
        }, this)}
      </TableRow>
    </TableHead>
  );
}

export default UsersTableHead;
