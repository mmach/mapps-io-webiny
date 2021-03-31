import { plugins } from "@webiny/plugins";
import { WebinyInitPlugin } from "@webiny/app/types";
import welcomeScreenPlugins from "@webiny/app-plugin-admin-welcome-screen";
import routeNotFound from "./routeNotFound";
import basePlugins from "./base";
import adminPlugins from "./admin";
import i18nPlugins from "./i18n";
import i18nContentPlugins from "./i18nContent";
import securityPlugins from "./security";
import pageBuilderPlugins from "./pageBuilder";
import formBuilderPlugins from "./formBuilder";
import headlessCmsPlugins from "./headlessCms";
import theme from "theme";
import WebinyAdminPlugins from "mapps-io-admin-webiny-plugins/src/index.js";
import WebinyPlugins from "mapps-io-webiny-plugins/src/index.js";
import WebinyPluginsRender from "mapps-io-webiny-plugins/src/render.js";
import * as MappsWebinyPlugins from "mapps-io-webiny-plugins/src/mappsPluginSet";
import { MappsPlugins } from "mapps-io-base-plugins/src/plugins.js";
import { mappsPlugins } from "mapps-io-base-plugins/src/index.js";
import AdminPlugins from "mapps-io-admin-plugins/src/plugins.js";
import * as MappsWebinyPluginsAdmin from "mapps-io-webiny-plugins/src/mappsAdminPluginSet.js";



mappsPlugins.register(Object.values(MappsPlugins));
mappsPlugins.register(Object.values(MappsWebinyPlugins));
mappsPlugins.register(Object.values(AdminPlugins));
mappsPlugins.register(Object.values(MappsWebinyPluginsAdmin));

plugins.register([
    /**
     * Base app plugins (files, images).
     */
    basePlugins,
    /**
     * Complete admin app UI.
     */
    adminPlugins,
    /**
     * Renders a welcome screen with useful links at "/".
     */
    welcomeScreenPlugins(),
    /**
     * Handles location paths that don't have a corresponding route.
     */
    routeNotFound,
    /**
     * Internationalization app.
     */
    i18nPlugins,
    /**
     * Enables storing content (pages, forms, content, ...) in multiple locales.
     */
    i18nContentPlugins,
    /**
     * Security app and authentication plugins.
     */
    securityPlugins,
    /**
     * Page Builder app.
     */
    pageBuilderPlugins,
    /**
     * Form Builder app.
     */
    formBuilderPlugins,
    /**
     * Headless CMS app.
     */
    headlessCmsPlugins,
    /**
     * App theme controls page builder and form builder layouts, styles, etc.
     */
    theme(),
    ...WebinyAdminPlugins, ...WebinyPlugins, ...WebinyPluginsRender
]);

/**
 *
 */
plugins.byType<WebinyInitPlugin>("webiny-init").forEach(plugin => plugin.init());
