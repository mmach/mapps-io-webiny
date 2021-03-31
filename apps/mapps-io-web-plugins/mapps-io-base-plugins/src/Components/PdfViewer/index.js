import { Grid, IconButton } from "@material-ui/core";
/*
    ./client/components/App.js
*/

import print from "print-js";
import React from "react";
//import PDFViewer from 'pdf-viewer-reactjs'
import { Document, Page, pdfjs } from "react-pdf";
import { connect } from "react-redux";
import FadeIn from "../FadeIn/index.js";
import BodyLoader from "../Loader/BodyLoader/index.js";
import ResponsiveMatch from "../ResponsiveMatch/index.js";
//import "./style.scss";
import PrintIcon from "@material-ui/icons/Print";
import GetAppIcon from "@material-ui/icons/GetApp";
import SendIcon from "@material-ui/icons/Send";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function PdvViewer(props) {
  function printInvoice() {
    print({
      printable: `${global.env.PROXY}/${global.env.BLOB_URL}/blob/${props.pdf_id}.pdf`,
      type: "pdf",
      imageStyle: "width:100%"
    });
  }

  return (
    <FadeIn>
      <Grid style={{ minWidth: "360px" }}>
        <Grid item xs="12" container>
          <Grid item xs="8"></Grid>
          <Grid direction="column" item xs="4" style={{ display: "flex", flexDirection: "row" }}>
            <Grid item xs="4">
              <IconButton style={{ cursor: "pointer" }} onClick={printInvoice}>
                <PrintIcon></PrintIcon>
              </IconButton>
            </Grid>
            <Grid item xs="4">
              <IconButton
                href={`${global.env.PROXY}/${global.env.BLOB_URL}/blob/${props.pdf_id}.pdf`}
              >
                <GetAppIcon className="fa fa-download"></GetAppIcon>
              </IconButton>
            </Grid>
            <Grid item xs="4">
              <IconButton
                href={`mailto:?subject=${encodeURIComponent(
                  props.subject
                )}&body=${encodeURIComponent(props.body)}`}
              >
                <SendIcon className="fa fa-send"></SendIcon>
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs="12" container style={{ justifyContent: "center" }}>
          <ResponsiveMatch
            onDesktop={true}
            onDesktopChildren={
              <Document
                loading={
                  <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    style={{ height: "72vh", display: "flex", width: "100%" }}
                  >
                    <BodyLoader thickness={"2"} size={"40px"}></BodyLoader>
                  </Grid>
                }
                file={{
                  url: `${global.env.PROXY}/${global.env.BLOB_URL}/blob/${props.pdf_id}.pdf`
                }}
              >
                <Page
                  loading={
                    <Grid
                      container
                      direction="column"
                      justify="center"
                      alignItems="center"
                      style={{ height: "72vh", display: "flex", width: "100%" }}
                    >
                      <BodyLoader thickness={"2"} size={"40px"}></BodyLoader>
                    </Grid>
                  }
                  pageNumber={1}
                ></Page>
              </Document>
            }
            onPhone={true}
            onPhoneChildren={
              <Document
                loading={
                  <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    style={{ height: "80vh", display: "flex" }}
                  >
                    <BodyLoader thickness={"2"} size={"40px"}></BodyLoader>
                  </Grid>
                }
                file={{
                  url: `${global.env.PROXY}/${global.env.BLOB_URL}/blob/${props.pdf_id}.pdf`
                }}
              >
                <Page
                  loading={
                    <Grid
                      container
                      direction="column"
                      justify="center"
                      alignItems="center"
                      style={{ height: "80vh", display: "flex" }}
                    >
                      <BodyLoader thickness={"2"} size={"40px"}></BodyLoader>
                    </Grid>
                  }
                  className="g-brd-1 g-brd-gray-dark-light-v4--focus g-brd js-width-80vw g-height-auto"
                  pageNumber={1}
                ></Page>
              </Document>
            }
          ></ResponsiveMatch>
        </Grid>
      </Grid>
    </FadeIn>
  );
}

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(PdvViewer);
