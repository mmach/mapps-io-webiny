import { Grid } from "@material-ui/core";
import React from "react";
import SearchItemFilterPanel from "./../../Elements/Item/SearchItemFilterPanel";
import SearchItemInitFilterPanel from "./../../Elements/Item/SearchItemFilterPanel/searchInit";
import { Scrollbars } from "react-custom-scrollbars";

export const SearchItemFilterPlugin = {
    name: "mapps-item-search-filter-advance",
    type: "mapps-item-search-filter",
    // eslint-disable-next-line react/display-name
    render: (props) => {
        if (props.mappsSettings.useSearch != true) {
            return <span></span>;
        }
        return (
            <Grid
                style={{
                    height: props.mappsSettings.height,
                    width: props.mappsSettings.width
                }}
            >
                <Scrollbars
                    style={{
                        width: "100%",
                        height: "100%"
                    }}
                    autoHide
                >
                    <SearchItemFilterPanel
                        {...props}
                        mappsSettings={props.mappsSettings}
                    ></SearchItemFilterPanel>
                </Scrollbars>
            </Grid>
        );
    }
};

export const SearchItemFilterInitEnginePlugin = {
    name: "mapps-item-search-filter-init-engine",
    type: "mapps-item-search-filter-init",
    // eslint-disable-next-line react/display-name
    render: (props) => {
        return <SearchItemInitFilterPanel {...props} />;
    }
};
