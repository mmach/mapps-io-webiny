/*
    ./client/components/App.js
*/

import { Grid, InputLabel } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import { CommandList, QueryList, Translator } from "justshare-shared";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { uuid } from "uuidv4";
import CategoryOptionTempFormMapper from "../CategoryOptionTempMapper/CategoryOptionTempFormMapper.js";
import CREATE_ITEM_ACTIONS from "../CreateItem/actions.js";
import PreviewItem from "../PreviewItem/index.js";
import { BaseService } from "./../../../App/index.js";
import { ButtonLoader, TagComponent, TextArea, TextBox } from "./../../../Components/index.js";

function CreateItem(props) {
    const [step, setStep] = React.useState(1);
    const [itemObj, setItem] = React.useState({ id: uuid(), tags: [] });
    const [getCategoryOptionsTypeQuery, setgetCategoryOptionsTypeQuery] = React.useState([]);
    const [categoryOptionValues, setCategoryOptionValues] = React.useState([]);
    const [isLoading, setLoading] = React.useState(false);
    const [isSubmitLoading, setSubmitLoading] = React.useState(false);
    const categoryId = React.useMemo(() => {
        return new URLSearchParams(location.search).get("category_id");
    }, [location.search]);
    const [stepsArray, setStepArrays] = React.useState(
        Object.keys(props.mappsSettings.stepper)
            .filter(
                (i) =>
                    props.mappsSettings.stepper[i].isActive == true &&
                    (props.mappsSettings.stepper[i].asInit == true ||
                        (props.offerItem.category &&
                            props.offerItem.category.id &&
                            props.mappsSettings.stepper[i].ifCategorySet))
            )
            .map((i) => props.mappsSettings.stepper[i])
    );

    useEffect(() => {
        if (
            props.offerItem.category &&
            props.offerItem.category.id == categoryId &&
            categoryId != undefined
        ) {
            return;
        } else if (props.offerItem.category && props.offerItem.category.id != categoryId) {
            props.getCategories({ parent: categoryId }).then((succ) => {
                props.setLeaf(succ.data[0]);
            });
        } else if (props.offerItem.category && props.offerItem.category.id) {
            props.getCategories({ parent: props.offerItem.category.id }).then((succ) => {
                props.setLeaf(succ.data[0]);
            });
        } else {
            props.getCategories({ parent: props.mappsSettings.category_id }).then((succ) => {
                props.setLeaf(succ.data[0]);
            });
        }
    }, [categoryId]);
    useEffect(() => {
        if (props.offerItem.category && props.offerItem.category.id) {
            setLoading(true);
            Promise.all([
                props.getCategoryOptions(props.offerItem.category.id),
                props.getCategoryOptionsType()
            ]).then((succ) => {
                setItem({ tags: [] });
                setgetCategoryOptionsTypeQuery(succ[1].data);
                setLoading(false);
                //   getCategoryOptionsTypeQuery: succ[1].data
                //});
                setStepArrays([
                    ...Object.keys(props.mappsSettings.stepper)
                        .filter((i) => {
                            return (
                                props.mappsSettings.stepper[i].isActive == true &&
                                (props.mappsSettings.stepper[i].asInit == true ||
                                    (props.offerItem.category.id &&
                                        props.mappsSettings.stepper[i].ifCategorySet) ||
                                    succ[0].data.filter((st) => {
                                        return (
                                            Number(st.category_link[0].order) >=
                                                Number(props.mappsSettings.stepper[i].startOrder) &&
                                            Number(st.category_link[0].order) <
                                                Number(props.mappsSettings.stepper[i].endOrder)
                                        );
                                    }).length > 0)
                            );
                        })
                        .map((i) => props.mappsSettings.stepper[i])
                ]);
            });
        }
    }, [props.offerItem.category]);

    useEffect(() => {
        setStepArrays([
            ...Object.keys(props.mappsSettings.stepper)
                .filter(
                    (i) =>
                        props.mappsSettings.stepper[i].isActive == true &&
                        (props.mappsSettings.stepper[i].asInit == true ||
                            (props.offerItem.category.id &&
                                props.mappsSettings.stepper[i].ifCategorySet))
                )
                .map((i) => props.mappsSettings.stepper[i])
        ]);
    }, [props.element.data.stepper]);

    function onTagChange(tags) {
        const obj = { ...itemObj };
        obj.tags = tags;
        setItem({ ...itemObj, tags: tags });
    }

    function nameHandler(event) {
        const obj = { ...itemObj };
        obj.name = event.target.value;
        setItem(obj);

        //    refreshValidation();
    }
    function descriptionHandler(event) {
        const obj = { ...itemObj };
        obj.description = event.target.value;
        setItem(obj);
        //   refreshValidation();
    }

    function submitHandler() {
        setSubmitLoading(true);
        const id = uuid();
        const item = {
            ...itemObj,
            id: id,
            category_id: props.offerItem.category.id,
            catOptions: [
                ...categoryOptionValues.map((i) => {
                    i.value = i.val;
                    i.item_id = id;
                    return { ...i };
                })
            ]
        };
        props
            .invokeProcess(props.offerItem.category.process_id, null, null, null, null, item)
            .then(() => {
                setSubmitLoading(false);
            });
        // props.createNewItem(item).then((succ) => {
        //   console.log(succ);
        // });
    }

    function nextStep() {
        window.scrollTo(0, 0);
        setStep(step + 1);
    }

    function prevStep() {
        window.scrollTo(0, 0);
        setStep(step - 1);
    }

    const phTrans = Translator(props.codeDict.data.PLACEHOLDER, props.lang);
    const tran = Translator(props.codeDict.data.LABEL, props.lang);
    return (
        <>
            <Stepper activeStep={step} alternativeLabel>
                {stepsArray.map((item) => {
                    if (item.asInit && props.offerItem.category.id) {
                        return (
                            <Step key={item.name}>
                                <StepLabel>
                                    {item.name}
                                    <br />
                                    {`(${props.offerItem.category["category_" + props.lang]})`}
                                </StepLabel>
                            </Step>
                        );
                    }
                    return (
                        <Step key={item.name}>
                            <StepLabel>{item.name}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            <>
                {step === stepsArray.length ? (
                    <div></div>
                ) : (
                    <>
                        <Grid>
                            {stepsArray[step] && stepsArray[step].previewItem && (
                                <PreviewItem
                                    item={{
                                        ...itemObj,
                                        itemCategoryOption: [
                                            ...categoryOptionValues.map((i) => {
                                                i.value = i.val;
                                                return { ...i };
                                            })
                                        ],
                                        category: props.offerItem.category,
                                        category_id: props.offerItem.category.id,
                                        user: props.auth.user
                                    }}
                                ></PreviewItem>
                            )}
                            {stepsArray[step] && stepsArray[step].setTitle && (
                                <TextBox
                                    placeholder={phTrans.translate("ITEM_NAME_PLACEHOLDER")}
                                    isRequired={true}
                                    label={tran.translate("ITEM_NAME_LABEL")}
                                    value={itemObj.name}
                                    onChange={nameHandler}
                                    field="name"
                                    validation={[]}
                                />
                            )}
                            {stepsArray[step] && stepsArray[step].setTags && (
                                <>
                                    <InputLabel>{tran.translate("ITEM_TAGS_LABEL")}</InputLabel>
                                    <TagComponent
                                        onChange={onTagChange}
                                        noLabel
                                        label={tran.translate("ITEM_TAGS_LABEL")}
                                        notUniq={false}
                                        tags={itemObj.tags ? itemObj.tags : []}
                                        field="tag"
                                        validation={[]}
                                        placeholder={tran.translate("ITEM_TAGS_LABEL")}
                                    />
                                </>
                            )}
                            {stepsArray[step] && stepsArray[step].setDescription && (
                                <TextArea
                                    placeholder={phTrans.translate("ITEM_DESCRIPTION_PLACEHOLDER")}
                                    label={tran.translate("ITEM_DESCRIPTION_LABEL")}
                                    value={itemObj.description}
                                    onChange={descriptionHandler}
                                    field="name"
                                    validation={[]}
                                />
                            )}
                            <>
                                {!isLoading &&
                                    props.offerItem &&
                                    props.offerItem.catOptions
                                        .filter((item) => {
                                            return (
                                                stepsArray[step] &&
                                                Number(item.category_link[0].order) >=
                                                    stepsArray[step].startOrder &&
                                                Number(item.category_link[0].order) <
                                                    stepsArray[step].endOrder &&
                                                item.category_link[0].is_form_hidden != true
                                            );
                                        })
                                        .sort((a, b) => {
                                            return Number(a.category_link[0].order) >
                                                Number(b.category_link[0].order)
                                                ? 1
                                                : -1;
                                        })
                                        .map((item, index) => {
                                            return (
                                                <CategoryOptionTempFormMapper
                                                    key={index}
                                                    options={props.offerItem.catOptions}
                                                    itemCategories={categoryOptionValues}
                                                    getCategoryOptionsTypeQuery={
                                                        getCategoryOptionsTypeQuery
                                                    }
                                                    catOption={item}
                                                    element={props.mappsSettings}
                                                    optionValue={categoryOptionValues.filter(
                                                        (i) => i.co_id == item.id
                                                    )}
                                                    onChange={(catOption, values) => {
                                                        const res = values.map((el) => {
                                                            el.co_id = item.id;
                                                            el.value = el.val;
                                                            return el;
                                                        });
                                                        const categoryOption = categoryOptionValues.filter(
                                                            (el) => {
                                                                return el.co_id != item.id;
                                                            }
                                                        );
                                                        categoryOption.push(...res);
                                                        setCategoryOptionValues([
                                                            ...categoryOption
                                                        ]);
                                                        //this.setState({
                                                        //    categoryOptionValues: [...this.state.categoryOptionValues]
                                                        //})
                                                    }}
                                                ></CategoryOptionTempFormMapper>
                                            );
                                        })}
                            </>
                        </Grid>
                        <Grid
                            container
                            style={{ justifyContent: "space-around", marginTop: "20px" }}
                        >
                            <Grid item>
                                <Button disabled={step === 0 || step === 1} onClick={prevStep}>
                                    Back
                                </Button>
                            </Grid>
                            <Grid item>
                                {step === stepsArray.length - 1 ? (
                                    <ButtonLoader
                                        onClick={submitHandler}
                                        size={"md"}
                                        value={"Submit"}
                                        isLoading={isSubmitLoading}
                                    />
                                ) : (
                                    <Button variant="contained" color="primary" onClick={nextStep}>
                                        Next
                                    </Button>
                                )}
                            </Grid>
                        </Grid>
                    </>
                )}
            </>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        codeDict: state.DictionaryReducer,
        lang: state.LanguageReducer,
        auth: state.AuthReducer,
        loader: state.LoaderReducer,
        offerItem: state.CreateItemReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setLeaf: (category) => {
            return dispatch({
                type: CREATE_ITEM_ACTIONS.SET_CATEGORY,
                dto: category
            });
        },
        invokeProcess: (process_id, chain_id, action_id, accepted, rejected, dto) => {
            return dispatch(
                new BaseService().commandThunt(CommandList.Process.INVOKE_PROCESS, {
                    process_id: process_id,
                    chain_id: chain_id,
                    process_model: dto,
                    action_id: action_id,
                    accepted: accepted,
                    rejected: rejected
                })
            );
        },
        getCategoryOptions: (category_id) => {
            return dispatch(
                new BaseService().queryThunt(QueryList.CategoryOptions.GET_CATEGORY_OPTION, {
                    id: category_id
                })
            );
        },
        createNewItem: (dto) => {
            return dispatch(new BaseService().commandThunt(CommandList.Item.NEW_ITEM, dto));
        },
        getUserImages: (dto) => {
            return dispatch(
                new BaseService().queryThunt(QueryList.Blob.GET_USER_IMAGES, dto, null)
            );
        },
        getCategories: (dto) => {
            return dispatch(
                new BaseService().queryThunt(QueryList.Category.GET_CATEGORIES_HIERARCHY, dto)
            );
        },
        getCategoryOptionsType: () => {
            return dispatch(
                new BaseService().queryThunt(QueryList.CategoryOptions.GET_OPTIONS_TYPE, {})
            );
        }
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(React.memo(CreateItem)));
