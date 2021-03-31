import { AdminLayout } from "@webiny/app-admin/components/AdminLayout";
import { Route } from "@webiny/react-router";
import React from "react";
import { mappsPlugins } from "mapps-io-base-plugins/src/index.js";

export default [
    {
        type: "route",
        name: "route-mapps-actions-privs",
        route: (
            <Route
                exact
                path="/mapps/permissions/actions/actions_privs"
                render={(props) => {
                    const Comopnent =
                        mappsPlugins.byName("route-mapps-actions-privs") &&
                        mappsPlugins.byName("route-mapps-actions-privs").component;

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
        name: "route-mapps-actions-new",
        // eslint-disable-next-line react/display-name
        route: (
            <Route
                exact
                path="/mapps/permissions/actions/new"
                render={(props) => {
                    const Comopnent =
                        mappsPlugins.byName("route-mapps-actions-new") &&
                        mappsPlugins.byName("route-mapps-actions-new").component;

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
        name: "route-mapps-actions-status",
        route: (
            <Route
                exact
                path="/mapps/permissions/actions/status"
                render={(props) => {
                    const Comopnent =
                        mappsPlugins.byName("route-mapps-actions-status") &&
                        mappsPlugins.byName("route-mapps-actions-status").component;

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
        name: "route-mapps-actions-action",
        route: (
            <Route
                exact
                path="/mapps/permissions/actions/list"
                render={(props) => {
                    const Comopnent =
                        mappsPlugins.byName("route-mapps-actions-action") &&
                        mappsPlugins.byName("route-mapps-actions-action").component;

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
        name: "route-mapps-actions-process",
        route: (
            <Route
                exact
                path="/mapps/permissions/processes"
                render={(props) => {
                    const Comopnent =
                        mappsPlugins.byName("route-mapps-actions-process") &&
                        mappsPlugins.byName("route-mapps-actions-process").component;

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
        name: "route-mapps-actions-roles",
        route: (
            <Route
                exact
                path="/mapps/permissions/roles"
                render={(props) => {
                    const Comopnent =
                        mappsPlugins.byName("route-mapps-actions-roles") &&
                        mappsPlugins.byName("route-mapps-actions-roles").component;

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
        name: "route-mapps-actions-roles-add",
        route: (
            <Route
                exact
                path="/mapps/permissions/roles/add"
                render={(props) => {
                    const Comopnent =
                        mappsPlugins.byName("route-mapps-actions-roles-add") &&
                        mappsPlugins.byName("route-mapps-actions-roles-add").component;

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
        name: "route-mapps-actions-privileges",
        route: (
            <Route
                exact
                path="/mapps/permissions/privileges"
                render={(props) => {
                    const Comopnent =
                        mappsPlugins.byName("route-mapps-actions-privileges") &&
                        mappsPlugins.byName("route-mapps-actions-privileges").component;

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
        name: "route-mapps-actions-privileges-add",
        route: (
            <Route
                exact
                path="/mapps/permissions/privileges/add"
                render={(props) => {
                    const Comopnent =
                        mappsPlugins.byName("route-mapps-actions-privileges-add") &&
                        mappsPlugins.byName("route-mapps-actions-privileges-add").component;

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
        name: "route-mapps-actions-status-project",
        route: (
            <Route
                path="/mapps/status/project"
                render={(props) => {
                    const Comopnent =
                        mappsPlugins.byName("route-mapps-actions-status-project") &&
                        mappsPlugins.byName("route-mapps-actions-status-project").component;

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
        name: "route-mapps-actions-status-global",
        route: (
            <Route
                path="/mapps/status/global"
                render={(props) => {
                    const Comopnent =
                        mappsPlugins.byName("route-mapps-actions-status-global") &&
                        mappsPlugins.byName("route-mapps-actions-status-global").component;

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
        name: "route-mapps-categories-cat",
        route: (
            <Route
                strict
                path="/mapps/categories/categories"
                render={(props) => {
                    const Comopnent =
                        mappsPlugins.byName("route-mapps-categories-cat") &&
                        mappsPlugins.byName("route-mapps-categories-cat").component;

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
        name: "route-mapps-actions-catopt",
        route: (
            <Route
                path="/mapps/categories/categoriesOptions/:id"
                render={(props) => {
                    const Comopnent =
                        mappsPlugins.byName("route-mapps-actions-catopt") &&
                        mappsPlugins.byName("route-mapps-actions-catopt").component;

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
