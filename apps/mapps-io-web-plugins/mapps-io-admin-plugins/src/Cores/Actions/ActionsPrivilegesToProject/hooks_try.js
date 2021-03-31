/*
    ./client/components/App.jsx
*/

import React, { useState, useReducer, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { Col, Form, Row } from "reactstrap";
//import { ButtonLoader, DropDownList, TextBox, TextArea } from './../../../../Components/index.js';
import {
    CommandList,
    DictionaryDTO,
    Enums,
    QueryList,
    Translator,
    ActionsList
} from "justshare-shared";
import { uuid } from "uuidv4";
import { BaseService, actionAccess } from "mapps-io-base-plugins/src/App/index.js";

import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import withFixedColumns from "react-table-hoc-fixed-columns";
import "react-table-hoc-fixed-columns/lib/styles.css";
import { DropDownList } from "mapps-io-base-plugins/src/Components/index.js";
const ReactTableFixedColumns = withFixedColumns(ReactTable);

console.log(DropDownList);

//const ReactTableFixedColumns = withFixedColumns(ReactTable);

/*
//import TranslateCompnent from '../../../../Components/TranslateCompnent/index.jsx';
//import BodyLoader from '../../../../Components/Loader/BodyLoader/index.jsx';
//import Checkbox from '../../../../Components/FormComponent/Components/Checkbox/index.jsx';
//import TagComponent from '../../../../Components/FormComponent/Components/TagComponent/index.jsx';

import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css'
import withFixedColumns from "react-table-hoc-fixed-columns";
import "react-table-hoc-fixed-columns/lib/styles.css";
import './style.scss'
import { uuid } from 'uuidv4';
const ReactTableFixedColumns = withFixedColumns(ReactTable);*/

/*
let isValidOnp = (val, privs) => {
    if (val.split(' ').filter(i => !i.startsWith('#')).length + 1 != val.split(' ').filter(i => i.startsWith('#')).length) {
        return false
    } else {
        let hash = val.split(' ').filter(i => i.startsWith('#$')).map(d => { return d.replace(/#/g, '').replace('$', '') })
        let filtered = hash.filter(i => privs.map(p => p.privileges.privilege_details.name.trim()).includes(i))
        return filtered.length == hash.length
    }

}*/

const ActionsPrivilegesToProject = function (props, test) {
    const ref = useRef();
    const [actions, setActions] = useState([]);
    const [privs, setPrivs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [roleChoose, setRoleChoose] = useState("");
    const [loadingGrant, setLoadingGrant] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [newLoading, setNewLoading] = useState(false);
    const [codeDict, dispatch] = useReducer(DictionaryReducer, []);
    const [lang, langDispatch] = useReducer(LanguageReducer, []);
    const [config, configDispatch] = useReducer(ConfigReducer, []);
    const [auth, authDispatch] = useReducer(AuthReducer, []);

    const tran = Translator(props.codeDict.data.LABEL, props.lang);
    const phTrans = Translator(props.codeDict.data.PLACEHOLDER, props.lang);
    const [state, setState] = userState({
        actions,
        privs,
        isLoading,
        roleChoose,
        loadingGrant,
        name,
        description,
        newLoading
    });
    function Cell(a) {
        return (
            <div>
                {actionAccess.apply()(ActionsList.ADMIN_ACTIONS_FOR_ROOTS) ? (
                    <DropDownList
                        data-key={a.original.id}
                        noLabel={true}
                        valueOptions={getDropDownValues()}
                        value={""}
                        onChange={privAddHandler}
                        field="type"
                    />
                ) : (
                    <span>kurwaaaaa</span>
                )}
            </div>
        );
    }
    /*
        let getDropDownValues = () => {
            console.log(privs)
            let roles = privs.filter(item => {
                // if (this.state.userType.usertype_roles.length == 0) {
                //     return true;
                // }
                // return this.state.userType.usertype_roles.filter(ur => {
                //     return ur.role_id == item.id
                // }).length == 0
                return true;
    
            })
            return [{ id: "", value: '' }, ...roles].map(item => {
                return {
                    id: item.id,
                    value: item.privilege_details ? item.privilege_details.name : item.value
                }
            })
    
        }
        let privAddHandler = (event) => {
            let priv_id = event.target.value;
            let action_id = event.target.getAttribute('data-key');
            let id = uuid();
            console.log(event.target.value)
            console.log(event.target.getAttribute('data-key'))
    
            props.grantPrivs({
                id: id,
                status: 1,
                privilege_id: priv_id,
                action_id: action_id
            }).then(succ => {
                let name = privs.filter(item => { return item.id == priv_id })[0]
                setActions(actions.map(item => {
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
                        })
    
                        return item;
                    }
                }))
    
            })
    
        }
    
    
        let revokePriv = (event) => {
            let priv_id = event.target.getAttribute('data-key');
            let action_id = event.target.getAttribute('data-tag');
            props.revokePrivs({
                id: priv_id
            }).then(succ => {
                setActions(actions.map(item => {
                    if (item.id == action_id) {
                        item.action_privileges = [...item.action_privileges.filter(priv => {
                            return priv.id != priv_id
                        })]
                    }
                    return item;
                }))
    
            })
        }
    
        let onTagFunc = (event) => {
            let func = event.tags.map(i => i.label).join(' ');
            setActions(...actions.map(i => { return i.id == event.id ? { ...i, func: func } : i }))
        }
      
    
        let clickSave = (event) => {
            let action = actions.filter(i => {
                return i.id == event.target.dataset.key
            })[0]
            props.upsertAction(action)
        };
    */
    useEffect((event) => {
        console.log(event);
        const fetchData = async () => {
            setIsLoading(true);
            const succ = await props.getActions();
            const succ2 = await props.getPrivs();
            setIsLoading(false);
            setActions(succ.data);
            setPrivs(succ2.data);
        };

        fetchData();
    }, []);
    const operator = ["!", "|", "&", "="];

    return (
        <div id="actions_privs" className="">
            {isLoading == false && (
                <ReactTableFixedColumns
                    data={actions.sort((a, b) => {
                        return b.action_details.name < a.action_details.name ? 1 : -1;
                    })}
                    columns={[
                        {
                            Header: "Name",
                            fixed: "left",
                            columns: [
                                {
                                    Cell: (a) => {
                                        return new Date(a.original.createdAt).toLocaleDateString();
                                    },
                                    Header: tran.translate("DATE"),
                                    accessor: "createdAt",
                                    width: 80
                                },
                                {
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
                                    Cell: Cell,
                                    Header: tran.translate("DEPENDENCIES"),
                                    accessor: "link.limit_of",
                                    id: "progress2",
                                    width: 150
                                },
                                {
                                    /*   Cell: (a) => {
                                       return <Col className="g-pa-0 g-ma-0">
                                           {a.original.action_privileges ? a.original.action_privileges.map(priv => {
   
                                               return actionAccess.bind(this)(ActionsList.ADMIN_ACTIONS_FOR_ROOTS) ? <span data-tag={a.original.id} data-key={priv.id} onClick={revokePriv.bind(this)} className="u-label u-label--sm tag-map   g-px-10 g-mx-1 g-my-5 g-cursor-pointer">
                                                   {priv.privileges.privilege_details.name}
                                               </span> : <span className="u-label u-label--sm tag-map   g-px-10 g-mx-1 g-my-5 g-cursor-pointer">{priv.privileges.privilege_details.name}</span>
                                           }) : <span></span>}
                                       </Col>
                                   },*/
                                    Header: tran.translate("DEPENDENCIES"),
                                    accessor: "link.limit_of",
                                    id: "progress2",
                                    width: 300
                                },
                                {
                                    /* Cell: (a) => {
                                     return <Col className="g-pa-0 g-ma-0">
                                         {a.original.func ? <span className={"g-font-size-10 g-font-size-10 g-ma-20 g-line-height-2 " + (isValidOnp(a.original.func, a.original.action_privileges) ? "g-color-green" : 'g-color-red')}>{a.original.func}</span> : <span></span>}
                                         <TagComponent notUniq={true} tags={
                                             a.original.func ? a.original.func.split(' ').map(i => { return { id: uuid(), value: uuid(), label: i } }) : []
                                         } data-tag={a.original.id} noLabel={true} onChange={onTagFunc.bind(this)} suggestions={[
                                             ...operator.map(i => { return { value: i, label: i, type: 'OPERATOR' } }),
                                             , ...a.original.action_privileges.map(i => { return { id: uuid(), value: uuid(), label: `#$${i.privileges.privilege_details.name.trim()}#`, type: 'PRIV' } })]}></TagComponent>
 
                                     </Col>
                                 },*/
                                    Header: tran.translate("FUNCTION"),
                                    accessor: "link.limit_of",
                                    id: "progress2",
                                    width: 600
                                }
                            ]
                        },
                        {
                            Header: tran.translate("ACTIONS"),
                            fixed: "right",
                            columns: [
                                {
                                    /* Cell: (a) => {
 
                                     return <ButtonLoader data-key={a.original.id} onClick={clickSave.bind(this)} className={"btn-sm"} isLoading={false} value={tran.translate('SAVE')}></ButtonLoader>
 
                                 },*/
                                    Header: tran.translate("ACTIONS"),
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
            )}
        </div>
    );
};

/*

class ActionsPrivilegesToProject2 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.state.actions = [];
        this.state.privs = []
        this.state.validation = [];
        this.state.isLoading = true;
        this.state.roleChoose = ""
        this.state.loadingGrant = false;
        this.state.name = ''
        this.state.description = '';
        this.state.newLoading = false;

    }







    render() {
        const tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);
        const phTrans = Translator(this.props.codeDict.data.PLACEHOLDER, this.props.lang);
        if (this.state.isLoading) {
            return <BodyLoader className="js-height-xl-83vh js-height-lg-83vh js-height-xs-85vh js-height-md-85vh js-height-md-85vh" zIndex={3} size="6rem" />
        }

        let operator = ['!', '|', '&', '=']
        return (

            <div id="actions_privs" className="">



                <ReactTableFixedColumns
                    data={this.state.actions.sort((a, b) => {
                        return b.action_details.name < a.action_details.name ? 1 : -1
                    })
                    }

                    columns={[
                        {
                            Header: "Name",
                            fixed: "left",
                            columns: [
                                {
                                    Cell: (a) => {
                                        return <Col className="g-pa-0 g-ma-0">
                                            {new Date(a.original.created_at).toLocaleDateString()}
                                        </Col>
                                    },
                                    Header: tran.translate('DATE'),
                                    accessor: "createdAt",
                                    width: 80,
                                },
                                {
                                    Header: tran.translate('ACTION'),
                                    accessor: "action_details.name",
                                    width: 350,
                                    filterable: true
                                }, {
                                    Header: tran.translate('TYPE'),
                                    accessor: "action_details.action_type",
                                    width: 100,
                                    filterable: true
                                },



                            ]
                        },
                        {


                            Header: "PRIVILEGES",
                            columns: [

                                {
                                    Cell: (a) => {
                                        return <Col className="g-pa-0 g-ma-0">
                                            {actionAccess.bind(this)(ActionsList.ADMIN_ACTIONS_FOR_ROOTS) && <DropDownList data-key={a.original.id} noLabel={true} valueOptions={getDropDownValues()} value={''} onChange={this.privAddHandler.bind(this)} field="type" validation={this.state.validation} />}

                                        </Col>
                                    },
                                    Header: tran.translate('DEPENDENCIES'),
                                    accessor: "link.limit_of",
                                    id: "progress2",
                                    width: 150
                                }, {
                                    Cell: (a) => {
                                        return <Col className="g-pa-0 g-ma-0">
                                            {a.original.action_privileges ? a.original.action_privileges.map(priv => {

                                                return actionAccess.bind(this)(ActionsList.ADMIN_ACTIONS_FOR_ROOTS) ? <span data-tag={a.original.id} data-key={priv.id} onClick={this.revokePriv.bind(this)} className="u-label u-label--sm tag-map   g-px-10 g-mx-1 g-my-5 g-cursor-pointer">
                                                    {priv.privileges.privilege_details.name}
                                                </span> : <span className="u-label u-label--sm tag-map   g-px-10 g-mx-1 g-my-5 g-cursor-pointer">{priv.privileges.privilege_details.name}</span>
                                            }) : <span></span>}
                                        </Col>
                                    },
                                    Header: tran.translate('DEPENDENCIES'),
                                    accessor: "link.limit_of",
                                    id: "progress2",
                                    width: 300
                                }, {
                                    Cell: (a) => {
                                        return <Col className="g-pa-0 g-ma-0">
                                            {a.original.func ? <span className={"g-font-size-10 g-font-size-10 g-ma-20 g-line-height-2 " + (this.isValidOnp(a.original.func, a.original.action_privileges) ? "g-color-green" : 'g-color-red')}>{a.original.func}</span> : <span></span>}
                                            <TagComponent notUniq={true} tags={
                                                a.original.func ? a.original.func.split(' ').map(i => { return { id: uuid(), value: uuid(), label: i } }) : []
                                            } data-tag={a.original.id} noLabel={true} onChange={this.onTagFunc.bind(this)} suggestions={[
                                                ...operator.map(i => { return { value: i, label: i, type: 'OPERATOR' } }),
                                                , ...a.original.action_privileges.map(i => { return { id: uuid(), value: uuid(), label: `#$${i.privileges.privilege_details.name.trim()}#`, type: 'PRIV' } })]}></TagComponent>

                                        </Col>
                                    },
                                    Header: tran.translate('FUNCTION'),
                                    accessor: "link.limit_of",
                                    id: "progress2",
                                    width: 600
                                }
                            ]
                        },
                        {
                            Header: tran.translate('ACTIONS'),
                            fixed: "right",
                            columns: [
                                {
                                    Cell: (a) => {

                                        return <ButtonLoader data-key={a.original.id} onClick={this.clickSave.bind(this)} className={"btn-sm"} isLoading={false} value={tran.translate('SAVE')}></ButtonLoader>

                                    },
                                    Header: tran.translate('ACTIONS'),
                                    accessor: "progress",
                                    id: "progress2",
                                    width: 100
                                }
                            ]
                        }
                    ]}

                    defaultPageSize={12}
                    style={{ height: '83vh' }
                    }
                    className="-highlight "
                />


            </div >

        );
    }
}
*/

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
