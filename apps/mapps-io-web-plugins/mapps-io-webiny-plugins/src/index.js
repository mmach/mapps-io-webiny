import User from "./User/index.js";
import Items from "./Items/index.js";

import Groups from "./groups.js";
import Slate from "./Components/index.js";
import Settings from "./Settings/index.js";
import Common from "./Common/index.js";

export default [...User, Groups, ...Slate, ...Settings,...Common,...Items];
