import React from "react";
import { Button, CircularProgress } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles(() => {
  return createStyles({
    buttonProgress: {
      color: green[500],
      position: "absolute",
  
    }
  });
});
function ButtonLoader(props) {
  let loader;
  const classes = useStyles();

  let isDisable = false;
  if (props.isLoading == true) {
    loader = (
      <CircularProgress
        size={props.loaderSize ? props.loaderSize : 18}
        className={classes.buttonProgress}
      />
    );

    isDisable = true;
  }
  const result = (
    <Button
      variant={props.variant ? props.variant : "contained"}
      color={props.color}
      data-key={props["data-key"]}
      onClick={props.onClick}
      size={props.size}
      disabled={props.disabled ? props.disabled : isDisable}
      className={props.className}
    >
      {props.isLoading && loader}
      {props.value}
    </Button>
  );
  return result;
}

export default React.memo(ButtonLoader);
