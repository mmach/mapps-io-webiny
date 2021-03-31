import { Grid } from "@material-ui/core";
import { QueryList, ToTranslateDTO, Translator } from "justshare-shared";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { uuid } from "uuidv4";
import { ButtonLoader } from "..";
import { BaseService } from "../../App";
import TextBox from "../FormComponent/Components/TextBox/index.js";

function TranslateCompnent(props) {
    const [translate, setTranslate] = useState({});

    const isLoading = false;
    useEffect(() => {
        const trans = { ...props.translation };
        trans.default = trans.name;
        setTranslate(trans);
    }, [props.translation.id]);

    function translateTo(event) {
        const lang = event.target.innerText;
        const obj = new ToTranslateDTO();
        obj.src = translate.name;
        obj.langTo = lang;
        obj.langSrc = props.lang;
        props.toTranslate(obj).then((succ) => {
            const translateObj = translate;
            translateObj[lang.toLowerCase()] = succ.data;
            setTranslate({ ...translateObj });
            props.setTranslate({ ...translateObj });
        });
    }
    function translateAll() {
        const prom = props.config.languages.map((item) => {
            const obj = new ToTranslateDTO();
            obj.src = translate.name;
            obj.langTo = item;
            obj.langSrc = props.lang;
            return props.toTranslate(obj);
        });
        Promise.all(prom).then((succ) => {
            const translateObj = translate;

            props.config.languages.forEach((item, index) => {
                translateObj[item.toLowerCase()] = succ[index].data;
            });
            setTranslate(translateObj);
            props.setTranslate(translateObj);
        });
    }

    function textBoxChange(event) {
        const lang = event.currentTarget.dataset.key;
        const translateObj = translate;
        translateObj[lang] = event.target.value;
        setTranslate({ ...translateObj });
        props.setTranslate({ ...translateObj });
    }

    const tran = Translator(props.codeDict.data.LABEL, props.lang);
    const phTrans = Translator(props.codeDict.data.PLACEHOLDER, props.lang);
    if (isLoading) {
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

            {[
                <Grid key={"name"} container direction="row">
                    <Grid item xs="3" style={{ display: "flex", alignItems: "center" }}>
                        {tran.translate("LANG_DEFAULT_NAME")}
                    </Grid>
                    <Grid item xs="9">
                        <TextBox
                            data-key={"name"}
                            placeholder={phTrans.translate("LANG_DEFAULT_VALUE")}
                            label={tran.translate("LANG_DEFAULT_NAME")}
                            value={translate["name"]}
                            onChange={textBoxChange}
                        />
                    </Grid>
                </Grid>,
                ...props.config.languages.map((item) => {
                    return (
                        <Grid container direction="row" key={item}>
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
                                    onClick={translateTo}
                                    size={"sm"}
                                    className={
                                        "btn u-btn-primary rounded-0 g-letter-spacing-1 g-font-weight-700 g-font-size-12 text-uppercase"
                                    }
                                    value={item}
                                    isLoading={isLoading}
                                />
                            </Grid>
                            <Grid item xs="9">
                                <TextBox
                                    data-key={item}
                                    label={item}
                                    placeholder={""}
                                    value={translate[item]}
                                    onChange={textBoxChange}
                                />
                            </Grid>
                        </Grid>
                    );
                })
            ]}
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
                        onClick={translateAll.bind(this)}
                        size={"sm"}
                        className={
                            "btn u-btn-primary rounded-0 g-letter-spacing-1 g-font-weight-700 g-font-size-12 text-uppercase"
                        }
                        value={tran.translate("LANG_BUTTON_ALL")}
                        isLoading={isLoading}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
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
