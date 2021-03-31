import { ComponentsReducers } from "./Components/index.js";
import { Reducers } from "./Reducers/index.js";
import LoginReducer from "./Elements/User/Forms/Login/reducer.js";
import RegisterReducer from "./Elements/User/Forms/Register/reducer.js";
import AddProfileImageReducer from "./Elements/User/Forms/AddProfileImage/reducer.js";
import SetLatlngReducer from "./Elements/User/Forms/SetLatlng/reducer.js";
import UserImageReducer from "./Elements/User/Forms/UserImage/reducer.js";
import CreateItemReducer from "./Elements/Item/CreateItem/reducer.js";
import FilterSearchReducer from "./Elements/Item/SearchItemFilterPanel/reducer.js";
import SearchItemResultsViewReducer from "./Elements/Item/SearchItemResultsView/reducer.js";

export default {
    ...Reducers,
    FilterSearchReducer,
    UserImageReducer,
    LoginReducer,
    RegisterReducer,
    AddProfileImageReducer,
    SetLatlngReducer,
    CreateItemReducer,
    SearchItemResultsViewReducer,
    ...ComponentsReducers
};
