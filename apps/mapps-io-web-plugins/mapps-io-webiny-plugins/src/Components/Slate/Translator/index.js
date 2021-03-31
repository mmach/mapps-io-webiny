import TranslateIcon from "@material-ui/icons/Translate";
import * as React from "react";

const MARK = "translation";

const hasMark = (value, type) => {
    return Boolean(value.marks.find(mark => mark.type === type));
};

const onClickMark = (type, editor, onChange) => {
    editor.change(change => onChange(change.toggleMark(type)));
};

export default () => {
    return {
        menu: [
            {
                name: "pb-editor-slate-menu-item-mapps-translation",
                type: "pb-editor-slate-menu-item",
                render(props) {
                    //{ MenuButton, editor, onChange }) {
                    const isActive = hasMark(props.editor.value, MARK);
                    if (props.value.activeMarks.size == 0 || isActive) {
                        return (
                            // eslint-disable-next-line react/jsx-no-bind
                            <props.MenuButton
                                onClick={() => onClickMark(MARK, props.editor, props.onChange)}
                                active={isActive}
                            >
                                <TranslateIcon />
                            </props.MenuButton>
                        );
                    } else {
                        return (
                            // eslint-disable-next-line no-alert
                            <props.MenuButton
                                active={false}
                                onClick={() =>
                                    // eslint-disable-next-line no-alert
                                    window.alert(
                                        "disabled, translations options should be as first clicked setting"
                                    )
                                }
                            >
                                <TranslateIcon />
                            </props.MenuButton>
                        );
                    }
                }
            }
        ],
        editor: [
            {
                name: "pb-editor-slate-editor-mapps-translation",
                type: "pb-editor-slate-editor",
                slate: {
                    renderNode(props, next) {
                        const { attributes, children, node } = props;

                        if (node.type === "mapps-translation") {
                            return <span {...attributes}>{children}</span>;
                        }
                        return next();
                    },
                    renderMark(props, next) {
                        if (props.mark.type === "mapps-translation") {
                            return <span {...props.attributes}>{props.children}</span>;
                        }

                        if (next) {
                            return next();
                        }
                    },
                    renderEditor({}, next) {

                        const children = next();
                        return <span>{children}</span>;
                    }
                }
            }
        ]
    };
};
