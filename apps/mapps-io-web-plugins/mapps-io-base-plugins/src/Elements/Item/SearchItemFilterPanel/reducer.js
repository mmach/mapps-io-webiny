import FITLER_SEARCH_ACTIONS from "./actions";

const emptyState = {
    search: { version: -1 },
    aggs: [],
    categories: [],
    catOptions: [],
    loading: false,
    catAbovePin: [],
    currentInstances: [],
    categoryOptionsType: []
};
export default function FilterSearchReducer(state = Object.assign({}, emptyState), action) {
    switch (action.type) {
        case FITLER_SEARCH_ACTIONS.ON_INIT_SEARCH: {
            const result = Object.assign({}, state);
            
            result.search.id = undefined;
            result.aggs = [];
            result.categories = [];
            result.loading = true;
            return result;
        }
        case FITLER_SEARCH_ACTIONS.GET_CATEGORIES_TYPE_FETCH.SUCCESS: {
            const result = Object.assign({}, state);
            result.categoryOptionsType = action.data;
            return result;
        }
        case FITLER_SEARCH_ACTIONS.ON_MAP_INIT: {
            const result = Object.assign({}, state);
            const obj = Object.assign({}, result.search);
            obj.lat = action.currentPosition[0];
            obj.lon = action.currentPosition[1];
            result.search = obj;
            return result;
        }

        case FITLER_SEARCH_ACTIONS.SET_CATEGORIES_SEARCH: {
            const result = Object.assign({}, state);
            result.categories = action.dto.categories;
            return result;
        }
        case FITLER_SEARCH_ACTIONS.SEARCH_ITEM_FETCH.SUCCESS: {
            const result = Object.assign({}, state);
            result.aggs = action.data.aggs;
            return result;
        }

        case FITLER_SEARCH_ACTIONS.SEARCH_ITEM_FETCH.LOADING: {
            const result = Object.assign({}, state);
            result.aggs = [];
            result.loading = true;
            return result;
        }

        case FITLER_SEARCH_ACTIONS.SEARCH_ITEM_FETCH.FINALLY: {
            const result = Object.assign({}, state);
            result.loading = false;
            return result;
        }
        case FITLER_SEARCH_ACTIONS.SET_SEARCH_PARAMS: {
            const result = Object.assign({}, state);

            result.search = {
                ...result.search,
                ...action.dto.search,
                version:
                    action.dto.search.version == undefined
                        ? result.search.version
                        : result.search.version + 1
            };
            if (action.dto.search.tag) {
                result.search.tag = [...action.dto.search.tag];
            }
            //   result.search.tag=Object.assign({}, result.search.tag);

            return result;
        }
        case FITLER_SEARCH_ACTIONS.SET_CAT_ABOVE_PIN: {
            const result = Object.assign({}, state);

            result.catAbovePin = [...action.dto];

            return result;
        }
        case FITLER_SEARCH_ACTIONS.SET_CATEGORY_OPTIONS: {
            const result = Object.assign({}, state);

            result.catOptions = [...action.dto];

            return result;
        }
        case FITLER_SEARCH_ACTIONS.MOUNT_INSTANCE_OF_ENGINE: {
            const result = Object.assign({}, state);

            result.currentInstances = [
                ...result.currentInstances,
                result.currentInstances.length == 0
                    ? {
                          id: action.dto,
                          is_main: true
                      }
                    : { id: action.dto }
            ];

            return result;
        }
        case FITLER_SEARCH_ACTIONS.UNMOUNT_INSTANCE_OF_ENGINE: {
            const result = Object.assign({}, state);

            result.currentInstances = [
                ...result.currentInstances.filter((i) => {
                    return i.id != action.dto;
                })
            ];
            if (result.currentInstances[0]) {
                result.currentInstances[0].is_main = true;
            }

            return result;
        }
        default: {
            return state;
        }
    }
}
