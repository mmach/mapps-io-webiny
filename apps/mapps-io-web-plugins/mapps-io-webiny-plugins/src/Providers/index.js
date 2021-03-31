import React from "react";
import { mappsPlugins } from "mapps-io-base-plugins/src";
import MappsIOProvider from "./MappsIOProvider";


const Providers = [
    {
        type: "app-template-renderer",
        name: "app-template-renderer-init",
        render(children) {
            const InitProvider = mappsPlugins.byName("mapps-item-global-provider-init").component;
            return <InitProvider>{children}</InitProvider>;
        }
    },
    {
        type: "app-template-renderer",
        name: "app-template-renderer-singleton",
        render(children) {
            const SingletonProvider = mappsPlugins.byName("mapps-item-global-provider-singleton");
            return (
                <div>
                    {children}
                    {SingletonProvider.render()}
                </div>
            );
        }
    },
    {
        type: "app-template-renderer-main",
        name: "app-template-renderer-main",
        component:MappsIOProvider
    }
];

export default Providers;
