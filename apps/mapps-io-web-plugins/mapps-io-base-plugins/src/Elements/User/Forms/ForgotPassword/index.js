/*
    ./client/components/App.js
*/

import { Box } from "@material-ui/core";
import { CommandList, Enums, Translator, UserForgotPasswordDTO } from "justshare-shared";
import React from "react";
import { connect } from "react-redux";
import { BaseService } from "./../../../../App/index.js";
import { ButtonLoader, NOTIFICATIONS_ACTIONS, TextBox } from "./../../../../Components/index.js";

class ForgotPassword extends React.Component {
    constructor() {
        super();
        this.state = new UserForgotPasswordDTO();
        this.state.isLoading = false;
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
        const validation = UserForgotPasswordDTO.prototype.validation(this.state);
        this.tran = Translator(this.props.codeDict.data.VALIDATION, this.props.lang);
        validation.map((item) => {
            item.msg = this.tran.translate(item.failed, ...item.value);
        });
        this.setState({
            validation: validation
        });
        return validation;
    }

    emailHandler(event) {
        this.setState({
            email: event.target.value
        });

        this.refreshValidation();
    }

    submitHanlder(event) {
        this.setState({
            toRefresh: 1,
            isLoading: true
        });
        event.preventDefault();
        if (this.validation().length == 0) {
            this.props.forgotPassowrd(this.state).then(() => {
                this.setState({
                    isLoading: false
                });
                this.props.setNotification(
                    Enums.CODE.SUCCESS_GLOBAL,
                    Translator(this.props.codeDict.data.SUCCESS_GLOBAL, this.props.lang).translate(
                        "FORGOT_PASSWORD_SEND_MAIL_SUCCESS"
                    )
                );
            });
        } else {
            this.setState({
                isLoading: false
            });
        }
    }

    render() {
        const tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);
        const phTrans = Translator(this.props.codeDict.data.PLACEHOLDER, this.props.lang);

        return (
            <Box>
                <TextBox
                    placeholder={phTrans.translate("FORGOT_PASSWORD_USER_NAME_PLACEHOLDER")}
                    isRequired={true}
                    label={tran.translate("FORGOT_PASSWORD_USER_NAME_LABEL")}
                    value={this.state.email}
                    onChange={this.emailHandler.bind(this)}
                    field="email"
                    validation={this.state.validation}
                />

                <ButtonLoader
                    onClick={this.submitHanlder.bind(this)}
                    size={"md"}
                    className={
                        "btn g-brd-none u-btn-primary rounded-0 g-letter-spacing-1 g-font-weight-700 g-font-size-12 text-uppercase"
                    }
                    value={tran.translate("FORGOT_PASSWORD_SUBMIT_LABEL")}
                    isLoading={this.state.isLoading}
                />
            </Box>
        );
    }
}

const mapStateToProps = (state) => {
    //console.log(state);

    return {
        codeDict: state.DictionaryReducer,
        lang: state.LanguageReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        forgotPassowrd: (dto) => {
            return dispatch(
                new BaseService().commandThunt(CommandList.User.FORGOT_PASSWORD_CHECK, dto)
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

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
