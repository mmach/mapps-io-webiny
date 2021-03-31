import { FormHelperText, Grid, TextField } from "@material-ui/core";
import React from "react";

export default class EditUserVariant extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.birthDate = this.props.birthDate;
    }

    render() {
        return (
            <Grid container style={{ flexFlow: "column" }}>
                <Grid className="text-center mx-auto g-max-width-400 g-mb-50">
                    <FormHelperText error={this.props.exception}>
                        {this.props.exception && this.props.exception.message[this.props.lang]}
                    </FormHelperText>
                </Grid>

                <Grid item style={{ marginTop: "20px" }}>
                    <TextField
                        placeholder={this.props.phTrans.translate(
                            "REGISTER_COMPANY_NAME_PLACEHOLDER"
                        )}
                        disabled="false"
                        style={{ width: "100%" }}
                        label={this.props.tran.translate("REGISTER_COMPANY_NAME_LABEL")}
                        value={this.props.name}
                        onChange={this.props.nameHandler}
                        field="name"
                        validation={this.props.validation}
                    />
                </Grid>
                <Grid item style={{ marginTop: "20px" }}>
                    <TextField
                        placeholder={this.props.phTrans.translate(
                            "REGISTER_COMPANY_USERNAME_PLACEHOLDER"
                        )}
                        disabled="false"
                        style={{ width: "100%" }}
                        label={this.props.tran.translate("REGISTER_COMPANY_USERNAME_LABEL")}
                        value={this.props.user_name}
                        onChange={this.props.userNameHandler}
                        field="surname"
                        validation={this.props.validation}
                    />
                </Grid>
                <Grid item style={{ marginTop: "20px" }}>
                    <TextField
                        placeholder={this.props.phTrans.translate("REGISTER_ADDRESS_PLACEHOLDER")}
                        disabled="false"
                        style={{ width: "100%" }}
                        label={this.props.tran.translate("REGISTER_ADDRESS_LABEL")}
                        value={this.props.zip_code}
                        onChange={this.props.zipCodeHandler}
                        field="nickname"
                        validation={this.props.validation}
                    />
                </Grid>
                <Grid item style={{ marginTop: "20px" }}>
                    <TextField
                        placeholder={this.props.phTrans.translate("REGISTER_CITY_PLACEHOLDER")}
                        disabled="false"
                        style={{ width: "100%" }}
                        label={this.props.tran.translate("REGISTER_CITY_LABEL")}
                        value={this.props.city}
                        onChange={this.props.cityHandler}
                        field="nickname"
                        validation={this.props.validation}
                    />
                </Grid>
                <Grid item style={{ marginTop: "20px" }}>
                    <TextField
                        placeholder={this.props.phTrans.translate("REGISTER_COUNTRY_PLACEHOLDER")}
                        disabled="false"
                        style={{ width: "100%" }}
                        label={this.props.tran.translate("REGISTER_COUNTRY_LABEL")}
                        value={this.props.country}
                        onChange={this.props.countryHandler}
                        field="nickname"
                        validation={this.props.validation}
                    />
                </Grid>
                <Grid item style={{ marginTop: "20px" }}>
                    <TextField
                        placeholder={this.props.phTrans.translate(
                            "REGISTER_TAX_NUMBER_PLACEHOLDER"
                        )}
                        disabled="false"
                        style={{ width: "100%" }}
                        label={this.props.tran.translate("REGISTER_TAX_NUMBER_LABEL")}
                        value={this.props.tax_number}
                        onChange={this.props.taxNrHandler}
                        field="nickname"
                        validation={this.props.validation}
                    />
                </Grid>
                <Grid item style={{ marginTop: "20px" }}>
                    <TextField
                        placeholder={this.props.phTrans.translate("REGISTER_BANK_NR_PLACEHOLDEr")}
                        disabled="false"
                        style={{ width: "100%" }}
                        label={this.props.tran.translate("REGISTER_BANK_NR_LABEL")}
                        value={this.props.bank_account_nr}
                        onChange={this.props.bankNrHandler}
                        field="phone"
                        validation={this.props.validation}
                    />
                </Grid>
            </Grid>
        );
    }
}
