import SEARCH_ITEM_RESULT_ACTIONS from "./actions";

const emptyState = {
    total: [],
    items: [],
    currentElement: undefined,
    activeElement: undefined,
    loading: false
};
export default function SearchItemResultsViewReducer(
    state = Object.assign({}, emptyState),
    action
) {
    switch (action.type) {
        case SEARCH_ITEM_RESULT_ACTIONS.SET_ACTIVE_ELEMENT: {
            const result = Object.assign({}, state);
            // console.log(action.data);
            result.activeElement = action.dto.activeElement;
            return result;
        }
        case SEARCH_ITEM_RESULT_ACTIONS.SEARCH_ITEM_FETCH.SUCCESS: {
            const result = Object.assign({}, state);
            // console.log(action.data);
            //   result.items = JSON.parse(action.data.items);
            result.total = JSON.parse(action.data.total);

            return result;
        }
        case SEARCH_ITEM_RESULT_ACTIONS.ON_INIT_ITEM_SEARCH: {
            const result = Object.assign({}, state);
            result.items = [];
            result.total = 0;
            result.currentElement = undefined;
            // console.log(action.data);
            // result.items = [];
            return result;
        }
        case SEARCH_ITEM_RESULT_ACTIONS.SET_SEARCH_PARAMS: {
            const result = Object.assign({}, state);
            // console.log(action.data);
            // result.items = [];
            return result;
        }

        case SEARCH_ITEM_RESULT_ACTIONS.SEARCH_ITEM_FETCH.LOADING: {
            const result = Object.assign({}, state);
            result.items = [];
            result.total = 0;
            result.loading = true;
            return result;
        }
        case SEARCH_ITEM_RESULT_ACTIONS.SEARCH_ITEM_FETCH.FINALLY: {
            const result = Object.assign({}, state);
            //  result.loading = false
            return result;
        }
        case SEARCH_ITEM_RESULT_ACTIONS.ITEM_PROCESSED: {
            const result = Object.assign({}, state);
            result.loading = false;
            result.items = [...action.dto];

            return result;
        }
        case SEARCH_ITEM_RESULT_ACTIONS.SET_CURRENT_ELEMENT: {
            const result = Object.assign({}, state);
            result.currentElement = action.dto.currentElements;
            return result;
        }
        case SEARCH_ITEM_RESULT_ACTIONS.CLEAN_CURRENT_ELEMENT: {
            const result = Object.assign({}, state);
            result.currentElement = undefined;
            return result;
        }

        default: {
            return state;
        }
    }
}
