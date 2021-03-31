import React from "react";

export default {
    type: "admin-menu",
    name: "admin-menu-1-mapps-permissions",
    render({ Menu, Section, Item }) {
        return (
            <Menu name="MappsIO Core" label={"MappsIO Core"}>
                <Section label={"Roles & Privs"}>
                    <Item label={"Privileges"} path="/mapps/permissions/privileges" />
                    <Item label={"Add Privileges"} path="/mapps/permissions/privileges/add" />

                    <Item label={"Roles"} path="/mapps/permissions/roles" />
                    <Item label={"Add Roles"} path="/mapps/permissions/roles/add" />

                </Section>
                <Section label={"Actions"}>
                    <Item label={"Add Actions"} path="/mapps/permissions/actions/new" />
                    <Item label={"Actions List"} path="/mapps/permissions/actions/list" />
                    <Item
                        label={"Actions Privilleges"}
                        path="/mapps/permissions/actions/actions_privs"
                    />
                    <Item label={"Actions Status"} path="/mapps/permissions/actions/status" />
                </Section>
                <Section label={"Processes"}>
                    <Item label={"Process"} path="/mapps/permissions/processes" />
                </Section>
                <Section label={"Statuses"}>
                    <Item label={"Statuses"} path="/mapps/status/project" />
                    <Item label={"Statuses Global"} path="/mapps/status/global" />
                     </Section>
                     <Section label={"Categories"}>
                    <Item label={"Categories"} path="/mapps/categories/categories" />
                    <Item label={"Categories Options"} path="/mapps/categories/categoriesOptions/new" />
                     </Section>
            </Menu>
        );
    }
};
