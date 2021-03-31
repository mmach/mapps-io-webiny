import { Container, Grid, InputLabel, Paper, Tooltip, Typography } from "@material-ui/core";
import { BlobBase64DTO, CommandList, QueryList, Translator } from "justshare-shared";
import Image from "material-ui-image";
import React from "react";
import { ChromePicker } from "react-color";
import { connect } from "react-redux";
import { uuid } from "uuidv4";
import { BaseService } from "mapps-io-base-plugins/src/App/index.js";
import { BodyLoader, ButtonLoader, TextArea, TextBox } from "mapps-io-base-plugins/src/Components/index.js";

class Project extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.project = {};
        this.state.isLoading = true;
        this.blobRefs = {
            blob_logo_id: React.createRef(),
            blob_logo_hor_id: React.createRef(),
            blob_logo_ver_id: React.createRef(),
            blob_main_id: React.createRef(),
            blob_main_phone_id: React.createRef()
        };
        this.state.isSubmitLoading = false;
        this.state.validation = [];
        this.state.files = {
            blob_logo_id: null,
            blob_logo_hor_id: null,
            blob_logo_ver_id: null,
            blob_main_id: null,
            blob_main_phone_id: null
        };
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.isLoading != nextState.isLoading) {
            return true;
        }
        if (this.state.isSubmitLoading != nextState.isSubmitLoading) {
            return true;
        }
        if (this.state.project != nextState.project) {
            return true;
        }

        return true;
    }
    handleColorChange({ hex }) {
        this.setState({
            project: { ...this.state.project, theme_color: hex }
        });
    }

    componentDidMount() {
        this.props.getProjectInfo().then((succ) => {
            this.setState({
                isLoading: false,
                project: succ.data,
                files: {
                    blob_logo_id: succ.data.logo
                        ? {
                              id: succ.data.logo.blob_id
                          }
                        : null,
                    blob_logo_hor_id: succ.data.logo_ver
                        ? {
                              id: succ.data.logo_ver.blob_id
                          }
                        : null,
                    blob_logo_ver_id: succ.data.logo_hor
                        ? {
                              id: succ.data.logo_hor.blob_id
                          }
                        : null,
                    blob_main_id: succ.data.img_main
                        ? {
                              id: succ.data.img_main.blob_id
                          }
                        : null,
                    blob_main_phone_id: succ.data.img_main_phone
                        ? {
                              id: succ.data.img_main_phone.blob_id
                          }
                        : null
                }
            });
        });
    }
    roleHandler(event) {
        this.setState({
            roleChoose: event.target.value
        });
    }

    submitHanlder(event) {
        this.setState({
            isSubmitLoading: true
        });
        this.props.updateProject(this.state.project).then(() => {
            this.setState({
                isSubmitLoading: false
            });
        });

        event.preventDefault();

        //   this.props.addDictionary(this.state);
    }
    nameHandler(event) {
        this.setState({
            userType: {
                ...this.state.project,
                name: event.target.value
            }
        });
    }

    baseurlHandler(event) {
        this.setState({
            project: {
                ...this.state.project,
                base_url: event.target.value
            }
        });
    }
    contact_mailHandler(event) {
        this.setState({
            project: {
                ...this.state.project,
                contact_mail: event.target.value
            }
        });
    }
    descriptionHandler(event) {
        this.setState({
            project: {
                ...this.state.project,
                description: event.target.value
            }
        });
    }
    auth_urlHandler(event) {
        this.setState({
            project: {
                ...this.state.project,
                auth_url: event.target.value
            }
        });
    }
    uploadClick(event) {
        const src = event.currentTarget.dataset.key;
        this.blobRefs[src].current.click();
    }
    uploadIconHandler(e) {
        // get the files
        const src = e.target.dataset.key;
        const files = e.target.files;

        // Process each file
        const allFiles = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            // Make new FileReader
            const reader = new window.FileReader();

            // Convert the file to base64 text
            reader.readAsDataURL(file);

            // on reader load somthing...
            reader.onload = () => {
                // Make a fileInfo Object
                const fileInfo = {
                    name: file.name,
                    type: file.type,
                    size: Math.round(file.size / 1000) + " kB",
                    base64: reader.result,
                    file: file
                };

                // Push it to the state
                allFiles.push(fileInfo);

                // If all files have been proceed
                if (allFiles.length == files.length) {
                    // Apply Callback function
                    const dto = new BlobBase64DTO();

                    dto.id = uuid();
                    dto.blob = allFiles[0].base64.split("base64,")[1];
                    dto.type = allFiles[0].type;
                    dto.dest = src;
                    const files = this.state.files[src];
                    files[src] = allFiles[0];
                    this.setState({
                        files: { ...files }
                    });
                    this.props.uploadBlob(dto);
                } // reader.onload
            }; // for
        }
    }
    render() {
        const tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);
        const phTrans = Translator(this.props.codeDict.data.PLACEHOLDER, this.props.lang);
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
            <React.Fragment>
                <Container fixed id="actionProject">
                    <Grid
                        style={{ width: "100%", height: "100%" }}
                        container
                        direction="column"
                        justify="center"
                    >
                        <Paper
                            style={{
                                padding: "20px",
                                width: "auto",
                                minWidth: "700px",
                                justifyContent: "center",
                                display: "flex"
                            }}
                        >
                            <Grid xs="8" direction="column" justify={"center"} container>
                                <Typography
                                    style={{
                                        marginBottom: "20px",
                                        paddingBottom: "10px",
                                        borderBottom: "1px solid #999"
                                    }}
                                    variant="h5"
                                    component="h1"
                                >
                                    {tran.translate("Settings")}
                                </Typography>
                                <Grid item>
                                    <TextBox
                                        placeholder={phTrans.translate("Name")}
                                        isRequired={true}
                                        label={tran.translate("Name")}
                                        value={this.state.project.name}
                                        onChange={this.nameHandler.bind(this)}
                                        field="code"
                                        validation={this.state.validation}
                                    />
                                </Grid>
                                <Grid item>
                                    <TextBox
                                        placeholder={phTrans.translate("Base url")}
                                        isRequired={true}
                                        label={tran.translate("Base url")}
                                        value={this.state.project.base_url}
                                        onChange={this.baseurlHandler.bind(this)}
                                        field="code"
                                        validation={this.state.validation}
                                    />
                                </Grid>

                                <Grid item>
                                    <TextBox
                                        placeholder={phTrans.translate("Contact mail")}
                                        isRequired={true}
                                        label={tran.translate("Contact mail")}
                                        value={this.state.project.contact_mail}
                                        onChange={this.contact_mailHandler.bind(this)}
                                        field="code"
                                        validation={this.state.validation}
                                    />
                                </Grid>

                                <Grid item>
                                    <TextBox
                                        placeholder={phTrans.translate("Auth url")}
                                        isRequired={true}
                                        label={tran.translate("Auth url")}
                                        value={this.state.project.auth_url}
                                        onChange={this.auth_urlHandler.bind(this)}
                                        field="code"
                                        validation={this.state.validation}
                                    />
                                </Grid>

                                <Grid item>
                                    <TextArea
                                        placeholder={phTrans.translate("Description")}
                                        isRequired={true}
                                        label={tran.translate("Description")}
                                        value={this.state.project.description}
                                        onChange={this.descriptionHandler.bind(this)}
                                        field="code"
                                        validation={this.state.validation}
                                    />
                                </Grid>

                                <Grid item>
                                    <div className="text-center">
                                        <InputLabel for={this.state.guid}>
                                            {tran.translate("Color")}
                                        </InputLabel>
                                        <ChromePicker
                                            disableAlpha={true}
                                            color={
                                                this.state.project.theme_color
                                                    ? this.state.project.theme_color
                                                    : "#666666"
                                            }
                                            onChangeComplete={this.handleColorChange.bind(this)}
                                        />
                                    </div>
                                </Grid>
                                <Grid item style={{ marginTop: "20px" }}>
                                    <ButtonLoader
                                        color="primary"
                                        onClick={this.submitHanlder.bind(this)}
                                        size={"md"}
                                        value={tran.translate("PROJECT_BUTTON_SAVE")}
                                        isLoading={this.state.isSubmitLoading}
                                    />
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Container>
                <Container style={{ paddingTop: "20px" }}>
                    <Grid justify={"center"} container spacing={3}>
                        <Grid item xs="4">
                            <Paper>
                                <Tooltip title={"Clean logo"}>
                                    <div>
                                        <div>
                                            <span
                                                data-key={"blob_logo_id"}
                                                onClick={this.uploadClick.bind(this)}
                                                style={{ cursor: "pointer" }}
                                            >
                                                {this.state.files["blob_logo_id"] == null ? (
                                                    <span></span>
                                                ) : (
                                                    <Image
                                                        src={
                                                            this.state.files["blob_logo_id"].base64
                                                                ? this.state.files["blob_logo_id"]
                                                                      .base64
                                                                : window.env.BLOB_URL +
                                                                  "/blob/" +
                                                                  this.state.files["blob_logo_id"]
                                                                      .id
                                                        }
                                                    />
                                                )}
                                                {this.state.files["blob_logo_id"] == null ? (
                                                    <span>{tran.translate("+ ICON")}</span>
                                                ) : (
                                                    <span></span>
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </Tooltip>

                                <input
                                    type="file"
                                    data-key="blob_logo_id"
                                    ref={this.blobRefs.blob_logo_id}
                                    style={{ display: "none" }}
                                    onChange={this.uploadIconHandler.bind(this)}
                                />
                            </Paper>
                        </Grid>
                        <Grid item xs="4">
                            <Paper>
                                <Tooltip title={"Logo horizontal"}>
                                    <div>
                                        <div>
                                            <span
                                                data-key={"blob_logo_hor_id"}
                                                onClick={this.uploadClick.bind(this)}
                                                style={{ cursor: "pointer" }}
                                            >
                                                {this.state.files["blob_logo_hor_id"] == null ? (
                                                    <span></span>
                                                ) : (
                                                    <Image
                                                        src={
                                                            this.state.files["blob_logo_hor_id"]
                                                                .base64
                                                                ? this.state.files[
                                                                      "blob_logo_hor_id"
                                                                  ].base64
                                                                : window.env.BLOB_URL +
                                                                  "/blob/" +
                                                                  this.state.files[
                                                                      "blob_logo_hor_id"
                                                                  ].id
                                                        }
                                                    />
                                                )}
                                                {this.state.files["blob_logo_hor_id"] == null ? (
                                                    <span>{tran.translate("+ ICON")}</span>
                                                ) : (
                                                    <span></span>
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </Tooltip>
                                <input
                                    type="file"
                                    data-key="blob_logo_hor_id"
                                    ref={this.blobRefs.blob_logo_hor_id}
                                    style={{ display: "none" }}
                                    onChange={this.uploadIconHandler.bind(this)}
                                />
                            </Paper>
                        </Grid>

                        <Grid item xs="4">
                            <Paper>
                                <Tooltip title={"Clean vertical"}>
                                    <div>
                                        <div>
                                            <span
                                                data-key={"blob_logo_ver_id"}
                                                onClick={this.uploadClick.bind(this)}
                                                style={{ cursor: "pointer" }}
                                            >
                                                {this.state.files["blob_logo_ver_id"] == null ? (
                                                    <span></span>
                                                ) : (
                                                    <Image
                                                        src={
                                                            this.state.files["blob_logo_ver_id"]
                                                                .base64
                                                                ? this.state.files[
                                                                      "blob_logo_ver_id"
                                                                  ].base64
                                                                : window.env.BLOB_URL +
                                                                  "/blob/" +
                                                                  this.state.files[
                                                                      "blob_logo_ver_id"
                                                                  ].id
                                                        }
                                                    />
                                                )}
                                                {this.state.files["blob_logo_ver_id"] == null ? (
                                                    <span>{tran.translate("+ ICON")}</span>
                                                ) : (
                                                    <span></span>
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </Tooltip>
                                <input
                                    type="file"
                                    data-key="blob_logo_ver_id"
                                    ref={this.blobRefs.blob_logo_ver_id}
                                    style={{ display: "none" }}
                                    onChange={this.uploadIconHandler.bind(this)}
                                />
                            </Paper>
                        </Grid>

                        <Grid item xs="4">
                            <Paper>
                                <div>
                                    <div>
                                        <span
                                            data-key={"blob_main_id"}
                                            onClick={this.uploadClick.bind(this)}
                                            style={{ cursor: "pointer" }}
                                        >
                                            {this.state.files["blob_main_id"] == null ? (
                                                <span></span>
                                            ) : (
                                                <Image
                                                    src={
                                                        this.state.files["blob_main_id"].base64
                                                            ? this.state.files["blob_main_id"]
                                                                  .base64
                                                            : window.env.BLOB_URL +
                                                              "/blob/" +
                                                              this.state.files["blob_main_id"].id
                                                    }
                                                />
                                            )}
                                            {this.state.files["blob_main_id"] == null ? (
                                                <span>{tran.translate("+ ICON")}</span>
                                            ) : (
                                                <span></span>
                                            )}
                                        </span>
                                    </div>
                                </div>
                                <input
                                    type="file"
                                    data-key="blob_main_id"
                                    ref={this.blobRefs.blob_main_id}
                                    style={{ display: "none" }}
                                    onChange={this.uploadIconHandler.bind(this)}
                                />
                            </Paper>
                        </Grid>

                        <Grid item xs="4">
                            <Paper>
                                <div>
                                    <div>
                                        <span
                                            data-key={"blob_main_phone_id"}
                                            onClick={this.uploadClick.bind(this)}
                                            style={{ cursor: "pointer" }}
                                        >
                                            {this.state.files["blob_main_phone_id"] == null ? (
                                                <span></span>
                                            ) : (
                                                <Image
                                                    src={
                                                        this.state.files["blob_main_phone_id"]
                                                            .base64
                                                            ? this.state.files["blob_main_phone_id"]
                                                                  .base64
                                                            : window.env.BLOB_URL +
                                                              "/blob/" +
                                                              this.state.files["blob_main_phone_id"]
                                                                  .id
                                                    }
                                                />
                                            )}
                                            {this.state.files["blob_main_phone_id"] == null ? (
                                                <span>{tran.translate("+ ICON")}</span>
                                            ) : (
                                                <span></span>
                                            )}
                                        </span>
                                    </div>
                                </div>
                                <input
                                    type="file"
                                    data-key="blob_main_phone_id"
                                    ref={this.blobRefs.blob_main_phone_id}
                                    style={{ display: "none" }}
                                    onChange={this.uploadIconHandler.bind(this)}
                                />
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </React.Fragment>
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
        uploadBlob: (dto) => {
            return dispatch(new BaseService().commandThunt(CommandList.Project.UPLOAD_BLOB, dto));
        },
        getProjectInfo: (dto) => {
            return dispatch(new BaseService().queryThunt(QueryList.Project.GET_PROJECT_INFO, dto));
        },
        getUserTypes: (dto) => {
            return dispatch(new BaseService().queryThunt(QueryList.User.GET_USER_TYPES, dto));
        },
        getRoles: (dto) => {
            return dispatch(new BaseService().queryThunt(QueryList.Roles.GET_ROLES, dto));
        },
        updateProject: (dto) => {
            return dispatch(
                new BaseService().commandThunt(CommandList.Project.UPDATE_PROJECT, dto)
            );
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Project);
