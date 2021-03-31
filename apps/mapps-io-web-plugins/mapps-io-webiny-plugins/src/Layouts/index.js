import LayoutApp from "./Layout/LayoutApp/index.js";

import FooterCollapseRender from "./Footers/FooterCollapse/render.js";

import MainMenuSingleSticky from "./Menu/MainMenuSingleSticky/render.js";

export default [
    {
        name: "pb-page-layout-layout-app",
        type: "pb-page-layout",
        layout: {
            name: "Layout Desktop APP",
            title: "Layout Desktop - 100vh - static footer,manu",
            component: LayoutApp
        }
    },
    {
        name: "pb-layout-component-layout-app-header", // name of the header component
        type: "pb-layout-component-layout-app", // plugin type
        componentType: "header", // component type
        component: MainMenuSingleSticky // react component to render the header
    },
    {
        name: "pb-layout-component-layout-app-footer", // name of the header component
        type: "pb-layout-component-layout-app", // plugin type
        componentType: "footer", // component type
        component: FooterCollapseRender // react component to render the header
    }
];
