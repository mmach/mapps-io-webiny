import AUTH_ACTIONS from "./action";

const emptyState = {
    project_token: null,
    token: null,
    refresh_token: null,
    expired_date: null,
    is_logged: false,
    user: null
};
export default function AuthReducer(state = Object.assign({}, emptyState), action) {
    switch (action.type) {
        case AUTH_ACTIONS.IS_AUTH: {
            const result = Object.assign({}, state);
            result.token = action.dto.token ? action.dto.token : result.token;
            result.refresh_token = action.dto.token
                ? action.dto.refresh_token
                : result.refresh_token;
            result.user = action.dto.user;

            if (result.token) {
                result.is_logged = true;
            }
            return result;
        }
        case AUTH_ACTIONS.SET_USER_CONTEXT: {
            const result = Object.assign({}, state);
            result.user = action.dto;
            result.is_logged = true;
            return result;
        }
        case AUTH_ACTIONS.CLEAR_CONTEXT: {
            const result = Object.assign({}, state);
            result.token = null;
            result.token = null;
            result.is_logged = false;
            result.user = null;
            return result;
        }
        case AUTH_ACTIONS.LOGIN_BY_REFRESH_FETCH.SUCCESS: {
            /*  const result = Object.assign({}, state);
                  result.token = action.dto.token;
                  result.refresh_token = action.dto.refresh_token;
                  console.log(action)
                  result.user = action.data.user;
                  result.is_logged = true;
  
                  return result;*/
            return state;
        }

        case AUTH_ACTIONS.GET_USER_INFO_FETCH.SUCCESS: {
            /*  const result = Object.assign({}, state);
                  result.user = action.data;
                  result.is_logged = true;
                  return result;*/
            return state;
        }
        case AUTH_ACTIONS.GET_USER_INFO_FETCH.ERROR: {
            /*const result = Object.assign({}, state);
                result.token = null;
                result.token = null;
                result.is_logged = false;
                result.user = null;
                return result;*/
            return state;
        }
        case AUTH_ACTIONS.LOG_OUT_FETCH.SUCCESS: {
            const result = Object.assign({}, state);
            result.token = null;
            result.token = null;
            result.is_logged = false;
            result.user = null;
            return result;
        }
        case AUTH_ACTIONS.PROJECT_LOGIN_JS_FETCH.SUCCESS: {
            const result = Object.assign({}, state);
            result.project_token = action.data.token;
            return result;
        }
        case AUTH_ACTIONS.REMOVE_USER_FETCH.SUCCESS: {
            /*const result = Object.assign({}, state);
                result.token = null;
                result.token = null;
                result.is_logged = false;
                result.user = null;
                return result;*/
            return state;
        }
        default: {
            return state;
        }
    }
}
