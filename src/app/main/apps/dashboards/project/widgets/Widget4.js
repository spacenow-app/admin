import React, { useEffect, useState } from "react";
import { Icon, Typography, Paper, IconButton } from "@material-ui/core";

import { useDispatch, useSelector } from "react-redux";

import * as Actions from "./../store/actions";

function Widget4(props) {
  // const dispatch = useDispatch();

  // const state = useSelector(state => state);
  // console.log(state);

  // const users = useSelector(state => state);
  // //const searchText = useSelector(({ managment }) => managment.users.searchText);

  // const [selected, setSelected] = useState([]);
  // // const [data, setData] = useState(users);
  // const [page, setPage] = useState(0);
  // const [rowsPerPage, setRowsPerPage] = useState(10);
  // const [order, setOrder] = useState({
  //   direction: "asc",
  //   id: null
  // });

  // useEffect(() => {
  //   dispatch(Actions.getUsers());
  // }, [dispatch]);

 // console.log("users",state.projectDashboardApp.widgets.widget4.title);

  return (
    <Paper className="w-full rounded-8 shadow-none border-1">
      <div className="flex items-center justify-between pr-4 pl-16 pt-4">
        <Typography className="text-16">{props.widget4}</Typography>
        <IconButton aria-label="more">
          <Icon>more_vert</Icon>
        </IconButton>
      </div>
      <div className="text-center pt-12 pb-28">
        <Typography className="text-72 leading-none text-green">
          {props.widget4}
        </Typography>
        <Typography className="text-16" color="textSecondary">
          {props.widget4}
        </Typography>
      </div>
      <div className="flex items-center px-16 h-52 border-t-1">
        <Typography className="text-15 flex w-full" color="textSecondary">
          <span className="truncate">{props.widget4}</span>:
          <b className="pl-8">{props.widget4}</b>
        </Typography>
      </div>
    </Paper>
  );
}

export default React.memo(Widget4);
