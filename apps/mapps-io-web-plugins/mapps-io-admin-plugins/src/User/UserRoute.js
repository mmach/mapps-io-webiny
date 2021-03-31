/* eslint-disable react/display-name */
import React from "react";
import { Login, LogOut } from "mapps-io-base-plugins/src/Elements/index.js";

export default [
    {
        type: "mapps-admin-route",
        name: "route-mapps-user-login",
        render: props => {
            return <Login {...props}></Login>;
        }
    },
    {
        type: "mapps-admin-route",
        name: "route-mapps-user-logout",
        render: props => {
            return <LogOut {...props}></LogOut>;
        }
    }
];
