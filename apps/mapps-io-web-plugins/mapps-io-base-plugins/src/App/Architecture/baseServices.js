"use strict";
import axios from "axios";
import ClientException from "./Exceptions/clientExceptions.js";
import { Enums } from "justshare-shared";
import { NOTIFICATIONS_ACTIONS } from "../../Components/index.js";

const localStorage=global.localStorage;

class BaseService {
    queryThunt(action, model = {}) {
        let body = null;
        if (!Array.isArray(model)) {
            body = Object.assign({}, model);
            body.validation = undefined;
        } else {
            body = model;
        }

        const context = {
            token: localStorage.getItem("token"),
            lang: localStorage.getItem("lang"),
            projectToken: localStorage.getItem("project_token")
        };
        return (dispatch) => {
           
            dispatch({ type: action + "_LOADING", dto: model });
            return axios({
                method: "get",
                url:
                    global.env.API_URL +
                    "/query?action=" +
                    encodeURIComponent(
                        JSON.stringify({
                            action: action,
                            model: encodeURIComponent(JSON.stringify(body))
                        })
                    ),
                headers: {
                    Authorization: `Bearer ${context.token}`,
                    Language: context.lang,
                    ProjectAuthorization: `Bearer ${context.projectToken}`
                }
            })
                .then((response) => {
                    dispatch({ type: action + "_SUCCESS", data: response.data, dto: model });
                    return Promise.resolve(response);
                })
                .catch(function (error) {
                    BaseService.prototype.errorHandling(error, dispatch, action, model);
                    return Promise.reject(error.response);
                })
                .then(function (res) {
                    dispatch({ type: action + "_FINALLY" });

                   
                    if (res.status == 200) {
                        return Promise.resolve(res);
                    } else {
                        return Promise.reject(res);
                    }
                });
        };
    }
    commandThunt(action, model = {}) {
        let body = null;
        if (!Array.isArray(model)) {
            body = Object.assign({}, model);
            body.validation = undefined;
        } else {
            body = model;
        }
        return (dispatch) => {
         
            const context = {
                token: localStorage.getItem("token"),
                lang: localStorage.getItem("lang"),
                projectToken: localStorage.getItem("project_token")
            };
            dispatch({ type: action + "_LOADING", dto: model });
            return axios({
                method: "POST",
                url: global.env.API_URL + "/command",
                data: { action: action, model: encodeURIComponent(JSON.stringify(body)) },
                headers: {
                    Authorization: `Bearer ${context.token}`,
                    Language: context.lang,
                    ProjectAuthorization: `Bearer ${context.projectToken}`
                }
            })
                .then((response) => {
                    dispatch({
                        type: action + "_SUCCESS",
                        data: response.data,
                        dto: model
                    });
                    return Promise.resolve(response);
                })
                .catch(function (error) {
                    BaseService.prototype.errorHandling(error, dispatch, action, model);
                    return Promise.reject(error.response);
                })
                .then(function (res) {
                    dispatch({ type: action + "_FINALLY" });

                    
                    if (res.status == 200) {
                        return Promise.resolve(res);
                    } else {
                        return Promise.reject(res);
                    }
                });
        };
    }

    errorHandling(error, dispatch, action) {
        if (error.response) {
            if (error.response.data.error.type.indexOf("_GLOBAL") > 0) {
                const exception = error.response.data.error;
                dispatch({
                    type: NOTIFICATIONS_ACTIONS.SET_NOTIFICATION_GLOBAL,
                    notification: exception
                });
            } else if (error.response.data.error.type.indexOf("ERROR") == 0) {
                dispatch({ type: action + "_ERROR", exception: error.response.data.error });
            }
        } else {
            const exception = new ClientException();
            exception.error.type = Enums.CODE.ERROR_GLOBAL;
            exception.error.message.pl = error.message;
            exception.error.message.us = error.message;
            dispatch({
                type: NOTIFICATIONS_ACTIONS.SET_NOTIFICATION_GLOBAL,
                notification: exception.error
            });

        }
    }
}

export default BaseService;
export { BaseService };
