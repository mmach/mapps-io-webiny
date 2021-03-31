/*
    ./client/components/App.jsx
*/

import { CommandList, QueryList, Translator } from "justshare-shared";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import withFixedColumns from "react-table-hoc-fixed-columns";
import "react-table-hoc-fixed-columns/lib/styles.css";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { uuid } from "uuidv4";
import { BaseService } from "mapps-io-base-plugins/src/App/index.js";
import { BodyLoader, Checkbox } from "mapps-io-base-plugins/src/Components/index.js";
import DeleteIcon from "@material-ui/icons/Delete";
import DoneIcon from "@material-ui/icons/Done";
import "./styles.scss";
import { Grid } from "@material-ui/core";
const ReactTableFixedColumns = withFixedColumns(ReactTable);

class ActionsToProject extends React.Component {
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
    changeMailGlobal(event) {
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
            <div id="actionProject">
                <ReactTableFixedColumns
                    data={this.state.actions
                        .sort((a, b) => {
                            return b.name < a.name ? 1 : -1;
                        })
                        .map((item) => {
                            const id = this.state.actionProject.filter((el) => {
                                return el.action_id == item.id;
                            })[0];
                            return { ...item, exist: id };
                        })}
                    columns={[
                        {
                            Header: "ACTIONS",
                            columns: [
                                {
                                    Cell: (a) => {
                                        return new Date(a.original.createdAt).toLocaleDateString();
                                    },
                                    Header: tran.translate("CREATED_AT"),
                                    accessor: "createdAt",
                                    width: 100
                                },
                                {
                                    Header: tran.translate("ACTION"),
                                    accessor: "name",
                                    width: 350,
                                    filterable: true
                                },
                                {
                                    Header: tran.translate("TYPE"),
                                    accessor: "action_type",
                                    width: 120,
                                    filterable: true
                                }
                            ]
                        },
                        {
                            Header: "OPTIONS",
                            columns: [
                                {
                                    Cell: (a) => {
                                        return (
                                            <span>
                                                {a.original.for_category == true ? (
                                                    <DoneIcon />
                                                ) : (
                                                    ""
                                                )}
                                            </span>
                                        );
                                    },
                                    Header: tran.translate("CATEGORY"),
                                    accessor: "for_category",
                                    width: 120
                                },
                                {
                                    Cell: (a) => {
                                        return (
                                            <span>
                                                {a.original.as_process == true ? <DoneIcon /> : ""}
                                            </span>
                                        );
                                    },
                                    Header: tran.translate("AS PROCESS"),
                                    accessor: "as_process",
                                    width: 120
                                },
                                {
                                    Cell: (a) => {
                                        return (
                                            <span>
                                                {a.original.is_process_invoker == true ? (
                                                    <DoneIcon />
                                                ) : (
                                                    ""
                                                )}
                                            </span>
                                        );
                                    },
                                    Header: tran.translate("INVOKER"),
                                    accessor: "is_process_invoker",
                                    width: 120
                                },
                                {
                                    Cell: (a) => {
                                        return (
                                            <span>
                                                {a.original.is_process_start == true ? (
                                                    <DoneIcon />
                                                ) : (
                                                    ""
                                                )}
                                            </span>
                                        );
                                    },
                                    Header: tran.translate("IS_PROCESS_START"),
                                    accessor: "is_process_start",
                                    width: 120
                                }
                            ]
                        },
                        {
                            Header: tran.translate("ACTIONS"),
                            columns: [
                                {
                                    Cell: (a) => {
                                        return (
                                            <span
                                                className="js-width-100p"
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "center"
                                                }}
                                            >
                                                {" "}
                                                <Checkbox
                                                    noLabel={true}
                                                    onChange={this.onChange.bind(this)}
                                                    value={a.original.exist ? true : false}
                                                    data-key={a.original.id}
                                                ></Checkbox>
                                            </span>
                                        );
                                    },
                                    Header: tran.translate("ACTIVATE"),
                                    accessor: "exist",
                                    width: 100
                                },
                                {
                                    Cell: (a) => {
                                        return (
                                            <span
                                                data-key={a.original.id}
                                                onClick={this.onDeleteRow.bind(this)}
                                                style={{
                                                    display: "flex",
                                                    width: "100%",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    height: "100%",
                                                    cursor: "pointer"
                                                }}
                                            >
                                                <DeleteIcon />
                                            </span>
                                        );
                                    },
                                    Header: tran.translate("DELETE"),
                                    accessor: "progress",
                                    id: "progress2",
                                    width: 100
                                }
                            ].filter((i) => i)
                        }
                    ]}
                    defaultPageSize={23}
                    style={{ height: "92vh" }}
                    className="-highlight "
                />
            </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ActionsToProject));
