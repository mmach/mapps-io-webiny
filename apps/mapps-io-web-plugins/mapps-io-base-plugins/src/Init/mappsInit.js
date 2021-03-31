import { LOADER_ACTIONS, AUTH_ACTIONS, LANGUAGE_ACTIONS } from "./../Reducers/index.js";
import { BaseService } from "./../App/index.js";
import { Enums, QueryList, PrivilegesList } from "justshare-shared";

const init = async function (store, setLoading) {
    if (window.mapps_init.loading && !window.mapps_init.isInit) {
        return;
    }
    setLoading(true);
    window.mapps_init.loading = true;
    const promArray = [
        //  import( /* webpackPreload: true */ './assets/vendor/bootstrap/bootstrap.min.css'),
        //  import( /* webpackPreload: true */ './assets/include/scss/unify.scss'),
    ];
    // import( /* webpackPreload: true */ './assets/vendor/animate.css')]
    //     import( /* webpackPreload: true */ './assets/vendor/hs-megamenu/src/hs.megamenu.css'),
    //   import( /* webpackPreload: true */ './assets/vendor/hamburgers/hamburgers.min.css')]
    const privs = PrivilegesList;
    if (privs["IS_LOGGED"]) {
        privs["IS_LOGGED"].func_front = function (props) {
            return props.isLogged == true;
        };
    }
    if (privs["IS_ANONYMOUS"]) {
        privs["IS_ANONYMOUS"].func_front = function (props) {
            return  props.isLogged != true;
        };
    }
    if (privs["IS_ROOT"]) {
        privs["IS_ROOT"].func_front = function (props) {
            return (
                this.props.auth.user &&
                (this.props.auth.user.is_root == true ||
                    this.props.auth.user.user_roles.filter((item) => {
                        return item.roles.role_detail.name == "ROOT";
                    }).length > 0)
            );
        };
    }
    if (privs["IS_ADMIN"]) {
        privs["IS_ADMIN"].func_front = function () {
            return (
                this.props.auth.user &&
                (this.props.auth.user.is_admin == true ||
                    this.props.auth.user.user_roles.filter((item) => {
                        return item.roles.role_detail.name == "ADMIN";
                    }).length > 0)
            );
        };
    }
    if (privs["IS_OWNER"]) {
        privs["IS_OWNER"].func_front = function () {
            return (
                this.props.auth &&
                this.props.auth.user &&
                (this.state.user_id == this.props.auth.user.id ||
                    this.state.user_owner_id == this.props.auth.user.id)
            );
        };
    }
    if (privs["IS_NOT_OWNER"]) {
        privs["IS_NOT_OWNER"].func_front = function () {
            return (
                this.props.auth &&
                this.props.auth.user &&
                this.state.user_id != this.props.auth.user.id &&
                this.state.user_owner_id != this.props.auth.user.id
            );
        };
    }
    if (privs["IS_USER_INCLUDE_WITHOUT_OWNER"]) {
        privs["IS_USER_INCLUDE_WITHOUT_OWNER"].func_front = function () {
            return (
                this.props.auth &&
                this.props.auth.user &&
                (this.state.user_id == this.props.auth.user.id ||
                    this.state.user_owner_id != this.props.auth.user.id) &&
                this.state.user_includes.includes(this.props.auth.user.id)
            );
        };
    }
    store.dispatch({ type: "SET_PRIVS_CONST", dto: privs });

    store.dispatch({
        type: LOADER_ACTIONS.SET_INITIAL_ACTION,
        dto: {}
    });
    if (!global.localStorage.lang) {
        global.localStorage.lang = "us";
    }

    promArray.push(
        store.dispatch(
            new BaseService().queryThunt(QueryList.Project.LOGIN, {
                id: '16B9FAF4-1E2C-482E-B48B-D7D02CF38D8E',//"16B9FAF4-1E2C-482E-B48B-D7D02CF38D8E",
                secretKey: 'D45C24D4-8E40-4825-B4DC-B4C5DD93B17C'//"D45C24D4-8E40-4825-B4DC-B4C5DD93B17C"
            })
        )
    );

    const succ = await Promise.all(promArray);

    global.localStorage.project_token = succ[succ.length - 1].data.token;
    global.localStorage.project_socket = global
        .btoa(unescape(encodeURIComponent(succ[succ.length - 1].data.socketChannel)))
        .replace(/=/g, "");

    if (global.localStorage.getItem("version") != new Date().toISOString().slice(0, 10)) {
        await store.dispatch(new BaseService().queryThunt(QueryList.Dictionary.GET_DICTIONARY, {}));
    }

    await store.dispatch(new BaseService().queryThunt(QueryList.Project.GET_PROJECT_INFO, {}));
    try {
        await Promise.all([
            store.dispatch(new BaseService().queryThunt(QueryList.Languages.GET_LANGUAGES, {})),
            store.dispatch(new BaseService().queryThunt(QueryList.Actions.GET_ACTIONS, {})),
            store.dispatch(new BaseService().queryThunt(QueryList.Roles.GET_ROLES, {})),
            store.dispatch(new BaseService().queryThunt(QueryList.Privileges.GET_PRIVS, {})),
            store.dispatch(new BaseService().queryThunt(QueryList.User.GET_USER_TYPES, {})),
            store.dispatch(new BaseService().queryThunt(QueryList.Dimensions.GET_DIM, {})),
            store.dispatch(new BaseService().queryThunt(QueryList.Status.GET_STATUS, {})),
            store.dispatch(new BaseService().queryThunt(QueryList.Process.GET_PROCESS, {}))
        ]);
    } catch (err) {
        /* eslint-disable no-console */
        console.error(err);
        /* eslint-enable no-console */
    }

    if (global.localStorage.token) {
        try {
            const refSucc = await store.dispatch(
                new BaseService().queryThunt(
                    QueryList.User.LOG_IN_BY_REFRESH_TOKEN,
                    { refresh_token: global.localStorage.refresh_token },
                    {},
                    Enums.LOADER.INITIAL
                )
            );
            global.localStorage.refresh_token = refSucc.data.refresh_token;
            global.localStorage.token = refSucc.data.token;
            const user = await store.dispatch(
                new BaseService().queryThunt(
                    QueryList.User.USER_INFO,
                    {},
                    global.localStorage.token,
                    Enums.LOADER.INITIAL
                )
            );
            store.dispatch({
                type: AUTH_ACTIONS.IS_AUTH,
                dto: {
                    refresh_token: global.localStorage.refresh_token,
                    token: global.localStorage.token,
                    user: user.data
                }
            });
        } catch (er) {
            store.dispatch({
                type: AUTH_ACTIONS.CLEAR_CONTEXT,
                dto: {}
            });
            global.localStorage.removeItem("token");
            global.localStorage.removeItem("refresh_token");
            //    await initAsync();
            return;
        }
    }
    const language = global.localStorage.getItem("lang");
    if (language != null) {
        store.dispatch({
            type: LANGUAGE_ACTIONS.SET_LANGUAGE,
            lang: language
        });
    }

    setTimeout(() => {
        //   init();
        window.location.reload();
    }, 7200000);

    store.dispatch({
        type: LOADER_ACTIONS.FINISH_INITIAL_ACTION,
        dto: {}
    });
    window.mapps_init.isInit = true;
    setLoading(false);
};

export default init;
