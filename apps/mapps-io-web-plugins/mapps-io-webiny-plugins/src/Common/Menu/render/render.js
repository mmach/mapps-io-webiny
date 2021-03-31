import { mappsPlugins } from "mapps-io-base-plugins/src";
import React from "react";
import MenuWebiny from "../../../Webiny/Components/MenuWebiny";
import ElementWrapper from "./../../../elementWrap";

const is_editor = false;
const Element = name => {
    return {
        name: "pb-render-page-element-" + name,
        type: "pb-render-page-element",
        elementType: name,
        render(props) {
            const deviceType = React.useMemo(() =>
                mappsPlugins.byName("mapps-item-use-device-type")
            ).useHook();
            const plugin = React.useMemo(
                () =>
                    mappsPlugins.byName(
                        props.element.data.componentData[deviceType.device] &&
                            props.element.data.componentData[deviceType.device].mappsNamePlugin
                    ),
                [deviceType]
            );
            if (!plugin) {
                return <></>;
            }
            return (
                <ElementWrapper {...props} is_editor={is_editor}>
                    <MenuWebiny
                        slug={props.element.data.componentData[deviceType.device].menuSlug}
                        {...props}
                        component={props2 =>
                            plugin &&
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
        }
    };
};

export default Element;
