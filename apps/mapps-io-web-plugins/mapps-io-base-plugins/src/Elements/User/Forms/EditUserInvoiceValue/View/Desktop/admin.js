import { FormHelperText, Grid } from "@material-ui/core";
import React from "react";
import {
    ButtonLoader,

    TextBox
} from "./../../../../../../Components/index.js";


export default class EditUserVariant extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.birthDate = this.props.birthDate;
    }

    render() {
        return (
            <Grid
                className={`g-brd-around g-brd-gray-light-v${
                    this.props.borderClass > 0 ? this.props.borderClass : 3
                } g-pa-30 text-center`}
            >
                <Grid className="text-center mx-auto g-max-width-400 g-mb-50">
                 

                    <FormHelperText error={this.props.exception}>
                        {this.props.exception && this.props.exception.message[this.props.lang]}
                    </FormHelperText>
                </Grid>

            
          
            
                <TextBox
                    placeholder={this.props.phTrans.translate("REGISTER_COMPANY_NAME_PLACEHOLDER")}
                    isRequired={true}
                    label={this.props.tran.translate("REGISTER_COMPANY_NAME_LABEL")}
                    value={this.props.name}
                    onChange={this.props.nameHandler}
                    field="name"
                    validation={this.props.validation}
                />
             <TextBox
                    placeholder={this.props.phTrans.translate("REGISTER_COMPANY_USERNAME_PLACEHOLDER")}
                    isRequired={true}
                    label={this.props.tran.translate("REGISTER_COMPANY_USERNAME_LABEL")}
                    value={this.props.user_name}
                    onChange={this.props.userNameHandler}
                    field="surname"
                    validation={this.props.validation}
                />
                  <TextBox
                    placeholder={this.props.phTrans.translate("REGISTER_ADDRESS_PLACEHOLDER")}
                    isRequired={true}
                    label={this.props.tran.translate("REGISTER_ADDRESS_LABEL")}
                    value={this.props.zip_code}
                    onChange={this.props.zipCodeHandler}
                    field="nickname"
                    validation={this.props.validation}
                /> 
                 <TextBox
                    placeholder={this.props.phTrans.translate("REGISTER_CITY_PLACEHOLDER")}
                    isRequired={true}
                    label={this.props.tran.translate("REGISTER_CITY_LABEL")}
                    value={this.props.city}
                    onChange={this.props.cityHandler}
                    field="nickname"
                    validation={this.props.validation}
                />
                  <TextBox
                    placeholder={this.props.phTrans.translate("REGISTER_COUNTRY_PLACEHOLDER")}
                    isRequired={true}
                    label={this.props.tran.translate("REGISTER_COUNTRY_LABEL")}
                    value={this.props.country}
                    onChange={this.props.countryHandler}
                    field="nickname"
                    validation={this.props.validation}
                />
                 <TextBox
                    placeholder={this.props.phTrans.translate("REGISTER_TAX_NUMBER_PLACEHOLDER")}
                    isRequired={true}
                    label={this.props.tran.translate("REGISTER_TAX_NUMBER_LABEL")}
                    value={this.props.tax_number}
                    onChange={this.props.taxNrHandler}
                    field="nickname"
                    validation={this.props.validation}
                />
               
                <TextBox
                    placeholder={this.props.phTrans.translate("REGISTER_BANK_NR_PLACEHOLDEr")}
                    isRequired={true}
                    label={this.props.tran.translate("REGISTER_BANK_NR_LABEL")}
                    value={this.props.bank_account_nr}
                    onChange={this.props.bankNrHandler}
                    field="phone"
                    validation={this.props.validation}
                />

                <ButtonLoader
                    onClick={this.props.submitHanlder}
                    size={"md"}
                    className={
                        "btn  u-btn-primary g-brd-none rounded-0 g-letter-spacing-1 g-font-weight-700 g-font-size-12 text-uppercase "
                    }
                    value={this.props.tran.translate("EDIT_SUBMIT_LABEL")}
                    isLoading={this.props.isLoading}
                />
            </Grid>
        );
    }
}
