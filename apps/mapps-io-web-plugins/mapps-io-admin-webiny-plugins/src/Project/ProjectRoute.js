import { AdminLayout } from "@webiny/app-admin/components/AdminLayout";
import { Route } from "@webiny/react-router";
import React from "react";
import { mappsPlugins } from "mapps-io-base-plugins/src/index.js";

export default [
    {
        type: "route",
        name: "route-mapps-project-storage-project",
        route: (
            <Route
                exact
                path="/mapps/project/blobs/project"
                render={(props) => {
                    const Comopnent =
                        mappsPlugins.byName("route-mapps-project-storage") &&
                        mappsPlugins.byName("route-mapps-project-storage").component;

                    return (
                        <AdminLayout {...props.location}>
                            <Comopnent {...props.location} storage="PROJECT"></Comopnent>
                        </AdminLayout>
                    );
                }}
            />
        )
    },
    {
        type: "route",
        name: "route-mapps-project-storage-categories",
        route: (
            <Route
                exact
                path="/mapps/project/blobs/categories"
                render={(props) => {
                    const Comopnent =
                        mappsPlugins.byName("route-mapps-project-storage") &&
                        mappsPlugins.byName("route-mapps-project-storage").component;

                    return (
                        <AdminLayout {...props.location}>
                            <Comopnent {...props.location} storage="CATEGORIES"></Comopnent>
                        </AdminLayout>
                    );
                }}
            />
        )
    },
    {
        type: "route",
        name: "route-mapps-project-storage-verify",
        route: (
            <Route
                exact
                path="/mapps/project/blobsVerify"
                render={(props) => {
                    const Comopnent =
                        mappsPlugins.byName("route-mapps-project-storage-verify") &&
                        mappsPlugins.byName("route-mapps-project-storage-verify").component;

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
        name: "route-mapps-project-storage-users",
        route: (
            <Route
                exact
                path="/mapps/project/blobs/users"
                render={(props) => {
                    const Comopnent =
                        mappsPlugins.byName("route-mapps-project-storage") &&
                        mappsPlugins.byName("route-mapps-project-storage").component;

                    return (
                        <AdminLayout {...props.location}>
                            <Comopnent {...props.location} storage="USERS"></Comopnent>
                        </AdminLayout>
                    );
                }}
            />
        )
    },
    {
        type: "route",
        name: "route-mapps-project-storage-items",
        route: (
            <Route
                exact
                path="/mapps/project/blobs/items"
                render={(props) => {
                    const Comopnent =
                        mappsPlugins.byName("route-mapps-project-storage") &&
                        mappsPlugins.byName("route-mapps-project-storage").component;

                    return (
                        <AdminLayout {...props.location}>
                            <Comopnent {...props.location} storage="ITEMS"></Comopnent>
                        </AdminLayout>
                    );
                }}
            />
        )
    },
    {
        type: "route",
        name: "route-mapps-project-projects",
        route: (
            <Route
                exact
                path="/mapps/project/settings"
                render={(props) => {
                    const Comopnent =
                        mappsPlugins.byName("route-mapps-project-projects") &&
                        mappsPlugins.byName("route-mapps-project-projects").component;

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
        name: "route-mapps-project-seo",
        route: (
            <Route
                exact
                path="/mapps/project/seo"
                render={(props) => {
                    const Comopnent =
                        mappsPlugins.byName("route-mapps-project-seo") &&
                        mappsPlugins.byName("route-mapps-project-seo").component;

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
        name: "route-mapps-project-dimmensions",
        route: (
            <Route
                exact
                path="/mapps/categories/dimensions"
                render={(props) => {
                    const Comopnent =
                        mappsPlugins.byName("route-mapps-project-dimmensions") &&
                        mappsPlugins.byName("route-mapps-project-dimmensions").component;

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
        name: "route-mapps-project-dimmensions-add",
        route: (
            <Route
                exact
                path="/mapps/categories/dimensions/add"
                render={(props) => {
                    const Comopnent =
                        mappsPlugins.byName("route-mapps-project-dimmensions-add") &&
                        mappsPlugins.byName("route-mapps-project-dimmensions-add").component;

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
        name: "route-mapps-project-user-types",
        route: (
            <Route
                path="/mapps/users/settings/types"
                render={(props) => {
                    const Comopnent =
                        mappsPlugins.byName("route-mapps-project-user-types") &&
                        mappsPlugins.byName("route-mapps-project-user-types").component;

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
        name: "route-mapps-project-users-list",
        route: (
            <Route
                path="/mapps/users"
                render={(props) => {
                    const Comopnent =
                        mappsPlugins.byName("route-mapps-project-users-list") &&
                        mappsPlugins.byName("route-mapps-project-users-list").component;

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
        name: "route-mapps-project-mails-globallist",
        route: (
            <Route
                path="/mapps/mails/global"
                render={(props) => {
                    const Comopnent =
                        mappsPlugins.byName("route-mapps-project-mails-globallist") &&
                        mappsPlugins.byName("route-mapps-project-mails-globallist").component;

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
        name: "route-mapps-project-mails-email-accounts",
        route: (
            <Route
                path="/mapps/mails/accounts"
                render={(props) => {
                    const Comopnent =
                        mappsPlugins.byName("route-mapps-project-mails-email-accounts") &&
                        mappsPlugins.byName("route-mapps-project-mails-email-accounts").component;

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
        name: "route-mapps-project-mails-templates",
        route: (
            <Route
                path="/mapps/mails/templates"
                render={(props) => {
                    const Comopnent =
                        mappsPlugins.byName("route-mapps-project-mails-templates") &&
                        mappsPlugins.byName("route-mapps-project-mails-templates").component;

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
