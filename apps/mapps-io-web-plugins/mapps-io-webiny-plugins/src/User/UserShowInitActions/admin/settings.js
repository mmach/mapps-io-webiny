//import { validation } from "@webiny/validation";
//import { validation } from "@webiny/validation";
import Accordion from "@webiny/app-page-builder/editor/plugins/elementSettings/components/Accordion";
import { ButtonDefault } from "@webiny/ui/Button";
import { Cell, Grid } from "@webiny/ui/Grid";
import { Input } from "@webiny/ui/Input";
import { Select } from "@webiny/ui/Select";
import { mappsPlugins } from "mapps-io-base-plugins/src/index";
import React from "react";
import devicesType from "../../../devicesType";

function EditableSettings(props) {
    const { data } = props;
    const Bind = props.Bind;
    return (
        <Grid>
            {data && data.componentData[props.device] && (
                <>
                    <Cell span={12}>
                        <Bind name={`componentData.${props.device}.mappsNamePlugin`}>
                            <Select label={"Choose User INIT Plugin"} description={""}>
                                {[
                                    <option key={-1} value={""}>
                                        {}
                                    </option>,
                                    ...mappsPlugins
                                        .byType("mapps-user-editable-init")
                                        .map((i, index) => {
                                            return (
                                                <option key={index} value={i.name}>
                                                    {i.name}
                                                </option>
                                            );
                                        })
                                ]}
                            </Select>
                        </Bind>
                    </Cell>
                    <Cell span={12}>
                        <Bind name={`componentData.${props.device}.mappsNameViewPlugin`}>
                            <Select label={"Choose Variant"} description={""}>
                                {[
                                    <option key={-1} value={""}>
                                        {}
                                    </option>,
                                    ...mappsPlugins
                                        .byParent(data.componentData[props.device].mappsNamePlugin)
                                        .map((i, index) => {
                                            return (
                                                <option key={index} value={i.name}>
                                                    {i.name}
                                                </option>
                                            );
                                        })
                                ]}
                            </Select>
                        </Bind>
                    </Cell>
                    <Cell span={12}>
                        <Bind name={`componentData.${props.device}.mappsNameMenuPlugin`}>
                            <Select label={"Menu Variant"} description={""}>
                                {[
                                    <option key={-1} value={""}>
                                        {}
                                    </option>,
                                    ...mappsPlugins
                                    .byType("mapps-item-component-menu")
                                    .map((i, index) => {
                                        return (
                                            <option key={index} value={i.name}>
                                                {i.name}
                                            </option>
                                        );
                                    })
                                ]}
                            </Select>
                        </Bind>
                    </Cell>
                    <Cell span={12}>
                        <Bind name={`componentData.${props.device}.menuSlug`}>
                            <Input label={"Menu Slug"} validators={[]} />
                        </Bind>
                    </Cell>
                 
                </>
            )}
        </Grid>
    );
}

const PbSettings = name => {
    return [
        ...devicesType.map((i, index) => {
            return {
                name: `pb-editor-page-element-advanced-settings-${name}-1${index}`,
                type: "pb-editor-page-element-advanced-settings",
                elementType: name,
                render(props) {
                    const Icon = i.icon;
                    return (
                        <Accordion key="1" icon={<Icon />} title="Settings" defaultValue={false}>
                            <>
                                <EditableSettings device={i.device} {...props} />
                                <Cell span={12}>
                                    <ButtonDefault onClick={props.submit}>Save</ButtonDefault>
                                </Cell>
                            </>
                        </Accordion>
                    );
                }
            };
        })
    ];
};
export default PbSettings;
/*validators={validation.create("required,url")}*/
