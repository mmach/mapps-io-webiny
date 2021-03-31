import Accordion from "@webiny/app-page-builder/editor/plugins/elementSettings/components/Accordion";
//import { validation } from "@webiny/validation";
import { ButtonDefault } from "@webiny/ui/Button";
import { Checkbox } from "@webiny/ui/Checkbox";
import { Cell, Grid } from "@webiny/ui/Grid";
import { Input } from "@webiny/ui/Input";
import { Select } from "@webiny/ui/Select";
import { mappsPlugins } from "mapps-io-base-plugins/src";
import React from "react";
import devicesType from "../../../devicesType";

function StepperSettings(props) {
    const { data } = props;
    const Bind = props.Bind;
    const [] = React.useState([]);

    return (
        <>
            {Object.keys(data.componentData[props.device].stepper).map((i) => {
                if (data.componentData[props.device].stepper[i].isActive == false) {
                    return (
                        <Grid key={i}>
                            <Cell span={1}>
                                <Bind name={`componentData.${props.device}.stepper[${i}].isActive`}>
                                    <Checkbox
                                        label={` `}
                                        description={`IsActive`}
                                        validators={[]}
                                    />
                                </Bind>
                            </Cell>
                            <Cell span={11}>
                                <Bind name={`componentData.${props.device}.stepper[${i}].name`}>
                                    <Input description={`TRANSLATE_LABEL`} validators={[]} />
                                </Bind>
                            </Cell>
                        </Grid>
                    );
                }
                return (
                    <Grid key={i}>
                        <Cell span={1}>
                            <Bind name={`componentData.${props.device}.stepper[${i}].isActive`}>
                                <Checkbox label={` `} description={`IsActive`} validators={[]} />
                            </Bind>
                        </Cell>
                        <Cell span={4}>
                            <Bind name={`componentData.${props.device}.stepper[${i}].name`}>
                                <Input description={`TRANSLATE_LABEL`} validators={[]} />
                            </Bind>
                        </Cell>
                        <Cell span={1}>
                            <Bind name={`componentData.${props.device}.stepper[${i}].startOrder`}>
                                <Input description={`Start`} validators={[]} />
                            </Bind>
                        </Cell>
                        <Cell span={1}>
                            <Bind name={`componentData.${props.device}.stepper[${i}].endOrder`}>
                                <Input description={`End`} validators={[]} />
                            </Bind>
                        </Cell>
                        <Cell span={1}>
                            <Bind name={`componentData.${props.device}.stepper[${i}].setTitle`}>
                                <Checkbox label={` `} description="use title" validators={[]} />
                            </Bind>
                        </Cell>
                        <Cell span={1}>
                            <Bind name={`componentData.${props.device}.stepper[${i}].setDescription`}>
                                <Checkbox
                                    label={` `}
                                    d
                                    description="use description"
                                    validators={[]}
                                />
                            </Bind>
                        </Cell>
                        <Cell span={1}>
                            <Bind name={`componentData.${props.device}.stepper[${i}].setTags`}>
                                <Checkbox
                                    label={` `}
                                    description="use tag"
                                    validators={[]}
                                />
                            </Bind>
                        </Cell>
                        <Cell span={1}>
                            <Bind name={`componentData.${props.device}.stepper[${i}].ifCategorySet`}>
                                <Checkbox
                                    label={` `}
                                    description="Show If Category Set"
                                    validators={[]}
                                />
                            </Bind>
                        </Cell>
                        <Cell span={1}>
                            <Bind name={`componentData.${props.device}.stepper[${i}].previewItem`}>
                                <Checkbox label={` `} description="Preview Item" validators={[]} />
                            </Bind>
                        </Cell>
                        <Cell span={1}>
                            <Bind name={`componentData.${props.device}.stepper[${i}].asInit`}>
                                <Checkbox label={` `} description="asInit" validators={[]} />
                            </Bind>
                        </Cell>
                    </Grid>
                );
            })}
        </>
    );
}

