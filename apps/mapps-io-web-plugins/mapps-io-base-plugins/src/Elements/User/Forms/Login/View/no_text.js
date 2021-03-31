import { CircularProgress, FormHelperText, Grid, IconButton } from "@material-ui/core";
import React from "react";
//import FacebookLogin from 'react-facebook-login';
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import GoogleLogin from "react-google-login";
import { ButtonLoader, TextBox } from "./../../../../../Components/index.js";
import FacebookIcon from "./facebook_icon.js";
import GoogleLogo from "./google_icon.js";

export default function Variant(tran, phTrans) {
   
    return (
        <Grid>
            {this.props.mappsSettings.basicAuth && (
                <Grid>
                    <Grid>
                        <FormHelperText
                            error={this.state.exception}
                            style={{ textAlign: "inherit" }}
                        >
                            {this.state.exception && this.state.exception.message[this.props.lang]}
                        </FormHelperText>
                    </Grid>
                    <Grid>
                        <TextBox
                            placeholder={phTrans.translate("LOGIN_USER_NAME_PLACEHOLDER")}
                            label={tran.translate("LOGIN_USER_NAME_LABEL")}
                            value={this.state.email}
                            onChange={this.emailHandler.bind(this)}
                            field="email"
                            validation={this.state.validation}
                        />
                        <TextBox
                            type="password"
                            placeholder={phTrans.translate("LOGIN_PASSWORD_PLACEHOLDER")}
                            label={tran.translate("LOGIN_PASSWORD_LABEL")}
                            value={this.state.password}
                            onChange={this.passwordHandler.bind(this)}
                            field="password"
                            validation={this.state.validation}
                        />
                    </Grid>
                    <Grid>
                        <ButtonLoader
                            onClick={this.submitHanlder.bind(this)}
                            size={"medium"}
                            color={"primary"}
                            value={tran.translate("LOGIN_SUBMIT_LABEL")}
                            isLoading={this.state.isLoading}
                        />
                    </Grid>
                </Grid>
            )}
            {[this.props.mappsSettings.googleLogin, this.props.mappsSettings.facebookLogin].filter(
                (i) => i
            ).length > 0 && (
                <Grid style={{ marginTop: "10px" }}>
                    <Grid item xs="12">
                        {this.props.mappsSettings.facebookLogin && (
                            <FacebookLogin
                                appId="315500209446266"
                                autoLoad={false}
                                fields="name,email,picture"
                                //     scope="public_profile,email,user_birthday,hometown,gender,user_friends"
                                callback={this.responseFacebook.bind(this)}
                                render={(renderProps) => (
                                    <IconButton
                                        style={{ width: "50px", height: "50px" }}
                                        disbaled={!this.state.fbLoading}
                                        onClick={renderProps.onClick}
                                    >
                                        {this.state.fbLoading == true ? (
                                            <CircularProgress />
                                        ) : (
                                            <FacebookIcon />
                                        )}
                                    </IconButton>
                                )}
                            />
                        )}
                        {this.props.mappsSettings.googleLogin && (
                            <GoogleLogin
                                clientId="147564742271-2itiv8meefk578crmklrmba06tiseor4.apps.googleusercontent.com"
                                render={(renderProps) => (
                                    <IconButton
                                        style={{ width: "50px", height: "50px" }}
                                        disbaled={!this.state.googleLoading}
                                        onClick={renderProps.onClick}
                                    >
                                        {this.state.googleLoading == true ? (
                                            <CircularProgress />
                                        ) : (
                                            <GoogleLogo />
                                        )}
                                    </IconButton>
                                )}
                                accessType="offline"
                                autoLoad={false}
                                onSuccess={this.responseGoogle.bind(this)}
                                onFailure={this.failureGoogle.bind(this)}
                                cookiePolicy={"single_host_origin"}
                            />
                        )}
                    </Grid>
                </Grid>
            )}
        </Grid>
    );
}
