import CATEGORY_EDIT_ACTIONS from "./actions";

const emptyState = {
    catOptions: []
};
export default function EditCategoryReducer(state = Object.assign({}, emptyState), action) {
    switch (action.type) {
        case CATEGORY_EDIT_ACTIONS.ADD_PROFILE_IMAGE_LOADING: {
            const result = Object.assign({}, state);
            result.getImagesIsLoading = action.dto.loading;
            return result;
        }
        case CATEGORY_EDIT_ACTIONS.GET_CATEGORY_OPTION_FETCH.SUCCESS: {
            const result = Object.assign({}, state);
            //   console.log(action.data);
            result.catOptions = action.data;
            return result;
        }
        case CATEGORY_EDIT_ACTIONS.DELETE_CATEGORY_OPTIONS_FETCH.SUCCESS: {
            const result = Object.assign({}, state);
            result.catOptions = result.catOptions.filter((item) => {
                return item.id != action.dto.id;
            });
            return result;
        }
        case CATEGORY_EDIT_ACTIONS.DELETE_CATEGORY_OPTIONS_TEMPLATE_FETCH.SUCCESS: {
            const result = Object.assign({}, state);
            result.catOptions = result.catOptions.map((item) => {
                if (item.id == action.dto.co_id) {
                    item.cat_opt_temp = item.cat_opt_temp.filter((opt) => {
                        return opt.id != action.dto.id;
                    });
                }
                return item;
            });
            //   console.log(result);
            return result;
        }
        case CATEGORY_EDIT_ACTIONS.UPSERT_CATEGORY_OPTIONS_FETCH.SUCCESS: {
            const result = Object.assign({}, state);
            result.catOptions = result.catOptions.map((item) => {
                if (item.id == action.dto.id) {
                    item = action.dto;
                }
                return item;
            });
            return result;
        }
        case CATEGORY_EDIT_ACTIONS.UPSERT_CATEGORY_OPTIONS_TEMPLATE_FETCH.SUCCESS: {
            const result = Object.assign({}, state);

            result.catOptions = result.catOptions.map((item) => {
                if (item.id == action.dto.co_id) {
                    item.cat_opt_temp = item.cat_opt_temp.map((opt) => {
                        if (opt.id == action.dto.id) {
                            opt = action.dto;
                        }
                        return opt;
                    });
                }
                return item;
            });
            //   console.log(result)
            //     console.log(action.dto)

            return result;
        }
        case CATEGORY_EDIT_ACTIONS.ADD_EMPTY_OPTION: {
            const result = Object.assign({}, state);

            result.catOptions.push({ id: action.dto.id, order: "100" });
            return result;
        }
        case CATEGORY_EDIT_ACTIONS.ADD_EMPTY_OPTION_ELEMENT: {
            const result = Object.assign({}, state);
            //     console.log(result);
            ///     console.log(action.dto)
            result.catOptions = result.catOptions.map((item) => {
                if (item.id == action.dto.co_id) {
                    const cott_id = item.cat_opt.cat_options_type_temp.filter((item) => {
                        return item.order == action.dto.order;
                    })[0];
                    //    console.log(cott_id)
                    if (item.cat_opt_temp == undefined) {
                        item.cat_opt_temp = [];
                    }
                    item.cat_opt_temp.push({
                        id: action.dto.id,
                        co_id: action.dto.co_id,
                        placeholder: action.dto.value
                            ? undefined
                            : action.dto.placeholder
                            ? action.dto.placeholder
                            : "NEW ELEMENT_" + action.dto.order
                            ? action.dto.order
                            : "",
                        order: action.dto.order ? action.dto.order : 0,
                        cott_id: cott_id ? cott_id : null,
                        value: action.dto.value
                    });
                }
                return item;
            });
            return result;
        }
        case CATEGORY_EDIT_ACTIONS.UPDATE_EMPTY_ELEMENT: {
            const result = Object.assign({}, state);
            //     console.log(action.dto)
            result.catOptions = result.catOptions.map((item) => {
                if (item.id == action.dto.id) {
                    return action.dto;
                }
                return item;
            });
            //  console.log(result)
            return result;
        }
        case CATEGORY_EDIT_ACTIONS.CLEAN: {
            const result = Object.assign({}, state);
            result.catOptions = [];

            return result;
        }

        default: {
            return state;
        }
    }
}
