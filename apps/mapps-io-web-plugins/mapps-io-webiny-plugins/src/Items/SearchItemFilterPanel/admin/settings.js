//import { validation } from "@webiny/validation";
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

function SearchFilterSettings(props) {
    const { data } = props;
    const Bind = props.Bind;
    return (
        <Grid>
            <Cell span={12}>
                <Bind name={`componentData.${props.device}.useSearch`}>
                    <Checkbox description={"Show Button"} validators={[]} />
                </Bind>
            </Cell>
            {data.componentData && data.componentData[props.device].useSearch && (
                <>
                    <Cell span={12}>
                        <Bind name={`componentData.${props.device}.mappsNamePlugin`}>
                            <Select label={"Choose plugin"} description={""}>
                                {[
                                    <option key={-1} value={""}>
                                        {}
                                    </option>,
                                    ...mappsPlugins
                                        .byType("mapps-item-search-filter")
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
                                    <option key={-1} value={""}>
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
                        <Bind name={`componentData.${props.device}.height`}>
                            <Input label={"Height"} validators={[]} />
                        </Bind>
                    </Cell>
                    <Cell span={12}>
                        <Bind name={`componentData.${props.device}.width`}>
                            <Input label={"Width"} validators={[]} />
                        </Bind>
                    </Cell>

                    <Cell span={12}>
                        <Bind name={`componentData.${props.device}.useTags`}>
                            <Checkbox label={"Use Tags"} validators={[]} />
                        </Bind>
                    </Cell>
                    <Cell span={12}>
                        <Bind name={`componentData.${props.device}.useFreetext`}>
                            <Checkbox label={"Use Freetext"} validators={[]} />
                        </Bind>
                    </Cell>
                    <Cell span={12}>
                        <Bind name={`componentData.${props.device}.useCreatedDate`}>
                            <Checkbox label={"Use Created Date"} validators={[]} />
                        </Bind>
                    </Cell>

                    <Cell span={12}>
                        <Bind name={`componentData.${props.device}.useButton`}>
                            <Checkbox label={"Use Search Button"} validators={[]} />
                        </Bind>
                    </Cell>
                    {data.componentData[props.device].useButton == true && (
                        <>
                            <Cell span={12}>
                                <Bind name={`componentData.${props.device}.position`}>
                                    <Input label={"Position"} validators={[]} />
                                </Bind>
                            </Cell>
                            <Cell span={12}>
                                <Bind name={`componentData.${props.device}.searchButton.top`}>
                                    <Input label={"Button Top"} validators={[]} />
                                </Bind>
                            </Cell>
                            <Cell span={12}>
                                <Bind name={`componentData.${props.device}.searchButton.left`}>
                                    <Input label={"Button Left"} validators={[]} />
                                </Bind>
                            </Cell>
                            <Cell span={12}>
                                <Bind name={`componentData.${props.device}.searchButton.bottom`}>
                                    <Input label={"Button Bottom"} validators={[]} />
                                </Bind>
                            </Cell>
                            <Cell span={12}>
                                <Bind name={`componentData.${props.device}.searchButton.right`}>
                                    <Input label={"Button Right"} validators={[]} />
                                </Bind>
                            </Cell>
                        </>
                    )}
                </>
            )}
        </Grid>
    );
}

function ContainerSettings(props) {
    const Bind = props.Bind;

    return (
        <>
            {mappsPlugins.byType("mapps-item-search-container-results").map((i) => {
                return (
                    <Grid key={i}>
                        <>
                            <Cell span={4}>
                                <Input value={i.mappsKey} disabled={true} validators={[]} />
                            </Cell>
                            <Cell span={4}>
                                <Bind
                                    name={`componentData.${props.device}.[${i.mappsKey}].isActive`}
                                >
                                    <Checkbox
                                        label={" "}
                                        description={"IsActive"}
                                        validators={[]}
                                    />
                                </Bind>
                            </Cell>
                            <Cell span={4}>
                                <Bind name={`componentData.${props.device}.[${i.mappsKey}].isMain`}>
                                    <Checkbox description={"Is Main"} validators={[]} />
                                </Bind>
                            </Cell>
                        </>
                    </Grid>
                );
            })}
        </>
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
                        <Accordion key="1" icon={<Icon />} title="Filters" defaultValue={false}>
                            <>
                            <SearchFilterSettings device={i.device} {...props} />
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
                        <Accordion key="1" icon={<Icon />} title="Container" defaultValue={false}>
                            <>
                            <ContainerSettings device={i.device} {...props} />
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
