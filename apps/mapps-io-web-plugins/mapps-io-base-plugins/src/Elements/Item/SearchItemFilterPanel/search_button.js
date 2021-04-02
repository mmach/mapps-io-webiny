/*
    ./client/components/App.js
*/

import Fab from "@material-ui/core/Fab";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";
import { connect } from "react-redux";
import { mappsPlugins } from "../../..";
import { DRAWER_ACTIONS } from "../../../Components";

function SearchFilterButtonVariant(props) {

    const drawer = React.useMemo(() => mappsPlugins.byName('mapps-item-search-filter-advance'));

    function openDrawer() {
        props.openDrawer(true, drawer.render(props), "left");
    }
    return (
        <   >
                <div style={{ display: "none" }}>
                    {drawer && drawer.render(props)}
                </div>
     
                <Fab
                    onClick={openDrawer}
                    aria-label="add"
                    style={{
                        position: "absolute",
                        zIndex: 500,
                        left: props.mappsSettings.searchButton.left,
                        top: props.mappsSettings.searchButton.top,
                        bottom: props.mappsSettings.searchButton.bottom,
                        right: props.mappsSettings.searchButton.right
                    }}
                >
                    <SearchIcon />
                </Fab>
           
        </>
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

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(SearchFilterButtonVariant));
