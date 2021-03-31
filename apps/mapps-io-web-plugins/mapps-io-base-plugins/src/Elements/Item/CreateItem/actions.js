import { QueryList, CommandList } from "justshare-shared";
import { ActionsGen } from "./../../../App/index.js";

const CREATE_ITEM_ACTIONS = {
    REMOVE_IMAGE: ActionsGen(CommandList.Blob.REMOVE_BLOB),
    GET_CATEGORY_OPTION_FETCH: ActionsGen(QueryList.CategoryOptions.GET_CATEGORY_OPTION),
    SET_CATEGORY: "SET_CATEGORY"
};

export default CREATE_ITEM_ACTIONS;
