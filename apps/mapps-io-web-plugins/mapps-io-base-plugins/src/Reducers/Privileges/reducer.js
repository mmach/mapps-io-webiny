import PRIVILEGE_ACTIONS from "./action";

const emptyState = {
  
    isLogged: false,
    loggedUser: null
};
export default function PrivilegeReducer(state = Object.assign({}, emptyState), action) {
    switch (action.type) {
        case PRIVILEGE_ACTIONS.IS_AUTH: {
            const result = Object.assign({}, state);
            
            result.loggedUser = action.dto.user;

                result.isLogged = true;
            
            return result;
        }
        case PRIVILEGE_ACTIONS.SET_USER_CONTEXT: {
            const result = Object.assign({}, state);
            result.loggedUser = action.dto;
            result.isLogged = true;
            return result;
        }
        case PRIVILEGE_ACTIONS.CLEAR_CONTEXT: {
            const result = Object.assign({}, state);
          
            result.isLogged = false;
            result.loggedUser = null;
            return result;
        }
      
        case PRIVILEGE_ACTIONS.LOG_OUT_FETCH.SUCCESS: {
            const result = Object.assign({}, state);
           
            result.isLogged = false;
            result.loggedUser = null;
            return result;
        }
        default: {
            return state;
        }
    }
}
