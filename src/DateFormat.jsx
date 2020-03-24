import React from "react";
import { Router, Link, navigate } from "@reach/router";

const lookup = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

const DateFormat = props => {
  const { created_at } = props;

  const year = new Date(created_at).getFullYear();
  const month = new Date(created_at).getMonth();
  const day = new Date(created_at).getDate();
  const hour = new Date(created_at).getHours();
  const minute = new Date(created_at).getMinutes();
  const formattedDate = `${lookup[month]} ${day} ${hour}:${minute} (${year})`;

  return <>{formattedDate}</>;
};

export default DateFormat;
