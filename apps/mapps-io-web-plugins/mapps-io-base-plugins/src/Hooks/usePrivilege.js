/*
    ./client/components/App.js
*/
import { useSelector } from "react-redux";

export function usePrivilege(action) {
    const { privilegesReducer, configReducer } = useSelector(state => ({
        privilegesReducer: state.PrivilegeReducer,
        configReducer: state.ConfigReducer
    }));
    const access = configReducer.actions.filter(item => {
        return item.action.trim() == action.toUpperCase();
    })[0];
    console.log(configReducer.actions)

    console.log(access)
    if (!access) {
        return false;
    }
    if (access.func) {
        let hashSet = [];
        Array.from(access.func.match(/(#|#\$)\w*#/g)).forEach(a => {
            hashSet[a] = a;
        });
        hashSet = Object.keys(hashSet)
            .filter(i => i.startsWith("#$"))
            .map(d => {
                return d.replace(/#/g, "").replace("$", "");
            });
        hashSet.forEach(item => {
            const funcAuth =
                configReducer.privs_list[item.trim()] &&
                configReducer.privs_list[item.trim()].func_front
                    ? configReducer.privs_list[item.trim()].func_front
                    : configReducer.privs_list[item.trim()].func;
            const funcResult = funcAuth(privilegesReducer);
            access.func = access.func.split("$" + item).join(funcResult);
            return {
                ...item
            };
        });
        return Boolean(Number(ONP(access.func)));
    } else {
        const funcAuths = access.privileges.map(item => {
            return configReducer.privs_list[item.name.trim()] &&
                configReducer.privs_list[item.name.trim()].func_front
                ? configReducer.privs_list[item.name.trim()].func_front
                : configReducer.privs_list[item.name.trim()].func;
        });

        if (
            funcAuths.filter(func => {
                return func(privilegesReducer);
            }).length > 0
        ) {
            return true;
        } else {
            return false;
        }
    }
}
