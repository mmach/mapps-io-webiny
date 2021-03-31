import DIALOG_ALERT_ACTIONS from "./actions";
import React from "react";

const emptyState = {
    open: false,
    body: <span></span>
};
export default function DialogAlertReducer(state = { ...emptyState }, action) {
    switch (action.type) {
        case DIALOG_ALERT_ACTIONS.OPEN_DIALOG: {
            const result = Object.assign({}, state);
            result.open = action.dto.open;
            result.body = action.dto.body;
            result.onClose = action.dto.onClose;

            return result;
        }
        case DIALOG_ALERT_ACTIONS.CLOSE_DIALOG: {
            const result = Object.assign({}, state);
            result.open = false;
            result.body = <span></span>;
    
            return result;
        }

        default: {
            return state;
        }
    }
}
