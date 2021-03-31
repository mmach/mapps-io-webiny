/*
    ./client/components/App.js
*/

import React from "react";
import { connect } from "react-redux";
import MODAL_ACTIONS from "./actions.js";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: '20px'
    
  }
}));
function ModalComponent(props) {
  function onCloseModal() {
    props.closeWindow();
  }
  const classes = useStyles();
  const body = (
    <Modal
      open={props.modal.open}
      onClose={onCloseModal}
      center
      className={classes.modal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
    >
      <Fade in={props.modal.open}>
        <Paper className={classes.paper}>{props.modal.body}</Paper>
      </Fade>
    </Modal>
  );

  return body;
}

const mapStateToProps = (state) => {
  return {
    modal: state.ModalComponentReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeAction: (open, action) => {
      dispatch({
        type: MODAL_ACTIONS.OPEN_MODAL,
        dto: {
          open: open,
          action: action
        }
      });
    },
    closeWindow: () => {
      dispatch({
        type: MODAL_ACTIONS.CLOSE_MODAL,
        dto: {
          open: false
        }
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalComponent);
