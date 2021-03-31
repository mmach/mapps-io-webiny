import { AdminLayout } from "@webiny/app-admin/components/AdminLayout";
import { Route } from "@webiny/react-router";
import { mappsPlugins } from "mapps-io-base-plugins/src/index.js";
import React from "react";

export default [
    {
        type: "route",
        name: "route-mapps-project-items-payments-invoices",
        route: (
            <Route
                path="/mapps/items/payments/invoices"
                render={(props) => {
                    const Comopnent =
                        mappsPlugins.byName("route-mapps-project-items-payments-invoices") &&
                        mappsPlugins.byName("route-mapps-project-items-payments-invoices")
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
