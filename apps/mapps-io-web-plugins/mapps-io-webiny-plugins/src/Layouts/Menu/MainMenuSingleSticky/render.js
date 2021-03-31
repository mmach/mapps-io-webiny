import * as React from "react";
import { mappsPlugins } from "mapps-io-base-plugins/src/index.js";
import MenuWebiny from "../../../Webiny/Components/MenuWebiny";

export default function MainMenu() {
    const deviceType = React.useMemo(
        () => mappsPlugins.byName("mapps-item-use-device-type")
    ).useHook();

    const MenuRender = React.useMemo(
        () => 
        {
            if(deviceType.isMobile || deviceType.isMobileLandscape || deviceType.isTablet )
            {
                return mappsPlugins.byName("mapps-layout-header-single-sticky-mobile")

            }else{
                return mappsPlugins.byName("mapps-layout-header-single-sticky-desktop")
                
            }
        }
     ,[deviceType]).component;
     

    return <MenuWebiny slug={"main-menu"} component={MenuRender} />;
}
