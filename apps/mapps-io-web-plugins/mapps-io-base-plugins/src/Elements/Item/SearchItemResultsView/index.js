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
    const deviceType = React.useMemo(
        () => mappsPlugins.byName("mapps-item-use-device-type")
    ).useHook();

    const plugin = React.useMemo(() => containers.find(
        (i) => i.mappsKey == variant
    ), [variant])


    React.useEffect(() => {
        setVariant(props.filterSearchReducer.search.view);
    }, [props.filterSearchReducer.search.view]);

    return (
        <Grid item container style={{ width: "100%", height: props.element.data.containerSettings[deviceType.device].height, position: 'relative' }}>

            {plugin &&
                plugin.containerRender({
                    ...props,
                    mappsSettings:
                        props.element.data[variant] && props.element.data[variant][deviceType.device],
                        height:props.element.data.containerSettings[deviceType.device].height
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
