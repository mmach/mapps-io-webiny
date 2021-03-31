import SearchItemMap from ".";
import React from "react";
import MapSearchButton from "./searchButton";
import MapPin from "./pin";
import PinTooltip from "./tooltip";
import MapView from "./map";
import MapSearchFilter from "./searchButtonFilter";

export const SearchItemMapPlugins = [
    {
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
    },
    {
        name: "mapps-item-search-container-view-map-container",
        type: "mapps-item-search-container-results-map-container",
        // eslint-disable-next-line react/display-name
        render: (props) => {
            return <MapView {...props}  />;
        }
    },
    {
        name: "mapps-item-search-container-view-map-pin",
        type: "mapps-item-search-container-results-map-pin",

        // eslint-disable-next-line react/display-name
        render: (props) => {
            return <MapPin {...props} />;
        }
    },
    {
        name: "mapps-item-search-container-view-map-tooltip",
        type: "mapps-item-search-container-results-map-pin-tooltip",

        // eslint-disable-next-line react/display-name
        render: (props) => {
            return <PinTooltip {...props} />;
        }
    }
];
