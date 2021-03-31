import { BodyLoader } from "../../Components";
import React from "react";
export const BodyLoaderPlugin = {
    name: "mapps-component-body-loader",
    type: "mapps-component",
    // eslint-disable-next-line react/display-name
    render: (props) => <BodyLoader {...props}></BodyLoader>
};
