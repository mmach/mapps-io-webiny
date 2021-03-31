/*
    ./client/components/App.js
*/

import React from "react";
import { connect } from "react-redux";
import { Enums, Translator, ChangePasswordDTO, CommandList } from "justshare-shared";
import { BaseService } from "./../../../../App/index.js";
import { ButtonLoader, NOTIFICATIONS_ACTIONS, TextBox } from "./../../../../Components/index.js";
import { Box } from "@material-ui/core";

class ChangePassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = new ChangePasswordDTO();
        this.state.loading = false;
        this.state.validation = [];
    }
    refreshValidation() {
        if (this.state.toRefresh) {
            setTimeout(() => {
                this.validation();
            });
        }
    }

    validation() {
        const validation = ChangePasswordDTO.prototype.validation(this.state);
        this.tran = Translator(this.props.codeDict.data.VALIDATION, this.props.lang);
        validation.map((item) => {
            item.msg = this.tran.translate(item.failed, ...item.value);
        });
        this.setState({
            validation: validation
        });
        return validation;
    }

    passwordRepeatHandler(event) {
        this.setState({
            repeatPassword: event.target.value
        });

        this.refreshValidation();
    }
    passwordHandler(event) {
        this.setState({
            password: event.target.value
        });
        this.refreshValidation();
    }
    oldPasswordHandler(event) {
        this.setState({
            old_password: event.target.value
        });
        this.refreshValidation();
    }

    submitHanlder(event) {
        this.setState({
            loading: true
        });
        event.preventDefault();
        if (this.validation().length == 0) {
            this.props
                .changePassword(this.state)
                .then(() => {
                    this.setState({
                        loading: false
                    });

                    this.props.setNotification(
                        Enums.CODE.SUCCESS_GLOBAL,
                        Translator(
                            this.props.codeDict.data.SUCCESS_GLOBAL,
                            this.props.lang
                        ).translate("CHANGE_PASSWORD_SUCCESS")
                    );
                })
                .catch(() => {
                    this.setState({
                        loading: false
                    });
                });
        } else {
            this.setState({
                loading: false
            });
        }
    }

    render() {
        const tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);
        const phTrans = Translator(this.props.codeDict.data.PLACEHOLDER, this.props.lang);

        return (
            <Box>
                <TextBox
                    type="password"
                    placeholder={phTrans.translate("REGISTER_OLD_PASSWORD_PLACEHOLDER")}
                    isRequired={true}
                    label={tran.translate("REGISTER_OLD_PASSWORD_LABEL")}
                    value={this.state.old_password}
                    onChange={this.oldPasswordHandler.bind(this)}
                    field="old_password"
                    validation={this.state.validation}
                />

                <TextBox
                    type="password"
                    placeholder={phTrans.translate("REGISTER_PASSWORD_PLACEHOLDER")}
                    isRequired={true}
                    label={tran.translate("REGISTER_PASSWORD_LABEL")}
                    value={this.state.password}
                    onChange={this.passwordHandler.bind(this)}
                    field="password"
                    validation={this.state.validation}
                />
                <TextBox
                    type="password"
                    placeholder={phTrans.translate("REGISTER_PASSWORD_REPEAT_PLACEHOLDER")}
                    isRequired={true}
                    label={tran.translate("REGISTER_PASSWORD_REPEAT_LABEL")}
                    value={this.state.repeatPassword}
                    onChange={this.passwordRepeatHandler.bind(this)}
                    field="repeatPassword"
                    validation={this.state.validation}
                />

                <ButtonLoader
                    onClick={this.submitHanlder.bind(this)}
                    size={"md"}
                    className={
                        "btn g-brd-none u-btn-primary rounded-0 g-letter-spacing-1 g-font-weight-700 g-font-size-12 text-uppercase"
                    }
                    value={tran.translate("CHANGE_PASSWORD_SUBMIT_LABEL")}
                    isLoading={this.state.loading}
                />
            </Box>
        );
    }
}

const mapStateToProps = (state) => {
    //console.log(state);

    return {
        codeDict: state.DictionaryReducer,
        lang: state.LanguageReducer,
        auth: state.AuthReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changePassword: (dto) => {
            return dispatch(new BaseService().commandThunt(CommandList.User.CHANGE_PASSWORD, dto));
        },
        setNotification: (type, message) => {
            dispatch({
                type: NOTIFICATIONS_ACTIONS.SET_NOTIFICATION_GLOBAL,
                notification: { message: message, type: type }
            });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
