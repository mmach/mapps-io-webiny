import CategoryTreeReducer from "./Cores/Categories/Scenes/CategoryTree/reducer.js";
import EditCategoryReducer from "./Cores/Categories/Scenes/EditCategory/reducer.js";
import StatusListReducer from "./Cores/Statuses/reducer.js";
import MailsListReducer from "./Project/Mails/MailsListGlobal/reducer.js";
import VerifyImageReducer from "./Project/VerifyImage/reducer.js";

const reducers = {
    VerifyImageReducer,
    MailsListReducer,
    StatusListReducer,
    EditCategoryReducer,
    CategoryTreeReducer
};

const ReducerArray = Object.keys(reducers).map((i) => {
    return {
        name: "mapps-reducer-" + i,
        type: "mapps-reducers",
        // eslint-disable-next-line react/display-name
        reducerName: i,
        reducer: reducers[i]
    };
});

export default ReducerArray;
