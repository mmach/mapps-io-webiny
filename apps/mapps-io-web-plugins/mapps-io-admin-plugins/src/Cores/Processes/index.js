import { CommandList, QueryList } from "justshare-shared";
import React, { useEffect, useState } from "react";
import { contextMenu, Item, Menu, Separator, Submenu } from "react-contexify";
import "react-contexify/dist/ReactContexify.min.css";
import { GraphView } from "react-digraph";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { uuid } from "uuidv4";
import { BaseService } from "mapps-io-base-plugins/src/App/index.js";
import { MODAL_ACTIONS } from "mapps-io-base-plugins/src/Components/index.js";
import ProcessStateEdit from "./ProcessStateEdit/index.js";

const GraphConfig = {
    NodeTypes: {
        empty: {
            // required to show empty nodes
            typeText: "Process Element",
            shapeId: "#empty", // relates to the type property of a node
            shape: (
                <symbol viewBox="0 0 100 100" id="empty" key="0">
                    <circle cx="50" cy="50" r="45"></circle>
                </symbol>
            )
        },
        start: {
            // required to show empty nodes
            typeText: "START",
            shapeId: "#start", // relates to the type property of a node
            shape: (
                <symbol viewBox="0 0 100 100" id="start" key="0">
                    <circle strokeWidth="3px" stroke="blue" cx="50" cy="50" r="45"></circle>
                </symbol>
            )
        },
        end: {
            // required to show empty nodes
            typeText: "END",
            shapeId: "#end", // relates to the type property of a node
            shape: (
                <symbol viewBox="0 0 100 100" id="end" key="0">
                    <circle strokeWidth="3px" stroke="green" cx="50" cy="50" r="45"></circle>
                </symbol>
            )
        },
        is_reminder: {
            // required to show empty nodes
            typeText: "CRON",
            shapeId: "#is_reminder", // relates to the type property of a node
            shape: (
                <symbol viewBox="0 0 100 100" id="is_reminder" key="0">
                    <circle strokeWidth="3px" stroke="purple" cx="50" cy="50" r="45"></circle>
                </symbol>
            )
        },
        custom: {
            // required to show empty nodes
            typeText: "Custom",
            shapeId: "#custom", // relates to the type property of a node
            shape: (
                <symbol viewBox="0 0 50 25" id="custom" key="0">
                    <ellipse cx="50" cy="25" rx="50" ry="25"></ellipse>
                </symbol>
            )
        },
        func: {
            // required to show empty nodes
            typeText: "Function",
            shapeId: "#func", // relates to the type property of a node
            shape: (
                <symbol viewBox="0 0 100 100" id="func" key="0">
                    <circle
                        strokeWidth="3px"
                        fill="yellow"
                        stroke="yellow"
                        cx="50"
                        cy="50"
                        r="45"
                    ></circle>
                </symbol>
            )
        }
    },
    NodeSubtypes: {},
    EdgeTypes: {
        emptyEdge: {
            // required to show empty edges
            shapeId: "#emptyEdge",
            shape: (
                <symbol viewBox="0 0 50 50" id="emptyEdge" key="0">
                    <circle cx="25" cy="25" r="8" fill="red">
                        {" "}
                    </circle>
                </symbol>
            )
        },
        acceptEdge: {
            // required to show empty edges
            shapeId: "#acceptEdge",
            shape: (
                <symbol viewBox="0 0 50 50" id="acceptEdge" key="0">
                    <circle cx="25" cy="25" r="8" fill="green">
                        {" "}
                    </circle>
                </symbol>
            )
        },
        autoRunEdge: {
            // required to show empty edges
            shapeId: "#autoRunEdge",
            shape: (
                <symbol viewBox="0 0 50 50" id="autoRunEdge" key="0">
                    <circle cx="25" cy="25" r="8" fill="blue">
                        {" "}
                    </circle>
                </symbol>
            )
        },
        reminderEdge: {
            // required to show empty edges
            shapeId: "#reminderEdge",
            shape: (
                <symbol viewBox="0 0 50 50" id="reminderEdge" key="0">
                    <circle cx="25" cy="25" r="8" fill="white">
                        {" "}
                    </circle>
                </symbol>
            )
        },
        hasReminderEdge: {
            // required to show empty edges
            shapeId: "#hasReminderEdge",
            shape: (
                <symbol viewBox="0 0 50 50" id="hasReminderEdge" key="0">
                    <circle cx="25" cy="25" r="8" fill="purple">
                        {" "}
                    </circle>
                </symbol>
            )
        }
    }
};

