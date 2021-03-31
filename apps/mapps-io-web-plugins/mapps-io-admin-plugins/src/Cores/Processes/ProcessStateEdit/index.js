import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
    DropDownList,
    TextBox,
    ButtonLoader,
    MODAL_ACTIONS,
    Checkbox,
    NOTIFICATIONS_ACTIONS
} from "mapps-io-base-plugins/src/Components";
import { CommandList, Enums, Translator } from "justshare-shared";
import { BaseService } from "mapps-io-base-plugins/src/App/index.js";
import { Container } from "@material-ui/core";

function ProcessStateEdit(props) {
    const [state, setStates] = useState(props.model);

    function getDropDownValues() {
        const roles = props.config.statuses;
        return [{ id: "", value: "" }, ...roles].map((item) => {
            return {
                id: item.id,
                value: item.translation ? item.translation[props.lang] : item.id
            };
        });
    }
    function getDropDownActions() {
        const roles = props.config.actions.filter((item) => {
            if (state.is_start == true) {
                return item.is_process_start;
            }
            return item.type == "PROCESS" || item.as_process == 1;
        });
        return [{ id: "", value: "" }, ...roles].map((item) => {
            return {
                id: item.id,
                value: item.action ? item.action : item.id
            };
        });
    }
    function onClick() {
        props.upsertNode(state);
        props.UpdateNode(state);
        props.closeWindow();
        props.setNotification(
            Enums.CODE.SUCCESS_GLOBAL,
            Translator(props.codeDict.data.SUCCESS_GLOBAL, props.lang).translate("SUCCESS")
        );
    }
    return (
        <Container>
            <DropDownList
                label={"Status"}
                valueOptions={getDropDownValues()}
                value={state.status_id}
                onChange={(event) => {
                    setStates({ ...state, status_id: event.target.value });
                }}
                field="type"
                validation={state.validation}
            />
            <DropDownList
                label={"Action"}
                valueOptions={getDropDownActions()}
                value={state.action_id}
                onChange={(event) => {
                    setStates({ ...state, action_id: event.target.value });
                }}
                field="type"
                validation={state.validation}
            />
            <Checkbox
                label={"Is reminder"}
                value={state.is_reminder}
                onChange={(event) => {
                    setStates({ ...state, is_reminder: event.target.checked });
                }}
            ></Checkbox>
            <TextBox
                label={"Days before"}
                value={state.days_before}
                onChange={(event) => {
                    setStates({ ...state, days_before: event.target.value });
                }}
            ></TextBox>
            <Checkbox
                label={"Is start"}
                value={state.is_start}
                onChange={(event) => {
                    setStates({ ...state, is_start: event.target.checked });
                }}
            ></Checkbox>
            <Checkbox
                label={"Is last"}
                value={state.is_last}
                onChange={(event) => {
                    setStates({ ...state, is_last: event.target.checked });
                }}
            ></Checkbox>
            <Checkbox
                label={"With Notification"}
                value={state.with_notification}
                onChange={(event) => {
                    setStates({ ...state, with_notification: event.target.checked });
                }}
            ></Checkbox>
            <Checkbox
                label={"Autorun"}
                value={state.autorun}
                onChange={(event) => {
                    setStates({ ...state, autorun: event.target.checked });
                }}
            ></Checkbox>
            <Checkbox
                label={"Has reminder"}
                value={state.has_reminder}
                onChange={(event) => {
                    setStates({ ...state, has_reminder: event.target.checked });
                }}
            ></Checkbox>
            <Checkbox
                label={"IUA status change"}
                value={state.with_iua_status_change}
                onChange={(event) => {
                    setStates({ ...state, with_iua_status_change: event.target.checked });
                }}
            ></Checkbox>
            <Checkbox
                label={"Get IUA from ES"}
                value={state.get_iua_es}
                onChange={(event) => {
                    setStates({ ...state, get_iua_es: event.target.checked });
                }}
            ></Checkbox>

            <ButtonLoader
                color={"primary"}
                onClick={onClick.bind(this)}
                value="Save"
            ></ButtonLoader>
        </Container>
    );
}

const mapStateToProps = (state) => {
    //console.log(state);

    return {
        codeDict: state.DictionaryReducer,
        lang: state.LanguageReducer,
        config: state.ConfigReducer,
        auth: state.AuthReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        closeWindow: () => {
            dispatch({
                type: MODAL_ACTIONS.CLOSE_MODAL,
                dto: {
                    open: false
                }
            });
        },
        upsertNode: (dto) => {
            return dispatch(
                new BaseService().commandThunt(CommandList.Process.UPSERT_CHAIN_ELEMENT, dto)
            );
        },
        setNotification: (type, message) => {
            dispatch({
                type: NOTIFICATIONS_ACTIONS.SET_NOTIFICATION_GLOBAL,
                notification: { message: message, type: type }
            });
        }
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProcessStateEdit));
