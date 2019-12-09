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
  DialogActions
} from '@material-ui/core';
import moment from 'moment';
import { SpacenowScrollbars } from '@spacenow';
import { withRouter } from 'react-router-dom';
import _ from '@lodash';
import { useDispatch, useSelector } from 'react-redux';

import ListingsTableHead from './ListingsTableHead';
import * as Actions from '../store/actions';
import Status from './Status';

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
  const [order, setOrder] = useState({ direction: 'asc', id: null });

  useEffect(() => {
    dispatch(Actions.getListings());
  }, [dispatch]);

  useEffect(() => {
    setData(
      searchText.length === 0
        ? listings
        : _.filter(listings, (item) =>
            item.id.toLowerCase().includes(searchText.toLowerCase())
          )
    );
  }, [listings, searchText]);

  function handleRequestSort(event, property) {
    const id = property;
    let direction = 'desc';
    if (order.id === property && order.direction === 'desc') {
      direction = 'asc';
    }
    setOrder({ direction, id });
  }

  function handleChangePage(event, page) {
    setPage(page);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
  }

  function handleChangeListingStatus(event, listingId, status) {
    dispatch(Actions.changeListingStatus(listingId, status));
    dispatch(Actions.closeDialog());
    event.preventDefault();
  }

  return (
    <div className='w-full flex flex-col'>
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
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((n) => {
                const isSelected = selected.indexOf(n.id) !== -1;
                return (
                  <TableRow
                    className='h-64 cursor-pointer'
                    hover
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n.id}
                    selected={isSelected}
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
                        onClick={() =>
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
                    <TableCell component='th' scope='row'>
                      {n.user.profile && n.user.profile.firstName}
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      {n.user.email}
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      {n.location.city}
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      <span
                        className={
                          n.state === 'active' ? 'text-green' : 'text-red'
                        }
                      >
                        {n.location.state}
                      </span>
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      {n.location.country}
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      {n.createdAt &&
                        moment(n.createdAt).format(
                          'DD/MM/YYYY',
                          moment.HTML5_FMT.DATE
                        )}
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      {n.isReady ? 'YES' : 'NO'}
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      {n.isPublished ? 'Publish' : 'Unpublished'}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </SpacenowScrollbars>

      <TablePagination
        component='div'
        count={data.length}
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
