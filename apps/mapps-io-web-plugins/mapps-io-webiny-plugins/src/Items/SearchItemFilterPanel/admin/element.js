import styled from "@emotion/styled";
import React from "react";
import ElementWrapper from "./../../../elementWrap";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import { mappsPlugins } from "mapps-io-base-plugins/src/index";
import devicesType from "../../../devicesType";

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
        name: `pb-editor-page-element-${name}`,
        type: "pb-editor-page-element",
        elementType: name,
        toolbar: {
            title: "Search Item Filter Panel",
            group: "pb-editor-element-group-mapps-item",
            preview() {
                return (
                    <PreviewBox>
                        <PhotoLibraryIcon />
                    </PreviewBox>
                );
            }
        },
        settings: [
            "pb-editor-page-element-settings-delete",
            "pb-editor-page-element-settings-shadow",
            "pb-editor-page-element-settings-border",
            "pb-editor-page-element-settings-background"
        ],
        target: ["row", "column"],
        onCreate: "open-settings",
        create(options) {
            const componentData = {};
            devicesType.forEach(i=>{
                componentData[i.device]={
                    mappsNamePlugin: "mapps-item-search-filter-advance",
                    mappsCategoryNamePlugin:
                        "mapps-item-component-categories-filter-default",
                    useTags: false,
                    useCreatedDate: true,
                    useFreetext: true,
                    width: "100%",
                    height: "95vh",
                    withLogo: true,
                    position: "left",
                    useSearch: true,
                    useButton: false,
                    searchButton: {
                        top: "0px",
                        left: "0px",
                        right: "0px",
                        bottom: "0px"
                    }
                }
            })
            return {
                data: {
                    componentData,
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

export default PbElement;
