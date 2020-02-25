import React from "react";
import clsx from "clsx";
import _ from "@lodash";

export const statuses = [
  {
    id: 1,
    name: "Active",
    slug: "active",
    color: "bg-green text-white"
  },
  {
    id: 2,
    name: "Canceled",
    slug: "canceled",
    color: "bg-red text-white"
  },
  {
    id: 3,
    name: "Completed",
    slug: "completed",
    color: "bg-blue text-white"
  }
];


function Status(props) {
  return (
    <div
      className={clsx(
        "inline text-12 p-4 rounded truncate",
        _.find(statuses, { slug: props.name }).color
      )}
    >
      {props.name}
    </div>
  );
}

export default Status;
