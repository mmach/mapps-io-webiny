import ADD_PROFILE_IMAGE_ACTIONS from "./actions";

const emptyState = {
    images: [],

    getImagesIsLoading: false
};
export default function AddProfileImageReducer(state = Object.assign({}, emptyState), action) {
    switch (action.type) {
        case ADD_PROFILE_IMAGE_ACTIONS.ADD_PROFILE_IMAGE_LOADING: {
            const result = Object.assign({}, state);
            result.getImagesIsLoading = action.dto.loading;
            return result;
        }
        case ADD_PROFILE_IMAGE_ACTIONS.GET_USER_IMAGES.LOADING: {
            const result = Object.assign({}, state);
            result.getImagesIsLoading = true;
            return result;
        }
        case ADD_PROFILE_IMAGE_ACTIONS.GET_USER_IMAGES.FINALLY: {
            const result = Object.assign({}, state);
            result.getImagesIsLoading = false;
            return result;
        }
        case ADD_PROFILE_IMAGE_ACTIONS.GET_USER_IMAGES.SUCCESS: {
            const result = Object.assign({}, state);
            result.images = action.data;
            return result;
        }
        case ADD_PROFILE_IMAGE_ACTIONS.UPLOAD_IMAGE.FINALLY: {
            const result = Object.assign({}, state);
            result.getImagesIsLoading = false;
            return result;
        }
        case ADD_PROFILE_IMAGE_ACTIONS.UPLOAD_IMAGE.LOADING: {
            const result = Object.assign({}, state);
            result.getImagesIsLoading = true;
            return result;
        }
        default: {
            return state;
        }
    }
}
