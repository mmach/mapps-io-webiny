import React from "react";
import { ApolloProvider } from "@apollo/react-components";
import { BrowserRouter, Switch, Route } from "@webiny/react-router";
import { PageBuilderProvider } from "@webiny/app-page-builder/contexts/PageBuilder";
import { createApolloClient } from "./components/apolloClient";
import Page from "./components/Page";
import WebinyPluginsRender from "mapps-io-webiny-plugins/src/render.js";
import './env.js'

export const App = () => {
    const MappsProviders =  WebinyPluginsRender.filter(i=>i.name=='app-template-renderer-main')[0].component

    return (
    <ApolloProvider client={createApolloClient()}>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <PageBuilderProvider>
                <MappsProviders>
                <Switch>
                    <Route path={"*"} component={Page} />
                </Switch>
                </MappsProviders>
            </PageBuilderProvider>
        </BrowserRouter>
    </ApolloProvider>
)
    }
