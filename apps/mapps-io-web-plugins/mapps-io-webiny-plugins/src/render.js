import UserRender from "./User/render.js";
import Slate from "./Components/render.js";
import Common from "./Common/render.js";
import Items from "./Items/render.js";
import Providers from "./Providers/index.js";
import Layouts from "./Layouts/index.js";
export default [...UserRender, ...Slate, ...Common, ...Items, ...Providers, ...Layouts];
