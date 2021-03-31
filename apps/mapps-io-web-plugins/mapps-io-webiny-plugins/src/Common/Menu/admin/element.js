import styled from "@emotion/styled";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { mappsPlugins } from "mapps-io-base-plugins/src";
import React from "react";
import devicesType from "../../../devicesType";
import MenuWebiny from "../../../Webiny/Components/MenuWebiny";
import ElementWrapper from "./../../../elementWrap";


const is_editor = true;
const PreviewBox = styled("div")({
    textAlign: "center",
    height: 40,
    svg: {
        height: 40,
        width: 50
    }
});
const PbElement = (name) => {
    return {
        name: "pb-editor-page-element-" + name,
        type: "pb-editor-page-element",
        elementType: name,
        toolbar: {
            title: "Menu",
            group: "pb-editor-element-group-mapps-common",
            preview() {
                return (
                    <PreviewBox>
                        <AccountCircleIcon />
                    </PreviewBox>
                );
            }
        },
        settings: [
            "pb-editor-page-element-settings-delete",
            "pb-editor-page-element-settings-shadow",
            "pb-editor-page-element-settings-border",
            "pb-editor-page-element-settings-background",
            "pb-editor-page-element-settings-padding",
            "pb-editor-page-element-settings-margin",
            "pb-editor-page-element-settings-height",
            "pb-editor-page-element-settings-vertical-align",
            "pb-editor-page-element-settings-horizontal-align",
            "pb-editor-page-element-settings-clone-element"
        ],
        target: ["row", "column"],
        onCreate: "open-settings",
        create(options) {
            const componentData = {};
            devicesType.forEach(i=>{
                componentData[i.device]={
                    mappsNamePlugin: "",
                    menuSlug: ""
                }
            })
            return {
                type: name,
                elements: [],
                data: {
                    componentData: componentData,

                    settings: {
                        //  horizontalAlign: "center",
                        background: {
                            color: "",
                            image: {
                                file: {},
                                position: "",
                                scaling: "cover"
                            }
                        },
                        border: {
                            width: 0,
                            style: "solid",
                            color: ""
                        },
                        margin: {
                            desktop: { all: 0 },
                            mobile: { all: 0 }
                        },
                        padding: {
                            desktop: { all: 0 },
                            mobile: { all: 0 }
                        }
                    }
                },
                ...options
            };
        },
        render(props) {
            const deviceType = mappsPlugins.byName('mapps-item-use-device-type-builder').useHook();
            const plugin = React.useMemo(() =>
                mappsPlugins.byName(props.element.data.componentData[deviceType.device].mappsNamePlugin)
            );
            if(!plugin)
            {
                return  <ElementWrapper {...props} is_editor={is_editor}>
                            CHOOSE PLUGIN
                        </ElementWrapper>
            }
            return (
                <ElementWrapper {...props} is_editor={is_editor}>
                    <MenuWebiny
                            slug={props.element.data.componentData[deviceType.device].menuSlug}
                            {...props}
                            component={(props2) =>
                                plugin.render({
                                    ...props2,
                                    props: props,
                                     mappsSettings: props.element.data.componentData[deviceType.device],
                                    is_editor: is_editor
                                })
                               
                            }
                        />
                </ElementWrapper>
            );
        },
        renderElementPreview({ width, height }) {
            return <img style={{ width, height }} alt={"iFrame"} />;
        }
    };
};

export default PbElement;
