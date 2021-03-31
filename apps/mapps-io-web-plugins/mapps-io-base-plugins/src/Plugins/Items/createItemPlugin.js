import React from "react";
import { CreateItem } from "../../Elements";

export const ItemCreatePlugin = {
    name: "mapps-item-create-default",
    type: "mapps-item-create",
    // eslint-disable-next-line react/display-name
    render: (props) => {
        return <CreateItem {...props}></CreateItem>;
    }
};
