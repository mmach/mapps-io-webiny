import { Grid, Paper } from "@material-ui/core";
import { AdminLayout } from "@webiny/app-admin/components/AdminLayout";
import { Route } from "@webiny/react-router";
import React from "react";
import { mappsPlugins } from "mapps-io-base-plugins/src/index.js";
export default [
    {
        type: "route",
        name: "route-mapps-user-login",
        route: (
            <Route
                exact
                path="/mapps/user/login"
                render={(props) => {
                    const Comopnent =
                        mappsPlugins.byName("mapps-user-login-default") &&
                        mappsPlugins.byName("mapps-user-login-default").render;

                    return (
                        <AdminLayout {...props.location}>
                            <Grid
                                container
                                style={{
                                    height: "92vh",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                            >
                                <Paper style={{ width: "250px", height: "400px", padding: 20 }}>
                                    {Comopnent({
                                        ...props.location,
                                        mappsSettings: {
                                            mappsNameViewPlugin: "mapps-user-login-view-default",
                                            basicAuth: true,
                                            googleLogin: true,
                                            facebookLogin: true
                                        }
                                    })}
                                </Paper>
                            </Grid>
                        </AdminLayout>
                    );
                }}
            />
        )
    },
    {
        type: "route",
        name: "route-mapps-user-logout",
        route: (
            <Route
                exact
                path="/mapps/user/logout"
                render={(props) => {
                    const Comopnent =
                        mappsPlugins.byName("mapps-user-logout-default") &&
                        mappsPlugins.byName("mapps-user-logout-default").render;

                    return (
                        <AdminLayout {...props.location}>
                            <Grid
                                container
                                style={{
                                    height: "92vh",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                            >
                                <Paper style={{ width: "250px", height: "400px", padding: 20 }}>
                                    {Comopnent({
                                        ...props.location,
                                        mappsSettings: {
                                            mappsNameViewPlugin: "mapps-user-logout-view-default",
                                            basicAuth: true,
                                            googleLogin: true,
                                            facebookLogin: true
                                        }
                                    })}
                                </Paper>
                            </Grid>
                        </AdminLayout>
                    );
                }}
            />
        )
    }
];
