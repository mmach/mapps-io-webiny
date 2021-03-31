/*
    ./client/components/App.js
*/
import Fade from "@material-ui/core/Fade";
import React from "react";

export default function FadeIn(props) {
  return <Fade in={true}>{props.children}</Fade>;
}
