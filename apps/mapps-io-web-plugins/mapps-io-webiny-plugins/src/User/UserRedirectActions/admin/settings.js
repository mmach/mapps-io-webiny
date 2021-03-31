//import { validation } from "@webiny/validation";
//import { validation } from "@webiny/validation";
import Accordion from "@webiny/app-page-builder/editor/plugins/elementSettings/components/Accordion";
import { ButtonDefault } from "@webiny/ui/Button";
import { Cell, Grid } from "@webiny/ui/Grid";
//import { validation } from "@webiny/validation";
import { Input } from "@webiny/ui/Input";
import { Select } from "@webiny/ui/Select";
import { mappsPlugins } from "mapps-io-base-plugins/src/index";
import React from "react";
import devicesType from "../../../devicesType";

function Settings(props) {
    const { data } = props;
    const Bind = props.Bind;
    return (
        <Grid>
            {data && data.componentData[props.device] && (
                <>
                    <Cell span={12}>
                        <Bind name={`componentData.${props.device}.mappsNamePlugin`}>
                            <Select label={"Choose Logout Plugin"} description={""}>
                                {[
                                    <option key={-1} value={""}>
                                        {}
                                    </option>,
                                    ...mappsPlugins
                                        .byType("mapps-user-editable-redirect")
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
                        <Bind name={`componentData.${props.device}.redirectUri`}>
                            <Input label={"Redirect URI"} validators={[]} />
                        </Bind>
                    </Cell>
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
                        <Accordion key="1" icon={<Icon />} title="Redirect Settings" defaultValue={false}>
                            <>
                            <Settings device={i.device} {...props} />
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
