import React from "react";
import { Link, BrowserRouter, Route } from "react-router-dom";
import { MenuCategoriesVertical,MenuVariant2 } from "../../Components";

export const MenuVerticalDefaultPlugin = {
    name: "mapps-item-component-menu-vertical-default",
    type: "mapps-item-component-menu",
    // eslint-disable-next-line react/display-name
    render: (props) => {
        return <MenuCategoriesVertical {...props} variant="column"></MenuCategoriesVertical>;
    }
};
export const MenuHorizontalDefaultPlugin = {
    name: "mapps-item-component-menu-horizonal-default",
    type: "mapps-item-component-menu",
    // eslint-disable-next-line react/display-name
    render: (props) => {
        return <MenuCategoriesVertical {...props} variant="row"></MenuCategoriesVertical>;
    }
};
export const MenuHorizontalVariant2Plugin = {
    name: "mapps-item-component-menu-variant2",
    type: "mapps-item-component-menu",
    // eslint-disable-next-line react/display-name
    render: (props) => {
        return <MenuVariant2 {...props}></MenuVariant2>;
    }
};
export const MenuLinkDefaultPlugin = {
    name: "mapps-item-basic-link",
    type: "mapps-item-link",
    // eslint-disable-next-line react/display-name
    component: Link
};

export const BrowserRouteDefaultPlugin = {
    name: "mapps-item-basic-browser-route",
    type: "mapps-item-link",
    // eslint-disable-next-line react/display-name
    component: BrowserRouter
};

export const RouteDefaultPlugin = {
    name: "mapps-item-basic-route",
    type: "mapps-item-link",
    // eslint-disable-next-line react/display-name
    component: Route
};
