import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { NavItem, NavMenu } from "@mui-treasury/components/menu/navigation";
import { usePlainNavigationMenuStyles } from "@mui-treasury/styles/navigationMenu/plain";
import { Translator } from "justshare-shared";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { mappsPlugins } from "../../..";
import { FadeIn } from "../../../Components";

const FooterNormalRender = (props) => {

    const Link = React.useMemo(()=>mappsPlugins.byName("mapps-item-basic-link").comopnent);

    const tran = Translator(props.codeDict.data.LABEL, props.lang);
    if (!props.data) {
        return null;
    }
    return (
        <React.Fragment>
            <CssBaseline />
            <FadeIn>
                <Grid
                    style={{
                        zIndex: 1000,
                        justifyContent: "center"
                    }}
                    container
                >
                    {(tran.translate("FOOTER_TOP_HEADER").trim() ||
                        tran.translate("FOOTER_TOP_TEXT").trim()) && (
                        <Grid
                            style={{
                                zIndex: 1000,
                                justifyContent: "center",
                                flexDirection: "column"
                            }}
                            container
                        >
                            <Grid
                                item
                                style={{
                                    textAlign: "center",
                                    marginTop: "20px",
                                    marginBottom: "5px"
                                }}
                            >
                                <Typography
                                    variant="h7"
                                    component="h1"
                                    style={{
                                        letterSpacing: ".07143rem",
                                        textTransform: "uppercase",
                                        fontSize: "11px"
                                    }}
                                >
                                    {tran.translate("FOOTER_TOP_HEADER")}
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                style={{
                                    textAlign: "center"
                                }}
                            >
                                {" "}
                                <Typography
                                    variant="h7"
                                    component="h1"
                                    style={{
                                        letterSpacing: ".07143rem",
                                        textTransform: "uppercase",
                                        fontSize: "10px"
                                    }}
                                >
                                    {tran.translate("FOOTER_TOP_TEXT")}
                                </Typography>
                            </Grid>
                        </Grid>
                    )}
                    <Grid
                        style={{
                            zIndex: 1000,
                            justifyContent: "center",
                            marginTop: "20px",
                            marginBottom: "5px"
                        }}
                        container
                    >
                        {(tran.translate("FOOTER_LEFT_HEADER").trim() ||
                            tran.translate("FOOTER_LEFT_TEXT").trim()) && (
                            <Grid
                                style={{
                                    justifyContent: "left",
                                    flexDirection: "column"
                                }}
                                item
                            >
                                <Grid
                                    item
                                    style={{
                                        textAlign: "left",
                                        marginTop: "20px",
                                        marginBottom: "5px"
                                    }}
                                >
                                    <Typography
                                        variant="h7"
                                        component="h1"
                                        style={{
                                            letterSpacing: ".07143rem",
                                            textTransform: "uppercase",
                                            fontSize: "11px"
                                        }}
                                    >
                                        {tran.translate("FOOTER_LEFT_HEADER")}
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    style={{
                                        textAlign: "left"
                                    }}
                                >
                                    {" "}
                                    <Typography
                                        variant="h7"
                                        component="h1"
                                        style={{
                                            letterSpacing: ".07143rem",
                                            textTransform: "uppercase",
                                            fontSize: "10px"
                                        }}
                                    >
                                        {tran.translate("FOOTER_LEFT_TEXT")}
                                    </Typography>
                                </Grid>
                            </Grid>
                        )}
                        <Grid
                            style={{
                                justifyContent: "center",
                                flexDirection: "column"
                            }}
                            item
                        >
                            <NavMenu useStyles={usePlainNavigationMenuStyles}>
                                {props.data.items.length > 0 &&
                                    props.data.items.map((i) => {
                                        if (Array.isArray(i.children)) {
                                            return (
                                                <Grid item key={i.id}>
                                                    <Typography
                                                        variant="h7"
                                                        component="h1"
                                                        style={{
                                                            textDecoration: "none",
                                                            fontSize: "10px",
                                                            letterSpacing: ".07143rem",
                                                            textTransform: "uppercase",
                                                            textAlign: "center"
                                                        }}
                                                    >
                                                        {tran.translate(i.title)}
                                                    </Typography>

                                                    {i.children.map((chitem, chindex) => {
                                                        return (
                                                            <span key={chitem.id + chindex}>
                                                                <NavItem
                                                                    to={chitem.url}
                                                                    as={Link}
                                                                    style={{
                                                                        textDecoration: "none",
                                                                        fontSize: "10px",
                                                                        letterSpacing: ".07143rem",
                                                                        textTransform: "uppercase"
                                                                    }}
                                                                >
                                                                    {tran.translate(chitem.title)}
                                                                </NavItem>
                                                            </span>
                                                        );
                                                    })}
                                                </Grid>
                                            );
                                        } else {
                                            return (
                                                <Grid item key={i.id}>
                                                    <Typography variant="h7" component="h1">
                                                        <NavItem
                                                            to={i.url}
                                                            as={Link}
                                                            style={{
                                                                textDecoration: "none",
                                                                fontSize: "10px",
                                                                letterSpacing: ".07143rem",
                                                                textTransform: "uppercase"
                                                            }}
                                                        >
                                                            {tran.translate(i.title)}
                                                        </NavItem>
                                                    </Typography>
                                                </Grid>
                                            );
                                        }
                                    })}
                                {props.data.items.length == 0 && (
                                    <Button>
                                        <NavItem
                                            style={{
                                                textDecoration: "none",
                                                fontSize: "11px",
                                                letterSpacing: ".07143rem",
                                                textTransform: "uppercase"
                                            }}
                                        ></NavItem>
                                    </Button>
                                )}
                            </NavMenu>
                        </Grid>
                        {(tran.translate("FOOTER_LEFT_HEADER").trim() ||
                            tran.translate("FOOTER_LEFT_TEXT").trim()) && (
                            <Grid
                                style={{
                                    justifyContent: "left",
                                    flexDirection: "column"
                                }}
                                item
                            >
                                <Grid
                                    item
                                    style={{
                                        textAlign: "right",
                                        marginTop: "20px",
                                        marginBottom: "5px"
                                    }}
                                >
                                    <Typography
                                        variant="h7"
                                        component="h1"
                                        style={{
                                            letterSpacing: ".07143rem",
                                            textTransform: "uppercase",
                                            fontSize: "11px"
                                        }}
                                    >
                                        {tran.translate("FOOTER_LEFT_HEADER")}
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    style={{
                                        textAlign: "right"
                                    }}
                                >
                                    {" "}
                                    <Typography
                                        variant="h7"
                                        component="h1"
                                        style={{
                                            letterSpacing: ".07143rem",
                                            textTransform: "uppercase",
                                            fontSize: "10px"
                                        }}
                                    >
                                        {tran.translate("FOOTER_LEFT_TEXT")}
                                    </Typography>
                                </Grid>
                            </Grid>
                        )}
                    </Grid>
                    {(tran.translate("FOOTER_TOP_HEADER").trim() ||
                        tran.translate("FOOTER_TOP_TEXT").trim()) && (
                        <Grid
                            style={{
                                zIndex: 1000,
                                justifyContent: "center",
                                flexDirection: "column"
                            }}
                            container
                        >
                            <Grid
                                item
                                style={{
                                    textAlign: "center",
                                    marginTop: "20px",
                                    marginBottom: "5px"
                                }}
                            >
                                <Typography
                                    variant="h7"
                                    component="h1"
                                    style={{
                                        letterSpacing: ".07143rem",
                                        textTransform: "uppercase",
                                        fontSize: "11px"
                                    }}
                                >
                                    {tran.translate("FOOTER_BOTTOM_HEADER")}
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                style={{
                                    textAlign: "center"
                                }}
                            >
                                {" "}
                                <Typography
                                    variant="h7"
                                    component="h1"
                                    style={{
                                        letterSpacing: ".07143rem",
                                        textTransform: "uppercase",
                                        fontSize: "10px"
                                    }}
                                >
                                    {tran.translate("FOOTER_BOTTOM_TEXT")}
                                </Typography>
                            </Grid>
                        </Grid>
                    )}
                </Grid>
            </FadeIn>
        </React.Fragment>
    );
};

const mapStateToProps = (state) => {
    //console.log(state);

    return {
        codeDict: state.DictionaryReducer,
        config: state.ConfigReducer,
        lang: state.LanguageReducer
    };
};

const mapDispatchToProps = () => {
    return;
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FooterNormalRender));
