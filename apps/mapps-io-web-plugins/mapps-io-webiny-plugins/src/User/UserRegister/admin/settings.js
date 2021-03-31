//import { validation } from "@webiny/validation";
import Accordion from "@webiny/app-page-builder/editor/plugins/elementSettings/components/Accordion";
import { ButtonDefault } from "@webiny/ui/Button";
import { Cell, Grid } from "@webiny/ui/Grid";
import { Select } from "@webiny/ui/Select";
import { mappsPlugins } from "mapps-io-base-plugins/src/index";
import React from "react";
//import { validation } from "@webiny/validation";
import devicesType from "../../../devicesType";

function RegisterSettings(props) {
    const { data } = props;
    const Bind = props.Bind;
    return (
        <Grid>
            {data && data.componentData[props.device] && (
                <>
                    <Cell span={12}>
                        <Bind name={`componentData.${props.device}.mappsNamePlugin`}>
                            <Select label={"Choose Register Plugin"} description={""}>
                                {[
                                    <option key={-1} value={""}>
                                        {}
                                    </option>,
                                    ...mappsPlugins
                                        .byType("mapps-user-register")
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
                        <Accordion key="1" icon={<Icon />} title="Register" defaultValue={false}>
                            <>
                            <RegisterSettings device={i.device} {...props} />
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
