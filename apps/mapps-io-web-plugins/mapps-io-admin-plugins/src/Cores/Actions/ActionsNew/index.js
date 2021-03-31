/*
    ./client/components/App.jsx
*/

import { CommandList, QueryList, Translator } from "justshare-shared";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { uuid } from "uuidv4";
import { BaseService } from "mapps-io-base-plugins/src/App/index.js";
import {
    BodyLoader,
    ButtonLoader,
    Checkbox,
    DropDownList,
    TextArea,
    TextBox
} from "mapps-io-base-plugins/src/Components/index.js";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { Paper } from "@material-ui/core";

class ActionsNew extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.actions = [];
        this.state.actionProject = [];
        this.state.role = [];
        this.state.validation = [];
        this.state.isLoading = true;
        this.state.roleChoose = "";
        this.state.loadingGrant = false;
        this.state.name = "";
        this.state.description = "";
        this.state.newLoading = false;
        this.state.forCategory = false;
        this.state.type = {};
        this.state.actionsTypes = [
            { id: "", value: "" },
            { id: uuid(), value: "QUERY" },
            { id: uuid(), value: "COMMAND" },
            { id: uuid(), value: "VIEW" },
            { id: uuid(), value: "PROCESS" }
        ];
    }
    shouldComponentUpdate() {
        return true;
    }
    componentDidMount() {
        this.props.getAllActions().then((succ) => {
            this.props.getActions().then((succ2) => {
                this.setState({
                    isLoading: false,
                    actions: succ.data,
                    actionProject: succ2.data
                });
            });
        });
    }

    submitHanlder() {
        this.setState({
            newLoading: true
        });
        const id = uuid();
        this.props
            .upsertActionGlobal({
                id: id,
                name: this.state.name,
                description: this.state.description,
                status: this.state.status,
                action_type: this.state.type.value,
                for_category: this.state.forCategory
            })
            .then(() => {
                this.state.actions.push({
                    id: id,
                    name: this.state.name,
                    description: this.state.description,
                    status: this.state.status,
                    action_type: this.state.type.value,
                    for_category: this.state.forCategory
                });
                this.setState({
                    actions: this.state.actions,
                    name: "",
                    description: "",
                    newLoading: false,
                    action_type: {},
                    for_category: false
                });
            });
    }
    nameHandler(event) {
        this.setState({
            name: event.target.value.toUpperCase()
        });
    }
    descriptionHandler(event) {
        this.setState({
            description: event.target.value
        });
    }
    onDeleteRow(event) {
        const id = event.currentTarget.dataset.key;
        this.props.deleteActionGlobal({ id: id }).then(() => {
            this.setState({
                actions: this.state.actions.filter((item) => {
                    return item.id != id;
                })
            });
        });
    }
    onChange(event) {
        const checked = event.target.checked;
        const id = event.currentTarget.dataset.key;
        if (checked == true) {
            const objId = uuid();
            this.props.upsertAction({ id: objId, action_id: id, status: true }).then(() => {
                this.state.actionProject.push({
                    id: objId,
                    action_id: id,
                    status: true
                });
                this.setState({
                    actionProject: [...this.state.actionProject]
                });
            });
        } else {
            const idActProj = this.state.actionProject.filter((item) => {
                return item.action_id == id;
            })[0];
            const res = [
                ...this.state.actionProject.filter((item) => {
                    return item.action_id != id;
                })
            ];

            this.props.deleteAction({ id: idActProj.id, status: true }).then(() => {
                this.setState({
                    actionProject: res
                });
            });
        }
    }
    getDropDown() {
        return this.state.actionsTypes.map((item) => {
            return {
                id: item.id,
                value: item.value
            };
        });
    }
    onChangeForCategory(event) {
        const checked = event.target.checked;
        this.setState({
            forCategory: checked
        });
    }
    changeAction(event) {
        this.state.actionsTypes.forEach((item) => {
            if (item.id == event.target.value) {
                this.setState({
                    type: item
                });
            }
        });
    }
    render() {
        const tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);
        if (this.state.isLoading) {
            return (
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    style={{ height: "92vh", display: "flex" }}
                >
                    <BodyLoader thickness={"2"} size={"40px"}></BodyLoader>
                </Grid>
            );
        }

        return (
            <React.Fragment>
                <CssBaseline />

                <Container style={{ width: "100%", height: "92vh" }} fixed id="actionProject">
                    <Grid
                        style={{ width: "100%", height: "100%" }}
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                    >
                        <Paper style={{ padding: "20px", width: "auto", minWidth: "420px" }}>
                            <Typography
                                style={{
                                    marginBottom: "20px",
                                    paddingBottom: "10px",
                                    borderBottom: "1px solid #999"
                                }}
                                variant="h5"
                                component="h1"
                            >
                                {tran.translate("NEW ACTION")}
                            </Typography>
                            <Grid item>
                                <TextBox
                                    label={tran.translate("Action")}
                                    onChange={this.nameHandler.bind(this)}
                                ></TextBox>
                            </Grid>
                            <TextArea
                                label={tran.translate("Description")}
                                onChange={this.descriptionHandler.bind(this)}
                            ></TextArea>
                            <Grid item>
                                <DropDownList
                                    label={tran.translate("Type")}
                                    valueOptions={this.getDropDown.bind(this)()}
                                    value={this.state.type.id}
                                    onChange={this.changeAction.bind(this)}
                                    field="type"
                                    validation={this.state.validation}
                                />
                            </Grid>
                            <Checkbox
                                label={tran.translate("As process")}
                                onChange={(event) => {
                                    this.setState({
                                        as_process: event.target.checked
                                    });
                                }}
                            ></Checkbox>
                            <Checkbox
                                label={tran.translate("Process invoker")}
                                onChange={(event) => {
                                    this.setState({
                                        is_process_invoker: event.target.checked
                                    });
                                }}
                            ></Checkbox>

                            {this.state.type.value == "VIEW" && (
                                <Checkbox
                                    label={tran.translate("For category")}
                                    onChange={(event) => {
                                        this.setState({
                                            forCategory: event.target.checked
                                        });
                                    }}
                                ></Checkbox>
                            )}
                            {this.state.type.value == "PROCESS" && (
                                <Checkbox
                                    label={tran.translate("Is process start")}
                                    onChange={(event) => {
                                        this.setState({
                                            is_process_start: event.target.checked
                                        });
                                    }}
                                ></Checkbox>
                            )}
                            <ButtonLoader
                                onClick={this.submitHanlder.bind(this)}
                                size={"md"}
                                color={"primary"}
                                value={tran.translate("ACTION_BUTTON_SAVE")}
                                isLoading={this.state.newLoading}
                            />
                        </Paper>
                    </Grid>
                </Container>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    //console.log(state);

    return {
        codeDict: state.DictionaryReducer,
        lang: state.LanguageReducer,
        config: state.ConfigReducer,
        auth: state.AuthReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        upsertAction: (dto) => {
            return dispatch(
                new BaseService().commandThunt(CommandList.Actions.UPSERT_ACTIONS, dto)
            );
        },
        deleteAction: (dto) => {
            return dispatch(
                new BaseService().commandThunt(CommandList.Actions.DELETE_ACTIONS, dto)
            );
        },
        deleteActionGlobal: (dto) => {
            return dispatch(
                new BaseService().commandThunt(CommandList.Actions.DELETE_GLOBAL_ACTIONS, dto)
            );
        },
        upsertActionGlobal: (dto) => {
            return dispatch(
                new BaseService().commandThunt(CommandList.Actions.UPSERT_GLOBAL_ACTIONS, dto)
            );
        },
        getActions: (dto) => {
            return dispatch(new BaseService().queryThunt(QueryList.Actions.GET_ACTIONS, dto));
        },
        getAllActions: (dto) => {
            return dispatch(
                new BaseService().queryThunt(QueryList.Actions.GET_GLOBAL_ACTIONS, dto)
            );
        }
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ActionsNew));

/*
 */
