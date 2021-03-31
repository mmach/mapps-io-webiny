import CONFIG_ACTIONS from "./actions";


export default function ConfigReducer(
    state = {
        languages: [],
        project: {},
        actions: [],
        roles: [],
        privs: [],
        user_types: [],
        dimensions: [],
        privs_list: [],
        statuses: [],
        processes: []
    },
    action
) {
    switch (action.type) {
        case CONFIG_ACTIONS.GET_LANGUAGES_FETCH.SUCCESS: {
            const result = Object.assign({}, state);
            result.languages = action.data.map((item) => {
                return item.lang_details.code;
            });
            return result;
        }
        case CONFIG_ACTIONS.GET_PROJECT_INFO_FETCH.SUCCESS: {
            const result = Object.assign({}, state);
            result.project = action.data;
            return result;
        }
        case CONFIG_ACTIONS.GET_PROCESS_FETCH.SUCCESS: {
            const result = Object.assign({}, state);
            result.processes = action.data;
            return result;
        }

        case CONFIG_ACTIONS.GET_ACTIONS_FETCH.SUCCESS: {
            const result = Object.assign({}, state);

            result.actions = action.data.map((item) => {
          //      try {
                    return {
                        action: item.action_details.name,
                        for_category: item.action_details.for_category,
                        type: item.action_details.action_type,
                        func: item.func,
                        as_process: item.action_details.as_process,
                        process_id: item.process_id,
                        is_process_start: item.action_details.is_process_start,
                        is_process_invoker: item.action_details.is_process_invoker,
                        privileges: item.action_privileges.map((priv) => {
                            return {
                                id: priv.privilege_id,
                                name: priv.privileges.privilege_details.name
                            };
                        }),
                        statuses: item.statuses,
                        id: item.id
                    };
              //  } catch (err) {
               //     console.log(err);
              //  }
            });

            return result;
        }
        case CONFIG_ACTIONS.GET_ROLES_FETCH.SUCCESS: {
            const result = Object.assign({}, state);
            result.roles = action.data.map((item) => {
                return { role: item.role_detail.name, id: item.id };
            });
            return result;
        }
        case CONFIG_ACTIONS.GET_PRIVS_FETCH.SUCCESS: {
            const result = Object.assign({}, state);
            result.privs = action.data.map((item) => {
                return { privilege: item.privilege_details.name, id: item.id };
            });
            return result;
        }
        case CONFIG_ACTIONS.GET_USER_TYPES_FETCH.SUCCESS: {
            const result = Object.assign({}, state);
            result.user_types = action.data.map((item) => {
                return {
                    name: item.name,
                    translation: item.translation,
                    role: item.usertype_roles.map((role) => {
                        return {
                            id: role.id,
                            name: role.roles.role_detail.name
                        };
                    }),
                    id: item.id
                };
            });
            return result;
        }
        case CONFIG_ACTIONS.GET_DIM_FETCH.SUCCESS: {
            const result = Object.assign({}, state);
            result.dimensions = action.data.map((item) => {
                return {
                    name: item.dimension_details.name,
                    uniq: item.dimension_details.uniq_name,
                    cott_id: item.dimension_details.cott_id,
                    co_type_id: item.dimension_details.co_type_id,
                    id: item.id,
                    as_cat_ref: item.dimension_details.as_cat_ref
                };
            });
            return result;
        }
        case CONFIG_ACTIONS.GET_STATUS_FETCH.SUCCESS: {
            const result = Object.assign({}, state);
            result.statuses = action.data.map((item) => {
                return {
                    name: item.status.token,
                    status_id: item.status_id,
                    id: item.id,
                    translation: item.translation,
                    is_closed: item.is_closed
                };
            });
            return result;
        }
        case CONFIG_ACTIONS.SET_PRIVS_CONST: {
            const result = Object.assign({}, state);
            result.privs_list = action.dto;
            return result;
        }
        default: {
            return state;
        }
    }
}
