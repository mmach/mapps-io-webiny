import element from "./admin/element.js";
import settings from "./admin/settings.js";

export default [element("mapps-redirect-user"), ...(settings("mapps-redirect-user"))];
