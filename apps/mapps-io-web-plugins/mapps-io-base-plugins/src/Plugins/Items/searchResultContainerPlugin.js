import React from "react";
import SearchItemResultsView from "./../../Elements/Item/SearchItemResultsView";


export const SearchItemResultsViewPlugin = {
    name: "mapps-item-search-results",
    type: "mapps-item-search-results-dispatcher",
    // eslint-disable-next-line react/display-name
    render: (props) => {
        return <SearchItemResultsView {...props} />;
    },
};
