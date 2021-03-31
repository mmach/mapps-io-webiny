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

function SearchFilterSettings(props) {
    const { data } = props;
    const Bind = props.Bind;
    return (
        <Grid>
            <Cell span={12}>
                <Bind name={`searchFilter.${props.device}.useSearch`}>
                    <Checkbox description={"Show Button"} validators={[]} />
                </Bind>
            </Cell>
            {data.searchFilter && data.searchFilter[props.device].useSearch && (
                <>
                    <Cell span={12}>
                        <Bind name={`searchFilter.${props.device}.mappsNamePlugin`}>
                            <Select label={"Choose plugin"} description={""}>
                                {[
                                    <option key={-1} value={''}>
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
                        <Bind name={`searchFilter.${props.device}.mappsCategoryNamePlugin`}>
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
                        <Bind name={`searchFilter.${props.device}.height`}>
                            <Input label={"Height"} validators={[]} />
                        </Bind>
                    </Cell>
                    <Cell span={12}>
                        <Bind name={`searchFilter.${props.device}.width`}>
                            <Input label={"Width"} validators={[]} />
                        </Bind>
                    </Cell>

                    <Cell span={12}>
                        <Bind name={`searchFilter.${props.device}.useTags`}>
                            <Checkbox label={"Use Tags"} validators={[]} />
                        </Bind>
                    </Cell>
                    <Cell span={12}>
                        <Bind name={`searchFilter.${props.device}.useFreetext`}>
                            <Checkbox label={"Use Freetext"} validators={[]} />
                        </Bind>
                    </Cell>
                    <Cell span={12}>
                        <Bind name={`searchFilter.${props.device}.useCreatedDate`}>
                            <Checkbox label={"Use Created Date"} validators={[]} />
                        </Bind>
                    </Cell>

                    <Cell span={12}>
                        <Bind name={`searchFilter.${props.device}.useButton`}>
                            <Checkbox label={"Use Search Button"} validators={[]} />
                        </Bind>
                    </Cell>
                    <Cell span={12}>
                        <Bind name={`searchFilter.${props.device}.position`}>
                            <Input label={"Position"} validators={[]} />
                        </Bind>
                    </Cell>
                    {data.searchFilter[props.device].useButton == true && (
                        <>
                            <Cell span={12}>
                                <Bind name={`searchFilter.${props.device}.searchButton.top`}>
                                    <Input label={"Button Top"} validators={[]} />
                                </Bind>
                            </Cell>
                            <Cell span={12}>
                                <Bind name={`searchFilter.${props.device}.searchButton.left`}>
                                    <Input label={"Button Left"} validators={[]} />
                                </Bind>
                            </Cell>
                            <Cell span={12}>
                                <Bind name={`searchFilter.${props.device}.searchButton.bottom`}>
                                    <Input label={"Button Bottom"} validators={[]} />
                                </Bind>
                            </Cell>
                            <Cell span={12}>
                                <Bind name={`searchFilter.${props.device}.searchButton.right`}>
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

function SearchMapsSettings(props) {
    const { data } = props;
    const Bind = props.Bind;
    return (
        <Grid>
            {data.searchFilter[props.device].MAP && data.searchFilter[props.device].MAP.isActive && (
                <>
                    <Cell span={12}>
                        <Bind name={`MAP.${props.device}.mappsNamePlugin`}>
                            <Select label={"Choose plugin desktop"} description={""}>
                                {[
                                    <option key={-1} value={''}>
                                        {}
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
            {data.searchFilter[props.device].LIST && data.searchFilter[props.device].LIST.isActive && (
                <>
                    <Cell span={12}>
                        <Bind name={`LIST.${props.device}.mappsNamePlugin`}>
                            <Select label={"Choose plugin desktop"} description={""}>
                                {[
                                    <option key={-1} value={''}>
                                        {}
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
                                        {}
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
                                <Bind name={`searchFilter.${props.device}.${i.mappsKey}.isActive`}>
                                    <Checkbox
                                        label={" "}
                                        description={"IsActive"}
                                        validators={[]}
                                    />
                                </Bind>
                            </Cell>
                            {data.searchFilter[props.device][i.mappsKey] &&
                                data.searchFilter[props.device][i.mappsKey].isActive == true &&
                                data.searchFilter[props.device].useSearch == true && (
                                    <Cell span={4}>
                                        <Bind
                                            name={`searchFilter.${props.device}.${i.mappsKey}.isMain`}
                                        >
                                            <Checkbox description={"Is Main"} validators={[]} />
                                        </Bind>
                                    </Cell>
                                )}
                        </>
                    </Grid>
                );
            })}
        </>
    );
}

const PbSettings = (name) => {
    return [
        {
            name: `pb-editor-page-element-advanced-settings-${name}-1`,
            type: "pb-editor-page-element-advanced-settings",
            elementType: name,
            render(props) {
                return (
                    <Accordion defaultValue={false} key="1" icon={<PhoneAndroidIcon />} title="Search">
                        <>
                        <SearchFilterSettings device="mobile" {...props} />
                    <Cell span={12}>
                          
                            <ButtonDefault onClick={props.submit}>Save</ButtonDefault>
                        </Cell>
                    </>
                    </Accordion>
                );
            }
        },
        {
            name: `pb-editor-page-element-advanced-settings-${name}-2`,
            type: "pb-editor-page-element-advanced-settings",
            elementType: name,
            render(props) {
                return (
                    <Accordion defaultValue={false} key="1" icon={<DesktopMacIcon />} title="Search">
                        <>
                        <SearchFilterSettings device="desktop" {...props} />
                    <Cell span={12}>
                          
                            <ButtonDefault onClick={props.submit}>Save</ButtonDefault>
                        </Cell>
                    </>
                        </Accordion>
                );
            }
        },

        {
            name: `pb-editor-page-element-advanced-settings-${name}-3`,
            type: "pb-editor-page-element-advanced-settings",
            elementType: name,
            render(props) {
                return (
                    <Accordion defaultValue={false} key="1" icon={<PhoneAndroidIcon />} title="Container">
                        <>
                        <ContainerSettings device="mobile" {...props} />
                    <Cell span={12}>
                          
                            <ButtonDefault onClick={props.submit}>Save</ButtonDefault>
                        </Cell>
                    </>
                        </Accordion>
                );
            }
        },
        {
            name: `pb-editor-page-element-advanced-settings-${name}-4`,
            type: "pb-editor-page-element-advanced-settings",
            elementType: name,
            render(props) {
                return (
                    <Accordion defaultValue={false} key="1" icon={<DesktopMacIcon />} title="Container">
                        <>
                        <ContainerSettings device="desktop" {...props} />
                    <Cell span={12}>
                          
                            <ButtonDefault onClick={props.submit}>Save</ButtonDefault>
                        </Cell>
                    </>
                        </Accordion>
                );
            }
        },

        {
            name: `pb-editor-page-element-advanced-settings-${name}-5`,
            type: "pb-editor-page-element-advanced-settings",
            elementType: name,
            render(props) {
                return props.data.searchFilter["mobile"]["MAP"] &&
                    props.data.searchFilter["mobile"]["MAP"].isActive == true ? (
                    <Accordion defaultValue={false} key="1" icon={<PhoneAndroidIcon />} title="MAP">
                        <>
                        <SearchMapsSettings device="mobile" {...props} />
                    <Cell span={12}>
                          
                            <ButtonDefault onClick={props.submit}>Save</ButtonDefault>
                        </Cell>
                    </>
                        </Accordion>
                ) : (
                    <span></span>
                );
            }
        },
        {
            name: `pb-editor-page-element-advanced-settings-${name}-6`,
            type: "pb-editor-page-element-advanced-settings",
            elementType: name,
            render(props) {
                return props.data.searchFilter["desktop"]["MAP"] &&
                    props.data.searchFilter["desktop"]["MAP"].isActive == true ? (
                    <Accordion defaultValue={false} key="1" icon={<DesktopMacIcon />} title="MAP">
                        <>
                        <SearchMapsSettings device="desktop" {...props} />
                    <Cell span={12}>
                          
                            <ButtonDefault onClick={props.submit}>Save</ButtonDefault>
                        </Cell>
                    </>
                        </Accordion>
                ) : (
                    <span></span>
                );
            }
        },

        {
            name: `pb-editor-page-element-advanced-settings-${name}-7`,
            type: "pb-editor-page-element-advanced-settings",
            elementType: name,
            render(props) {
                return props.data.searchFilter["mobile"]["LIST"] &&
                    props.data.searchFilter["mobile"]["LIST"].isActive == true ? (
                    <Accordion defaultValue={false} key="1" icon={<PhoneAndroidIcon />} title="LIST">
                        <>
                        <SearchListSettings device="mobile" {...props} />
                    <Cell span={12}>
                          
                            <ButtonDefault onClick={props.submit}>Save</ButtonDefault>
                        </Cell>
                    </>
                        </Accordion>
                ) : (
                    <span></span>
                );
            }
        },
        {
            name: `pb-editor-page-element-advanced-settings-${name}-8`,
            type: "pb-editor-page-element-advanced-settings",
            elementType: name,
            render(props) {
                return props.data.searchFilter["desktop"]["LIST"] &&
                    props.data.searchFilter["desktop"]["LIST"].isActive == true ? (
                    <Accordion defaultValue={false} key="1" icon={<DesktopMacIcon />} title="LIST">
                        <>
                        <SearchListSettings device="desktop" {...props} />
                    <Cell span={12}>
                          
                            <ButtonDefault onClick={props.submit}>Save</ButtonDefault>
                        </Cell>
                    </>
                        </Accordion>
                ) : (
                    <span></span>
                );
            }
        }
    ];
};
export default PbSettings;
/*validators={validation.create("required,url")}*/
