import React from "react";
import { Provider } from "react-redux";
import { plugins } from "@webiny/plugins";
import { get } from "dot-prop-immutable";

function ElementWrapper(props) {
    const { element = {}, style = {}, children, className = null, is_editor = false } = props;

    const stylePlugins = plugins.byType("pb-render-page-element-style");
    const attributePlugins = plugins.byType("pb-render-page-element-attributes");
    const shallowElement = { id: element.id, type: element.type, data: element.data };

    const finalStyle = stylePlugins.reduce((style, pl) => {
        return pl.renderStyle({ element: shallowElement, style });
    }, style);
    const attributes = attributePlugins.reduce((attributes, pl) => {
        return pl.renderAttributes({ element: shallowElement, attributes });
    }, {});

    const classNames = get(element, "data.settings.className", "");

    const getAllClasses = (...extraClasses) => {
        return [className, ...extraClasses, ...classNames.split(" ")]
            .filter((v) => v && v !== "css-0")
            .join(" ");
    };

    if (is_editor) {
        return (
            <Provider store={window.mapps_store}>
                <div
                    className={getAllClasses(
                        " webiny-pb-base-page-element-style webiny-pb-editor-page-element-user-login-form"
                    )}
                    style={finalStyle}
                    {...attributes}
                >
                    {children}
                </div>
            </Provider>
        );
    } else {
        return (
            <div
                className={getAllClasses(
                    " webiny-pb-base-page-element-style webiny-pb-editor-page-element-user-login-form"
                )}
                style={finalStyle}
                {...attributes}
            >
                {children}
            </div>
        );
    }
}

export default React.memo(ElementWrapper);
