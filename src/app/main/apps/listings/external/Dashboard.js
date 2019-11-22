import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Typography } from '@material-ui/core';
import { makeStyles } from "@material-ui/styles";
import {fade} from '@material-ui/core/styles/colorManipulator';
import {Link} from 'react-router-dom';
import { SpacenowAnimateGroup, SpacenowAnimate } from "@spacenow";
import withReducer from "app/store/withReducer";
import * as Actions from "../store/actions";
import clsx from 'clsx';

import reducer from "../store/reducers";

const useStyles = makeStyles(theme => ({
  root    : {
      background: theme.palette.primary.main,
      color     : theme.palette.getContrastText(theme.palette.primary.main)
  },
  board   : {
      cursor                  : 'pointer',
      boxShadow               : theme.shadows[0],
      transitionProperty      : 'box-shadow border-color',
      transitionDuration      : theme.transitions.duration.short,
      transitionTimingFunction: theme.transitions.easing.easeInOut,
      background              : theme.palette.primary.dark,
      color                   : theme.palette.getContrastText(theme.palette.primary.dark),
      '&:hover'               : {
          boxShadow: theme.shadows[6]
      }
  },
  newBoard: {
      borderWidth: 2,
      borderStyle: 'dashed',
      borderColor: fade(theme.palette.getContrastText(theme.palette.primary.main), 0.6),
      '&:hover'  : {
          borderColor: fade(theme.palette.getContrastText(theme.palette.primary.main), 0.8)
      }
  },
  avatar: {
    width     : 72,
    height    : 72,
    padding   : 8,
    background: theme.palette.background.default,
    boxSizing : 'content-box',
    transition: theme.transitions.create('all', {
        duration: theme.transitions.duration.shortest,
        easing  : theme.transitions.easing.easeInOut,
    }),
    '& > img' : {
        borderRadius: '50%'
    }
}
}));

const Dashboard = props => {
  const dispatch = useDispatch();
  const external = useSelector(
    ({ listingApp }) => listingApp.listings.external
  );

  const classes = useStyles(props);

  useEffect(() => {
    dispatch(Actions.getUsersByProvider());
  }, [dispatch]);

  if (!external || !external.users || !external.users.length > 0) {
    return null;
  }

  return (

    <div className={clsx(classes.root, "flex flex-grow flex-shrink-0 flex-col items-center")}>

            <div className="flex flex-grow flex-shrink-0 flex-col items-center container px-16 md:px-24">

                <SpacenowAnimate>
                    <Typography className="mt-44 sm:mt-88 sm:py-24 text-32 sm:text-40 font-300" color="inherit">External Listings</Typography>
                </SpacenowAnimate>

                <div>
                    <SpacenowAnimateGroup
                        className="flex flex-wrap w-full justify-center py-32 px-16"
                        enter={{
                            animation: "transition.slideUpBigIn",
                            duration : 300
                        }}
                    >
                        {external.users.map((user, index) => (
                            <div className="w-224 h-224 p-16" key={index}>
                                <Link
                                    to={'/apps/listings/external/' + user.id}
                                    className={clsx(classes.board, "flex flex-col items-center justify-center w-full h-full rounded py-24")}
                                    role="button"
                                >
                                    <Avatar
                                      className={clsx(classes.avatar, "avatar")}
                                      alt="user photo"
                                      src={user.profile.picture && user.profile.picture !== '' ? user.profile.picture : "assets/images/avatars/profile.jpg"}
                                    />
                                    <Typography className="text-16 font-300 text-center pt-16 px-32" color="inherit">{user.profile.displayName}</Typography>
                                </Link>
                            </div>
                        ))}
                    </SpacenowAnimateGroup>
                </div>
            </div>
        </div>
  );
};

export default withReducer("listingApp", reducer)(Dashboard);
