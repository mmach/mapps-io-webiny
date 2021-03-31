/*
    ./client/components/App.jsx
*/

import { Chip, Grid } from "@material-ui/core";
import { CommandList, QueryList, Translator } from "justshare-shared";
import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import withFixedColumns from "react-table-hoc-fixed-columns";
import "react-table-hoc-fixed-columns/lib/styles.css";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { Col } from "reactstrap";
import { uuid } from "uuidv4";
import { BaseService } from "mapps-io-base-plugins/src/App/index.js";
import { BodyLoader, DropDownList } from "mapps-io-base-plugins/src/Components/index.js";

const ReactTableFixedColumns = withFixedColumns(ReactTable);

class UsersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.users = [];
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
    this.props.getUsers().then((succ) => {
      this.props.getRoles().then((succ2) => {
        this.setState({
          isLoading: false,
          users: succ.data.users,
          roles: succ2.data
        });
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
  getDropDownValues(id) {
    const users = this.state.users.filter((item) => {
      return item.id == id;
    })[0];

    const roles = this.state.roles.filter((item) => {
      const roles = users.user_roles.filter((role) => {
        return role.role_id == item.id;
      });

      return roles.length == 0;
    });
    return [{ id: "", value: "" }, ...roles].map((item) => {
      return {
        id: item.id,
        value: item.role_detail && item.role_detail.name ? item.role_detail.name : item.value
      };
    });
  }
  privAddHandler(event) {
    const role_id = event.target.value;
    const user_id = event.currentTarget.dataset.key;
    const id = uuid();

    this.props
      .grantRoles({
        id: id,
        user_id: user_id,
        role_id: role_id
      })
      .then(() => {
        const name = this.state.roles.filter((item) => {
          return item.id == role_id;
        })[0];

        const users = this.state.users.map((item) => {
          if (item.id == user_id) {
            item.user_roles.push({
              id: id,
              role_id: role_id,
              user_id: user_id,

              roles: {
                id: role_id,
                role_detail: {
                  name: name.role_detail.name
                }
              }
            });
          }
          return item;
        });
        this.setState({
          users: [...users]
        });
      });
  }
  revokeRole(event) {
    const role_id = event.currentTarget.dataset.key;
    const user_id = event.currentTarget.dataset.tag;
    this.props
      .revokeRole({
        id: role_id
      })
      .then(() => {
        const users = this.state.users.map((item) => {
          if (item.id == user_id) {
            item.user_roles = [
              ...item.user_roles.filter((priv) => {
                return priv.id != role_id;
              })
            ];
          }
          return item;
        });
        this.setState({
          users: [...users]
        });
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
      <ReactTableFixedColumns
        data={this.state.users}
        columns={[
          {
            Header: "User",
            columns: [
              {
                Cell: (a) => {
                  return <Col>{new Date(a.original.createdAt).toLocaleDateString()}</Col>;
                },
                Header: tran.translate("DATE"),
                accessor: "createdAt",
                width: 80
              },
              {
                Cell: (a) => {
                  return (
                    <Link
                      to={"/user/" + a.original.id}
                      class="d-block g-color-main g-text-underline--none--hover  g-color-primary--hover"
                    >
                      <div style={{ cursor: "pointer" }}>{a.original.email}</div>
                    </Link>
                  );
                },
                Header: tran.translate("Email"),
                accessor: "email",
                width: 350,
                filterable: true
              },
              {
                Cell: (a) => {
                  const userType = this.props.config.user_types.filter(
                    (i) => i.id == a.original.usertype_id
                  )[0];
                  return (
                  
                      <div>{userType && userType.translation[this.props.lang]}</div>
                  );
                },
                Header: tran.translate("Type"),
                accessor: "action_type",
                width: 100,
                filterable: true
              }
            ]
          },
          {
            Header: "Roles",
            columns: [
              {
                Cell: (a) => {
                  return (
                    <DropDownList
                      data-key={a.original.id}
                      noLabel={true}
                      valueOptions={this.getDropDownValues(a.original.id)}
                      value={""}
                      onChange={this.privAddHandler.bind(this)}
                      field="type"
                      validation={this.state.validation}
                    />
                  );
                },
                Header: tran.translate("Grant Role"),
                accessor: "link.limit_of",
                id: "progress2",
                width: 200
              },
              {
                Cell: (a) => {
                  return (
                    <Col>
                      {a.original.user_roles ? (
                        a.original.user_roles.map((priv) => {
                          return (
                            <Chip
                              key={priv.id}
                              data-tag={a.original.id}
                              data-key={priv.id}
                              onClick={this.revokeRole.bind(this)}
                              label={priv.roles.role_detail.name}
                            ></Chip>
                          );
                        })
                      ) : (
                        <span></span>
                      )}
                    </Col>
                  );
                },
                Header: tran.translate("Roles"),
                accessor: "link.limit_of",
                id: "progress2",
                width: 400
              }
            ]
          }
        ]}
        defaultPageSize={22}
        style={{ height: "92vh" }}
        className="-highlight "
      />
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
    getUsers: (dto) => {
      return dispatch(new BaseService().queryThunt(QueryList.Project.GET_PROJECT_USERS, dto));
    },
    getRoles: (dto) => {
      return dispatch(new BaseService().queryThunt(QueryList.Roles.GET_ROLES, dto));
    },

    grantRoles: (dto) => {
      return dispatch(new BaseService().commandThunt(CommandList.User.GRANT_USER_ROLE, dto));
    },
    revokeRole: (dto) => {
      return dispatch(new BaseService().commandThunt(CommandList.User.REVOKE_USER_ROLE, dto));
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UsersList));
