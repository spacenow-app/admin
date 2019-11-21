import React from "react";
import { Paper, Input, Icon, Typography } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { SpacenowAnimate } from "@spacenow";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../store/actions";

function ListingsHeader(props) {
  const dispatch = useDispatch();
  const searchText = useSelector(({listingApp}) => listingApp.listings.searchText);
  const mainTheme = useSelector(({ spacenow }) => spacenow.settings.mainTheme);

  return (
    <div className="flex flex-1 w-full items-center justify-between">
      <div className="flex items-center">
        <SpacenowAnimate animation="transition.slideLeftIn" delay={300}>
          <Typography className="hidden sm:flex" variant="h6">
            External Listings
          </Typography>
        </SpacenowAnimate>
      </div>

      <div className="flex flex-1 items-center justify-center px-12">
        <ThemeProvider theme={mainTheme}>
          <SpacenowAnimate animation="transition.slideDownIn" delay={300}>
            <Paper
              className="flex items-center w-full max-w-512 px-8 py-4 rounded-8"
              elevation={1}
            >
              <Icon className="mr-8" color="action">
                list
              </Icon>

              <Input
                placeholder="Search"
                className="flex flex-1"
                disableUnderline
                fullWidth
                value={searchText}
                inputProps={{
                  "aria-label": "Search"
                }}
                onChange={ev => dispatch(Actions.setListingsSearchText(ev))}
              />
            </Paper>
          </SpacenowAnimate>
        </ThemeProvider>
      </div>
    </div>
  );
}

export default ListingsHeader;
