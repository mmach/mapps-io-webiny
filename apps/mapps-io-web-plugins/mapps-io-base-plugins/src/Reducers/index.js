import AUTH_ACTIONS from "./Auth/action";
import AuthReducer from "./Auth/reducer";
import CONFIG_ACTIONS from "./Config/actions";
import ConfigReducer from "./Config/reducer";
import { LANGUAGE_ACTIONS } from "./Language/actions";
import LanguageReducer from "./Language/reducer";
import { DICTIONARY_ACTIONS, DictionaryReducer } from "./Dictionary/index.js";

import { LOADER_ACTIONS, LoaderReducer } from "./Loader/index.js";
import PRIVILEGE_ACTIONS from "./Privileges/action";
import PrivilegeReducer from "./Privileges/reducer";

const Reducers = {
    ConfigReducer,
    AuthReducer,
    LanguageReducer,
    DictionaryReducer,
    LoaderReducer,
    PrivilegeReducer
};

export {
    LANGUAGE_ACTIONS,
    AUTH_ACTIONS,
    CONFIG_ACTIONS,
    LOADER_ACTIONS,
    DICTIONARY_ACTIONS,
    PRIVILEGE_ACTIONS,
    Reducers
};
