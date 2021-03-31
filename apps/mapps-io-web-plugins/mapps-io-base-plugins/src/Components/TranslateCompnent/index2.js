import { Grid } from "@material-ui/core";
import { QueryList, ToTranslateDTO, Translator } from "justshare-shared";
import React from "react";
import { connect } from "react-redux";
import { uuid } from "uuidv4";
import { ButtonLoader } from "..";
import { BaseService } from "../../App";
import TextBox from "../FormComponent/Components/TextBox/index.js";

class TranslateCompnent extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.id =
            this.props.translation && this.props.translation.id
                ? this.props.translation.id
                : uuid();
        this.state.translate =
            this.props.translation && this.props.translation ? this.props.translation : {};
    }

    translate(event) {
        const lang = event.target.innerText;
        const obj = new ToTranslateDTO();
        obj.src = this.state.translate.name;
        obj.langTo = lang;
        obj.langSrc = this.props.lang;
        this.props.toTranslate(obj).then((succ) => {
            const translate = this.state.translate;
            translate[lang.toLowerCase()] = succ.data;
            this.setState({ translate: translate });
            this.props.setTranslate(translate);
        });
    }
    translateAll() {
        const prom = this.props.config.languages.map((item) => {
            const obj = new ToTranslateDTO();
            obj.src = this.state.translate.name;
            obj.langTo = item;
            obj.langSrc = this.props.lang;
            return this.props.toTranslate(obj);
        });
        Promise.all(prom).then((succ) => {
            const translate = this.state.translate;

            this.props.config.languages.forEach((item, index) => {
                translate[item.toLowerCase()] = succ[index].data;
            });
            this.setState({ translate: translate });
            this.props.setTranslate(translate);
        });
    }
    textBoxName(event) {
        const translate = this.state.translate;
        translate["name"] = event.target.value;
        this.setState({ translate: translate });
        this.props.setTranslate(translate);
    }
    textBoxChange(event) {
        const lang = event.currentTarget.dataset.key;
        const translate = this.state.translate;
        translate[lang] = event.target.value;
        this.setState({ translate: translate });
        this.props.setTranslate(translate);
    }

    render() {
        const tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);
        const phTrans = Translator(this.props.codeDict.data.PLACEHOLDER, this.props.lang);
        if (this.state.isLoading) {
            return <span>LOADING...</span>;
        }
        return (
            <Grid direction="column">
                <Grid container direction="row" style={{ paddingBottom: "10px" }}>
                    <Grid item xs="3"></Grid>
                    <Grid item xs="9">
                        {tran.translate("LANG_TEXTBOX")}
                    </Grid>
                </Grid>
                <Grid container direction="row">
                    <Grid item xs="3" style={{ display: "flex", alignItems: "center" }}>
                        {tran.translate("LANG_DEFAULT_NAME")}
                    </Grid>
                    <Grid item xs="9">
                        <TextBox
                            placeholder={phTrans.translate("LANG_DEFAULT_VALUE")}
                            label={tran.translate("LANG_DEFAULT_NAME")}
                            value={this.state.translate.name}
                            onChange={this.textBoxName.bind(this)}
                            validation={this.state.validation}
                        />
                    </Grid>
                </Grid>
                {this.props.config.languages.map((item) => {
                    return (
                        <Grid container direction="row" key={uuid()}>
                            <Grid
                                item
                                xs="3"
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    marginBottom: "2px"
                                }}
                            >
                                <ButtonLoader
                                    data-key={item}
                                    onClick={this.translate.bind(this)}
                                    size={"sm"}
                                    className={
                                        "btn u-btn-primary rounded-0 g-letter-spacing-1 g-font-weight-700 g-font-size-12 text-uppercase"
                                    }
                                    value={item}
                                    isLoading={this.state.isLoading}
                                />
                            </Grid>
                            <Grid item xs="9">
                                <TextBox
                                    data-key={item}
                                    label={item}
                                    placeholder={""}
                                    value={this.state.translate[item]}
                                    onChange={this.textBoxChange.bind(this)}
                                    validation={this.state.validation}
                                />
                            </Grid>
                        </Grid>
                    );
                })}
                <Grid container direction="row" key={uuid()}>
                    <Grid
                        item
                        xs="3"
                        style={{ display: "flex", alignItems: "center", marginBottom: "2px" }}
                    >
                        {tran.translate("LANG_TEXT_ALL")}
                    </Grid>
                    <Grid
                        item
                        xs="9"
                        style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                    >
                        <ButtonLoader
                            onClick={this.translateAll.bind(this)}
                            size={"sm"}
                            className={
                                "btn u-btn-primary rounded-0 g-letter-spacing-1 g-font-weight-700 g-font-size-12 text-uppercase"
                            }
                            value={tran.translate("LANG_BUTTON_ALL")}
                            isLoading={this.state.isLoading}
                        />
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => {
    //console.log(state);

    return {
        codeDict: state.DictionaryReducer,
        lang: state.LanguageReducer,
        config: state.ConfigReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        toTranslate: (dto) => {
            return dispatch(new BaseService().queryThunt(QueryList.Languages.TRANSLATE, dto));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TranslateCompnent);
