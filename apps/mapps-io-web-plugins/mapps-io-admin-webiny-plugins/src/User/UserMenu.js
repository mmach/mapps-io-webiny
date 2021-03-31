import React from "react";

export default {
    type: "admin-menu",
    name: "admin-menu-0-mapps-user",
    render({ Menu, Item }) {
        return (
            <Menu name="MappsIO User" label={"MappsIO User"}>
                <Item label={"Login"} path="/mapps/user/login" />
                <Item label={"Forgot password"} path="/mapps/user/forgot_password" />
                <Item label={"Create User"} path="/mapps/user/register" />
                <Item label={"Logout"} path="/mapps/user/logout" />

            </Menu>
        );
    }
};
