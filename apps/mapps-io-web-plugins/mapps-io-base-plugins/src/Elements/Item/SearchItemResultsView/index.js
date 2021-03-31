/*
    ./client/components/App.js
*/

import { Grid, useMediaQuery } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";
import { connect } from "react-redux";
import { mappsPlugins } from "../../..";
import { DRAWER_ACTIONS } from "../../../Components";

function SearchItemResultView(props) {
    const [variant, setVariant] = React.useState();
    const containers = React.useMemo(() =>
        mappsPlugins.byType("mapps-item-search-container-results")
    );
    const isMobile = useMediaQuery("(max-width:991px)");
    const [device, setDevice] = React.useState("desktop");
    const [filterParams, setFilter] = React.useState({});

    const drawer = React.useMemo(() => mappsPlugins.byName(filterParams.mappsNamePlugin), [
        filterParams.mappsNamePlugin
    ]);

    React.useEffect(() => {
        if (isMobile) {
            setDevice("mobile");
            setFilter(props.element.data.searchFilter["mobile"]);
        } else {
            setDevice("desktop");
            setFilter(props.element.data.searchFilter["desktop"]);
        }
    }, [isMobile]);
    React.useEffect(() => {
        setVariant(props.filterSearchReducer.search.view);
    }, [props.filterSearchReducer.search.view]);
    const plugin = containers.find(
        (i) => i.mappsKey == variant && filterParams[variant] && filterParams[variant].isActive
    );
    function openDrawe() {
        props.openDrawer(true, drawer.render({ mappsSettings: filterParams }), "left");
    }
    return (
        <Grid item container style={{ width: "100%", height: "100%" }}>
            {filterParams.useSearch && drawer && (
                <div style={{ display: "none" }}>
                    {drawer.render({ mappsSettings: filterParams })}
                </div>
            )}
            {filterParams.useSearch && filterParams.useButton && (
                <Fab
                    onClick={openDrawe}
                    aria-label="add"
                    style={{
                        position: "absolute",
                        zIndex: 500,
                        left: filterParams.searchButton.left,
                        top: filterParams.searchButton.top,
                        bottom: filterParams.searchButton.bottom,
                        right: filterParams.searchButton.right
                    }}
                >
                    <SearchIcon />
                </Fab>
            )}
            {plugin &&
                plugin.containerRender({
                    ...props,
                    mappsSettings:
                        props.element.data[variant] && props.element.data[variant][device]
                })}
        </Grid>
    );
}

const mapStateToProps = (state) => {
    //console.log(state);

    return {
        codeDict: state.DictionaryReducer,
        lang: state.LanguageReducer,
        auth: state.AuthReducer,
        filterSearchReducer: state.FilterSearchReducer,
        drawerReducer: state.DrawerComponentReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        openDrawer: (open, body, anchor) => {
            dispatch({
                type: DRAWER_ACTIONS.OPEN_DRAWER,
                dto: {
                    open: open,
                    body: body,
                    anchor: anchor
                }
            });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(SearchItemResultView));
