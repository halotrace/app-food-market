import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './CreateOfferPage.scss';
import NavigationBar from '../../navigation/NavigationBar/NavigationBar';
import TextField from '../../../generic/TextField/TextField';
import SelectorField from '../../../generic/SelectorField/SelectorField';
import InputField from '../../../generic/InputField/InputField';
import AttributeValueFieldContainer from '../../containers/AttributeValueFieldContainer/AttributeValueFieldContainer';
import FileProcessor from 'react-file-processor';
import Label from '../../../generic/Label/Label.jsx';
import Button from '../../../generic/Button/Button.jsx';

class CreateOfferPage extends Component {

  static propTypes = {
    categories: PropTypes.arrayOf(PropTypes.string),
    requirements: PropTypes.arrayOf(PropTypes.string),
  };

  constructor(props) {
    super(props);

    this.state = {
      form: {
        hasErrors: null,
        fields: {
          name: {
            value: null,
            errors: [],
          },
          category: {
            value: null,
            errors: [],
          },
          packageWeight: {
            value: null,
            errors: [],
          },
          pricePerPackage: {
            value: null,
            errors: [],
          },
          requirement: {
            value: null,
            errors: [],
          },
        },
      }
    };
  }

  onImageClick(e) {
    this.refs.myFileInput.chooseFile();
  }

  onFileSelect(e, files) {
    if (!files[0]) return;
    this.image = files[0];
    let reader = new FileReader();
    reader.onload = (event) => {
      this.refs.image.src = event.target.result;
    };

    reader.readAsDataURL(files[0]);
  }

  onSaveClick() {
    let offer = this.state.form;
    this.props.onAdd(offer, this.image, this.props.address);
  };

  getCategories() {
    return this.props.categories.map((key) => ({ value: key }));
  }

  getRequirements() {
    return this.props.requirements.map((key) => ({ value: key }));
  }

  handleValidation(label, value) {
    let errors = [];
    switch (label) {
      case 'pricePerPackage':
      case 'packageWeight':
        if (isNaN(value)) {
          return [...errors, 'It is not a number'];
        } else return errors;
      default:
        return errors;
    }
  }

  hasErrors(fields) {
    for (let field in fields) {
      if (fields.hasOwnProperty(field)) {
        if (fields[field].errors.length !== 0) return true;
      }
    }

    return false;
  }

  onChange(label, inputState) {

    let formState = Object.assign({}, this.state.form, {});
    let fields = Object.assign({}, this.state.form.fields, {
      [label]: {
        value: inputState.value,
        errors: this.handleValidation(label, inputState.value),
      },
    });
    formState.fields = fields;
    this.setState({
      form: formState,
    });
  }

  getAttributes(quality) {
    this.props.fetchAttributes(quality, this.props.address);
  }

  render() {
    return (<div>
        <NavigationBar title='Create an offer'>
          <Button className={styles.cancelButton}
                  disabled={this.state.form.hasErrors}
                  onClick={this.props.history.goBack}>Cancel</Button>
          <Button className={styles.saveButton}
                  onClick={() => this.onSaveClick()}>Save</Button>
        </NavigationBar>
        <div className={styles.top}>
          <Label className={styles.label} text='Name of object:'/>
          <TextField label="name" onChange={this.onChange.bind(this)} className={styles.textField}/>
          <div className={styles.container}>
            <div className={styles.column}>
              <FileProcessor
                ref='myFileInput'
                onFileSelect={(e, f) => this.onFileSelect(e, f)}>
                <div className={styles.imageContainer} onClick={() => this.onImageClick()}>
                  <div className={styles.verticalContainer}>
                    <div className={styles.horizontalContainer}>
                      <img className={styles.image}
                           src='./static/images/iconImage.png'
                           ref='image'/>
                    </div>
                  </div>
                </div>
              </FileProcessor>
            </div>
            <div className={styles.column}>
              <Label className={styles.label} text='Category:'/>
              <SelectorField className={styles.selector}
                             onChange={this.onChange.bind(this)}
                             options={this.getCategories()} label='category'/>
              <div className={styles.table}>
                <InputField text='Package weight (kg)'
                            errors={this.state.form.fields.packageWeight.errors}
                            onChange={this.onChange.bind(this)}
                            label='packageWeight'/>
                <InputField
                            text='Price per package (€)'
                            errors={this.state.form.fields.pricePerPackage.errors}
                            onChange={this.onChange.bind(this)}
                            label='pricePerPackage'/>
              </div>
              <Label className={styles.label} text='Quality standard:'/>
              <SelectorField className={styles.selector}
                             options={this.getRequirements()}
                             onChange={(label, state) => {
                                this.onChange(label, state);
                                this.getAttributes(state.value);
                              }}

                             label='quality' />
              <AttributeValueFieldContainer options={this.props.attributesValueField} className={styles.properties}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateOfferPage;
