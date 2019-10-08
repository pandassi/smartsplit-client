import React, { Component } from "react";
import { Translation } from "react-i18next";
import { Modal } from "semantic-ui-react";
import Login from "./Login";

function accueil() {
  window.location.assign("./Login.js");
}

class ChangePasswordVerification extends Component {
  render() {
    return (
      <React.Fragment>
        <Translation>
          {t => (
            <section className="section auth">
              <div className="container">
                <tbody
                  style={{ FontFamily: "IBM Plex Sans", fontSize: "16px" }}
                >
                  <tr>
                    <td>
                      <h2>
                        &nbsp;&nbsp;{t("flot.split.auth.passwordchanged.titre")}
                      </h2>

                      <p>{t("flot.split.auth.passwordchanged.indication")}</p>
                    </td>
                  </tr>
                </tbody>
                <div className="field">
                  <p className="control">
                    <Modal
                      trigger={
                        <button
                          className="ui medium  button login is-success"
                          onClick={() => (window.location.href = "/accueil")}
                          /*{this.handleOpen}*/
                        >
                          {t("entete.connexion")}
                        </button>
                      }
                      onClose={this.handleClose}
                      size="small"
                    >
                      <Modal.Content>
                        <Login />
                      </Modal.Content>
                    </Modal>
                  </p>
                </div>
              </div>
            </section>
          )}
        </Translation>
      </React.Fragment>
    );
  }
}

export default ChangePasswordVerification;
