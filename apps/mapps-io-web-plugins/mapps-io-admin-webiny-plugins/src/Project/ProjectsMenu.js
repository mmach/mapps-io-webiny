import React from "react";

export default {
    type: "admin-menu",
    name: "admin-menu-0-mapps-project",
    render({ Menu, Section, Item }) {
        return (
            <Menu name="MappsIO Project" label={"MappsIO Project"}>
                <Section label={"Storage"}>
                    <Item label={"Verify Image"} path="/mapps/project/blobsVerify" />
                    <Item label={"Project"} path="/mapps/project/blobs/project" />
                    <Item label={"Users"} path="/mapps/project/blobs/users" />
                    <Item label={"Items"} path="/mapps/project/blobs/items" />
                    <Item label={"Categories"} path="/mapps/project/blobs/categories" />
                </Section>
                <Section label={"Project"}>
                    <Item label={"Settings"} path="/mapps/project/settings" />
                    <Item label={"Seo"} path="/mapps/project/seo" />
                </Section>
                <Section label={"Dimensions"}>
                    <Item label={"Dimensions"} path="/mapps/categories/dimensions" />
                    <Item label={"Add Dimmensions"} path="/mapps/categories/dimensions/add" />
                </Section>
                <Section label={"Users"}>
                    <Item label={"Users List"} path="/mapps/users" />
                    <Item label={"Users Types"} path="/mapps/users/settings/types" />
                </Section>
                <Section label={"Mails"}>
                    <Item label={"Mail Templates"} path="/mapps/mails/global" />
                    <Item label={"Project's Mails"} path="/mapps/mails/templates" />
                    <Item label={"Mail accounts"} path="/mapps/mails/accounts" />
                </Section>
            </Menu>
        );
    }
};
