//import { validation } from "@webiny/validation";
//import { validation } from "@webiny/validation";
import { Checkbox } from "@webiny/ui/Checkbox";
import { Cell, Grid } from "@webiny/ui/Grid";
import { Input } from "@webiny/ui/Input";
import { Select } from "@webiny/ui/Select";
import { mappsPlugins } from "mapps-io-base-plugins/src/index";
import React from "react";
import devicesType from "../../../devicesType";
import Accordion from "@webiny/app-page-builder/editor/plugins/elementSettings/components/Accordion";
import { ButtonDefault } from "@webiny/ui/Button";



function LoginSettings(props) {
    const { data } = props;
    const Bind = props.Bind;
    return (
        <Grid>
            {data && data.componentData[props.device] && (
                <>
                    <Cell span={12}>
                        <Bind name={`componentData.${props.device}.mappsNamePlugin`}>
                            <Select label={"Choose Login Plugin"} description={""}>
                                {[
                                    <option key={-1} value={""}>
                                        {}
                                    </option>,
                                    ...mappsPlugins.byType("mapps-user-login").map((i, index) => {
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
                            <Select label={"Choose Login View Plugin"} description={""}>
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
                        <Bind name={`componentData.${props.device}.facebookLogin`}>
                            <Checkbox
                                type="checkbox"
                                label={"Facebook Login"}
                                description={"Turn on facebook login"}
                            />
                        </Bind>
                    </Cell>
                    <Cell span={12}>
                        <Bind name={`componentData.${props.device}.googleLogin`}>
                            <Checkbox
                                type="checkbox"
                                label={"Google Login"}
                                description={"Turn on google login"}
                            />
                        </Bind>
                    </Cell>
                    <Cell span={12}>
                        <Bind name={`componentData.${props.device}.basicAuth`}>
                            <Checkbox
                                type="checkbox"
                                label={"Basic Auth"}
                                description={"Turn on Basic Auth"}
                            />
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
                        <Accordion key="1" icon={<Icon />} title="Login" defaultValue={false}>
                            <>
                            <LoginSettings device={i.device} {...props} />
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
