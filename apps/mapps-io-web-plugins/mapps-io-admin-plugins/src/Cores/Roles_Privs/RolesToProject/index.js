import { Grid } from "@material-ui/core";
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
import "./styles.scss";
const ReactTableFixedColumns = withFixedColumns(ReactTable);

class RolesToProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.roles = [];
        this.state.rolesProject = [];
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
                    roles: succ.data,
                    rolesProject: succ2.data
                });
            });
        });
    }

    onChange(event) {
        const checked = event.target.checked;
        const id = event.currentTarget.dataset.key;
        if (checked == true) {
            const objId = uuid();
            this.props.upsertRole({ id: objId, role_id: id, status: true }).then(() => {
                this.state.rolesProject.push({
                    id: objId,
                    role_id: id,
                    status: true
                });
                this.setState({
                    rolesProject: [...this.state.rolesProject]
                });
            });
        } else {
            const idActProj = this.state.rolesProject.filter((item) => {
                return item.role_id == id;
            })[0];
            const res = [
                ...this.state.rolesProject.filter((item) => {
                    return item.role_id != id;
                })
            ];

            this.props.deleteRole({ id: idActProj.id, status: true }).then(() => {
                this.setState({
                    rolesProject: res
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
            <div id="rolesToProject">
                <ReactTableFixedColumns
                    expanded={{
                        1: {
                            2: true
                        }
                    }}
                    data={this.state.roles}
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
                                        const id = this.state.rolesProject.filter((el) => {
                                            return el.role_id == a.original.id;
                                        })[0];
                                        return (
                                            <Checkbox
                                                noLabel={true}
                                                onChange={this.onChange.bind(this)}
                                                value={id ? true : false}
                                                data-key={a.original.id}
                                            ></Checkbox>
                                        );
                                    },
                                    Header: tran.translate("Activate"),
                                    width: 150
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
        upsertRole: (dto) => {
            return dispatch(
                new BaseService().commandThunt(CommandList.Roles.GRANT_ROLE_TO_PROJECT, dto)
            );
        },
        deleteRole: (dto) => {
            return dispatch(
                new BaseService().commandThunt(CommandList.Roles.REVOKE_ROLE_TO_PROJECT, dto)
            );
        },

        upsertRoleGlobal: (dto) => {
            return dispatch(
                new BaseService().commandThunt(CommandList.Roles.CREATE_ROLE_GLOBAL, dto)
            );
        },
        get: (dto) => {
            return dispatch(new BaseService().queryThunt(QueryList.Roles.GET_ROLES, dto));
        },
        getAll: (dto) => {
            return dispatch(new BaseService().queryThunt(QueryList.Roles.GET_GLOBAL_ROLES, dto));
        }
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RolesToProject));
