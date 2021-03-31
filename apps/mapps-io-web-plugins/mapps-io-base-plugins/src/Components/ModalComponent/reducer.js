import MODAL_ACTIONS from "./actions";
import React from "react";

const emptyState = {
    open: false,
    body: <span></span>
};
export default function ModalComponentReducer(state = { ...emptyState }, action) {
    switch (action.type) {
        case MODAL_ACTIONS.OPEN_MODAL: {
            const result = Object.assign({}, state);
            result.open = action.dto.open;
            result.body = action.dto.body;
            return result;
        }
        case MODAL_ACTIONS.CLOSE_MODAL: {
            const result = Object.assign({}, state);
            result.open = false;
            return result;
        }

        default: {
            return state;
        }
    }
}
