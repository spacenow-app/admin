import React from "react";
import clsx from "clsx";
import _ from "@lodash";

export const statuses = [
  {
    id: 1,
    name: "Pending",
    slug: "pending",
    color: "bg-blue text-white"
  },
  {
    id: 2,
    name: "Cancelled",
    slug: "cancelled",
    color: "bg-green text-white"
  },
  {
    id: 3,
    name: "Timeout",
    slug: "timeout",
    color: "bg-green text-white"
  },
  {
    id: 4,
    name: "Requested",
    slug: "requested",
    color: "primary text-white"
  },
  {
    id: 5,
    name: "Approved",
    slug: "approved",
    color: "bg-green text-white"
  },
  {
    id: 6,
    name: "Declined",
    slug: "declined",
    color: "bg-red text-white"
  },
  // {
  //   id: 3,
  //   name: "Preparing the order",
  //   slug: "preparing_the_order",
  //   color: "bg-orange text-black"
  // },
  // {
  //   id: 4,
  //   name: "Completed",
  //   slug: "completed",
  //   color: "bg-purple text-white"
  // },
  // {
  //   id: 5,
  //   name: "Delivered",
  //   slug: "delivered",
  //   color: "bg-green-700 text-white"
  // },
  // {
  //   id: 6,
  //   name: "Canceled",
  //   slug: "cenceled",
  //   color: "bg-pink text-white"
  // },
  // {
  //   id: 7,
  //   name: "Refunded",
  //   slug: "refunded",
  //   color: "bg-red text-white"
  // },
  // {
  //   id: 8,
  //   name: "Payment error",
  //   slug: "payment_error",
  //   color: "bg-red-700 text-white"
  // },
  // {
  //   id: 9,
  //   name: "On pre-order (paid)",
  //   slug: "on_pre_order_paid",
  //   color: "bg-purple-300 text-white"
  // },
  // {
  //   id: 10,
  //   name: "Awaiting bank wire payment",
  //   slug: "awaiting_banking_wire_payment",
  //   color: "bg-blue text-white"
  // },
  // {
  //   id: 11,
  //   name: "Awaiting PayPal payment",
  //   slug: "awaiting_paypal_payment",
  //   color: "bg-blue-700 text-white"
  // },
  // {
  //   id: 12,
  //   name: "Remote payment accepted",
  //   slug: "remote_payment_accepted",
  //   color: "bg-green-800 text-white"
  // },
  // {
  //   id: 13,
  //   name: "On pre-order (not paid)",
  //   slug: "on_pre_order_not_paid",
  //   color: "bg-purple-700 text-white"
  // },
  // {
  //   id: 14,
  //   name: "Awaiting Cash-on-delivery payment",
  //   slug: "awaiting_cash_on_delivery_payment",
  //   color: "bg-blue-800 text-white"
  // }
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
