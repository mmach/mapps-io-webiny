import React from "react";
import { Col, FormGroup, Input, Label } from "reactstrap";
import FormComponent from "./../../index.js";

export default class IconTextbox extends FormComponent {
    constructor(props) {
        super(props);
    }

    render() {
        this.init();
        const formValidation = this.FormValidation.bind(this)();

        const result = (
            <FormGroup color={formValidation.isDanger} className={formValidation.classError}>
                <Label for={this.state.guid} class="col-3 ">
                    {this.state.label}
                </Label>
                <Col xs="3">
                    <Input
                        className="form-control rounded-0"
                        type={this.props.type ? this.props.type : "search"}
                        value={this.props.value}
                        id={this.state.guid}
                        onChange={this.props.onChange}
                        placeholder={this.props.placeholder}
                    />
                    {formValidation.FormValidation}
                </Col>
                <Col xs="6">
                    <span>
                        <i className={this.props.value}></i>
                    </span>
                </Col>
            </FormGroup>
        );
        return result;
    }
}
