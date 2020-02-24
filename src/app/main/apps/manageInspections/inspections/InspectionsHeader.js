import React from "react";
import { Icon, Typography } from "@material-ui/core";
import { SpacenowAnimate } from "@spacenow";

function InspectionsHeader(props) {

  return (
    <div className="flex flex-1 w-full items-center justify-between">
      <div className="flex items-center">
        <SpacenowAnimate animation="transition.expandIn" delay={300}>
                  <Icon className="text-32 mr-0 sm:mr-12">credit_card</Icon>
        </SpacenowAnimate>
        <SpacenowAnimate animation="transition.slideLeftIn" delay={300}>
          <Typography className="hidden sm:flex" variant="h6">
            Inspections
          </Typography>
        </SpacenowAnimate>
      </div>
    </div>
  );
}

export default InspectionsHeader;
