import { Grid, IconButton, Typography } from "@material-ui/core";
import {
  BlobBase64DTO,
  CategoryDTO,
  CommandList,
  DictionaryDTO,
  Enums,
  QueryList,
  TranslationsDTO,
  Translator
} from "justshare-shared";
/*
    ./client/components/App.jsx
*/
import Image from "material-ui-image";
import React from "react";
import { ChromePicker } from "react-color";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { uuid } from "uuidv4";
import { BaseService } from "mapps-io-base-plugins/src/App/index.js";
import {
  ButtonLoader,
  NOTIFICATIONS_ACTIONS,
  TextBox,
  TranslateCompnent
} from "mapps-io-base-plugins/src/Components/index.js";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

class AddCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.category = new CategoryDTO();
    this.state.category.translation = new TranslationsDTO();
    //        this.state.category = new CategoryDTO();
    this.state.parentCategory = new CategoryDTO();
    this.state.category.category_parent = [];
    this.state.category.category_children = [];
    this.state.categoryOptions = {
      new: [],
      edit: [],
      delete: []
    };
    this.fileUploader = React.createRef();
    this.state.getCategoryOptionsTypeQuery = [];
    this.state.validation = [];
    this.state.file = null;
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.match.params.parentId != nextProps.match.params.parentId) {
      return true;
    } else if (this.state.category != nextState.category) {
      return true;
    } else if (this.state.parentCategory != nextState.parentCategory) {
      return true;
    }

    if (this.state.file != nextState.file) {
      return true;
    }
    return false;
  }
  componentDidMount() {
    if (this.props.match.params.parentId != "undefined") {
      this.props.getCategories(this.props.match.params.parentId).then((succ) => {
        const cat = new CategoryDTO();
        cat.id = uuid();

        cat.forEvent = succ.data[0].forEvent;
        cat.forSell = succ.data[0].forSell;
        cat.forThing = succ.data[0].forThing;
        cat.status = succ.data[0].status;
        cat.params = succ.data[0].params;
        cat.process_id=succ.data[0].process_id;
        (cat.blob_id = succ.data[0].blob_id), (cat.category_parent = succ.data);
        cat.category_children = [];
        cat.translation = new TranslationsDTO();

        cat.CategoryHierarchy = {
          category_parent_id: this.props.match.params.parentId
        };
        this.setState({
          parentCategory: succ.data[0],
          category: cat,
          file: succ.data[0].icon_blob,
          translation: cat.translation
        });
      });
    }
    const cat = new CategoryDTO();

    cat.id = uuid();
    cat.category_parent = [];
    cat.category_children = [];
    cat.forEvent = 1;
    cat.forSell = 1;
    cat.forThing = 1;
    cat.params="{}";
    cat.status = this.props.match.params.status;
    cat.translation = new TranslationsDTO();

    cat.CategoryHierarchy = {
      category_parent_id: ""
    };
    this.setState({
      category: cat,
      translation: cat.translation
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.parentId != prevProps.match.params.parentId) {
      if (this.props.match.params.parentId != "undefined") {
        this.props.getCategories(this.props.match.params.parentId).then((succ) => {
          const cat = new CategoryDTO();
          cat.id = uuid();

          cat.translation = new TranslationsDTO();
          cat.forEvent = succ.data[0].forEvent;
          cat.forSell = succ.data[0].forSell;
          cat.forThing = succ.data[0].forThing;
          cat.status = succ.data[0].status;
          cat.blob_id = succ.data[0].blob_id;
          cat.params = succ.data[0].params;
          cat.process_id=succ.data[0].process_id;
          cat.category_parent = succ.data;
          cat.category_children = [];
          cat.CategoryHierarchy = {
            category_parent_id: this.props.match.params.parentId
          };
          this.setState({
            parentCategory: succ.data[0],
            category: cat,
            file: succ.data[0].icon_blob,
            translation: cat.translation
          });
        });
      }
      const cat = new CategoryDTO();

      cat.id = uuid();
      cat.category_parent = [];
      cat.category_children = [];
      cat.forEvent = 1;
      cat.forSell = 1;
      cat.forThing = 1;
      cat.params="{}";
      cat.status = this.props.match.params.status;
      cat.translation = new TranslationsDTO();

      cat.CategoryHierarchy = {
        category_parent_id: ""
      };
      this.setState({
        category: cat,
        translation: cat.translation
      });
    }
  }
  refreshValidation() {
    if (this.state.toRefresh) {
      setTimeout(() => {
        //          this.validation();
      });
    }
  }
  uploadClick() {
    this.fileUploader.click();
  }
  uploadIconHandler(e) {
    // get the files
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
          this.setState({
            file: allFiles[0],
            category: {
              ...this.state.category,
              blob: dto
            }
          }); //this.props.onDone(allFiles[0]);
        }
      }; // reader.onload
    } // for
  }
  validation() {
    const validation = DictionaryDTO.prototype.validation(this.state);
    this.tran = Translator(this.props.codeDict.data.VALIDATION, this.props.lang);
    validation.map((item) => {
      item.msg = this.tran.translate(item.failed, ...item.value);
    });
    this.setState({
      validation: validation
    });
    return validation;
  }

  submitHanlder(event) {
    event.preventDefault();
    //   if (this.validation().length == 0) {
    // this.props.code=this.state;
    const category = this.state.category;
    category.id = category.id ? category.id : uuid();
    this.props.addCategories(category).then(() => {
      this.props.history.push(`/mapps/categories/categories/edit/${category.id}`);
      this.props.setNotification(
        Enums.CODE.SUCCESS_GLOBAL,
        Translator(this.props.codeDict.data.SUCCESS_GLOBAL, this.props.lang).translate(
          "CATEOGRY_HAS_BEEN_ADDED_SUCCESS"
        )
      );
    });

    //   }
  }

  expireHandler(event) {
    const cat = this.state.category;
    cat.expired_day = event.target.value;
    this.setState({
      category: { ...cat }
    });
  }

  uploadImage() {
    const dto = new BlobBase64DTO();
    dto.id = uuid();
    dto.blob = this.state.file.base64.split("base64,")[1];
    dto.type = this.state.file.type;
    this.props.loading(true);

    this.props.uploadImage(dto).then(() => {
      this.props.getUserImages({ user_id: this.props.auth.user.id });
    });
  }

  handleColorChange({ hex }) {
    this.setState({
      category: { ...this.state.category, color: hex }
    });
  }

  render() {
    const tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);
    const phTrans = Translator(this.props.codeDict.data.PLACEHOLDER, this.props.lang);

    const img = this.state.category.icon_blob
      ? window.env.BLOB_URL + "/blob/" + this.state.category.icon_blob.blob_id
      : this.state.category.category_parent[0] && this.state.category.category_parent[0].icon_blob
      ? window.env.BLOB_URL + "/blob/" + this.state.category.category_parent[0].icon_blob.blob_id
      : "";
    return (
      <Grid container>
        <Grid item xs="1">
          <div>
            <div>
            <span onClick={this.uploadClick.bind(this)} style={{ cursor: "pointer",display:'flex',alignItems:'center',justifyContent:'center' }}>
                {this.state.file == null ? (
                  img ? (
                    <Image src={img} />
                  ) : (
                    <IconButton>
                      <CloudUploadIcon />
                    </IconButton>
                  )
                ) : (
                  <Image src={this.state.file.base64 ? this.state.file.base64 : img} />
                )}
              </span>
            </div>
          </div>

          <input
            type="file"
            ref={(ref) => (this.fileUploader = ref)}
            style={{ display: "none" }}
            onChange={this.uploadIconHandler.bind(this)}
          />
        </Grid>
        <Grid item xs="11" style={{ marginBottom: "30px" }}>
          <Typography variant="h6" component="h1">
            {tran.translate("Category")}
          </Typography>
          <Typography variant="h8" component="h2">
            {this.state.category.category_parent
              ? this.state.category.category_parent[0]
                ? tran.translate("CATEGORY_TYPE_LABEL") +
                  ": " +
                  this.state.category.category_parent[0].category
                : ""
              : ""}
          </Typography>
        </Grid>
        <Grid item xs="12">
          <TextBox
            onChange={this.expireHandler.bind(this)}
            placeholder={phTrans.translate("CATEGORY_EXPIRE_DATE_PLACEHOLDER")}
            isRequired={true}
            label={tran.translate("CATEGORY_EXPIRE_DATE_PLACEHOLDER")}
            value={this.state.category.expired_day}
            field="expired_day"
            validation={this.state.validation}
          />

          <TranslateCompnent
            setTranslate={(translate) => {
              this.setState({ category: { ...this.state.category, translation: translate } });
            }}
            translation={this.state.category.translation}
          ></TranslateCompnent>

          <Grid style={{ marginBottom: "20px" }}>
            <ChromePicker
              disableAlpha={true}
              color={this.state.category.color ? this.state.category.color : "#666666"}
              onChangeComplete={this.handleColorChange.bind(this)}
            />
          </Grid>

          <ButtonLoader
            onClick={this.submitHanlder.bind(this)}
            size={"md"}
            color={"primary"}
            value={"Submit"}
            isLoading={this.props.codeDict.edit.isLoading}
          />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    codeDict: state.DictionaryReducer,
    lang: state.LanguageReducer,
    categoryTree: state.CategoryTreeReaducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCategories: (id) => {
      return dispatch(
        new BaseService().queryThunt(QueryList.Category.GET_CATEGORIES_HIERARCHY, { id: id })
      );
    },
    getDictionary: () => {
      dispatch({
        type: QueryList.Dictionary.GET_DICTIONARY
      });
    },
    getAllCategories: () => {
      return dispatch(new BaseService().queryThunt(QueryList.Category.GET_CATEGORIES_ALL_TREE, {}));
    },
    addCategories: (dto) => {
      return dispatch(new BaseService().commandThunt(CommandList.Category.ADD_CATEGORY, dto));
    },
    setNotification: (type, message) => {
      dispatch({
        type: NOTIFICATIONS_ACTIONS.SET_NOTIFICATION_GLOBAL,
        notification: { message: message, type: type }
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddCategory));
