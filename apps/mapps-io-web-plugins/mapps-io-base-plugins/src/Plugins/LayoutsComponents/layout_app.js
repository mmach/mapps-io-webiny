import FooterCollapseRender from "./../../Layouts/Footers/FooterCollapse/index.js";
import FooterCollapseMobileRender from "./../../Layouts/Footers/FooterCollapseMobile/index.js";

import MainMenuSingleSticky from "./../../Layouts/Menus/MainMenuSingleSticky/index.js";
import FooterNormal from "./../../Layouts/Footers/FooterNormal/index.js";
import MainMenuSingleStickyMobile from "../../Layouts/Menus/MainMenuSingleStickyMobile/index.js";

export const MenuSingleStickyPlugin = {
    name: "mapps-layout-header-single-sticky-desktop", // name of the header component
    type: "mapps-layout-component", // plugin type
    componentType: "header",
    component: MainMenuSingleSticky // react component to render the header
};
export const MenuSingleStickyPluginMobile = {
    name: "mapps-layout-header-single-sticky-mobile", // name of the header component
    type: "mapps-layout-component", // plugin type
    componentType: "header", // component type
    component: MainMenuSingleStickyMobile // react component to render the header
};
export const FooterCollapseLayoutPlugin = {
    name: "mapps-layout-footer-collapse-desktop", // name of the header component
    type: "mapps-layout-component", // plugin type
    componentType: "footer", // component type
    component: FooterCollapseRender // react component to render the header
};
export const FooterCollapseMobileLayoutPlugin = {
    name: "mapps-layout-footer-collapse-mobile", // name of the header component
    type: "mapps-layout-component", // plugin type
    componentType: "footer", // component type
    component: FooterCollapseMobileRender // react component to render the header
};
export const FooterBaseRenderPlugin = {
    name: "mapps-layout-footer-base-desktop", // name of the header component
    type: "mapps-layout-component", // plugin type
    componentType: "footer", // component type
    component: FooterNormal // react component to render the header
};
