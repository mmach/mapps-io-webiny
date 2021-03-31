import { Grid, IconButton } from "@material-ui/core";
/*
    ./client/components/App.jsx
*/

import { QueryList, Translator } from "justshare-shared";
import StatusesList from "justshare-shared/.compiled/StatusesList";
import React from "react";
import { connect } from "react-redux";
import withFixedColumns from "react-table-hoc-fixed-columns";
import "react-table-hoc-fixed-columns/lib/styles.css";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
//import { ONP, isDIM } from '../../../../App/Architecture/onp.js';
import { uuid } from "uuidv4";
import { BaseService } from "mapps-io-base-plugins/src/App/index.js";
import {
  BodyLoader,
  MODAL_ACTIONS,
  DayPickerInputComponent,
  DropDownList,
  PdfViewer,
  LIGHTBOX_ACTIONS
} from "mapps-io-base-plugins/src/Components";
import "./style.scss";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import LinkIcon from "@material-ui/icons/Link";

const ReactTableFixedColumns = withFixedColumns(ReactTable);

class InvoicesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.state.item = this.props.item ? this.props.item : {};
    this.state.isLoading = true;
    this.state.isOpen = false;
    this.state.comopnent = undefined;
    this.state.size = 20;
    this.state.page = 0;
    this.state.date = new Date();
    this.state.month = new Date().getMonth();
    this.state.year = new Date().getFullYear();

    // this.state.action_id = this.props.match.params.action_id
    this.state.invoicesList = [];
    this.state.status_id = undefined;
  }

  shouldComponentUpdate() {
    return true;
  }
  async componentDidMount() {
    const result = await this.props.getInvoices({
      year: this.state.year,
      month: this.state.month,
      status: this.state.status_id,
      asAdmin: true
    });
    this.setState({ isLoading: false, invoicesList: result.data });
  }
  async paginationClick(page) {
    window.scrollTo(0, 0);
    this.setState({ isLoading: true });

    const result = await this.props.getInvoices({
      year: this.state.year,
      month: this.state.month,
      status: this.state.status_id,
      asAdmin: true
    });
    this.setState({ isLoading: false, invoicesList: result.data });

    this.setState({
      page: page
    });
  }

  async onDateChange(event) {
    const date = event;
    window.scrollTo(0, 0);
    this.setState({ isLoading: true });

    const result = await this.props.getInvoices({
      month: event.getMonth(),
      year: event.getFullYear(),
      status: this.state.status_id,
      asAdmin: true
    });
    this.setState({ isLoading: false, invoicesList: result.data });

    this.setState({
      month: event.getMonth(),
      year: event.getFullYear(),
      date: date
    });
  }

  clickItem(event) {
    const id = event.currentTarget.getAttribute("data-key");
    const invoice = this.state.invoicesList.filter((i) => i.iua_id == id)[0];
    this.props.history.push(`/user/` + invoice.user_src.user_id + `/iua_preview/` + id);
  }

  getStatus(status_id) {
    const st = this.props.config.statuses.filter((i) => {
      return i.id == status_id;
    })[0];
    return st;
  }
  async onStatusChange(event) {
    const status = event.target.value;
    window.scrollTo(0, 0);
    this.setState({ isLoading: true });
    const result = await this.props.getInvoices({
      year: this.state.year,
      month: this.state.month,
      status: status,
      asAdmin: true
    });
    this.setState({ isLoading: false, invoicesList: result.data });

    this.setState({
      page: 0,
      status_id: status
    });
  }

  openInvoice(event) {
    const id = event.currentTarget.getAttribute("data-key");
    const tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);
    const invoice = this.state.invoicesList.filter((i) => i.id == id)[0];
    const obj = {
      pdf_id: invoice.blob.blob_id,
      subject: tran.translate(
        "SEND_MAIL_SUBJECT",
        invoice.number_string,
        invoice.month + "/" + invoice.year
      ),
      body: `${window.env.BLOB_URL}/blob/${invoice.blob.blob_id}.pdf`
    };
    this.props.openModal(true, <PdfViewer {...obj}></PdfViewer>);
  }
  onChangeInvoiceStatusChange(event) {
    const status_id = event.currentTarget.dataset.key;
    return status_id;
  }
  render() {
    const tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);

    //   let statuses = this.props.config.actions.filter(i => i.id == this.state.action_id)[0].statuses.sort((a, b) => Number(a.status.status_order) > Number(b.status.status_order) ? 1 : -1).map(i => {
    //       return <option key={i.status.id} value={i.status.id}>{this.props.config.statuses.filter(s => s.id == i.status.id)[0].translation[this.props.lang]}</option>
    //  })
    // statuses = [<option key={null} value={null}>{''}</option>, ...statuses]
    let statuses = this.props.config.statuses
      .filter((i) => {
        return [StatusesList.NEW, StatusesList.REJECTED, StatusesList.PAID].includes(i.name);
      })
      .map((i) => {
        return { id: i.id, value: i.translation[this.props.lang] };
      });

    statuses = [{ id: null, value: "ALL" }, ...statuses];

    if (this.state.isLoading == true) {
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
      <Grid id="invoices_list" container className=" ">
        <Grid container item xs="12" style={{ paddingLeft: "20px" }}>
          <Grid item xs="6">
            <DropDownList
              label={"Status"}
              value={this.state.status_id}
              onChange={this.onStatusChange.bind(this)}
              valueOptions={statuses}
            ></DropDownList>
          </Grid>
          <Grid item xs="6">
            <DayPickerInputComponent
              variant="month"
              label={"Month"}
              dateFormat="MM/yyyy"
              showMonthYearPicker
              value={this.state.date}
              onChange={this.onDateChange.bind(this)}
            ></DayPickerInputComponent>
          </Grid>
        </Grid>
        <Grid item xs="12">
          {this.state.isLoading == false ? (
            <ReactTableFixedColumns
              data={this.state.invoicesList
                .sort((a, b) => {
                  return new Date(b.createdAt) > new Date(a.createdAt);
                })
                .map((i) => {
                  return {
                    ...i,
                    info: { number: i.number },
                    statusName:
                      this.getStatus.bind(this)(i.status_id) &&
                      this.getStatus.bind(this)(i.status_id).translation[this.props.lang]
                  };
                })}
              columns={[
                {
                  Cell: (a) => {
                    return (
                      <IconButton
                        data-key={a.original.id}
                        onClick={this.openInvoice.bind(this)}
                        style={{ cursor: "pointer" }}
                      >
                        <PictureAsPdfIcon />
                      </IconButton>
                    );
                  },
                  Header: tran.translate("PDF"),
                  accessor: "original.number",
                  width: 80
                },
                {
                  Cell: (a) => {
                    return (
                      <div className="g-pa-0 g-ma-0">
                        {new Date(a.original.createdAt).toLocaleDateString()}
                      </div>
                    );
                  },
                  Header: tran.translate("ACTION"),
                  accessor: "createdAt",
                  width: 80
                },
                {
                  Cell: (a) => {
                    return (
                      <div
                        className="g-pa-0 g-ma-0"
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        {a.original.number}
                      </div>
                    );
                  },
                  Header: tran.translate("NUMBER"),
                  accessor: "info.number",
                  width: 200
                },

                {
                  Header: "INFO",
                  columns: [
                    {
                      Cell: (a) => {
                        return (
                          <span className="g-color-gray-dark-v3 g-font-style-normal ">
                            {a.original.price_net + " " + a.original.currency}
                          </span>
                        );
                      },
                      Header: tran.translate("NET"),
                      accessor: "price_net",

                      width: 200
                    },

                    {
                      Cell: (a) => {
                        return (
                          <span className="g-color-gray-dark-v3 g-font-style-normal ">
                            {a.original.price_tax + " " + a.original.currency}
                          </span>
                        );
                      },
                      Header: tran.translate("TAX"),
                      accessor: "price_tax",

                      width: 200
                    },

                    {
                      Cell: (a) => {
                        return (
                          <span className="g-color-gray-dark-v3 g-font-style-normal ">
                            {a.original.price + " " + a.original.currency}
                          </span>
                        );
                      },
                      Header: tran.translate("PRICE"),
                      accessor: "price",

                      width: 200
                    },
                    {
                      Cell: (a) => {
                        return (
                          <span className="g-color-gray-dark-v3 g-font-style-normal ">
                            {a.original.title}
                          </span>
                        );
                      },
                      Header: tran.translate("TITLE"),
                      accessor: "title",

                      width: 300
                    },
                    {
                      Cell: (a) => {
                        return (
                          <span className=" g-color-gray-dark-v2 ">
                            {" "}
                            {new Date(a.original.dueDate).toLocaleDateString()}
                          </span>
                        );
                      },

                      Header: tran.translate("DUEDATE"),
                      accessor: "dueDate",
                      width: 120
                    },
                    {
                      Cell: (a) => {
                        return (
                          <IconButton
                            style={{
                              display: "flex",
                              justifyContent: "center"
                            }}
                            data-key={a.original.iua_id}
                            onClick={this.clickItem.bind(this)}
                          >
                            <LinkIcon aria-hidden="true"></LinkIcon>
                          </IconButton>
                        );
                      },
                      id: uuid(),
                      Header: tran.translate("IUA"),
                      width: 120
                    },
                    {
                      Cell: (a) => {
                        return <div style={{ textAlign: "center" }}>{a.original.statusName}</div>;
                      },
                      id: uuid(),

                      Header: tran.translate("Status"),
                      width: 150
                    }
                  ]
                },
                {
                  Cell: (a) => {
                    return (
                      <DropDownList
                        data-key={a.original.id}
                        label={"Set status"}
                        onChange={this.onChangeInvoiceStatusChange.bind(this)}
                        valueOptions={statuses}
                      ></DropDownList>
                    );
                  },
                  id: uuid(),

                  Header: tran.translate("ACTIONS"),
                  width: 200
                }
              ]}
              defaultPageSize={20}
              style={{ height: "85vh" }}
              className="-highlight "
            />
          ) : (
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              style={{ height: "92vh", display: "flex" }}
            >
              <BodyLoader thickness={"2"} size={"40px"}></BodyLoader>
            </Grid>
          )}
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  //console.log(state);

  return {
    codeDict: state.DictionaryReducer,
    lang: state.LanguageReducer,
    auth: state.AuthReducer,
    loader: state.LoaderReducer,
    offerItem: state.NewOfferItemReducer,
    config: state.ConfigReducer,
    filterSearchReducer: state.FilterSearchReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openLightbox: (activeImage, images) => {
      return dispatch({
        type: LIGHTBOX_ACTIONS.OPEN_LIGHTBOX,
        dto: {
          images: images,
          activeImage: activeImage
        }
      });
    },

    openModal: (open, body) => {
      dispatch({
        type: MODAL_ACTIONS.OPEN_MODAL,
        dto: {
          open: open,
          body: body
        }
      });
    },

    getCategoryOptions: (category_id) => {
      return dispatch(
        new BaseService().queryThunt(QueryList.CategoryOptions.GET_CATEGORY_OPTION, {
          id: category_id
        })
      );
    },
    getInvoices: ({ page, size, status, asAdmin, month, year }) => {
      return dispatch(
        new BaseService().queryThunt(QueryList.Invoice.GET_USER_INVOICES, {
          status: status,
          page: page,
          size: size,
          asAdmin,
          month,
          year
        })
      );
    },
    getActions: (dto) => {
      return dispatch(new BaseService().queryThunt(QueryList.Category.GET_CATEGORY_ACTIONS, dto));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InvoicesList);
