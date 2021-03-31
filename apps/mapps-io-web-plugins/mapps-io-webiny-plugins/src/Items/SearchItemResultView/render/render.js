import React from "react";
import { mappsPlugins } from "mapps-io-base-plugins/src";
import ElementWrapper from "./../../../elementWrap";
const PbRender = (name) => {
    return {
        name: `pb-render-page-element-${name}`,
        type: "pb-render-page-element",
        elementType: name,
        render(props) {
            const plugin = React.useMemo(() => mappsPlugins.byName("mapps-item-search-results"));
            return (
                <ElementWrapper {...props} is_editor={false}>
                    {plugin.render({
                        ...props
                    })}
                </ElementWrapper>
            );
        }
    };
};

export default PbRender;
