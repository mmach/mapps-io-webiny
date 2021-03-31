import SearchItemList from "./../../Elements/Item/SearchItemList/";
import React from "react";
import ListSearchButton from "./../../Elements/Item/SearchItemList/searchButton";
import ItemListElement from "./../../Elements/Item/SearchItemList/listElement";
import SearchItemPagination from "./../../Elements/Item/SearchItemList/pagination";
import ItemListElementPhone from "./../../Elements/Item/SearchItemList/listElementPhone";


export const SearchItemListPlugin = {
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
};
export const SearchItemListElementPlugin = {
    name: "mapps-item-search-container-view-list-element",
    type: "mapps-item-search-container-results-list-element",
    // eslint-disable-next-line react/display-name
    render: (props) => {
        return <ItemListElement {...props} />;
    }
};
export const SearchItemListElementPhonePlugin = {
    name: "mapps-item-search-container-view-list-element-phone",
    type: "mapps-item-search-container-results-list-element",
    // eslint-disable-next-line react/display-name
    render: (props) => {
        return <ItemListElementPhone {...props} />;
    }
};

export const SearchItemListPaginationPlugin = {
    name: "mapps-item-search-container-view-list-pagination",
    type: "mapps-item-search-container-results-pagination",
    // eslint-disable-next-line react/display-name
    render: (props) => {
        return <SearchItemPagination {...props} />;
    }
};