const NODE_KEY = "id"; // Allows D3 to correctly update DOM

function Processes(props) {
    const [process, setProcess] = useState(props.process);
    const [currentNode, setCurrentNode] = useState({});
    const [currentEdge, setCurrentEdge] = useState({});
    useEffect(()=>{
        setProcess(props.process);
    },[props.process]);
    const onUpdateNode = (event) => {
        const node = process.process_chain.filter((i) => i.id == event.id)[0];
        if (node.x != event.x || node.y != event.y) {
            node.x = event.x;
            node.y = event.y;
            props.upsertNode(node);
        }
    };
    const onContextMenu = async (x, y, mouseEvent) => {
        mouseEvent.preventDefault();

        if (
            mouseEvent.path[2].getAttribute("data-source") &&
            mouseEvent.path[2].getAttribute("data-target")
        ) {
            let node = process.process_chain.filter(
                (i) => i.id == mouseEvent.path[2].getAttribute("data-source")
            )[0];
            let edge = node.process_chain_state.filter((i) => {
                return i.next_process_chain_id == mouseEvent.path[2].getAttribute("data-target");
            })[0];
            if (!edge) {
                node = process.process_chain.filter(
                    (i) => i.id == mouseEvent.path[2].getAttribute("data-target")
                )[0];
                edge = node.process_chain_state.filter((i) => {
                    return (
                        i.next_process_chain_id == mouseEvent.path[2].getAttribute("data-source")
                    );
                })[0];
            }
            setCurrentEdge(edge);

            contextMenu.show({ id: "edge_id", event: mouseEvent });
        } else if (
            mouseEvent.path[2].getAttribute("id") &&
            mouseEvent.path[2].getAttribute("id").replace("node-", "")
        ) {
            setCurrentNode(mouseEvent.path[2].getAttribute("id").replace("node-", ""));

            contextMenu.show({ id: "menu_id", event: mouseEvent });
        } else {
            const node = {
                id: uuid(),
                process_id: process.id,
                x: x,
                y: y,
                process_chain_state: [],
                is_reminder: false
            };
            await props.upsertNode(node);

            setProcess({
                ...process,
                process_chain: [...process.process_chain, node]
            });
        }

        //mouseEvent.path[2].getAttribute('data-source')
        //mouseEvent.path[2].getAttribute('data-target')
        //mouseEvent.path[2].getAttribute('id').replace('node-','')

        mouseEvent.preventDefault();
    };

    /* Define custom graph editing methods here */
    const onDeleteNode = () => {
        props.deleteNode({ id: currentNode });

        setProcess({
            ...process,
            process_chain: [...process.process_chain.filter((i) => i.id != currentNode)]
        });
    };
    const onLinkItems = (id) => {
        const newEdge = {
            id: uuid(),
            process_chain_id: currentNode,
            next_process_chain_id: id
        };
        setProcess({
            ...process,
            process_chain: [
                ...process.process_chain.map((i) => {
                    if (i.id == currentNode) {
                        return {
                            ...i,
                            process_chain_state: [...i.process_chain_state, newEdge]
                        };
                    }
                    return i;
                })
            ]
        });
        props.upsertNodeState(newEdge);
    };
    const onEditNode = () => {
        const node = process.process_chain.filter((i) => i.id == currentNode)[0];
        props.openModal(
            true,
            <ProcessStateEdit UpdateNode={UpdateNode} model={node}></ProcessStateEdit>
        );
    };
    const UpdateNode = (node) => {
        setProcess({
            ...process,
            process_chain: [
                ...process.process_chain.map((i) => {
                    if (i.id == node.id) {
                        return { ...node };
                    }
                    return i;
                })
            ]
        });
    };
    const onDeleteEdge = () => {
        props.deleteEdge({ id: currentEdge.id });

        setProcess({
            ...process,
            process_chain: [
                ...process.process_chain.map((i) => {
                    if (i.id == currentEdge.process_chain_id) {
                        return {
                            ...i,
                            process_chain_state: i.process_chain_state.filter(
                                (st) => st.id != currentEdge.id
                            )
                        };
                    }
                    return i;
                })
            ]
        });
    };
    const onChangeRoleNode = () => {
        props.upsertNodeState({
            ...currentEdge,
            is_accept: !currentEdge.is_accept
        });
        setProcess({
            ...process,
            process_chain: [
                ...process.process_chain.map((i) => {
                    if (i.id == currentEdge.process_chain_id) {
                        return {
                            ...i,
                            process_chain_state: i.process_chain_state.map((st) => {
                                if (st.id == currentEdge.id) {
                                    return {
                                        ...st,
                                        is_accept: !currentEdge.is_accept
                                    };
                                }
                                return st;
                            })
                        };
                    }
                    return i;
                })
            ]
        });
    };
    const nodes =
        process.process_chain &&
        process.process_chain.map((i) => {
            const status = props.config.statuses.filter((st) => st.id == i.status_id)[0];

            const action = props.config.actions.filter((st) => st.id == i.action_id)[0];
            return {
                id: i.id,
                x: i.x,
                y: i.y,
                title: (
                    <tspan x="0" dy="1.2em">
                        {i.with_iua_status_change
                            ? status && status.translation[props.lang]
                            : action && action.action}{" "}
                        <tspan x="0" dy="1.2em">
                            {i.id.split("-")[0]}
                        </tspan>
                    </tspan>
                ),
                type:
                    i.is_start == true
                        ? "start"
                        : i.is_last == true
                        ? "end"
                        : i.is_reminder == true
                        ? "is_reminder"
                        : i.with_iua_status_change != true
                        ? "func"
                        : "empty"
            };
        }); // graph.nodes;
    const edges = [];
    const selected = {};
    process.process_chain &&
        process.process_chain.forEach((i) => {
            i.process_chain_state.forEach((c) => {
                let next = process.process_chain.filter((n) => n.id == c.next_process_chain_id)[0];
                next = next ? next : {};
                edges.push({
                    source: next.is_reminder ? c.next_process_chain_id : c.process_chain_id,
                    target: next.is_reminder ? c.process_chain_id : c.next_process_chain_id,
                    type:
                        next.is_reminder == true
                            ? "reminderEdge"
                            : next.has_reminder == true
                            ? "hasReminderEdge"
                            : i.autorun == true
                            ? "autoRunEdge"
                            : c.is_accept == true
                            ? "acceptEdge"
                            : "emptyEdge",
                    handleText: next.is_reminder == true ? next.days_before : ""
                });
            });
        });

    const NodeTypes = GraphConfig.NodeTypes;
    const NodeSubtypes = GraphConfig.NodeSubtypes;
    const EdgeTypes = GraphConfig.EdgeTypes;
    if (!process.id) {
        return <span></span>;
    }
    // nodes:
    return (
        <div id="graph" style={{ height: "92vh" }}>
            <Menu id="menu_id" ref={(ref) => (ref = ref)}>
                <Item onClick={onDeleteNode}>DELETE</Item>
                <Item onClick={onEditNode}>EDIT</Item>
                <Separator />

                <Submenu label="EDGE">
                    {process.process_chain &&
                        process.process_chain
                            .filter((i) => {
                                return i.id != currentNode && i.status_id;
                            })
                            .map((i) => {
                                const status = props.config.statuses.filter(
                                    (st) => st.id == i.status_id
                                )[0];

                                return (
                                    <Item
                                        key={uuid()}
                                        data-key={i.id}
                                        onClick={() => {
                                            onLinkItems(i.id);
                                        }}
                                    >
                                        {status && status.translation[props.lang]}:
                                        {i.id.split("-")[0]}
                                    </Item>
                                );
                            })}
                </Submenu>
            </Menu>
            <Menu id="edge_id" ref={(ref) => (ref = ref)}>
                <Item onClick={onDeleteEdge}>DELETE</Item>
                <Item onClick={onChangeRoleNode}>
                    {currentEdge.is_accept == true
                        ? "CHANGE TO  REJECT OR REMINDER"
                        : "CHANGE TO ACCEPT"}
                </Item>
            </Menu>
            <GraphView
                nodeKey={NODE_KEY}
                nodes={nodes ? nodes : []}
                edges={edges}
                selected={selected}
                nodeTypes={NodeTypes}
                nodeSubtypes={NodeSubtypes}
                edgeTypes={EdgeTypes}
                onContextMenu={onContextMenu}
                onUpdateNode={onUpdateNode}
            />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Processes));
