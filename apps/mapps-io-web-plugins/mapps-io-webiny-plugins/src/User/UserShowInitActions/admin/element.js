import styled from "@emotion/styled";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { mappsPlugins } from "mapps-io-base-plugins/src";
import React from "react";
import devicesType from "../../../devicesType";
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
const ElementAdmin = name => {
    return {
        name: "pb-editor-page-element-" + name,
        type: "pb-editor-page-element",
        elementType: name,
        toolbar: {
            title: "User Preview Init",
            group: "pb-editor-element-group-mapps-user",
            preview() {
                return (
                    <PreviewBox>
                        <ExitToAppIcon />
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
            "pb-editor-page-element-settings-margin"
        ],
        target: ["row", "column"],
        onCreate: "open-settings",
        create(options) {
            const componentData = {};
            devicesType.forEach(i => {
                componentData[i.device] = {
                    mappsNamePlugin: "mapps-user-editable-show-user-init",
                    mappsNameViewPlugin: "mapps-user-editable-show-user-init-variant1",
                    mappsNameMenuPlugin:'mapps-item-component-menu-variant2',
                    menuSlug: "user-profile-menu",
                    mwnuIcon:'user-profile-menu'
                };
            });
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
            const deviceType = mappsPlugins.byName("mapps-item-use-device-type-builder").useHook();
            const plugin = React.useMemo(() =>
                mappsPlugins.byName(
                    props.element.data.componentData[deviceType.device].mappsNamePlugin
                )
            );
            if (!plugin) {
                return (
                    <ElementWrapper {...props} is_editor={is_editor}>
                        CHOOSE PLUGIN
                    </ElementWrapper>
                );
            }
            return (
                <ElementWrapper {...props} is_editor={is_editor}>
                    {plugin.render({
                        ...props,
                        mappsSettings: props.element.data.componentData[deviceType.device],
                        is_editor: is_editor
                    })}
                </ElementWrapper>
            );
        },
        renderElementPreview({ width, height }) {
            return <img style={{ width, height }} alt={"iFrame"} />;
        }
    };
};

export default ElementAdmin;