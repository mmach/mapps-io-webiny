//import { validation } from "@webiny/validation";
import DesktopMacIcon from "@material-ui/icons/DesktopMac";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import Accordion from "@webiny/app-page-builder/editor/plugins/elementSettings/components/Accordion";
import { ButtonDefault } from "@webiny/ui/Button";
import { Checkbox } from "@webiny/ui/Checkbox";
import { Cell, Grid } from "@webiny/ui/Grid";
import { Input } from "@webiny/ui/Input";
import { Select } from "@webiny/ui/Select";
import { mappsPlugins } from "mapps-io-base-plugins/src/index";
import React from "react";
import devicesType from "../../../devicesType";



function SearchMapsSettings(props) {
    const { data } = props;
    const Bind = props.Bind;
    return (
        <Grid>
            {data.containerSettings[props.device].MAP && data.containerSettings[props.device].MAP.isActive && (
                <>
                    <Cell span={12}>
                        <Bind name={`MAP.${props.device}.mappsNamePlugin`}>
                            <Select label={"Choose plugin desktop"} description={""}>
                                {[
                                    <option key={-1} value={''}>
                                        { }
                                    </option>,
                                    ...mappsPlugins
                                        .byType("mapps-item-search-container-results")
                                        .filter((i) => {
                                            return i.mappsKey == "MAP";
                                        })
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
                        <Bind name={`MAP.${props.device}.useZoomBtn`}>
                            <Checkbox label={"Use Zoom Btn"} validators={[]} />
                        </Bind>
                    </Cell>
                    <Cell span={12}>
                        <Bind name={`MAP.${props.device}.showCurrentPin`}>
                            <Checkbox label={"Show Your Position Pin"} validators={[]} />
                        </Bind>
                    </Cell>
                    <Cell span={12}>
                        <Bind name={`MAP.${props.device}.useSetPositionBtn`}>
                            <Checkbox label={"Use Set Position"} validators={[]} />
                        </Bind>
                    </Cell>
                    {data.MAP[props.device].useSetPositionBtn == true && (
                        <>
                            <Cell span={12}>
                                <Bind name={`MAP.${props.device}.setPositionBtn.top`}>
                                    <Input label={"Button SetPosition Top"} validators={[]} />
                                </Bind>
                            </Cell>
                            <Cell span={12}>
                                <Bind name={`MAP.${props.device}.setPositionBtn.left`}>
                                    <Input label={"Button SetPosition Left"} validators={[]} />
                                </Bind>
                            </Cell>
                            <Cell span={12}>
                                <Bind name={`MAP.${props.device}.setPositionBtn.bottom`}>
                                    <Input label={"Button SetPosition Bottom"} validators={[]} />
                                </Bind>
                            </Cell>
                            <Cell span={12}>
                                <Bind name={`MAP.${props.device}.setPositionBtn.right`}>
                                    <Input label={"Button SetPosition Right"} validators={[]} />
                                </Bind>
                            </Cell>
                        </>
                    )}
                </>
            )}
        </Grid>
    );
}
function SearchListSettings(props) {
    const { data } = props;
    const Bind = props.Bind;
    return (
        <Grid>
            {data.containerSettings[props.device].LIST && data.containerSettings[props.device].LIST.isActive && (
                <>
                    <Cell span={12}>
                        <Bind name={`LIST.${props.device}.mappsNamePlugin`}>
                            <Select label={"Choose plugin desktop"} description={""}>
                                {[
                                    <option key={-1} value={''}>
                                        { }
                                    </option>,
                                    ...mappsPlugins
                                        .byType("mapps-item-search-container-results")
                                        .filter((i) => {
                                            return i.mappsKey == "LIST";
                                        })
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
                        <Bind name={`LIST.${props.device}.mappsNamePaginationPlugin`}>
                            <Select label={"Choose plugin desktop"} description={""}>
                                {[
                                    <option key={-1} value={''}>
                                        { }
                                    </option>,
                                    ...mappsPlugins
                                        .byType("mapps-item-search-container-results-pagination")
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
function ContainerSettings(props) {
    const { data } = props;
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
                                <Bind name={`containerSettings.${props.device}.${i.mappsKey}.isActive`}>
                                    <Checkbox
                                        label={" "}
                                        description={"IsActive"}
                                        validators={[]}
                                    />
                                </Bind>
                            </Cell>


                        </>
                    </Grid>
                );
            })}
            <Cell span={12}>
                <Bind name={`containerSettings.${props.device}.height`}>
                    <Input label={"Set Height"} validators={[]} />
                </Bind>
            </Cell>
        </>
    );
}

const PbSettings = (name) => {
    return [

        ...(devicesType.map((i, index) => {
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
        })),

        ...(devicesType.map((i, index) => {
            return {
                name: `pb-editor-page-element-advanced-settings-${name}-3${index}`,
                type: "pb-editor-page-element-advanced-settings",
                elementType: name,
                render(props) {
                    const Icon = i.icon;
                    return props.data.containerSettings[i.device]["MAP"] &&
                        props.data.containerSettings[i.device]["MAP"].isActive == true ? (
                        <Accordion key="1" icon={<Icon />} title="Map Settings" defaultValue={false}>
                            <>
                                <SearchMapsSettings device={i.device} {...props} />
                                <Cell span={12}>

                                    <ButtonDefault onClick={props.submit}>Save</ButtonDefault>
                                </Cell>
                            </>
                        </Accordion>
                    ) : <span></span>;
                }
            }
        })),

        ...(devicesType.map((i, index) => {
            return {
                name: `pb-editor-page-element-advanced-settings-${name}-4${index}`,
                type: "pb-editor-page-element-advanced-settings",
                elementType: name,
                render(props) {
                    const Icon = i.icon;
                    return props.data.containerSettings[i.device]["LIST"] &&
                        props.data.containerSettings[i.device]["LIST"].isActive == true ? (
                        <Accordion key="1" icon={<Icon />} title="List Settings" defaultValue={false}>
                            <>
                                <SearchListSettings device={i.device} {...props} />
                                <Cell span={12}>

                                    <ButtonDefault onClick={props.submit}>Save</ButtonDefault>
                                </Cell>
                            </>
                        </Accordion>
                    ) : <span></span>;
                }
            }
        })),


    ];
};
export default PbSettings;
/*validators={validation.create("required,url")}*/
