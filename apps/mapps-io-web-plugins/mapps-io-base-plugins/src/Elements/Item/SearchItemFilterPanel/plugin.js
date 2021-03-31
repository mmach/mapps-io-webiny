import { Grid } from "@material-ui/core";
import React from "react";
import SearchItemFilterPanel from ".";
import { ResponsiveMatch } from "../../../Components";
import SearchItemInitFilterPanel from "./searchInit";
import { Scrollbars } from "react-custom-scrollbars";

export const SearchItemFilterPlugins = [
    {
        name: "mapps-item-search-filter-advance",
        type: "mapps-item-search-filter",
        // eslint-disable-next-line react/display-name
        render: (props) => {
            return (
                <ResponsiveMatch
                    onDesktop={props.searchFilter.desktop.useSearch}
                    onPhone={props.searchFilter.mobile.useSearch}
                    onDesktopChildren={
                        <Grid
                            style={{
                                height: props.searchFilter.desktop.height,
                                width: props.searchFilter.desktop.width
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
                                    searchFilter={props.searchFilter.desktop}
                                ></SearchItemFilterPanel>
                            </Scrollbars>
                        </Grid>
                    }
                    onPhoneChildren={
                        <Grid
                            style={{
                                height: props.searchFilter.mobile.height,
                                width: props.searchFilter.mobile.width
                            }}
                        >
                            <Scrollbars
                                style={{
                                    width: "100%",
                                    height: "100%"
                                }}
                            >
                                <SearchItemFilterPanel
                                    {...props}
                                    searchFilter={props.searchFilter.mobile}
                                ></SearchItemFilterPanel>
                            </Scrollbars>
                        </Grid>
                    }
                ></ResponsiveMatch>
            );
        }
    },
    {
        name: "mapps-item-search-filter-init-engine",
        type: "mapps-item-search-filter-init",
        // eslint-disable-next-line react/display-name
        render: (props) => {
            return <SearchItemInitFilterPanel {...props} />;
        }
    }
];
