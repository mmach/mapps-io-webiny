import styled from "@emotion/styled";
import React from "react";
import ElementWrapper from "./../../../elementWrap";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import { mappsPlugins } from "mapps-io-base-plugins/src";
import devicesType from "../../../devicesType";

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
            title: "Search Item Result View",
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
            "pb-editor-page-element-settings-background",
            "pb-editor-page-element-settings-padding",
            "pb-editor-page-element-settings-margin",
            "pb-editor-page-element-settings-height",
            "pb-editor-page-element-settings-width"
        ],
        target: ["row", "column"],
        onCreate: "open-settings",
        create(options) {
           
            let containerResulst={};
            devicesType.forEach(i=>{
                containerResulst[i.device]={
                    width: "100%",
                    height: "calc(var(--app-height) - 50px - 35px)"
                }
            })
            let mapSettings={};
            devicesType.forEach(i=>{
                mapSettings[i.device]={
                    mappsNamePlugin: "mapps-item-search-container-view-map",
                    useZoomBtn: true,
                    useSetPositionBtn: true,
                    showCurrentPin: true,
                    setPositionBtn: {
                        top: "0px",
                        left: "0px",
                        right: "0px",
                        bottom: "0px"
                    }
                }
            })
            let listSettings={};
            devicesType.forEach(i=>{
                listSettings[i.device]={
                    mappsNamePlugin: "mapps-item-search-container-view-list",
                    mappsNamePaginationPlugin: "mapps-item-search-container-view-list-pagination"
                }
            })
            return {
                type: name,
                elements: [],
                data: {
                    containerSettings: containerResulst,
                    MAP:mapSettings,
                    
                    LIST:listSettings,
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
            const plugin = React.useMemo(()=>mappsPlugins.byName("mapps-item-search-results"));
            return (
                <ElementWrapper {...props} is_editor={true}>
                    {plugin.render({
                        ...props
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
