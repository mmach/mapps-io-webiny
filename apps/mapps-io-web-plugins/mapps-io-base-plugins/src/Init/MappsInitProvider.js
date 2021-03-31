import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { mappsPlugins } from "../index.js";
//import "./../../env.js";
import mappsInit from "./mappsInit.js";
import combineStore from "./store.js";
window.mapps_init = { loading: false };

function MappsInitProvider(props) {
    const [isLoading, setLoading] = useState(false);
    const [store, setStore] = useState(undefined);
    const reducersArray = React.useMemo(() => mappsPlugins.byType("mapps-reducers"));
    const bodyLoader = React.useMemo(() => mappsPlugins.byName("mapps-component-body-loader"));
    React.useEffect(() => {
        const reducers = {};
        reducersArray.forEach((i) => {
            reducers[i.reducerName] = i.reducer;
        });
        const storeInit = combineStore({ ...reducers, ...props.reducersList });
        setStore(storeInit);
        mappsInit(storeInit, setLoading);
    }, []);

    useEffect(() => {
        window.mapps_init.loading = isLoading;
    }, [isLoading]);

    if (isLoading == false && window.mapps_init.isInit == true) {
        window.mapps_store = store;
        return <Provider store={store}>{props.children}</Provider>;
    } else {
        return (
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                style={{ height: "100vh", display: "flex" }}
            >
                {bodyLoader.render({
                    thickness: 2,
                    size: "40px"
                })}
            </Grid>
        );
    }
}


export default React.memo(MappsInitProvider);
