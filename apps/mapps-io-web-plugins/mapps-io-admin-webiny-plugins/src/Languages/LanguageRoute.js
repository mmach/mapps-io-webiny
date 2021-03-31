import { AdminLayout } from "@webiny/app-admin/components/AdminLayout";
import { Route } from "@webiny/react-router";
import { mappsPlugins } from "mapps-io-base-plugins/src/index.js";
import React from "react";

export default [
    {
        type: "route",
        name: "route-mapps-languages-list",
        route: (
            <Route
                exact
                path="/mapps/languages/languagesList"
                render={(props) => {
                    const Comopnent =
                        mappsPlugins.byName("route-mapps-languages-list") &&
                        mappsPlugins.byName("route-mapps-languages-list")
                            .component;

                    return (
                        <AdminLayout {...props.location}>
                            <Comopnent {...props.location}></Comopnent>
                        </AdminLayout>
                    );
                }}
            />
        )
    },
    {
        type: "route",
        name: "route-mapps-languages-dictionaries",
        route: (
            <Route
                
                path="/mapps/languages/dictionaries"
                render={(props) => {
                    const Comopnent =
                        mappsPlugins.byName("route-mapps-languages-dictionaries") &&
                        mappsPlugins.byName("route-mapps-languages-dictionaries")
                            .component;

                    return (
                        <AdminLayout {...props.location}>
                            <Comopnent {...props.location}></Comopnent>
                        </AdminLayout>
                    );
                }}
            />
        )
    }
];
