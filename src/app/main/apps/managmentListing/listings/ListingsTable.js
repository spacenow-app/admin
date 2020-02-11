/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react';
import {
  Button,
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

import { SpacenowScrollbars, SpacenowUtils } from "@spacenow";
import { withRouter } from "react-router-dom";
import _ from "@lodash";
import apisConfig from "app/spacenow-configs/apisConfig";
import ListingsTableHead from "./ListingsTableHead";
import * as Actions from "../store/actions";
import { useDispatch, useSelector } from "react-redux";

function ListingsTable(props) {
  const dispatch = useDispatch();

  const appUrl = apisConfig.appHost;

  const { data: listings, count: totalListings } = useSelector(({ managmentListing }) => managmentListing.listings);
  const searchValues = useSelector(({ managmentListing }) => managmentListing.listings.searchValues);

  const [selected] = useState([]);
  const [data, setData] = useState(listings);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState({ direction: 'asc', id: null });

  useEffect(() => {
    dispatch(Actions.getListings(page, rowsPerPage));
  }, [dispatch, page, rowsPerPage]);

  useEffect(() => {
    setData(
      searchValues
      ? SpacenowUtils.filterObjectByProps(listings, searchValues)
      : listings
    );
  }, [listings, searchValues]);

  function handleRequestSort(event, property) {
    const id = property;
    let direction = 'desc';
    if (order.id === property && order.direction === 'desc') {
      direction = 'asc';
    }
    setOrder({ direction, id });
  }

  function handleChangePublishListingData(event, listingId, pubStatus, isReady) {
    event.stopPropagation();
    if (isReady) {
      dispatch(Actions.publishListing(listingId, !pubStatus));
    }
  }

  function handleChangePage(event, page) {
    setPage(page);
  }

  function handleOpenListingPage(event, listingId, pubStatus) {
    event.stopPropagation();
    if (pubStatus) {
      window.open(appUrl + "/space/" + listingId);
    } else {
      window.open(appUrl + "/listing/preview/" + listingId);
    }
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
  }

  function handleChangeListingStatus(event, listingId, status) {
    event.stopPropagation();
    dispatch(Actions.changeListingStatus(listingId, status));
    dispatch(Actions.closeDialog());
  }

  return (
    <div className='w-full flex flex-col table-wrapper'>
      <SpacenowScrollbars className='flex-grow overflow-x-auto'>
        <Table className='min-w-xl' aria-labelledby='tableTitle'>
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
                (o) => {
                  switch (order.id) {
                    case 'id': {
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
              .map(n => {
                const isSelected = selected.indexOf(n.id) !== -1;
                return (
                  <TableRow
                    className='h-64 cursor-pointer'
                    hover
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n.id}
                    selected={isSelected}
                    onClick={ (event) => handleOpenListingPage(event, n.id, n.isPublished) }
                  >
                    <TableCell component='th' scope='row'>
                      {n.id}
                    </TableCell>
                    <TableCell className='truncate' component='th' scope='row'>
                      {n.title}
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      <Status
                        name={
                          n.status.charAt(0).toUpperCase() + n.status.slice(1)
                        }
                        tooltip={
                          n.status === 'active'
                            ? 'Click here to disable this listing'
                            : 'Click here to activate this listing'
                        }
                        onClick={(e) => !e.stopPropagation() &&
                          dispatch(
                            Actions.openDialog({
                              children: (
                                <React.Fragment>
                                  <DialogTitle id='alert-dialog-title'>
                                    {`Listing ${n.id}`}
                                  </DialogTitle>
                                  <DialogContent>
                                    <DialogContentText id='alert-dialog-description'>
                                      {`Do you want to change this listing to "${
                                        n.status === 'active'
                                          ? 'deleted'
                                          : 'active'
                                        }"?`}
                                    </DialogContentText>
                                  </DialogContent>
                                  <DialogActions>
                                    <Button
                                      onClick={() =>
                                        dispatch(Actions.closeDialog())
                                      }
                                      size='small'
                                      color='primary'
                                      autoFocus
                                    >
                                      No
                                    </Button>
                                    <Button
                                      onClick={(event) =>
                                        handleChangeListingStatus(
                                          event,
                                          n.id,
                                          n.status === 'active'
                                            ? 'deleted'
                                            : 'active'
                                        )
                                      }
                                      size='small'
                                      color='primary'
                                    >
                                      YES
                                    </Button>
                                  </DialogActions>
                                </React.Fragment>
                              )
                            })
                          )
                        }
                      />
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
                    <TableCell component='th' scope='row'>
                      <Button
                        onClick={ (event) => handleChangePublishListingData(event, n.id, n.isPublished, n.isReady)}
                        size='small'
                        variant='contained'
                        className={
                          "inline text-12 p-4 rounded truncate " +
                          (n.isPublished
                            ? 'bg-green text-white'
                            : (n.isReady
                              ? 'bg-red text-white'
                              : 'bg-gray text-white'))
                        }
                      >
                        {n.isPublished ? 'Published' : 'Unpublished'}
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </SpacenowScrollbars>
      <TablePagination
        component='div'
        count={totalListings}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': 'Previous Page'
        }}
        nextIconButtonProps={{
          'aria-label': 'Next Page'
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default withRouter(ListingsTable);
