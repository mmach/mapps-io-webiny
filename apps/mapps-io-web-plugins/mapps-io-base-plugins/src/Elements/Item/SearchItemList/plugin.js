import SearchItemList from ".";
import React from "react";
import ListSearchButton from "./searchButton";
import ItemListElement from "./listElement";
import SearchItemPagination from "./pagination";
export const SearchItemListPlugins = [
    {
        name: "mapps-item-search-container-view-list",
        type: "mapps-item-search-container-results",
        mappsKey: "LIST",
        // eslint-disable-next-line react/display-name
        containerRender: (props) => {
            return <SearchItemList {...props} />;
        },

        // eslint-disable-next-line react/display-name
        searchButtonRender: (props) => {
            return <ListSearchButton {...props} mappsKey="LIST" />;
        },
        // eslint-disable-next-line react/display-name
        searchFilterRender: () => {
            return <span></span>;
        }
    },
    {
        name: "mapps-item-search-container-view-list-element",
        type: "mapps-item-search-container-results-list-element",
        // eslint-disable-next-line react/display-name
        render: (props) => {
            return <ItemListElement {...props} />;
        }
    },
    {
        name: "mapps-item-search-container-view-list-pagination",
        type: "mapps-item-search-container-results-pagination",
        // eslint-disable-next-line react/display-name
        render: (props) => {
            return <SearchItemPagination {...props} />;
        }
    }
];
