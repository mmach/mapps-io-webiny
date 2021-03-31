import { ONP } from "justshare-shared/.compiled/Functions/onp";

function actionAccess(action, actionList) {
    const access = (actionList ? actionList : this.props.config.actions).filter((item) => {
        return item.action.trim() == action;
    })[0];
    if (!access) {
        return false;
    }
    if (access.func) {
        let hashSet = [];
        Array.from(access.func.match(/(#|#\$)\w*#/g)).forEach((a) => {
            hashSet[a] = a;
        });
        hashSet = Object.keys(hashSet)
            .filter((i) => i.startsWith("#$"))
            .map((d) => {
                return d.replace(/#/g, "").replace("$", "");
            });
        hashSet.forEach((item) => {
            const funcAuth =
                this.props.config.privs_list[item.trim()] &&
                this.props.config.privs_list[item.trim()].func_front
                    ? this.props.config.privs_list[item.trim()].func_front
                    : this.props.config.privs_list[item.trim()].func;
            const funcResult = funcAuth.bind(this)(this.props.params);
            access.func = access.func.split("$" + item).join(funcResult);
            return {
                ...item
            };
        });
        return Boolean(Number(ONP(access.func)));
    } else {
        const funcAuths = access.privileges.map((item) => {
            return this.props.config.privs_list[item.name.trim()] &&
                this.props.config.privs_list[item.name.trim()].func_front
                ? this.props.config.privs_list[item.name.trim()].func_front
                : this.props.config.privs_list[item.name.trim()].func;
        });

        if (
            funcAuths.filter((func) => {
                return func.bind(this)(this.props.params);
            }).length > 0
        ) {
            return true;
        } else {
            return false;
        }
    }
}

export { actionAccess };
