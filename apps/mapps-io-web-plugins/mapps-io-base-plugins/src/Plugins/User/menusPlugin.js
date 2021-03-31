const { LanguageIconHeader, LoginIconMenuHeader ,UserIconMenuHeader} = require("../../Elements");

export const LanguageIconHeaderPlugin = {
    name: "mapps-layout-menu-header-language",
    type: "mapps-layout-menu-icons",
    order:3,
    // eslint-disable-next-line react/display-name
    component:LanguageIconHeader
};

export const LoginIconMenuHeaderPlugin = {
    name: "mapps-layout-menu-header-login",
    type: "mapps-layout-menu-icons",
    order:2,
    // eslint-disable-next-line react/display-name
    component:LoginIconMenuHeader
};
export const UserIconMenuHeaderPlugin = {
    name: "mapps-layout-menu-header-user",
    type: "mapps-layout-menu-icons",
    order:1,
    // eslint-disable-next-line react/display-name
    component:UserIconMenuHeader
};
