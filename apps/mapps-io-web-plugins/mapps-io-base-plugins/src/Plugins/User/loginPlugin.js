import React from "react";
import { Login } from "../../Elements";
import VariantNoText from "../../Elements/User/Forms/Login/View/no_text.js";
import VariantAdmin from "../../Elements/User/Forms/Login/View/admin.js";
import Variant1 from "../../Elements/User/Forms/Login/View/variant_1.js";

export const UserLoginPlugin = {
    name: "mapps-user-login-default",
    type: "mapps-user-login",
    // eslint-disable-next-line react/display-name
    render: (props) => {
        return <Login {...props}></Login>;
    }
};

export const UserLoginViewNoTextPlugin = {
    name: "mapps-user-login-view-no-text",
    type: "mapps-user-login-view",
    parent: "mapps-user-login-default",
    // eslint-disable-next-line react/display-name
    render: VariantNoText
};

export const UserLoginViewAdminPlugin = {
    name: "mapps-user-login-view-admin",
    type: "mapps-user-login-view",
    parent: "mapps-user-login-default",
    
    // eslint-disable-next-line react/display-name
    render: VariantAdmin
};
export const UserLoginViewPlugin = {
    name: "mapps-user-login-view-default",
    type: "mapps-user-login-view",
    parent: "mapps-user-login-default",
    
    // eslint-disable-next-line react/display-name
    render: Variant1
};
