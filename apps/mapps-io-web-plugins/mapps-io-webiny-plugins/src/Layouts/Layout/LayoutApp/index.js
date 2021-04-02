import React, { useMemo } from "react";
//import { Addons } from "@webiny/app/components";
import { plugins } from "@webiny/plugins";

import "./style.scss";
import { mappsPlugins } from "mapps-io-base-plugins/src";
import { Scrollbars } from "react-custom-scrollbars";

const LayoutApp = ({ children }) => {
    const { header, footer } = useMemo(() => {
        const pluginsFound = plugins.byType("pb-layout-component-layout-app");
        return pluginsFound.reduce((acc, item) => {
            acc[item.componentType] = item.component;
            return acc;
        }, {});
    }, []);
    const deviceType = React.useMemo(() =>
        mappsPlugins.byName("mapps-item-use-device-type")
    ).useHook();

    const Header = header;
    const Footer = footer;
    return (
        <React.Fragment>
            <Header />
            {(deviceType.isMobile || deviceType.isMobileLandscape || deviceType.isTablet) ? (
                <div className="layoutApp" style={{ height: "calc(var(--app-height) - 50px - 35px)",position:'relative' }}>{children}</div>
            ):<div className="layoutApp" style={{ height: "calc(var(--app-height) - 85px - 48px)" ,position:'relative'}}>{children}</div>}
           

            <Footer />
        </React.Fragment>
    );
};
//          <Addons />

export default LayoutApp;
