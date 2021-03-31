import React from "react";

export default {
    type: "admin-menu",
    name: "admin-menu-2-mapps-items",
    render({ Menu, Section, Item }) {
        return (
            <Menu name="MappsIO Items" label={"MappsIO Items"}>
                <Section label={"Payments"}>
                    <Item label={"Invoices"} path="/mapps/items/payments/invoices" />
                </Section>
            </Menu>
        );
    }
};
