import React from "react";
import { mappsPlugins } from "mapps-io-base-plugins/src/index.js";
import ElementWrapper from "../../../elementWrap.js";


export default [
    {
        name: "pb-render-slate-editor-mapps-translation",
        type: "pb-render-slate-editor",
        slate: {
            renderMark(props, next) {
                const comopnent = mappsPlugins.byName("mapps-item-component-translate");

                if (props.mark.type === "mapps-translation") {
                    const TranslateComopnent = comopnent.render;
                    return (
                        <ElementWrapper is_editor={false}>
                            <TranslateComopnent {...props.attributes}>
                                {props.children}
                            </TranslateComopnent>
                        </ElementWrapper>
                    );
                }

                return next();
            }
        }
    }
];
