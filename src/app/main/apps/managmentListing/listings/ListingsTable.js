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
// import { width, maxWidth } from "@material-ui/system";

function ListingsTable(props) {
  const dispatch = useDispatch();
  const listings = useSelector(
    ({ managmentListing }) => managmentListing.listings.data
  );
  const searchText = useSelector(
    ({ managmentListing }) => managmentListing.listings.searchText
  );

  const [selected] = useState([]);
  const [data, setData] = useState(listings);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState({
    direction: "asc",
    id: null
  });

  useEffect(() => {
    dispatch(Actions.getListings());
  }, [dispatch]);

  useEffect(() => {
    setData(
      searchText.length === 0
        ? listings
        : _.filter(listings, item =>
          item.id.toLowerCase().includes(searchText.toLowerCase())
        )
    );
  }, [listings, searchText]);

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

  function editListingHandleClick(item) {
    props.history.push("/apps/managment/users");
  }

  function handleChangePublishListingData(event, item) {
    dispatch(
      Actions.updateUser({ ...item, [event.target.name]: event.target.value })
    );
    dispatch(Actions.getListings());
    dispatch(Actions.closeDialog());
  }
  function handleChangePage(event, page) {
    setPage(page);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
  }

  return (
    <div className="w-full flex flex-col">
      <SpacenowScrollbars className="flex-grow overflow-x-auto">
        <Table className="min-w-xl" aria-labelledby="tableTitle">
          <ListingsTableHead
            numSelected={selected.length}
            order={order}
            onRequestSort={handleRequestSort}
            rowCount={data.length}
          />

          <TableBody>
            {_.orderBy(
              data,
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
                console.log(n)
                const isSelected = selected.indexOf(n.id) !== -1;
                return (
                  <TableRow
                    className="h-64 cursor-pointer"
                    hover
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n.id}
                    selected={isSelected}
                  // onClick={event => handleClick(n)}   && n.profile.picture
                  >
                    <TableCell className="w-52" component="th" scope="row">
                      {n.publish ? (
                        <img
                          className="rounded"
                          style={{ width: "50px", maxWidth: "50px" }}
                          src="assets/images/avatars/spacenow.svg"
                          alt={n.name}
                        />
                      ) : (
                          <img
                            className="rounded"
                            style={{ width: "50px", maxWidth: "50px" }}
                            src="assets/images/avatars/spacenow.svg"
                            alt={n.name}
                          />
                        )}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {n.id}
                    </TableCell>

                    <TableCell className="truncate" component="th" scope="row">
                      {n.title}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Status name={(n.status.charAt(0).toUpperCase() + n.status.slice(1))} />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {n.user.profile && n.user.profile.firstName}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {n.user.email}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {n.location.city}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {/* style={n.state == "active" ? {color:"green"} : {color:"red"}} */}
                      {/* { n.state === "active" ? <Typography color="primary"> n.state </Typography> : <Typography></Typography> } */}
                      <span
                        className={
                          n.state === "active" ? "text-green" : "text-red"
                        }
                      >
                        {n.location.state}
                      </span>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {n.location.country}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {n.createdAt &&
                        moment(n.createdAt).format(
                          "DD/MM/YYYY",
                          moment.HTML5_FMT.DATE
                        )}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {n.isReady ? "YES" : "NO"}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Button
                        onClick={event => handleChangePublishListingData(n)}
                        size="small"
                        variant="contained"
                        color={n.isPublished ? "bg-red" : "bg-red"}
                        className={
                          n.isPublished
                            ? "bg-green text-white"
                            : "bg-red text-white"
                        }
                      >
                        {n.isPublished ? "Publish" : "Unpublished"}
                      </Button>
                    </TableCell>
                    <TableCell component="th" scope="row" align="center">
                      <Button
                        size="small"
                        variant="text"
                        color="primary"
                        onClick={event => editListingHandleClick(n)}
                      >
                        Edit
                      </Button>
                    </TableCell>

                    <TableCell component="th" scope="row">
                      <IconButton
                        onClick={() =>
                          dispatch(
                            Actions.openDialog({
                              children: (
                                <React.Fragment>
                                  <DialogTitle id="alert-dialog-title">
                                    Deleting Listing
                                  </DialogTitle>
                                  <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                      Are you sure you want to delete this?
                                    </DialogContentText>
                                  </DialogContent>
                                  <DialogActions>
                                    <Button
                                      onClick={() =>
                                        dispatch(Actions.closeDialog())
                                      }
                                      size="small"
                                      color="primary"
                                    >
                                      Cancel
                                    </Button>
                                    <Button
                                      onClick={event =>
                                        handleChangePublishListingData(event, n)
                                      }
                                      //onChange={event => handleChangeUserData(event, n)}
                                      size="small"
                                      variant="contained"
                                      color="danger"
                                      autoFocus
                                    >
                                      Confirm Delete
                                    </Button>
                                  </DialogActions>
                                </React.Fragment>
                              )
                            })
                          )
                        }
                        variant="contained"
                        color="primary"
                      >
                        <Icon>delete</Icon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </SpacenowScrollbars>

      <TablePagination
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          "aria-label": "Previous Page"
        }}
        nextIconButtonProps={{
          "aria-label": "Next Page"
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default withRouter(ListingsTable);
