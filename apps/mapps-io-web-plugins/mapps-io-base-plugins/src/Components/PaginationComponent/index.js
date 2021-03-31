/*
    ./client/components/App.js
*/

import { Translator } from "justshare-shared";
import React from "react";
import { connect } from "react-redux";

class PaginationComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    onClick(event) {
        const page = event.currentTarget.getAttribute("data-key");
        this.props.onClick(page);
    }

    render() {
        const tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);

        const currentPagination = Number(this.props.page) + 1;
        const maxPagination = Math.ceil(this.props.total / Number(this.props.size));
        const pagination = [];
        pagination[1] = 1;
        pagination[Number(currentPagination) - 2] = Number(currentPagination) - 2;
        pagination[Number(currentPagination) - 1] = Number(currentPagination) - 1;
        pagination[Number(currentPagination)] = Number(currentPagination);
        pagination[Number(currentPagination) + 1] = Number(currentPagination) + 1;
        pagination[Number(currentPagination) + 2] = Number(currentPagination) + 2;
        pagination[maxPagination] = maxPagination;
        const paginationArray = [];

        try {
            Object.keys(pagination)
                .map((item) => {
                    return pagination[item];
                })
                .filter((item) => {
                    return item >= 1 && item <= maxPagination;
                })
                .reduce(function (previousValue, currentValue) {
                    paginationArray.push(previousValue);
                    if (currentValue - previousValue > 1) {
                        paginationArray.push("...");
                    }
                    return currentValue;
                });
            paginationArray.push(maxPagination);
        } catch (er) {}

        return (
            <div className="shortcode-html">
                <nav className="text-center" aria-label="Page Navigation">
                    <ul className="list-inline">
                        <li className="list-inline-item">
                            <span
                                data-key={currentPagination - 2}
                                onClick={this.onClick.bind(this)}
                                className={
                                    "rounded-0 g-pa-5-10   " +
                                    (Number(currentPagination) == 1
                                        ? "hidden  "
                                        : "btn btn-sm btn-outline-secondary g-brd-gray-light-v1 g-color-white--hover g-cursor-pointer")
                                }
                            >
                                <span aria-hidden="true">
                                    <i className="fa fa-angle-left g-mr-5"></i>
                                    {tran.translate("PAGINATION_PREV")}
                                </span>
                                <span className="sr-only">{tran.translate("PAGINATION_PREV")}</span>
                            </span>
                        </li>
                        {paginationArray.map((item, key) => {
                            if (item == "...") {
                                return (
                                    <li key={key} className="list-inline-item g-hidden-sm-down">
                                        <span className="g-pa-5-10">...</span>
                                    </li>
                                );
                            }
                            return (
                                <li key={key} className="list-inline-item g-hidden-sm-down">
                                    <span
                                        data-key={item - 1}
                                        onClick={this.onClick.bind(this)}
                                        className={
                                            "btn btn-sm rounded-0 g-pa-5-10 g-cursor-pointer " +
                                            (item == Number(currentPagination)
                                                ? " btn-primary g-color-white "
                                                : " btn-outline-secondary g-brd-gray-light-v1 g-color-white--hover  ")
                                        }
                                    >
                                        {item}
                                    </span>
                                </li>
                            );
                        })}
                        <li className="list-inline-item">
                            <span
                                data-key={currentPagination}
                                onClick={this.onClick.bind(this)}
                                className={
                                    "rounded-0 g-pa-5-10  " +
                                    (Number(currentPagination) == maxPagination
                                        ? " hidden "
                                        : " btn btn-sm btn-outline-secondary g-brd-gray-light-v1 g-color-white--hover g-cursor-pointer ")
                                }
                            >
                                <span aria-hidden="true">
                                    {tran.translate("PAGINATION_NEXT")}
                                    <i className="fa fa-angle-right g-ml-5"></i>
                                </span>
                                <span className="sr-only">{tran.translate("PAGINATION_NEXT")}</span>
                            </span>
                        </li>
                    </ul>
                </nav>
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

const mapDispatchToProps = () => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(PaginationComponent);
