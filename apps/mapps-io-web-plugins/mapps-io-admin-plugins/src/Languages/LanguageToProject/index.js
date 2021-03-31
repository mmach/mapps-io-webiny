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

class LanguageToProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.language = [];
        this.state.languageProject = [];
        this.state.name = "";
        this.state.description = "";
        this.state.newLoading = false;
        this.state.isLoading = true;

    }
    shouldComponentUpdate() {
        return true;
    }
    componentDidMount() {
        this.props.getAllLanguages().then((succ) => {
            this.props.getLanguages().then((succ2) => {
                this.setState({
                    isLoading: false,
                    language: succ.data,
                    languageProject: succ2.data
                });
            });
        });
    }

    onChange(event) {
        const checked = event.target.checked;
        const id = event.currentTarget.dataset.key;
        if (checked == true) {
            const objId = uuid();
            this.props.insertLanguage({ id: objId, language_id: id, status: true }).then(() => {
                this.state.languageProject.push({
                    id: objId,
                    language_id: id,
                    status: true
                });
                this.setState({
                    languageProject: [...this.state.languageProject]
                });
            });
        } else {
            const idActProj = this.state.languageProject.filter((item) => {
                return item.language_id == id;
            })[0];
        
            this.props.deleteLanguage({ id: idActProj.id, status: true }).then(() => {
                this.setState({
                    languageProject: this.state.languageProject.filter((item) => {
                        return item.language_id != id;
                    })
                });
            });
        }
    }
    setAsMain(event) {
        const id = event.currentTarget.dataset.key;
        this.props.setAsMain({ id: id }).then(() => {
            const res = [
                ...this.state.languageProject.map((item) => {
                    item.is_main = item.id == id ? true : false;
                    return item;
                })
            ];
            this.setState({
                languageProject: res
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
            <div id="langaugeProject">
                <ReactTableFixedColumns
                    expanded={{
                        1: {
                            2: true
                        }
                    }}
                    data={this.state.language}
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
                                    Header: tran.translate("Nazwa"),
                                    accessor: "name",
                                    width: 350
                                },
                                {
                                    Header: tran.translate("Code"),
                                    accessor: "code",
                                    width: 100
                                }
                            ]
                        },
                        {
                            Header: "Role Action",
                            columns: [
                                {
                                    Cell: (a) => {
                                        const id = this.state.languageProject.filter((el) => {
                                            return el.language_id == a.original.id;
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
                                        const id = this.state.languageProject.filter((el) => {
                                            return el.language_id == a.original.id;
                                        })[0];
                                        return (
                                            <Checkbox
                                                key={a.original.id}
                                                noLabel={true}
                                                onChange={this.setAsMain.bind(this)}
                                                value={id && id.is_main == true ? true : false}
                                                data-key={a.original.id}
                                            ></Checkbox>
                                        );
                                    },
                                    Header: tran.translate("As Main"),
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
        lang: state.LanguageReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        insertLanguage: (dto) => {
            return dispatch(
                new BaseService().commandThunt(CommandList.Languages.INSERT_LANGUAGE, dto)
            );
        },
        setAsMain: (dto) => {
            return dispatch(
                new BaseService().commandThunt(CommandList.Languages.SET_AS_MAIN_LANG, dto)
            );
        },
        deleteLanguage: (dto) => {
            return dispatch(
                new BaseService().commandThunt(CommandList.Languages.DELETE_LANGUAGE, dto)
            );
        },
        getLanguages: (dto) => {
            return dispatch(new BaseService().queryThunt(QueryList.Languages.GET_LANGUAGES, dto));
        },
        getAllLanguages: (dto) => {
            return dispatch(
                new BaseService().queryThunt(QueryList.Languages.GET_GLOBAL_LANGUAGES, dto)
            );
        }
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LanguageToProject));
