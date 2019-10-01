import React, { Component } from "react";
import "./Collabo.css";
import axios from "axios";
import {
  Button,
  Header,
  Image,
  Modal,
  Checkbox,
  Dropdown,
  Input,
  Label
} from "semantic-ui-react";
import { Translation } from "react-i18next";
import { toast } from "react-toastify";
import { Auth } from "aws-amplify";

const MAX_IMAGE_SIZE = 10000000;
const roles = [
  "principal",
  "accompaniment",
  "songwriter",
  "composer",
  "remixer",
  "studio",
  "publisher",
  "graphist",
  "producer",
  "singer",
  "musician"
];

export default class ModifyUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groups: [],
      image: "",
      firstName: "",
      lastName: "",
      artistName: props.firstName,
      email: "",
      avatarImage: "image.jpg",
      instruments: [],
      open: props.open,
      defaultRoles: [],
      currentValue: [],
      currentRoleValue: [],
      roles: [
        { key: "Principal", text: "Principal", value: "Principal" },
        { key: "Accompaniment", text: "Accompaniment", value: "Accompaniment" },
        { key: "Songwriter", text: "Songwriter", value: "Songwriter" },
        { key: "Composer", text: "Composer", value: "Composer" },
        { key: "Remixer", text: "Remixer", value: "Remixer" },
        { key: "Studio", text: "Studio", value: "Studio" },
        { key: "Publisher", text: "Publisher", value: "Publisher" },
        { key: "Graphist", text: "Graphist", value: "Graphist" },
        { key: "Producer", text: "Producer", value: "Producer" },
        { key: "Singer", text: "Singer", value: "Singer" },
        { key: "Musician", text: "Musician", value: "Musician" }
      ]
    };

    // BIND TODO
    this.click = this.click.bind(this);
  }

  closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
    this.setState({ closeOnEscape, closeOnDimmerClick, open: true });
  };

  //close = () => this.setState({ open: false })

  handleAddition = (e, { value }) => {
    this.setState(prevState => ({
      groups: [{ text: value, value }, ...prevState.groups]
    }));
  };

  handleChange = (e, { value }) => this.setState({ currentValue: value });

  handleRoleChange = (e, { value }) => this.setState({ defaultRoles: value });

  roleChange = (e, { value }) => this.setState({ currentRoleValue: value });

  handleFileDelete(e) {
    e.target.value = null;
    this.setState({ image: "" });
    console.log("image: ", this.state.image);
  }

  handleFileUpload(e) {
    console.log("FILE: ", e.target.files[0]);
    if (e.target.files[0].size > MAX_IMAGE_SIZE) {
      return alert("Image is loo large - 10Mb maximum");
    }
    if (!e.target.files[0].type.includes("image/jpeg")) {
      return alert("Wrong file type - JPG only.");
    }
    this.setState({
      image: "https://smartsplit-images.s3.us-east-2.amazonaws.com/faceapp.jpg"
    });
  }

  click() {
    this.handleSubmit();
    if(this.props.close) {
      this.props.close()
    }      
  }

  randomPassword(length) {
    let chars = "abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+<>ABCDEFGHIJKLMNOPQRSTUVWXYZ12345678901234567890"
    let password = "";
    for (var x = 0; x < length; x++) {
        var i = Math.floor(Math.random() * chars.length);
        password += chars.charAt(i);
    }
    return password;
  }

  handleSubmit = values => {

    let attributes = {
      email: this.state.email,
      given_name: this.state.firstName,
      family_name: this.state.lastName,
      'custom:artistName': this.state.artistName,
      'custom:defaultRoles': Buffer.from(JSON.stringify(this.state.currentRoleValue)).toString('base64'),
      'custom:instruments':Buffer.from(JSON.stringify(this.state.instruments)).toString('base64'),
      'custom:groups': Buffer.from(JSON.stringify(this.state.currentValue)).toString('base64'),
      'custom:avatarImage': this.state.avatarImage
    }
    let username = this.state.email
    let password = this.randomPassword(16)

    try {
      Auth.signUp({
        username,
        password,
        attributes: attributes
      })
        .then(() => {
          toast.success("user created / modified");
          if (this.props.fn) {
            this.props.fn();
          }
        })
        .catch(err => {
          toast.error(err)
          console.log(err);
        });
    } catch (err) {
      console.log('try', err);
    }
  };

  onTodoChange(value) {
    this.setState({
      firstName: value
    });
  }

  componentDidMount() {
    let groups = [];
    axios
      .get("http://api.smartsplit.org:8080/v1/rightHolders")
      .then(res => {
        let groupers = [];
        let groupsUnique = [];
        res.data.forEach(function(element) {
          groupers.push(element.groups);
          // Remove duplicates from multiple right holders and flattens arrays
          let GR = groupers
            .sort()
            .flat()
            .filter(Boolean);
          groupsUnique = [...new Set(GR)];
        });
        groupsUnique.forEach(function(elm) {
          groups.push({ key: elm, text: elm, value: elm });
        });
        this.setState({ groups: groups }, () => {
          console.log("this.state.groups", this.state.groups);
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.open !== nextProps.open) {
      this.setState({ open: nextProps.open });
    }
    if (this.props.firstName !== nextProps.firstName) {
      this.setState({ artistName: nextProps.firstName });
    }
  }

  render() {
    const {
      open,
      closeOnDimmerClick,
      currentValue,
      currentRoleValue
    } = this.state;

    // Return checkbox for each role
    const renderCheckbox = () => {
      return roles.map(role => {
        return (
          <Checkbox
            label={role}
            key={role}
            value={this.state.defaultRoles}
            onChange={this.handleRoleChange}
          />
        );
      });
    };

    return (
      <Translation>
        {t => (
          <Modal
            open={open}
            closeOnEscape={true}
            closeOnDimmerClick={false}
            onClose={this.props.close}
            size="small"
          >
            <div className="input-container">
              <Modal.Header className="Titre">
                {t("collaborateur.titre")}
              </Modal.Header>
              <br></br>
              <input
                type="text"
                className="firstName"
                placeholder={t("collaborateur.attribut.etiquette.prenom")}
                value={this.state.firstName}
                onChange={e => this.onTodoChange(e.target.value)}
              />
              <input
                type="text"
                className="lastName"
                placeholder={t("collaborateur.attribut.etiquette.nom")}
                value={this.state.lastName}
                onChange={e => this.setState({ lastName: e.target.value })}
              />
              <label>{t("collaborateur.attribut.etiquette.artiste")}</label>
              <label id="Optionel">
                {t("collaborateur.attribut.etiquette.option")}
              </label>
              <input
                type="text"
                className="artistName"
                placeholder={t("collaborateur.attribut.etiquette.artiste")}
                value={this.state.artistName}
                onChange={e => this.setState({ artistName: e.target.value })}
              />
              <div className="sous titre">
                {t("collaborateur.attribut.etiquette.na")}
              </div>
              <input
                type="text"
                className="email"
                placeholder={t("collaborateur.attribut.etiquette.courriel")}
                value={this.state.email}
                onChange={e => this.setState({ email: e.target.value })}
              />
              <label>{t("collaborateur.attribut.etiquette.groupe")}</label>
              <Dropdown
                id="prompt"
                type="text"
                options={this.state.groups}
                placeholder={t("collaborateur.attribut.indication.groupe")}
                search
                multiple={true}
                selection
                fluid
                allowAdditions
                value={currentValue}
                onAddItem={this.handleAddition}
                onChange={this.handleChange}
              />
              {/*<i className="search icon"></i>*/}
              <label>{t("collaborateur.attribut.etiquette.role")}</label>
              <Dropdown
                id="roles"
                type="text"
                options={this.state.roles}
                placeholder={t("collaborateur.attribut.indication.role")}
                search
                multiple={true}
                selection
                fluid
                value={currentRoleValue}
                onChange={this.roleChange}
              />
              <div className="sous titre">
                {t("collaborateur.attribut.indication.role2")}
              </div>
            </div>
            <Modal.Actions>
              <Button onClick={this.props.close} negative>
                {t("collaborateur.attribut.bouton.annuler")}
              </Button>
              <Button
                onClick={this.click}
                positive
                icon="checkmark"
                labelPosition="right"
                content={t("collaborateur.attribut.bouton.sauvegarder")}
              />
            </Modal.Actions>
          </Modal>
        )}
      </Translation>
    );
  }
}