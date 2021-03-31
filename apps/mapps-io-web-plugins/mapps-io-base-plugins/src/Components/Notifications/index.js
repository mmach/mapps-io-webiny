import Snackbar from "@material-ui/core/Snackbar";
import { AlertTitle } from "@material-ui/lab";
import MuiAlert from "@material-ui/lab/Alert";
import { Enums } from "justshare-shared";
import React from "react";
import { connect } from "react-redux";
import { NOTIFICATIONS_ACTIONS } from "./actions";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function Notification(props) {
    function onDismiss(event) {
        props.removeNotification(event.currentTarget.getAttribute("data-tag"));
    }

    return (
        <Snackbar
            open={props.notification.length > 0}
            autoHideDuration={6000}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
            <div>
                {props.notification.length > 0 &&
                    props.notification.map((item, index) => {
                        let color = "";

                        let header = "";
                        if (item.type == Enums.CODE.ERROR_GLOBAL) {
                            color = "error";
                            header = <AlertTitle>Error</AlertTitle>;
                        } else if (item.type == Enums.CODE.INFO_GLOBAL) {
                            color = "info";
                            header = <AlertTitle>Info</AlertTitle>;
                        } else if (item.type == Enums.CODE.WARNING_GLOBAL) {
                            color = "warning";
                            header = <AlertTitle>Warning</AlertTitle>;
                        } else if (item.type == Enums.CODE.SUCCESS_GLOBAL) {
                            color = "success";
                            header = <AlertTitle>Success</AlertTitle>;
                        }
                        return (
                            <div key={item.guid} style={{ cursor: "pointer", margin: "3px" }}>
                                <Alert
                                    severity={color}
                                    data-tag={item.guid}
                                    key={index}
                                    onClick={onDismiss.bind(this)}
                                >
                                    {header}
                                    {item.message}
                                </Alert>
                            </div>
                        );
                    })}
            </div>
        </Snackbar>
    );
}
const mapStateToProps = (state) => {
    return {
        lang: state.LanguageReducer,
        codeDict: state.DictionaryReducer,
        notification: state.NotificationReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        removeNotification: (data) => {
            dispatch({
                type: NOTIFICATIONS_ACTIONS.REMOVE_NOTIFICATION_GLOBAL,
                notification: data
            });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Notification));
