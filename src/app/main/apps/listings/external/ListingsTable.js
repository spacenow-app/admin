import React, { useEffect, useState } from "react";
import {
  Button,
  Icon,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";

import Status from "./Status";
import moment from "moment";

import { SpacenowScrollbars } from "@spacenow";
import { withRouter } from "react-router-dom";
import _ from "@lodash";
import ListingsTableHead from "./ListingsTableHead";
import * as Actions from "../store/actions";
import { useDispatch, useSelector } from "react-redux";

function ListingsTable(props) {
  const dispatch = useDispatch();

  const external = useSelector(
    ({ listingApp }) => listingApp.listings.external.listings
  );
  const searchText = useSelector(
    ({ listingApp }) => listingApp.listings.searchText
  );

  const [selected] = useState([]);
  const [data, setData] = useState(external);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState({
    direction: "asc",
    id: null
  });

  useEffect(() => {
    dispatch(Actions.getExternalClicksByUser(props.match.params.userId));
  }, [dispatch, props.match.params]);

  useEffect(() => {
    setData(
      searchText.length === 0
        ? external
        : _.filter(external, item =>
          item.id.toLowerCase().includes(searchText.toLowerCase())
        )
    );
  }, [external, searchText]);

  function handleRequestSort(event, property) {
    const id = property;
    let direction = "desc";

    if (order.id === property && order.direction === "desc") {
      direction = "asc";
    }

    setOrder({
      direction,
      id
    });
  }

  function handleChangePage(event, page) {
    setPage(page);
  }

  if( !data || !data.rows > 0)
    return null

  return (
    <div className="w-full flex flex-col">
      <SpacenowScrollbars className="flex-grow overflow-x-auto">
        <Table className="min-w-xl" aria-labelledby="tableTitle">
          <ListingsTableHead
            numSelected={selected.length}
            order={order}
            onRequestSort={handleRequestSort}
            rowCount={data.rows.length}
          />

          <TableBody>
            {_.orderBy(
              data.rows,
              [
                o => {
                  switch (order.id) {
                    case "id": {
                      return o.id[0];
                    }
                    default: {
                      return o[order.id];
                    }
                  }
                }
              ],
              [order.direction]
            )
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(n => {
                const isSelected = selected.indexOf(n.id) !== -1;
                return (
                  <TableRow
                    className="h-64 cursor-pointer"
                    hover
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n.id}
                    selected={isSelected}
                  >
                    <TableCell className="w-52" component="th" scope="row">
                      <img
                          className="rounded"
                          style={{ width: "50px", maxWidth: "50px" }}
                          src={n.listing.photos.length > 0 ? n.listing.photos[0].name : ""}
                          alt={n.listing.title}
                      />
                    </TableCell>
                    <TableCell className="truncate" component="th" scope="row">
                      {n.listing.title}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {n.clicks}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {n.createdAt &&
                        moment(n.createdAt).format(
                          "DD/MM/YYYY",
                          moment.HTML5_FMT.DATE
                        )}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </SpacenowScrollbars>

      <TablePagination
        component="div"
        count={data.rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          "aria-label": "Previous Page"
        }}
        nextIconButtonProps={{
          "aria-label": "Next Page"
        }}
        onChangePage={handleChangePage}
      />
    </div>
  );
}

export default withRouter(ListingsTable);
