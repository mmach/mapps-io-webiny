import React from "react";
import { PreviewItem } from "../../Elements";
import PreviewItemOptions from "../../Elements/Item/PreviewItemOptions";

export const PreviewItemPlugin = {
    name: "mapps-item-preview-item-default",
    type: "mapps-item-preview",
    // eslint-disable-next-line react/display-name
    render: (props) => {
        return <PreviewItem {...props}></PreviewItem>;
    }
};

export const PreviewItemCategoryOptionsPlugin = {
    name: "mapps-item-preview-item-options-default",
    type: "mapps-item-preview-options",
    // eslint-disable-next-line react/display-name
    render: (props) => {
        return <PreviewItemOptions {...props}></PreviewItemOptions>;
    }
};
