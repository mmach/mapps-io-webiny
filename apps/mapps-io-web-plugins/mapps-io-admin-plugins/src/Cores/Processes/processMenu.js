import { Divider, Grid, Link, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { CommandList, QueryList } from "justshare-shared";
import React, { useEffect, useState } from "react";
import "react-contexify/dist/ReactContexify.min.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { uuid } from "uuidv4";
import { BaseService } from "mapps-io-base-plugins/src/App/index.js";
import { ButtonLoader, MODAL_ACTIONS, TextBox } from "mapps-io-base-plugins/src/Components/index.js";
import Process from "./index.js";

function ProcessMenu(props) {
    const [process, setProcess] = useState([]);
    const [currentProcess, setCurrentProcess] = useState({});
    const [newProcessToken, setNewProcessToken] = useState({});
    const [loading, setLoading] = useState(false);
    const [clicked, setClicked] = useState(false);
    useEffect(() => {
        const func = async () => {
            const result = await props.get();
            setProcess(result.data);
        };
        func();
    }, []);

   
    /* Define custom graph editing methods here */

    const addNewSubmit = () => {
        setLoading(true);
        const obj = { id: uuid(), token: newProcessToken.value };
        props.upsertProcess(obj).then(() => {
            setLoading(false);
            setProcess([...process, obj]);
            setNewProcessToken({});
        });
    };
    const onChange = (event) => {
        setNewProcessToken({ value: event.target.value });
    };
    const addNewProcess = () => {
        setClicked(true);
    };
    // nodes:
    return (
        <div>
            <Grid container>
                <Grid item xs="3">
                    <List>
                        <Link onClick={addNewProcess}>
                            <ListItem button key={uuid()}>
                                <ListItemIcon>
                                    <AddIcon></AddIcon>
                                </ListItemIcon>
                                <ListItemText primary={"New process"}></ListItemText>
                            </ListItem>
                        </Link>
                        {clicked == true && (
                            <>
                                <TextBox label={"Process Token"} onChange={onChange}></TextBox>

                                <ButtonLoader
                                    onClick={addNewSubmit}
                                    size={"medium"}
                                    color={"primary"}
                                    value={"Save"}
                                    isLoading={loading}
                                />
                            </>
                        )}
                        <Divider />

                        {process.map((item) => {
                            return (
                                <Link
                                    key={uuid()}
                                    onClick={() => {
                                        setCurrentProcess(item);
                                    }}
                                >
                                    <ListItem button>
                                        <ListItemText primary={item.token}></ListItemText>
                                    </ListItem>
                                </Link>
                            );
                        })}
                    </List>
                </Grid>
                <Grid item xs="9">
                    <Process process={currentProcess}></Process>
                </Grid>
            </Grid>
        </div>
    );
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
        openModal: (open, body) => {
            dispatch({
                type: MODAL_ACTIONS.OPEN_MODAL,
                dto: {
                    open: open,
                    body: body
                }
            });
        },
        upsertProcess: (dto) => {
            return dispatch(
                new BaseService().commandThunt(CommandList.Process.UPSERT_PROCESS, dto)
            );
        },
        deleteEdge: (dto) => {
            return dispatch(
                new BaseService().commandThunt(CommandList.Process.DELETE_CHAIN_STATE, dto)
            );
        },
        upsertNodeState: (dto) => {
            return dispatch(
                new BaseService().commandThunt(CommandList.Process.UPSERT_CHAIN_STATE, dto)
            );
        },
        upsertNode: (dto) => {
            return dispatch(
                new BaseService().commandThunt(CommandList.Process.UPSERT_CHAIN_ELEMENT, dto)
            );
        },
        deleteNode: (dto) => {
            return dispatch(
                new BaseService().commandThunt(CommandList.Process.DELETE_CHAIN_ELEMENT, dto)
            );
        },
        get: (dto) => {
            return dispatch(new BaseService().queryThunt(QueryList.Process.GET_PROCESS, dto));
        }
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProcessMenu));
