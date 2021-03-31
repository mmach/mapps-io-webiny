//import { validation } from "@webiny/validation";
import Accordion from "@webiny/app-page-builder/editor/plugins/elementSettings/components/Accordion";
import { ButtonDefault } from "@webiny/ui/Button";
import { Checkbox } from "@webiny/ui/Checkbox";
import { Cell, Grid } from "@webiny/ui/Grid";
import { Input } from "@webiny/ui/Input";
import { Select } from "@webiny/ui/Select";
import { mappsPlugins } from "mapps-io-base-plugins/src/index";
import React from "react";
import devicesType from "../../../devicesType";



function SetCategorySettings(props) {
    const { data } = props;
    const Bind = props.Bind;
    return (
        <Grid>
            {data && data.componentData[props.device] && (
                <>
                    <Cell span={12}>
                        <Bind name={`componentData.${props.device}.mappsNamePlugin`}>
                            <Select label={"Choose plugin"} description={""}>
                                {[
                                    <option key={-1} value={''}>
                                        {}
                                    </option>,
                                    ...mappsPlugins
                                        .byType("mapps-item-component-categories-leaf")
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
                        <Bind name={`componentData.${props.device}.mappsCategoryNamePlugin`}>
                            <Select label={"Choose Category filter plugin"} description={""}>
                                {[
                                    <option key={-1} value={''}>
                                        {}
                                    </option>,
                                    ...mappsPlugins
                                        .byType("mapps-item-component-categories-fiter")
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
                        <Bind name={`componentData.${props.device}.category_id`}>
                            <Input label={"Set CategoryID"} validators={[]} />
                        </Bind>
                    </Cell>
                    <Cell span={12}>
                        <Bind name={`componentData.${props.device}.useRedirect`}>
                            <Checkbox label={"Use Redirect"} validators={[]} />
                        </Bind>
                    </Cell>
                    {data.componentData[props.device].useRedirect == true && (
                        <>
                            <Cell span={12}>
                                <Bind name={`componentData.${props.device}.redirectUri`}>
                                    <Input label={"Redirect URI"} validators={[]} />
                                </Bind>
                            </Cell>
                        </>
                    )}
                </>
            )}
        </Grid>
    );
}

const PbSettings = (name) => {
    return [
        ...(devicesType.map((i,index)=>{
            return {
                name: `pb-editor-page-element-advanced-settings-${name}-1${index}`,
                type: "pb-editor-page-element-advanced-settings",
                elementType: name,
                render(props) {
                    const Icon = i.icon;
                    return (
                        <Accordion key="1" icon={<Icon />} title="Category" defaultValue={false}>
                            <>
                            <SetCategorySettings device={i.device} {...props} />
                              <Cell span={12}>
                              
                                <ButtonDefault onClick={props.submit}>Save</ButtonDefault>
                            </Cell>
                            </>
                        </Accordion>
                    );
                }
            }
        }))
    ];
};
export default PbSettings;
/*validators={validation.create("required,url")}*/
