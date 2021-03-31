import LOGIN_ACTIONS from "./actions";

const emptyState = {
    auth: {
        token: undefined,
        refresh_token: undefined
    },
    logStep: 0,
    exception: undefined,
    isLoading: false
};
export default function LoginReducer(state = Object.assign({}, emptyState), action) {
    switch (action.type) {
        case LOGIN_ACTIONS.LOG_IN_INTERNAL_FETCH.SUCCESS: {
            const result = Object.assign({}, state);
            result.auth = Object.assign({}, action.data);
            result.exception = undefined;
            return result;
        }
        case LOGIN_ACTIONS.LOG_IN_INTERNAL_FETCH.LOADING: {
            const result = Object.assign({}, state);
            result.isLoading = true;
            return result;
        }
        case LOGIN_ACTIONS.LOG_IN_INTERNAL_FETCH.FINALLY: {
            const result = Object.assign({}, state);
            result.isLoading = false;
            return result;
        }

        case LOGIN_ACTIONS.GEN_REFRESH_TOKEN_FETCH.LOADING: {
            const result = Object.assign({}, state);
            result.isLoading = true;

            return result;
        }
        case LOGIN_ACTIONS.GEN_REFRESH_TOKEN_FETCH.FINALLY: {
            const result = Object.assign({}, state);
            result.isLoading = false;

            return result;
        }
        /*case LOGIN_ACTIONS.GET_REFRESH_TOKEN_FETCH.SUCCESS: {

            const result = Object.assign({}, state);
            result.isLoading = false;

            return result;
        }*/

        default: {
            return state;
        }
    }
}