function SetItemTemplates(props) {
    const Bind = props.Bind;
    return (
        <Grid>
            <>
                <Cell span={12}>
                    <Bind name={`componentData.${props.device}.mappsNamePlugin`}>
                        <Select label={`Choose plugin`} description={``}>
                            {[
                                <option key={-1} value={``}>
                                    {}
                                </option>,
                                ...mappsPlugins.byType("mapps-item-create").map((i, index) => {
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
                        <Input label={`Init category`} />

                    </Bind>
                </Cell>
            </>
        </Grid>
    );
}

function SetMapSettings(props) {
    const Bind = props.Bind;
    return (
        <Grid>
            <Cell span={12}>
                <Bind name={`componentData.${props.device}.map.showMap`}>
                    <Checkbox type="checkbox" label={`Show map`} />
                </Bind>
            </Cell>
            <Cell span={12}>
                <Bind name={`componentData.${props.device}.map.readOnly`}>
                    <Checkbox type="checkbox" label={`Map is Readonly`} />
                </Bind>
            </Cell>

            <Cell span={12}>
                <Bind name={`componentData.${props.device}.map.useSearchText`}>
                    <Checkbox type="checkbox" label={`Use searchbox`} />
                </Bind>
            </Cell>
            <Cell span={12}>
                <Bind name={`componentData.${props.device}.map.useSearchTextMap`}>
                    <Checkbox type="checkbox" label={`Use Over map searchbox`} />
                </Bind>
            </Cell>
            <Cell span={12}>
                <Bind name={`componentData.${props.device}.map.height`}>
                    <Input label={`Height`} />
                </Bind>
            </Cell>
            <Cell span={12}>
                <Bind name={`componentData.${props.device}.map.width`}>
                    <Input label={`Width`} />
                </Bind>
            </Cell>
            <Cell span={12}>
                <Bind name={`componentData.${props.device}.map.showDetails`}>
                    <Checkbox type="checkbox" label={`Show details`} />
                </Bind>
            </Cell>
            <Cell span={12}>
                <Bind name={`componentData.${props.device}.map.variant`}>
                    <Select label={`Choose variant desktop`} description={``}>
                        <option value={`variant_1`}>Variant 1</option>
                        <option value={`variant_2`}>Variant 2</option>
                    </Select>
                </Bind>
            </Cell>
            <Cell span={12}>
                <Bind name={`componentData.${props.device}.map.mapClass`}>
                    <Input label={`Map class`} />
                </Bind>
            </Cell>
        </Grid>
    );
}

function SetMapLimitationSettings(props) {
    const Bind = props.Bind;
    return (
        <Grid>
            <Cell span={12}>
                <Bind name={`componentData.${props.device}.map.countryCode`}>
                    <Input label={`Set default countrycode`} />
                </Bind>
            </Cell>
            <Cell span={12}>
                <Bind name={`componentData.${props.device}.map.useCountryCode`}>
                    <Checkbox type="checkbox" label={`Use country code`} />
                </Bind>
            </Cell>
            <Cell span={12}>
                <Bind name={`componentData.${props.device}.map.useFlatNumber`}>
                    <Checkbox type="checkbox" label={`Use flat number`} />
                </Bind>
            </Cell>
            <Cell span={12}>
                <Bind name={`componentData.${props.device}.map.useHouseNumber`}>
                    <Checkbox type="checkbox" label={`Use houseNumber`} />
                </Bind>
            </Cell>
            {` `}
            <Cell span={12}>
                <Bind name={`componentData.${props.device}.map.useRoad`}>
                    <Checkbox type="checkbox" label={`Use road`} />
                </Bind>
            </Cell>
            {` `}
            <Cell span={12}>
                <Bind name={`componentData.${props.device}.map.usePostalCode`}>
                    <Checkbox type="checkbox" label={`Use postal code`} />
                </Bind>
            </Cell>
            <Cell span={12}>
                <Bind name={`componentData.${props.device}.map.useNeighbourhood`}>
                    <Checkbox type="checkbox" label={`Use neighbourhoo`} />
                </Bind>
            </Cell>
            <Cell span={12}>
                <Bind name={`componentData.${props.device}.map.useCity`}>
                    <Checkbox type="checkbox" label={`Use city`} />
                </Bind>
            </Cell>
            <Cell span={12}>
                <Bind name={`componentData.${props.device}.map.useRegion`}>
                    <Checkbox type="checkbox" label={`Use region`} />
                </Bind>
            </Cell>
            <Cell span={12}>
                <Bind name={`componentData.${props.device}.map.useState`}>
                    <Checkbox type="checkbox" label={`Use state`} />
                </Bind>
            </Cell>
            <Cell span={12}>
                <Bind name={`componentData.${props.device}.map.useCountry`}>
                    <Checkbox type="checkbox" label={`Use country`} />
                </Bind>
            </Cell>
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
                        <Accordion key="1" icon={<Icon />} title="Plugin" defaultValue={false}>
                            <>
                            <SetItemTemplates device={i.device} {...props} />
                              <Cell span={12}>
                              
                                <ButtonDefault onClick={props.submit}>Save</ButtonDefault>
                            </Cell>
                            </>
                        </Accordion>
                    );
                }
            }
        })),
        ...(devicesType.map((i,index)=>{
            return {
                name: `pb-editor-page-element-advanced-settings-${name}-2${index}`,
                type: "pb-editor-page-element-advanced-settings",
                elementType: name,
                render(props) {
                    const Icon = i.icon;
                    return (
                        <Accordion key="1" icon={<Icon />} title="Stepper" defaultValue={false}>
                            <>
                            <StepperSettings device={i.device} {...props} />
                              <Cell span={12}>
                              
                                <ButtonDefault onClick={props.submit}>Save</ButtonDefault>
                            </Cell>
                            </>
                        </Accordion>
                    );
                }
            }
        })),
        ...(devicesType.map((i,index)=>{
            return {
                name: `pb-editor-page-element-advanced-settings-${name}-3${index}`,
                type: "pb-editor-page-element-advanced-settings",
                elementType: name,
                render(props) {
                    const Icon = i.icon;
                    return (
                        <Accordion key="1" icon={<Icon />} title="Map View" defaultValue={false}>
                            <>
                            <SetMapSettings device={i.device} {...props} />
                              <Cell span={12}>
                              
                                <ButtonDefault onClick={props.submit}>Save</ButtonDefault>
                            </Cell>
                            </>
                        </Accordion>
                    );
                }
            }
        })),
        ...(devicesType.map((i,index)=>{
            return {
                name: `pb-editor-page-element-advanced-settings-${name}-4${index}`,
                type: "pb-editor-page-element-advanced-settings",
                elementType: name,
                render(props) {
                    const Icon = i.icon;
                    return (
                        <Accordion key="1" icon={<Icon />} title="Map Limitations" defaultValue={false}>
                            <>
                            <SetMapLimitationSettings device={i.device} {...props} />
                              <Cell span={12}>
                              
                                <ButtonDefault onClick={props.submit}>Save</ButtonDefault>
                            </Cell>
                            </>
                        </Accordion>
                    );
                }
            }
        })),

    ];
};
export default PbSettings;
/*validators={validation.create("required,url")}*/
