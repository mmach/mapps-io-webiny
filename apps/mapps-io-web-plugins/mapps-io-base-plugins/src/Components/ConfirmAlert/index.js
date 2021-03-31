import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import React from "react";
import { connect } from "react-redux";
import DIALOG_ALERT_ACTIONS from "./actions.js";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function DialogConfirm(props) {

    const handleClose = () => {
        props.closeWindow();
        props.dialog.onClose();
    };
    return (
        <Dialog
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            open={props.dialog.open}
        >
            {props.dialog.body}
        </Dialog>
    );
}

const mapStateToProps = (state) => {
    return {
        dialog: state.DialogAlertReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeAction: (open, action) => {
            dispatch({
                type: DIALOG_ALERT_ACTIONS.OPEN_DIALOG,
                dto: {
                    open: open,
                    action: action
                }
            });
        },
        closeWindow: () => {
            dispatch({
                type: DIALOG_ALERT_ACTIONS.CLOSE_DIALOG,
                dto: {
                    open: false
                }
            });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DialogConfirm);
