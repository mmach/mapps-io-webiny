import { MODAL_ACTIONS } from "./../../../../Components/index.js";
import { CommandList, QueryList } from "justshare-shared";
import React from "react";
import { contextMenu, Item, Menu, Separator, Submenu } from "react-contexify";
import "react-contexify/dist/ReactContexify.min.css";
import { GraphView } from "react-digraph";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { uuid } from "uuidv4";

import { BaseService } from "./../../../../App/index.js";

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

class Processes extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: {},
            process: {},
            currentNode: {},
            currentEdge: {}
        };
    }
    async componentDidMount() {
        const result = await this.props.get();

        this.setState({
            process: result.data[0]
        });
    }
    onUpdateNode(event) {
        const node = this.state.process.process_chain.filter((i) => i.id == event.id)[0];
        if (node.x != event.x || node.y != event.y) {
            node.x = event.x;
            node.y = event.y;
            this.props.upsertNode(node);
        }
    }
    async onContextMenu(x, y, mouseEvent) {
        mouseEvent.preventDefault();

        if (
            mouseEvent.path[2].getAttribute("data-source") &&
            mouseEvent.path[2].getAttribute("data-target")
        ) {
            let node = this.state.process.process_chain.filter(
                (i) => i.id == mouseEvent.path[2].getAttribute("data-source")
            )[0];
            let edge = node.process_chain_state.filter((i) => {
                return i.next_process_chain_id == mouseEvent.path[2].getAttribute("data-target");
            })[0];
            if (!edge) {
                node = this.state.process.process_chain.filter(
                    (i) => i.id == mouseEvent.path[2].getAttribute("data-target")
                )[0];
                edge = node.process_chain_state.filter((i) => {
                    return (
                        i.next_process_chain_id == mouseEvent.path[2].getAttribute("data-source")
                    );
                })[0];
            }
            this.setState({
                currentEdge: edge
            });

            contextMenu.show({ id: "edge_id", event: mouseEvent });
        } else if (
            mouseEvent.path[2].getAttribute("id") &&
            mouseEvent.path[2].getAttribute("id").replace("node-", "")
        ) {
            this.setState({
                currentNode: mouseEvent.path[2].getAttribute("id").replace("node-", "")
            });
            contextMenu.show({ id: "menu_id", event: mouseEvent });
        } else {
            const node = {
                id: uuid(),
                process_id: this.state.process.id,
                x: x,
                y: y,
                process_chain_state: [],
                is_reminder: false
            };
            await this.props.upsertNode(node);

            this.setState({
                process: {
                    ...this.state.process,
                    process_chain: [...this.state.process.process_chain, node]
                }
            });
        }

        //mouseEvent.path[2].getAttribute('data-source')
        //mouseEvent.path[2].getAttribute('data-target')
        //mouseEvent.path[2].getAttribute('id').replace('node-','')

        mouseEvent.preventDefault();
    }

    /* Define custom graph editing methods here */
    onDeleteNode() {
        this.props.deleteNode({ id: this.state.currentNode });

        this.setState({
            process: {
                ...this.state.process,
                process_chain: [
                    ...this.state.process.process_chain.filter(
                        (i) => i.id != this.state.currentNode
                    )
                ]
            }
        });
    }
    onLinkItems(id) {
        const newEdge = {
            id: uuid(),
            process_chain_id: this.state.currentNode,
            next_process_chain_id: id
        };
        this.setState({
            process: {
                ...this.state.process,
                process_chain: [
                    ...this.state.process.process_chain.map((i) => {
                        if (i.id == this.state.currentNode) {
                            return {
                                ...i,
                                process_chain_state: [...i.process_chain_state, newEdge]
                            };
                        }
                        return i;
                    })
                ]
            }
        });
        this.props.upsertNodeState(newEdge);
    }
    onEditNode() {
        const node = this.state.process.process_chain.filter(
            (i) => i.id == this.state.currentNode
        )[0];
        this.props.openModal(true, "PROCESS_STATE_EDIT", {
            model: node,
            UpdateNode: this.UpdateNode.bind(this)
        });
    }
    UpdateNode(node) {
        this.setState({
            process: {
                ...this.state.process,
                process_chain: [
                    ...this.state.process.process_chain.map((i) => {
                        if (i.id == node.id) {
                            return { ...node };
                        }
                        return i;
                    })
                ]
            }
        });
    }
    onDeleteEdge() {
        this.props.deleteEdge({ id: this.state.currentEdge.id });

        this.setState({
            process: {
                ...this.state.process,
                process_chain: [
                    ...this.state.process.process_chain.map((i) => {
                        if (i.id == this.state.currentEdge.process_chain_id) {
                            return {
                                ...i,
                                process_chain_state: i.process_chain_state.filter(
                                    (st) => st.id != this.state.currentEdge.id
                                )
                            };
                        }
                        return i;
                    })
                ]
            }
        });
    }
    onChangeRoleNode() {
        this.props.upsertNodeState({
            ...this.state.currentEdge,
            is_accept: !this.state.currentEdge.is_accept
        });
        this.setState({
            process: {
                ...this.state.process,
                process_chain: [
                    ...this.state.process.process_chain.map((i) => {
                        if (i.id == this.state.currentEdge.process_chain_id) {
                            return {
                                ...i,
                                process_chain_state: i.process_chain_state.map((st) => {
                                    if (st.id == this.state.currentEdge.id) {
                                        return {
                                            ...st,
                                            is_accept: !this.state.currentEdge.is_accept
                                        };
                                    }
                                    return st;
                                })
                            };
                        }
                        return i;
                    })
                ]
            }
        });
    }
    render() {
        const nodes =
            this.state.process.process_chain &&
            this.state.process.process_chain.map((i) => {
                const status = this.props.config.statuses.filter((st) => st.id == i.status_id)[0];

                const action = this.props.config.actions.filter((st) => st.id == i.action_id)[0];
                return {
                    id: i.id,
                    x: i.x,
                    y: i.y,
                    title: (
                        <tspan x="0" dy="1.2em">
                            {i.with_iua_status_change
                                ? status && status.translation[this.props.lang]
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
            }); // this.state.graph.nodes;
        const edges = [];

        this.state.process.process_chain &&
            this.state.process.process_chain.forEach((i) => {
                i.process_chain_state.forEach((c) => {
                    let next = this.state.process.process_chain.filter(
                        (n) => n.id == c.next_process_chain_id
                    )[0];
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
        const selected = this.state.selected;

        const NodeTypes = GraphConfig.NodeTypes;
        const NodeSubtypes = GraphConfig.NodeSubtypes;
        const EdgeTypes = GraphConfig.EdgeTypes;

        // nodes:
        return (
            <div id="graph" style={{ height: "92vh" }}>
                <Menu id="menu_id" ref={(ref) => (this.ref = ref)}>
                    <Item onClick={this.onDeleteNode.bind(this)}>DELETE</Item>
                    <Item onClick={this.onEditNode.bind(this)}>EDIT</Item>
                    <Separator />

                    <Submenu label="EDGE">
                        {this.state.process.process_chain &&
                            this.state.process.process_chain
                                .filter((i) => {
                                    return i.id != this.state.currentNode && i.status_id;
                                })
                                .map((i) => {
                                    const status = this.props.config.statuses.filter(
                                        (st) => st.id == i.status_id
                                    )[0];

                                    return (
                                        <Item
                                            key={uuid()}
                                            data-key={i.id}
                                            onClick={() => {
                                                this.onLinkItems.bind(this)(i.id);
                                            }}
                                        >
                                            {status && status.translation[this.props.lang]}:
                                            {i.id.split("-")[0]}
                                        </Item>
                                    );
                                })}
                    </Submenu>
                </Menu>
                <Menu id="edge_id" ref={(ref) => (this.ref = ref)}>
                    <Item onClick={this.onDeleteEdge.bind(this)}>DELETE</Item>
                    <Item onClick={this.onChangeRoleNode.bind(this)}>
                        {this.state.currentEdge.is_accept == true
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
                    onContextMenu={this.onContextMenu.bind(this)}
                    onUpdateNode={this.onUpdateNode.bind(this)}
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
        openModal: (open, action, params) => {
            dispatch({
                type: MODAL_ACTIONS.OPEN_MODAL,
                dto: {
                    open: open,
                    action: action,
                    param: params
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
