import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow
} from "@material-ui/core";
import { SpacenowScrollbars } from "@spacenow";
import { withRouter } from "react-router-dom";
import _ from "@lodash";
import ListingsTableHead from "./ListingsTableHead";
import * as Actions from "../store/actions";
import { useDispatch, useSelector } from "react-redux";

function ListingsTable(props) {
  const dispatch = useDispatch();
  const users = useSelector(({ managment }) => managment.users.data);
  const searchText = useSelector(({ managment }) => managment.users.searchText);

  const [selected, setSelected] = useState([]);
  const [data, setData] = useState(users);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState({
    direction: "asc",
    id: null
  });

  useEffect(() => {
    dispatch(Actions.getUsers());
  }, [dispatch]);

  useEffect(() => {
    setData(
      searchText.length === 0
        ? users
        : _.filter(users, item =>
            item.email.toLowerCase().includes(searchText.toLowerCase())
          )
    );
  }, [users, searchText]);

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

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      setSelected(data.map(n => n.id));
      return;
    }
    setSelected([]);
  }

  function handleClick(item) {
    props.history.push("/apps/managment/users/" + item.id);
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
            onSelectAllClick={handleSelectAllClick}
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
                    onClick={event => handleClick(n)}
                  >
                    <TableCell className="rt-td justify-center">
                      {n.profile && n.profile.picture ? (
                        <Avatar src={n.profile.picture} />
                      ) : (
                        <Avatar src="assets/images/avatars/spacenow.svg" />
                      )}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {n.id}
                    </TableCell>

                    <TableCell className="truncate" component="th" scope="row">
                      {n.email}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {n.id}
                      <Button size="small" variant="text" color="primary">
                        Status
                      </Button>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {n.id}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {n.id}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {n.id}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {n.id}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {n.id}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {n.id}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {n.id}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {n.id}
                      <Button size="small" variant="contained" color="primary">
                        Yes
                      </Button>
                    </TableCell>

                    <TableCell component="th" scope="row" align="center">
                      <Button size="small" variant="text" color="primary">
                        Edit
                      </Button>
                    </TableCell>

                    <TableCell component="th" scope="row">
                      <Button
                        href="#"
                        size="small"
                        variant="text"
                        color="primary"
                      >
                        Delete
                      </Button>
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
