/*
    ./client/components/App.jsx
*/

import { Chip, Grid } from "@material-ui/core";
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
import { BodyLoader, DropDownList } from "mapps-io-base-plugins/src/Components/index.js";

const ReactTableFixedColumns = withFixedColumns(ReactTable);

class ActionsStatuses extends React.Component {
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
            this.setState({
                isLoading: false,
                actions: succ.data
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

    getDropDownValues(event) {
        const action_id = event;
        const action = this.state.actions.filter((i) => i.id == action_id)[0];

        const process = this.props.config.processes.filter((i) => i.id == action.process_id)[0];
        const roles = this.props.config.statuses.filter((item) => {
            return process.process_chain.map((i) => i.status_id).includes(item.id);
        });
        return [{ id: "", value: "" }, ...roles].map((item) => {
            return {
                id: item.id,
                value: item.translation ? item.translation[this.props.lang] : item.id
            };
        });
    }
    privAddHandler(event) {
        const status_id = event.currentTarget.dataset.value;
        const action_id = event.currentTarget.dataset.key;
        const id = uuid();

        this.props
            .linkStatus({
                id: id,
                status_id: status_id,
                action_id: action_id
            })
            .then(() => {
                const action = this.state.actions.map((item) => {
                    if (item.id == action_id) {
                        item.statuses.push({
                            id: id,
                            action_id: action_id,
                            status_id: status_id
                        });

                        return { ...item };
                    }
                });
                this.setState({
                    action: [...action]
                });
            });
    }
    revokePriv(event) {
        const priv_id = event.currentTarget.dataset.key;
        const action_id = event.currentTarget.dataset.tag;
        this.props
            .unlinkStatus({
                status_id: priv_id,
                action_id: action_id
            })
            .then(() => {
                const action = this.state.actions.map((item) => {
                    if (item.id == action_id) {
                        item.statuses = [
                            ...item.statuses.filter((priv) => {
                                return priv.status_id != priv_id;
                            })
                        ];
                    }
                    return item;
                });
                this.setState({
                    action: [...action]
                });
            });
    }
    getDropProcessDownValues() {
        const processes = this.props.config.processes;
        return [{ id: "", value: "" }, ...processes].map((item) => {
            return {
                id: item.id,
                value: item.token ? item.token : item.id
            };
        });
    }
    processAddHandler(event) {
        const process_id = event.target.value;
        const action_id = event.currentTarget.dataset.key;

        const action = this.state.actions.filter((i) => i.id == action_id)[0];

        this.props
            .upsertAction({
                ...action,
                process_id: process_id
            })
            .then(() => {
                const action = this.state.actions.map((item) => {
                    if (item.id == action_id) {
                        return action;
                    }
                    return item;
                });
                this.setState({
                    action: [...action]
                });
            });
    }
    render() {
        const tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);
        if (this.state.isLoading || !this.state.actions) {
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
        }

        return (
            <div>
                <ReactTableFixedColumns
                    expanded={{
                        1: {
                            2: true
                        }
                    }}
                    data={this.state.actions.filter((i) => {
                        return i.action_details.is_process_invoker == true;
                    })}
                    columns={[
                        {
                            Header: "Name",
                            columns: [
                                {
                                    Cell: (a) => {
                                        return new Date(a.original.createdAt).toLocaleDateString();
                                    },
                                    Header: tran.translate("ACTION"),
                                    accessor: "createdAt",
                                    width: 80
                                },
                                {
                                    Header: tran.translate("ACTION"),
                                    accessor: "action_details.name",
                                    width: 350
                                }
                            ]
                        },
                        {
                            Header: "Process",
                            columns: [
                                {
                                    Cell: (a) => {
                                        return (
                                            <DropDownList
                                                data-key={a.original.id}
                                                noLabel={true}
                                                valueOptions={this.getDropProcessDownValues()}
                                                value={a.original.process_id}
                                                onChange={this.processAddHandler.bind(this)}
                                                field="type"
                                                validation={this.state.validation}
                                            />
                                        );
                                    },
                                    Header: tran.translate("PROCESS"),
                                    width: 150
                                },
                                {
                                    Cell: (a) => {
                                        return (
                                            a.original.process_id && (
                                                <DropDownList
                                                    data-key={a.original.id}
                                                    noLabel={true}
                                                    valueOptions={this.getDropDownValues(
                                                        a.original.id
                                                    )}
                                                    value={""}
                                                    onChange={this.privAddHandler.bind(this)}
                                                    field="type"
                                                    validation={this.state.validation}
                                                />
                                            )
                                        );
                                    },
                                    Header: tran.translate("STATUSES"),
                                    width: 150
                                },
                                {
                                    Cell: (a) => {
                                        return a.original.process_id && a.original.statuses ? (
                                            a.original.statuses.map((priv) => {
                                                const status = this.props.config.statuses.filter(
                                                    (item) => {
                                                        return priv.status_id == item.id;
                                                    }
                                                )[0];
                                                return (
                                                    <Chip
                                                        key={uuid()}
                                                        data-tag={a.original.id}
                                                        data-key={priv.status_id}
                                                        onClick={this.revokePriv.bind(this)}
                                                        label={
                                                            status &&
                                                            status.translation[this.props.lang]
                                                        }
                                                    ></Chip>
                                                );
                                            })
                                        ) : (
                                            <span></span>
                                        );
                                    },
                                    Header: tran.translate("VISIBLE"),
                                    id: "statuses",
                                    width: 900,
                                    expanded: true
                                }
                            ]
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
        auth: state.AuthReducer,
        statuses: state.StatusListReducer
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

        linkStatus: (dto) => {
            return dispatch(
                new BaseService().commandThunt(CommandList.Status.LINK_STATUS_ACTION, dto)
            );
        },
        unlinkStatus: (dto) => {
            return dispatch(
                new BaseService().commandThunt(CommandList.Status.UNLINK_STATUS_ACTION, dto)
            );
        },
        upsertAction: (dto) => {
            return dispatch(
                new BaseService().commandThunt(CommandList.Actions.UPSERT_ACTIONS, dto)
            );
        }
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ActionsStatuses));
