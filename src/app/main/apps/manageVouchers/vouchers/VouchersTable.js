import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow
} from '@material-ui/core';

import _ from "@lodash";
import { SpacenowScrollbars } from '@spacenow';

import VouchersTableHead from './VouchersTableHead';

const VouchersTable = () => {
  const dispatch = useDispatch();

  const data = useSelector(({ manageVouchers }) => manageVouchers.data || [
    {
      "id": "3f25c160-cb70-4526-81f4-e197904344af",
      "usageCount": 0,
      "status": "active",
      "code": "SN251959",
      "type": "percentual",
      "value": 10,
      "usageLimit": 2,
      "expireAt": "2019-12-04T13:00:00.000Z",
      "updatedAt": "2019-12-04T01:36:18.312Z",
      "createdAt": "2019-12-04T01:36:18.312Z"
    }
  ]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState({ direction: 'asc', id: null });
  const [selected, setSelected] = useState([]);

  function handleChangePage(event, page) {
    setPage(page);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
  }

  function handleRequestSort(event, property) {
    const id = property;
    let direction = 'desc';
    if (order.id === property && order.direction === 'desc') {
      direction = 'asc';
    }
    setOrder({ direction, id });
  }

  return (
    <div className='w-full flex flex-col'>
      <SpacenowScrollbars className='flex-grow overflow-x-auto'>
        <Table className='min-w-xl' aria-labelledby='tableTitle'>
          <VouchersTableHead
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
                    role='checkbox'
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n.id}
                    selected={isSelected}
                  >
                    <TableCell component='th' scope='row'>
                      {n.code}
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      {n.type}
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      {n.value}
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      {n.usageCount}
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      {n.usageLimit}
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      {n.expireAt}
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      {n.status}
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
};

export default withRouter(VouchersTable);
