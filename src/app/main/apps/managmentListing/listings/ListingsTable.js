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
  DialogActions
} from "@material-ui/core";

import Status from "../../manageBookings/booking/BookingsStatus";
import moment from "moment";

import { SpacenowScrollbars} from "@spacenow";
import { withRouter } from "react-router-dom";
import _ from "@lodash";
import ListingsTableHead from "./ListingsTableHead";
import * as Actions from "../store/actions";
import { useDispatch, useSelector } from "react-redux";

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
  function handleDeleteListingData(event, item) {
    console.log("testv  dell");
    dispatch(
      Actions.updateUser({ ...item, [event.target.name]: event.target.value })
    );
    dispatch(Actions.getListings());
    dispatch(Actions.closeDialog());
  }
  function handleChangePublishListingData(event, item) {
    console.log("testv  change");
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
                const isSelected = selected.indexOf(n.id) !== -1;
                return (
                  <TableRow
                    className="h-64 cursor-pointer"
                    hover
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n.id}
                    selected={isSelected}
                    // onClick={event => handleClick(n)}   && n.profile.picture
                  >
                    <TableCell className="w-52" component="th" scope="row" padding="none" >
                      {n.publish  ? (
                        //<img className="w-full block rounded" src={n.profile.picture} alt={n.name}/>
                        <img
                        className="w-full block rounded"
                        src="assets/images/avatars/spacenow.svg"
                        alt={n.name}
                      />
                      ) : (
                        <img
                          className="w-full block rounded"
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
                      <Status name={n.status} />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {n.ownerName}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {n.ownerEmail}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {n.city}
                    </TableCell>
                    <TableCell component="th" scope="row">
                    {/* style={n.state == "active" ? {color:"green"} : {color:"red"}} */}
                      <span className={n.state === "active" ? "text-green" : "text-red"} >{n.state}</span> 
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {n.country}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {/* {n.createdDate} */}
                      {n.createdDate &&
                        moment(n.createdAt).format(
                          "MM-YYYY", moment.HTML5_FMT.MONTH 
                        )}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {n.ready ? "YES" : "NO"}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Button
                        onClick={event => handleChangePublishListingData(n)}
                        size="small"
                        variant="contained"
                        color={n.publish ? "bg-red" : "bg-red"}
                        className={n.publish ? "bg-green text-white" : "bg-red text-white"}
                      >
                        {n.publish
                          ? "Publish"
                          : "Unpublished"}
                         
                      </Button>
                    </TableCell>
                    <TableCell component="th" scope="row" align="center">
                      <Button size="small" variant="text" color="primary" onClick={event => editListingHandleClick(n)}>
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
                                      onClick={() => dispatch(Actions.closeDialog())
                                      }
                                      size="small"
                                      color="primary"
                                    >
                                      Cancel
                                    </Button>
                                    <Button
                                      onClick={event => handleDeleteListingData(event, n)
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
