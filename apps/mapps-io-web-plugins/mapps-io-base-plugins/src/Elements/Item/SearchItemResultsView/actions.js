import { QueryList } from "justshare-shared";
import ActionsGen from "../../../App/actions";

const SEARCH_ITEM_RESULT_ACTIONS = {
    SET_CATEGORIES_NEAR_THE_PIN: "SET_CATEGORIES_NEAR_THE_PIN",
    SET_CURRENT_ELEMENT: "SET_CURRENT_ELEMENT",
    CLEAN_CURRENT_ELEMENT: "CLEAN_CURRENT_ELEMENT",
    SEARCH_ITEM_FETCH: ActionsGen(QueryList.Item.SEARCH_ITEM),
    SET_ACTIVE_ELEMENT: "SET_ACTIVE_ELEMENT",
    ITEM_PROCESSED: "ITEM_PROCESSED"
};

export default SEARCH_ITEM_RESULT_ACTIONS;