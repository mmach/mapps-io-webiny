import DRAWER_ACTIONS from "./actions";
import React from "react";

const emptyState = {
    open: false,
    anchor: "left",
    body: <span></span>,
    menu: undefined
};
export default function DrawerComponentReducer(state = { ...emptyState }, action) {
    switch (action.type) {
        case DRAWER_ACTIONS.OPEN_DRAWER: {
            const result = Object.assign({}, state);
            result.open = action.dto.open;
            result.body = action.dto.body;
            result.anchor = action.dto.anchor;
            result.menu = action.dto.menu;

            return result;
        }
        case DRAWER_ACTIONS.CLOSE_DRAWER: {
            const result = Object.assign({}, state);
            result.open = false;

            return result;
        }

        default: {
            return state;
        }
    }
}
