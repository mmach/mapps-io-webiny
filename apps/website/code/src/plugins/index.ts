import imageComponent from "@webiny/app/plugins/image";
import { plugins } from "@webiny/plugins";
import { mappsPlugins } from "mapps-io-base-plugins/src/index.js";
import { MappsPlugins } from "mapps-io-base-plugins/src/plugins.js";
import WebinyPlugins from "mapps-io-webiny-plugins/src/index.js";
import * as MappsWebinyPlugins from "mapps-io-webiny-plugins/src/mappsPluginSet";
import WebinyPluginsRender from "mapps-io-webiny-plugins/src/render.js";
import theme from "theme";
import formBuilder from "./formBuilder";
import pageBuilder from "./pageBuilder";


console.log('cos jest nie tak')
mappsPlugins.register(Object.values(MappsPlugins));
mappsPlugins.register(Object.values(MappsWebinyPlugins));
console.log(mappsPlugins)
console.log(MappsPlugins)
console.log(mappsPlugins.byName("mapps-layout-header-header"));


plugins.register([imageComponent(), pageBuilder, formBuilder, theme(), ...WebinyPlugins, ...WebinyPluginsRender
]);
