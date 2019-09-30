import React, { Component } from "react";
import "./Register.css";
import { Field, Form, Formik } from "formik";
import zxcvbn from "zxcvbn";
import { Auth } from "aws-amplify";
import { toast } from "react-toastify";
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
import axios from "axios";
// import * as Yup from 'yup'
// Traduction
import { Translation } from "react-i18next";
import Eye from "./Eye";

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

class Register extends Component {
  state = {
    showModal: false,
    username: false
  };

  openModal = () => {
    this.setState({ showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  constructor(props) {
    super(props);
    const { minStrength = 3, thresholdLength = 8 } = props;

    this.state = {
      hidden: true,
      confirmhidden: true,
      password: "",
      confirmpassword: "",
      strength: 0,
      passwordmatch: false,
      groups: [],
      avatarImage: "image.jpg",
      firstName: "",
      lastName: "",
      artistName: "",
      defaultRoles: [],
      instruments: [],
      currentValue: [],
      currentRoleValue: [],
      image: "",
      uploadURL: "",
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

    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.validatePasswordStrong = this.validatePasswordStrong.bind(this);
    // this.stateChanged = this.stateChanged.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(
      this
    );
    this.toggleConfirmShow = this.toggleConfirmShow.bind(this);
    this.validateUsername = this.validateUsername.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.validateConfirmPassword = this.validateConfirmPassword.bind(this);
  }

  clearErrorState = () => {
    this.setState({
      errors: {
        cognito: null,
        blankfield: false,
        passwordmatch: false
      }
    });
  };

  validateUsername(value) {
    if (!value) {
      return "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test(value)) {
      return "Invalid username";
    }
  }

  validatePassword(value) {
    if (!value) {
      return "Required";
    } else if (
      !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i.test(
        value
      )
    ) {
      console.log("VALUE", value);
      return "Invalid password";
    }
  }

  validateConfirmPassword(value) {
    if (!value) {
      return "Required";
      // } else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i.test(value)) {
      //   console.log("VALUE confirm", value)
      //   return "Passwords do not match"
    } else if (value !== this.state.password) {
      console.log("VALUE confirm", value);
      return "Passwords do not match";
    } else {
      this.setState({ passwordmatch: true });
    }
  }

  validatePasswordStrong = value => {
    // ensure password is long enough
    if (value.length <= this.thresholdLength) {
      throw new Error("Password is short");
    }

    // ensure password is strong enough using the zxcvbn library
    if (zxcvbn(value).score < this.minStrength) {
      throw new Error("Password is weak");
    }
  };

  handleSubmit = values => {
    // AWS Cognito integration here
    const username = values.username;
    const email = values.username; // username is used as email
    const password = this.state.password;
    const firstName = this.state.firstName;
    const lastName = this.state.lastName;
    const artistName = this.state.artistName;
    // const firstName = 'First Name'
    // const lastName = 'Last Name'
    // const artistName = 'Artist Name'
    const defaultRoles = Buffer.from('["Singer", "Producer"]').toString(
      "base64"
    );
    const instruments = Buffer.from('["Piano"]').toString("base64");
    const groups = Buffer.from('["Group 1", "Group 2"]').toString("base64");
    const avatarImage = "image.jpg";

    // console.log(password, username, email, firstName, lastName)

    try {
      Auth.signUp({
        username,
        password,
        attributes: {
          email: email,
          given_name: firstName,
          family_name: lastName,
          "custom:artistName": artistName,
          "custom:instruments": instruments,
          "custom:defaultRoles": defaultRoles,
          "custom:groups": groups,
          "custom:avatarImage": avatarImage
        }
      })
        // Auth.currentSession().then(
        //   session=>{
        //     // this.props.auth.setAuthStatus(true)
        //     console.log("AmazonCognitoUser***** ", session)
        //     console.log("rightHolderId: ", session.idToken.payload.sub)
        //   }
        // )
        // this.props.history.push("/welcome")
        .then(
          toast.success(`${firstName}, your account is created, check email!`)
        )
        .then(
          setTimeout(function() {
            window.location.reload();
          }, 3000),
          this.props.history.push("/welcome")
        )
        .catch(err => {
          // toast.error(err.message)
          console.log(err);
        })
        .finally(() => {
          if (this.props.fn) {
            this.props.fn();
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  handlePasswordChange(e) {
    console.log("PASSWORD STRENGTH", this.state.strength);
    this.setState({
      password: e.target.value,
      strength: zxcvbn(e.target.value).score
    });
  }

  handleAddition = (e, { value }) => {
    this.setState(prevState => ({
      groups: [{ text: value, value }, ...prevState.groups]
    }));
  };

  handleChange = (e, { value }) => this.setState({ currentValue: value });

  handleRoleChange = (e, { value }) => this.setState({ defaultRoles: value });

  roleChange = (e, { value }) => this.setState({ currentRoleValue: value });

  // stateChanged = e => {

  //   // update the internal state using the updated state from the form field

  //   console.log("Target Value", e.target.value)
  //   console.log("PPPPPPPPP", this.state.password)

  //   this.setState({
  //     password: e.target.value,
  //     strength: zxcvbn(e.target.value).score
  //   }, () => this.props.onStateChanged(e));

  // };

  handleConfirmPasswordChange(e) {
    this.setState({ confirmpassword: e.target.value });
    // const value = e.target.value;
    // this.setState(({ dirty = false }) => ({ value, dirty: !dirty || dirty }), () => this.validateConfirmPassword(this.state));
  }

  toggleShow() {
    this.setState({ hidden: !this.state.hidden });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.password !== nextProps.password) {
      this.setState({ password: nextProps.password });
    }
  }

  toggleConfirmShow() {
    this.setState({ confirmhidden: !this.state.confirmhidden });
  }

  componentDidMount() {
    let groups = [];
    axios
      .get("http://dev.api.smartsplit.org:8080/v1/rightHolders")
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
    if (this.props.password) {
      this.setState({ password: this.props.password });
    }
    if (this.props.confirmpassword) {
      this.setState({ confirmpassword: this.props.confirmpassword });
    }
  }

  //   handleSubmit = values => {
  //     try {
  //       this.setState({ patience: true }, () => {
  //         Auth.signIn(values.username, values.password)
  //           .then(user => {
  //             toast.success(`#${user.username} !`);

  //             if (this.props.fn) {
  //               this.props.fn();
  //             }
  //           })
  //           .catch(err => {
  //             toast.error(err.message);
  //           })
  //           .finally(() => {
  //             this.setState({ patience: false });
  //           });
  //       });
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  render() {
    const {
      type,
      validator,
      onStateChanged,
      children,
      ...restProps
    } = this.props;
    const { password, strength, currentValue, currentRoleValue } = this.state;

    const { firstName, lastName, username } = this.state;

    const passwordLength = password.length;
    const passwordStrong = strength >= this.minStrength;
    const passwordLong = passwordLength > this.thresholdLength;

    // const errors = 7;
    // const hasErrors = this.passwordmatch;
    // password strength meter is only visible when password is not empty
    const strengthClass = [
      "strength-meter mt-2",
      passwordLength > 0 ? "visible" : "invisible"
    ]
      .join(" ")
      .trim();
    // confirm password field is only visible when password is not empty
    const confirmClass = [
      "confirmPassword",
      strength >= 2 ? "visible" : "invisible"
    ]
      .join(" ")
      .trim();
    // const controlClass = ['form-control', this.passwordmatch ? dirty ? 'is-valid' : 'is-invalid' : ''].join(' ').trim();
    const controlClass = [
      "form-control",
      this.passwordmatch ? "is-valid" : "is-invalid"
    ]
      .join(" ")
      .trim();

    return (
      <Formik
        initialValues={{
          // email: this.state.email,
          username: this.state.username,
          // firstName: this.state.firstName,
          // lastName: this.state.lastName,
          // artistName: this.state.artistName,
          password: this.state.password,
          hidden: true,
          confirmpassword: this.state.confirmpassword,
          strength: this.state.strength
        }}
        onSubmit={(values, { setSubmitting }) => {
          this.handleSubmit(values, () => {
            setSubmitting(false);
            // this.openModal();
          });
        }}
      >
        {({ errors, touched, isValidating }) => (
          <Translation>
            {(t, i18n) => (
              <Form>
                {!this.state.patience && (
                  <div>
                    <span className="top-login">
                      <div
                        onClick={() => {
                          // Le paramètre de la fonction afficher est le TYPE_ dans le fichier Connexion.js
                          this.props.parent.afficher(0);
                        }}
                        style={{ color: "#2DA84F", cursor: "pointer" }}
                      >
                        {t("entete.connexion")}
                      </div>
                    </span>
                    <div className="container">
                      <header id="registerHeader">
                        {i18n.lng && i18n.lng.substring(0, 2) === "en" && (
                          <div>
                            <div className="registerHead">
                              <h1>
                                On your way to <br />
                                Professionalization.
                              </h1>
                              <br />
                              <br />
                            </div>
                            <div className="registerPrompt">
                              <h3>
                                You're one click away to documenting your music
                                and share your <br />
                                rights with your contributors.
                              </h3>
                            </div>
                          </div>
                        )}
                        {i18n.lng && i18n.lng.substring(0, 2) !== "en" && (
                          <div>
                            <div className="lregisterHeade">
                              <h1>
                                En route vers la <br /> professionalisation.
                              </h1>
                              <br />
                              <br />
                            </div>
                            <div className="registerPrompt">
                              <h3>
                                Tu es à un clic de pouvoir documenter ta musique
                                et de partager <br />
                                tes droits avec tes collabos.
                              </h3>
                            </div>
                          </div>
                        )}
                      </header>
                      {/*<hr className="hrLogin" />*/}
                      <hr
                        className="hrLogin"
                        data-content={t("flot.split.inscription.ou")}
                      />
                      <section className="section auth">
                        <div className="container">
                          <img
                            type="image"
                            className="avatarImage"
                            src="https://smartsplit-images.s3.us-east-2.amazonaws.com/faceapp.jpg"
                          />
                          {/* <input type="file" className="fileUpload" onChange={this.handleFileUpload}/> */}
                          <br></br>
                          <br></br>
                          <label>
                            {t("collaborateur.attribut.etiquette.prenom")}
                          </label>
                          <input
                            type="text"
                            className="firstName"
                            placeholder={t(
                              "collaborateur.attribut.etiquette.prenom"
                            )}
                            value={this.state.firstName}
                            onChange={e =>
                              this.setState({ firstName: e.target.value })
                            }
                          />
                          <label>
                            {t("collaborateur.attribut.etiquette.nom")}
                          </label>
                          <input
                            type="text"
                            className="lastName"
                            placeholder={t(
                              "collaborateur.attribut.etiquette.nom"
                            )}
                            value={this.state.lastName}
                            onChange={e =>
                              this.setState({ lastName: e.target.value })
                            }
                          />
                          <label>
                            {t("collaborateur.attribut.etiquette.artiste")}
                          </label>
                          <label id="Optionel">
                            {t("collaborateur.attribut.etiquette.option")}
                          </label>
                          <input
                            type="text"
                            className="artistName"
                            placeholder={t(
                              "collaborateur.attribut.etiquette.artiste"
                            )}
                            value={this.state.artistName}
                            onChange={e =>
                              this.setState({ artistName: e.target.value })
                            }
                          />
                          <div className="sous titre">
                            {t("collaborateur.attribut.etiquette.na")}
                          </div>
                          <label>
                            {t("collaborateur.attribut.etiquette.groupe")}
                          </label>
                          <Dropdown
                            id="prompt"
                            type="text"
                            options={this.state.groups}
                            placeholder={t(
                              "collaborateur.attribut.indication.groupe"
                            )}
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
                          <label>
                            {t("collaborateur.attribut.etiquette.role")}
                          </label>
                          <Dropdown
                            id="roles"
                            type="text"
                            options={this.state.roles}
                            placeholder={t(
                              "collaborateur.attribut.indication.role"
                            )}
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
                          <br></br>

                          <div className="field">
                            <div className="control">
                              <label htmlFor="username">
                                {t("flot.split.inscription.courriel")}
                              </label>
                              <Field
                                validate={val => {
                                  this.validateUsername(val);
                                }}
                                name="username"
                                id="username"
                                aria-describedby="userNameHelp"
                                placeholder={t(
                                  "flot.split.inscription.exemple"
                                )}
                                value={this.state.username}
                                required={true}
                              />
                              {errors.username && touched.username && (
                                <div style={{ color: "red" }}>
                                  {t("flot.split.inscription.email-invalide")}{" "}
                                </div>
                              )}
                            </div>
                          </div>
                          <span>
                            <div className="field">
                              <div className="control has-icons-left">
                                <label htmlFor="password">
                                  {t("inscription.motdepasse")}
                                </label>

                                <div className="input-wrapper">
                                  <Field
                                    /*validate={ (val) => {
                                    this.validatePassword(val)
                                } }*/

                                    validate={val => {
                                      this.validatePasswordStrong(val);
                                    }}
                                    type={
                                      this.state.hidden ? "password" : "text"
                                    }
                                    id="password"
                                    name="password"
                                    placeholder={t("inscription.password")}
                                    value={this.state.password}
                                    onChange={this.handlePasswordChange}
                                    /*onChange={this.stateChanged}*/
                                    required={true}
                                    // required={...restProps}
                                  />

                                  <button
                                    id="hide"
                                    onClick={e => {
                                      e.preventDefault();
                                      this.toggleShow();
                                    }}
                                  >
                                    <Eye actif={this.state.hidden} />
                                  </button>
                                </div>

                                {errors.password && touched.password && (
                                  <div style={{ color: "red" }}>
                                    {" "}
                                    {t("inscription.password-invalide")}{" "}
                                  </div>
                                )}
                                <span className="icon is-small is-left">
                                  <i className="fas fa-lock" />
                                </span>
                              </div>
                            </div>
                          </span>
                          <div className={strengthClass}>
                            <div
                              className="strength-meter-fill"
                              data-strength={strength}
                            />
                          </div>
                          <div className={confirmClass}>
                            <div className="control has-icons-left confirmPassword">
                              <div className="input-wrapper">
                                <Field
                                  validate={val => {
                                    this.validateConfirmPassword(val);
                                  }}
                                  type={
                                    this.state.confirmhidden
                                      ? "password"
                                      : "text"
                                  }
                                  id="confirmpassword"
                                  name="confirmpassword"
                                  placeholder="Confirm password"
                                  value={this.state.confirmpassword}
                                  onChange={this.handleConfirmPasswordChange}
                                  required={true}
                                  className={controlClass}
                                />
                                <button
                                  id="hide-confirm"
                                  onClick={e => {
                                    e.preventDefault();
                                    this.toggleConfirmShow();
                                  }}
                                >
                                  <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M9.9 4.24002C10.5883 4.0789 11.2931 3.99836 12 4.00003C19 4.00003 23 12 23 12C22.393 13.1356 21.6691 14.2048 20.84 15.19M14.12 14.12C13.8454 14.4148 13.5141 14.6512 13.1462 14.8151C12.7782 14.9791 12.3809 15.0673 11.9781 15.0744C11.5753 15.0815 11.1752 15.0074 10.8016 14.8565C10.4281 14.7056 10.0887 14.4811 9.80385 14.1962C9.51897 13.9113 9.29439 13.572 9.14351 13.1984C8.99262 12.8249 8.91853 12.4247 8.92563 12.0219C8.93274 11.6191 9.02091 11.2219 9.18488 10.8539C9.34884 10.4859 9.58525 10.1547 9.88 9.88003M17.94 17.94C16.2306 19.243 14.1491 19.9649 12 20C5 20 1 12 1 12C2.24389 9.68192 3.96914 7.65663 6.06 6.06003L17.94 17.94Z"
                                      stroke="#8DA0B3"
                                      stroke-width="2"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                    <path
                                      d="M1 1L23 23"
                                      stroke="#8DA0B3"
                                      stroke-width="2"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                  </svg>
                                </button>
                              </div>
                              {errors.confirmpassword &&
                                touched.confirmpassword && (
                                  <div style={{ color: "red" }}>
                                    {" "}
                                    {t("inscription.correspond")}
                                  </div>
                                )}
                              <span className="icon is-small is-left">
                                <i className="fas fa-lock" />
                              </span>
                            </div>
                            <div className="d-flex flex-row justify-content-between align-items-center px-3 mb-5">
                              <div className="container">
                                <p className="control">
                                  <div>
                                    <button
                                      className="ui medium button register is-success"
                                      type="submit"
                                      onClick={this.closeModal}
                                    >
                                      {t("entete.inscription")}
                                    </button>
                                  </div>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>
                    </div>
                  </div>
                )}
              </Form>
            )}
          </Translation>
        )}
      </Formik>
    );
  }
}

export default Register;
