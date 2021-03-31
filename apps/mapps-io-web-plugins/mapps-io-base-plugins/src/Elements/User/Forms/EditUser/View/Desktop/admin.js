import { FormHelperText, Grid } from "@material-ui/core";
import React from "react";
import {
    ButtonLoader,

    DayPickerInputComponent, TextBox
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
                    placeholder={this.props.phTrans.translate("REGISTER_NAME_PLACEHOLDER")}
                    isRequired={true}
                    label={this.props.tran.translate("REGISTER_NAME_LABEL")}
                    value={this.props.name}
                    onChange={this.props.nameHandler}
                    field="name"
                    validation={this.props.validation}
                />
             <TextBox
                    placeholder={this.props.phTrans.translate("REGISTER_SURNAME_PLACEHOLDER")}
                    isRequired={true}
                    label={this.props.tran.translate("REGISTER_SURNAME_LABEL")}
                    value={this.props.surname}
                    onChange={this.props.surnameHandler}
                    field="surname"
                    validation={this.props.validation}
                />
                  <TextBox
                    placeholder={this.props.phTrans.translate("REGISTER_NICKNAME_PLACEHOLDER")}
                    isRequired={true}
                    label={this.props.tran.translate("REGISTER_NICKNAME_LABEL")}
                    value={this.props.nickname}
                    onChange={this.props.nicknameHandler}
                    field="nickname"
                    validation={this.props.validation}
                />
                <DayPickerInputComponent
                    dateFormat="dd-MM-yyyy"
                    showTimeSelect={false}
                    scrollableYearDropdown={true}
                    showYearDropdown={true}
                    maxDate={new Date()}
                    value={this.props.birthDate}
                    placeholder={this.props.phTrans.translate("REGISTER_BIRTHDATE_PLACEHOLDER")}
                    isRequired={true}
                    label={this.props.tran.translate("REGISTER_BIRTHDATE_LABEL")}
                    onChange={this.props.birthDateHandler}
                    field="birthDate"
                    validation={this.props.validation}
                />

                <TextBox
                    placeholder={this.props.phTrans.translate("REGISTER_PHONE_PLACEHOLDER")}
                    isRequired={true}
                    label={this.props.tran.translate("REGISTER_PHONE_LABEL")}
                    value={this.props.phone}
                    onChange={this.props.phoneHandler}
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
