import { CategoryOptionsDTO, Translator } from "justshare-shared";
import React from "react";
import { uuid } from "uuidv4";

export default class CategoryOptionBase extends React.Component {
    constructor(props) {
        super(props);
    }

    refreshValidation() {
        if (this.state.toRefresh) {
            setTimeout(() => {
                this.validation();
            });
        }
    }
    translateSubmit(event) {
        const lang = event.target.innerText;
        let langFrom = this.state.catOption.lang ? this.state.catOption.lang : this.props.lang;
        if (langFrom == "zh_cn") {
            langFrom = "zh";
        } else if (langFrom == "us") {
            langFrom = "en";
        }
        const obj = {};
        obj.src = this.state.catOption.name;
        obj.langTo = lang;
        obj.langSrc = langFrom;
        this.props.toTranslate(obj).then((succ) => {
            const translatedText = succ.data;
            const catOption = this.state.catOption;
            catOption[`name_${lang.toLowerCase()}`] = translatedText;
            this.setState({
                catOption: { ...catOption }
            });
        });
    }
    validation() {
        let validation = CategoryOptionsDTO.prototype.validation(this.state.catOption);
        this.tran = Translator(this.props.codeDict.data.VALIDATION, this.props.lang);
        validation = validation.map((item) => {
            item.msg = this.tran.translate(item.failed, ...item.value);
            return item;
        });
        this.setState({
            validation: validation
        });
        return validation;
    }

    submitHanlder() {
        this.setState({
            isSubmitLoading: true,
            toRefresh: true
        });
        const catOption = this.state.catOption;
        catOption.type = this.props.catOptionsTemp.type;
        catOption.cat_opt.name = this.props.catOptionsTemp.name;
        const validator = this.validation();
        const id = catOption.id ? catOption.id : uuid();
        if (validator.length == 0) {
            catOption.status = 1;
            catOption.id = id;
            if (catOption.cat_opt_temp == undefined) {
                catOption.cat_opt_temp = this.props.catOption.cat_opt_temp;
                //  this.state.catOption.cat_opt_temp.push({ id: uuidv4(), co_id: this.state.catOption.id, placeholder: 'NEW ELEMENT' })

                //   this.state.catOption.cat_opt_temp.push({ id: uuidv4(), co_id: this.state.catOption.id, placeholder: 'NEW ELEMENT' })
            }
            this.props.upsertCategoryOptions(catOption).then(() => {
                this.props.getCategoryOptions().then(() => {
                    this.props.history.push(`/mapps/categories/categoriesOptions/${catOption.id}`);
                });
                ///window.location.reload();

                this.setState({
                    isSubmitLoading: false
                });
            });
        } else {
            this.setState({
                isSubmitLoading: false
            });
        }

        //   }
    }

    removeHanlder() {
        this.setState({
            isDeleteLoadingg: true
        });
        this.props.deleteCategoryOptions(this.state.catOption).then(() => {
            this.setState({
                isDeleteLoadingg: false
            });
        });
    }

    typeHandler(event) {
        const catOption = this.state.catOption;
        catOption.type = event.target.value;
        this.setState({
            catOption: catOption
        });

        this.refreshValidation();
    }
    getDropDownValues() {
        return [
            { id: null, value: null },
            ...this.props.config.dimensions
                .filter((item) => {
                    return item.co_type_id == this.state.catOption.cot_id && item.cott_id == null;
                })
                .map((item) => {
                    return {
                        id: item.id,
                        value: item.name
                    };
                })
        ];
    }
    dimHandler(event) {
        this.setState({
            catOption: {
                ...this.state.catOption,
                dim_id: event.target.value.length > 0 ? event.target.value : null
            }
        });
    }
}
