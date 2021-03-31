import SearchItemMap from "./../../Elements/Item/SearchItemMap/";
import React from "react";
import MapSearchButton from "./../../Elements/Item/SearchItemMap/searchButton";
import MapPin from "./../../Elements/Item/SearchItemMap/pin";
import PinTooltip from "./../../Elements/Item/SearchItemMap/tooltip";
import MapView from "./../../Elements/Item/SearchItemMap/map";
import MapSearchFilter from "./../../Elements/Item/SearchItemMap/searchButtonFilter";

export const SearchItemMapPlugin = {
    name: "mapps-item-search-container-view-map",
    type: "mapps-item-search-container-results",
    mappsKey: "MAP",
    // eslint-disable-next-line react/display-name
    containerRender: (props) => {
        return <SearchItemMap {...props} />;
    },
    // eslint-disable-next-line react/display-name
    searchButtonRender: (props) => {
        return <MapSearchButton {...props} mappsKey="MAP" />;
    },
    // eslint-disable-next-line react/display-name
    searchFilterRender: (props) => {
        return <MapSearchFilter {...props} mappsKey="MAP" />;
    }
};
export const SearchMapContainerPlugin = {
    name: "mapps-item-search-container-view-map-container",
    type: "mapps-item-search-container-results-map-container",
    // eslint-disable-next-line react/display-name
    render: (props) => {
        return <MapView {...props} />;
    }
};
export const SearchMapPinPlugin = {
    name: "mapps-item-search-container-view-map-pin",
    type: "mapps-item-search-container-results-map-pin",

    // eslint-disable-next-line react/display-name
    render: (props) => {
        return <MapPin {...props} />;
    }
};
export const SearchMapPinTooltipPlugin = {
    name: "mapps-item-search-container-view-map-tooltip",
    type: "mapps-item-search-container-results-map-pin-tooltip",

    // eslint-disable-next-line react/display-name
    render: (props) => {
        return <PinTooltip {...props} />;
    }
};
