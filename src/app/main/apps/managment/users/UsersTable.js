import React, { useEffect, useState } from "react";
import {
  Avatar,
  FormControl,
  Icon,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow
} from "@material-ui/core";
import moment from "moment";
import { SpacenowScrollbars, SpacenowUtils } from "@spacenow";
import { withRouter } from "react-router-dom";
import _ from "@lodash";
import UsersTableHead from "./UsersTableHead";
import * as Actions from "../store/actions";
import { useDispatch, useSelector } from "react-redux";

function UsersTable(props) {
  const dispatch = useDispatch();
  const users = useSelector(({ managment }) => managment.users.data);
  const searchText = useSelector(({ managment }) => managment.users.searchText);

  const [selected] = useState([]);
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
        : SpacenowUtils.filterArrayByString(users, searchText)
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

  function handleChangePage(event, page) {
    setPage(page);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
  }

  function handleChangeUserData(event, item) {
    dispatch(
      Actions.updateUser({ ...item, [event.target.name]: event.target.value })
    );
    dispatch(Actions.getUsers());
  }

  return (
    <div className="w-full flex flex-col">
      <SpacenowScrollbars className="flex-grow overflow-x-auto">
        <Table className="min-w-xl" aria-labelledby="tableTitle">
          <UsersTableHead
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
                    // onClick={() => handleClick(n)}
                  >
                    <TableCell className="w-48 px-2 sm:px-8">
                      {n.profile && n.profile.picture ? (
                        <Avatar src={n.profile.picture} />
                      ) : (
                        <Avatar src="assets/images/avatars/spacenow.svg" />
                      )}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {n.profile && n.profile.profileId}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {n.profile && n.profile.firstName}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {n.profile && n.profile.lastName}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {n.email}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {n.profile && n.profile.phoneNumber}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {n.profile &&
                        moment(n.profile.createdAt).format(
                          "MM-DD-YYYY",moment.HTML5_FMT.DATE
                        )}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <FormControl>
                        <Select
                          value={n.userBanStatus}
                          name="userBanStatus"
                          className="w-full"
                          onChange={event => handleChangeUserData(event, n)}
                        >
                          <MenuItem value="">
                            <em>Select</em>
                          </MenuItem>
                          <MenuItem value={0}>UnBan</MenuItem>
                          <MenuItem value={1}>Ban</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <FormControl>
                        <Select
                          value={n.provider}
                          name="provider"
                          className="w-full"
                          onChange={event => handleChangeUserData(event, n)}
                        >
                          <MenuItem value="">
                            <em>Select</em>
                          </MenuItem>
                          <MenuItem value={"wework"}>WeWork</MenuItem>
                          <MenuItem value={"spacenow"}>Spacenow</MenuItem>
                          <MenuItem value={"generic"}>Generic</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell component="th" scope="row" align="center">
                      {n.userVerifiedInfo.isEmailConfirmed ? (
                        <Icon className="text-green text-20">check_circle</Icon>
                      ) : (
                        <Icon className="text-red text-20">remove_circle</Icon>
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

export default withRouter(UsersTable);
