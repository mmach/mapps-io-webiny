import React from "react";

export default {
    type: "admin-menu",
    name: "admin-menu-2-mapps-languages",
    render({ Menu,  Item }) {
        return (
            <Menu name="MappsIO Languages" label={"MappsIO Languages"}>
                <Item label={"Languages"} path="/mapps/languages/languagesList" />
                <Item label={"Dictionaries"} path="/mapps/languages/dictionaries" />
            </Menu>
        );
    }
};
