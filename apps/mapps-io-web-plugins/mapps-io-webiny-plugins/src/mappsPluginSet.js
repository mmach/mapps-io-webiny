import { Link, Route } from "@webiny/react-router";
import MenuWebiny from "./Webiny/Components/MenuWebiny";

export const MenuLinkDefaultPlugin = {
    name: "mapps-item-basic-link",
    type: "mapps-item-link",
    // eslint-disable-next-line react/display-name
    component: Link
};
export const RouteDefaultPlugin = {
    name: "mapps-item-basic-route",
    type: "mapps-item-link",
    // eslint-disable-next-line react/display-name
    component: Route
};

export const MappsQueryPlugin = {
    name: "mapps-menu-link-query",
    type: "mapps-menu-link-query",
    // eslint-disable-next-line react/display-name
    component: MenuWebiny
};
