import React from "react";
import { LogOut } from "../../Elements";
import Variant1 from "../../Elements/User/Forms/LogOut/View/variant1";

export const UserLogoutPlugin = {
    name: "mapps-user-logout-default",
    type: "mapps-user-editable-actions",
    // eslint-disable-next-line react/display-name
    render: (props) => {
        return <LogOut {...props}></LogOut>;
    }
};

export const UserLogoutViewPlugin = {
    name: "mapps-user-logout-view-default",
    parent: "mapps-user-logout-default",
    type: "mapps-user-logout-view",
    // eslint-disable-next-line react/display-name
    render: Variant1
};
