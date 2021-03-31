import React from "react";
import { Register } from "../../Elements";
export const UserRegisterPlugin = {
    name: "mapps-user-register-default",
    type: "mapps-user-register",
    // eslint-disable-next-line react/display-name
    render: (props) => {
        return <Register {...props}></Register>;
    }
};
