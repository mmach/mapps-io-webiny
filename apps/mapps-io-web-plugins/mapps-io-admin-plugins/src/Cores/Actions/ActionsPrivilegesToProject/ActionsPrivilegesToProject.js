/*
    ./client/components/App.jsx
*/

import { Chip, Grid, Tooltip } from "@material-ui/core";
import { CommandList, QueryList, Translator } from "justshare-shared";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import withFixedColumns from "react-table-hoc-fixed-columns";
import "react-table-hoc-fixed-columns/lib/styles.css";
import { Col } from "reactstrap";
import { uuid } from "uuidv4";
import {
    BodyLoader,
    ButtonLoader,
    DropDownList,
    TagComponent
} from "mapps-io-base-plugins/src/Components/index.js";
import { BaseService } from "mapps-io-base-plugins/src/App/index.js";
import "./styles.scss";

const ReactTableFixedColumns = withFixedColumns(ReactTable);

class ActionsPrivilegesToProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.actions = [];
        this.state.privs = [];
        this.state.validation = [];
        this.state.isLoading = true;
        this.state.roleChoose = "";
        this.state.loadingGrant = false;
        this.state.name = "";
        this.state.description = "";
        this.state.newLoading = false;
    }
    shouldComponentUpdate() {
        return true;
    }

    componentDidMount() {
        this.props.getActions().then((succ) => {
            this.props.getPrivs().then((succ2) => {
                this.setState({
                    isLoading: false,
                    actions: succ.data,
                    privs: succ2.data
                });
            });
        });
    }
    refreshValidation() {
        if (this.state.toRefresh) {
            setTimeout(() => {
                //          this.validation();
            });
        }
    }

    onChange(event) {
        const checked = event.target.checked;
        const id = event.currentTarget.getAttribute("data-key");
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
    getDropDownValues() {
        const roles = this.state.privs;
        return [{ id: "", value: "" }, ...roles].map((item) => {
            return {
                id: item.id,
                value: item.privilege_details ? item.privilege_details.name : item.value
            };
        });
    }
    privAddHandler(event) {
        const priv_id = event.currentTarget.dataset.value;
        const action_id = event.currentTarget.dataset.key;
        const id = uuid();

        this.props
            .grantPrivs({
                id: id,
                status: 1,
                privilege_id: priv_id,
                action_id: action_id
            })
            .then(() => {
                const name = this.state.privs.filter((item) => {
                    return item.id == priv_id;
                })[0];
                const actions = this.state.actions.map((item) => {
                    if (item.id == action_id) {
                        item.action_privileges.push({
                            id: id,
                            action_id: action_id,

                            privileges: {
                                id: priv_id,
                                privilege_details: {
                                    name: name.privilege_details.name
                                }
                            }
                        });

                        return item;
                    }
                });
                this.setState({
                    action: [...actions]
                });
            });
    }
    revokePriv(event) {
        const priv_id = event.currentTarget.dataset.key;
        const action_id = event.currentTarget.dataset.tag;
        this.props
            .revokePrivs({
                id: priv_id
            })
            .then(() => {
                const actions = this.state.actions.map((item) => {
                    if (item.id == action_id) {
                        item.action_privileges = [
                            ...item.action_privileges.filter((priv) => {
                                return priv.id != priv_id;
                            })
                        ];
                    }
                    return item;
                });
                this.setState({
                    action: [...actions]
                });
            });
    }
    onTagFunc(event) {
        const func = event.tags.map((i) => i.label).join(" ");
        this.setState({
            actions: [
                ...this.state.actions.map((i) => {
                    return i.id == event.id ? { ...i, func: func } : i;
                })
            ]
        });
    }
    isValidOnp(val, privs) {
        if (
            val.split(" ").filter((i) => !i.startsWith("#")).length + 1 !=
            val.split(" ").filter((i) => i.startsWith("#")).length
        ) {
            return false;
        } else {
            const hash = val
                .split(" ")
                .filter((i) => i.startsWith("#$"))
                .map((d) => {
                    return d.replace(/#/g, "").replace("$", "");
                });
            const filtered = hash.filter((i) =>
                privs.map((p) => p.privileges.privilege_details.name.trim()).includes(i)
            );
            return filtered.length == hash.length;
        }
    }
    clickSave(event) {
        const action = this.state.actions.filter((i) => {
            return i.id == event.target.dataset.key;
        })[0];
        this.props.upsertAction(action);
    }
    render() {
        const tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);

        const operator = ["!", "|", "&", "="];
        if (this.state.isLoading == true) {
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
            <div id="actions_privs" className="">
                <ReactTableFixedColumns
                    data={this.state.actions.sort((a, b) => {
                        return b.action_details.name < a.action_details.name ? 1 : -1;
                    })}
                    columns={[
                        {
                            Header: "Name",
                            columns: [
                                {
                                    Cell: (a) => {
                                        return (
                                            <Col>
                                                {new Date(
                                                    a.original.createdAt
                                                ).toLocaleDateString()}
                                            </Col>
                                        );
                                    },
                                    Header: tran.translate("DATE"),
                                    accessor: "createdAt",
                                    width: 80
                                },
                                {
                                    Cell: (a) => {
                                        return (
                                            <Tooltip
                                                className
                                                title={a.original.action_details.description}
                                            >
                                                <div
                                                    title={a.original.action_details.description}
                                                    style={{ cursor: "default" }}
                                                >
                                                    {a.original.action_details.name}
                                                </div>
                                            </Tooltip>
                                        );
                                    },
                                    Header: tran.translate("ACTION"),
                                    accessor: "action_details.name",
                                    width: 350,
                                    filterable: true
                                },
                                {
                                    Header: tran.translate("TYPE"),
                                    accessor: "action_details.action_type",
                                    width: 100,
                                    filterable: true
                                }
                            ]
                        },
                        {
                            Header: "PRIVILEGES",
                            columns: [
                                {
                                    Cell: (a) => {
                                        return (
                                            <Col>
                                                <DropDownList
                                                    data-key={a.original.id}
                                                    noLabel={true}
                                                    label={"Privileges"}
                                                    valueOptions={this.getDropDownValues()}
                                                    value={""}
                                                    onChange={this.privAddHandler.bind(this)}
                                                    field="type"
                                                    validation={this.state.validation}
                                                />
                                            </Col>
                                        );
                                    },
                                    Header: tran.translate("DEPENDENCIES"),
                                    accessor: "link.limit_of",
                                    id: "progress2",
                                    width: 200
                                },
                                {
                                    Cell: (a) => {
                                        return (
                                            <Col>
                                                {a.original.action_privileges ? (
                                                    a.original.action_privileges.map((priv) => {
                                                        return (
                                                            <Chip
                                                                key={priv.id}
                                                                data-tag={a.original.id}
                                                                data-key={priv.id}
                                                                onClick={this.revokePriv.bind(this)}
                                                                label={
                                                                    priv.privileges
                                                                        .privilege_details.name
                                                                }
                                                            ></Chip>
                                                        );
                                                    })
                                                ) : (
                                                    <span></span>
                                                )}
                                            </Col>
                                        );
                                    },
                                    Header: tran.translate("DEPENDENCIES"),
                                    accessor: "link.limit_of",
                                    id: "progress2",
                                    width: 400
                                },
                                {
                                    Cell: (a) => {
                                        return (
                                            <Col>
                                                {a.original.func ? (
                                                    <span
                                                        style={{
                                                            color: this.isValidOnp(
                                                                a.original.func,
                                                                a.original.action_privileges
                                                            )
                                                                ? "green"
                                                                : "red"
                                                        }}
                                                    >
                                                        {a.original.func}
                                                    </span>
                                                ) : (
                                                    <span></span>
                                                )}
                                                <TagComponent
                                                    notUniq={true}
                                                    tags={
                                                        a.original.func
                                                            ? a.original.func
                                                                  .split(" ")
                                                                  .map((i) => {
                                                                      return {
                                                                          id: uuid(),
                                                                          value: uuid(),
                                                                          label: i
                                                                      };
                                                                  })
                                                            : []
                                                    }
                                                    data-tag={a.original.id}
                                                    noLabel={true}
                                                    onChange={this.onTagFunc.bind(this)}
                                                    suggestions={[
                                                        ...operator.map((i) => {
                                                            return {
                                                                value: i,
                                                                label: i,
                                                                type: "OPERATOR"
                                                            };
                                                        }),
                                                        ,
                                                        ...a.original.action_privileges.map((i) => {
                                                            return {
                                                                id: uuid(),
                                                                value: uuid(),
                                                                label: `#$${i.privileges.privilege_details.name.trim()}#`,
                                                                type: "PRIV"
                                                            };
                                                        })
                                                    ]}
                                                ></TagComponent>
                                            </Col>
                                        );
                                    },
                                    Header: tran.translate("FUNCTION"),
                                    accessor: "link.limit_of",
                                    id: "progress2",
                                    width: 650
                                }
                            ]
                        },
                        {
                            Header: tran.translate("ACTIONS"),
                            columns: [
                                {
                                    Cell: (a) => {
                                        return (
                                            <ButtonLoader
                                                data-key={a.original.id}
                                                onClick={this.clickSave.bind(this)}
                                                isLoading={false}
                                                value={tran.translate("SAVE")}
                                            ></ButtonLoader>
                                        );
                                    },
                                    Header: tran.translate("ACTIONS"),
                                    accessor: "progress",
                                    id: "progress2",
                                    width: 100
                                }
                            ]
                        }
                    ]}
                    defaultPageSize={22}
                    style={{ height: "92vh" }}
                    className="-highlight "
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        codeDict: state.DictionaryReducer,
        lang: state.LanguageReducer,
        config: state.ConfigReducer,
        auth: state.AuthReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getActions: (dto) => {
            return dispatch(new BaseService().queryThunt(QueryList.Actions.GET_ACTIONS, dto));
        },
        getPrivs: (dto) => {
            return dispatch(new BaseService().queryThunt(QueryList.Privileges.GET_PRIVS, dto));
        },
        grantPrivs: (dto) => {
            return dispatch(
                new BaseService().commandThunt(CommandList.Actions.UPSERT_ACTIONS_PRIVS, dto)
            );
        },
        revokePrivs: (dto) => {
            return dispatch(
                new BaseService().commandThunt(CommandList.Actions.DELETE_ACTIONS_PRIVS, dto)
            );
        },
        upsertAction: (dto) => {
            return dispatch(
                new BaseService().commandThunt(CommandList.Actions.UPSERT_ACTIONS, dto)
            );
        }
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ActionsPrivilegesToProject));
