import { QueryList, CommandList } from "justshare-shared";
import {ActionsGen} from "mapps-io-base-plugins/src/App/index.js";

const CATEGORY_EDIT_ACTIONS = {
    GET_CATEGORY_OPTION_FETCH: ActionsGen(QueryList.CategoryOptions.GET_CATEGORY_OPTION),
    DELETE_CATEGORY_OPTIONS_FETCH: ActionsGen(CommandList.Category_Options.DELETE_CATEGORY_OPTIONS),
    DELETE_CATEGORY_OPTIONS_TEMPLATE_FETCH: ActionsGen(
        CommandList.Category_Options.DELETE_CATEGORY_OPTIONS_TEMPLATE
    ),
    UPSERT_CATEGORY_OPTIONS_FETCH: ActionsGen(CommandList.Category_Options.UPSERT_CATEGORY_OPTIONS),
    UPSERT_CATEGORY_OPTIONS_TEMPLATE_FETCH: ActionsGen(
        CommandList.Category_Options.UPSERT_CATEGORY_OPTIONS_TEMPLATE
    ),
    ADD_EMPTY_OPTION: "ADD_EMPTY_OPTION",
    ADD_EMPTY_OPTION_ELEMENT: "ADD_EMPTY_OPTION_ELEMENT",
    UPDATE_EMPTY_ELEMENT: "UPDATE_EMPTY_ELEMENT",
    CLEAN: "CLEAN_OLD_ELEMENTS_OPTION"
};

export default CATEGORY_EDIT_ACTIONS;
