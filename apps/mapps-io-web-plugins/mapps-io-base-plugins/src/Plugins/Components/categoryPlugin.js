import React from "react";
import { CategoryFilter } from "../../Components";
import { SetCategory } from "../../Elements";

export const CategoryPlugin = {
    name: "mapps-item-component-categories-filter-default",
    type: "mapps-item-component-categories-fiter",
    // eslint-disable-next-line react/display-name
    render: (props) => {
        return <CategoryFilter {...props} />;
    }
};

export const CategorySetLeafPlugin = {
    name: "mapps-item-component-categories-leaf-default",
    type: "mapps-item-component-categories-leaf",
    // eslint-disable-next-line react/display-name
    render: (props) => {
        return <SetCategory {...props}></SetCategory>;
    }
};

