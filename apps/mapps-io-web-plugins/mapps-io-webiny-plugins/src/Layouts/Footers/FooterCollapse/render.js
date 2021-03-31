import * as React from "react";
import { mappsPlugins } from "mapps-io-base-plugins/src/index.js";
import MenuWebiny from "../../../Webiny/Components/MenuWebiny";

export default function FooterMenu() {
   
    const deviceType = React.useMemo(
        () => mappsPlugins.byName("mapps-item-use-device-type")
    ).useHook();

    const FooterRender = React.useMemo(
        () => 
        {
            if(deviceType.isMobile || deviceType.isMobileLandscape || deviceType.isTablet )
            {
                return mappsPlugins.byName("mapps-layout-footer-collapse-mobile")

            }else{
                return mappsPlugins.byName("mapps-layout-footer-collapse-desktop")
                
            }
        }
     ,[deviceType]).component;
    return <MenuWebiny slug={"footer-menu"} component={FooterRender} />;
}
