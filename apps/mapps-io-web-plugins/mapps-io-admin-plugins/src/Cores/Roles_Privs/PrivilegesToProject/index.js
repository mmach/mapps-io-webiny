import { Grid } from "@material-ui/core";
/*
    ./client/components/App.jsx
*/

import DeleteIcon from "@material-ui/icons/Delete";
import { BodyLoader,Checkbox } from "mapps-io-base-plugins/src/Components/index.js";
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
import "./styles.scss";

const ReactTableFixedColumns = withFixedColumns(ReactTable);

class PrivilegesToProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.privileges = [];
        this.state.privilegeProject = [];
        this.state.role = [];
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
        this.props.getAll().then((succ) => {
            this.props.get().then((succ2) => {
                this.setState({
                    isLoading: false,
                    privileges: succ.data,
                    privilegeProject: succ2.data
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
            .upsertPrivGlobal({
                id: id,
                name: this.state.name,
                status: this.state.status
            })
            .then(() => {
                this.state.privileges.push({
                    id: id,
                    name: this.state.name,
                    status: this.state.status
                });
                this.setState({
                    actions: this.state.privileges,
                    name: "",
                    newLoading: false
                });
            });
    }

    nameHandler(event) {
        this.setState({
            name: event.target.value.toUpperCase()
        });
    }

    onDeleteRow(event) {
        const id = event.currentTarget.getAttribute("data-key");
        this.props.deletePrivGlobal({ id: id }).then(() => {
            this.setState({
                privileges: this.state.privileges.filter((item) => {
                    return item.id != id;
                })
            });
        });
    }
    onChange(event) {
        const checked = event.target.checked;
        const id = event.currentTarget.getAttribute("data-key");
        if (checked == true) {
            const objId = uuid();
            this.props.upsertPriv({ id: objId, privilege_id: id, status: true }).then(() => {
                this.state.privilegeProject.push({
                    id: objId,
                    privilege_id: id,
                    status: true
                });
                this.setState({
                    privilegeProject: [...this.state.privilegeProject]
                });
            });
        } else {
            const idActProj = this.state.privilegeProject.filter((item) => {
                return item.privilege_id == id;
            })[0];
            const res = [
                ...this.state.privilegeProject.filter((item) => {
                    return item.privilege_id != id;
                })
            ];

            this.props.deletePriv({ id: idActProj.id, status: true }).then(() => {
                this.setState({
                    privilegeProject: res
                });
            });
        }
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
            <div id="privilegesToProject">
                <ReactTableFixedColumns
                    expanded={{
                        1: {
                            2: true
                        }
                    }}
                    data={this.state.privileges}
                    columns={[
                        {
                            Header: "Name",
                            columns: [
                                {
                                    Cell: (a) => {
                                        return new Date(a.original.createdAt).toLocaleDateString();
                                    },
                                    Header: tran.translate("Created At"),
                                    accessor: "createdAt",
                                    width: 100
                                },
                                {
                                    Header: tran.translate("Role"),
                                    accessor: "name",
                                    width: 350
                                }
                            ]
                        },
                        {
                            Header: "Role Action",
                            columns: [
                                {
                                    Cell: (a) => {
                                        const id = this.state.privilegeProject.filter((el) => {
                                            return el.privilege_id == a.original.id;
                                        })[0];
                                        return (
                                            <Checkbox
                                                key={a.original.id}
                                                noLabel={true}
                                                onChange={this.onChange.bind(this)}
                                                value={id ? true : false}
                                                data-key={a.original.id}
                                            ></Checkbox>
                                        );
                                    },
                                    Header: tran.translate("Activate"),
                                    width: 150
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
    return {
        codeDict: state.DictionaryReducer,
        lang: state.LanguageReducer,
        config: state.ConfigReducer,
        auth: state.AuthReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        upsertPriv: (dto) => {
            return dispatch(
                new BaseService().commandThunt(CommandList.Privileges.UPSERT_PRIV, dto)
            );
        },
        deletePriv: (dto) => {
            return dispatch(
                new BaseService().commandThunt(CommandList.Privileges.DELETE_PRIV, dto)
            );
        },
        deletePrivGlobal: (dto) => {
            return dispatch(
                new BaseService().commandThunt(CommandList.Privileges.DELETE_PRIV_GLOBALLY, dto)
            );
        },
        upsertPrivGlobal: (dto) => {
            return dispatch(
                new BaseService().commandThunt(CommandList.Privileges.UPSERT_PRIV_GLOBALLY, dto)
            );
        },
        get: (dto) => {
            return dispatch(new BaseService().queryThunt(QueryList.Privileges.GET_PRIVS, dto));
        },
        getAll: (dto) => {
            return dispatch(
                new BaseService().queryThunt(QueryList.Privileges.GET_GLOBAL_PRIVS, dto)
            );
        }
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PrivilegesToProject));
