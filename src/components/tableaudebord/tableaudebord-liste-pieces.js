import React, { Component } from "react";
import { Translation } from "react-i18next";
import axios from "axios";
import { Auth } from "aws-amplify";
import LigneMedia from "./tableaudebord-ligne-media";
import { Modal } from "semantic-ui-react";
import NouvelleOeuvre from "./tableaudebord-nouvelle-oeuvre";
import AudioLecture from "../oeuvre/audio-lecture";
import Yeux from "../../assets/images/yeux.png";

const PANNEAU_INITIATEUR = 1,
      PANNEAU_COLLABORATEUR = 0;

export default class ListePieces extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pochette: props.pochette,
      medias: [],
      collabMedias: [],
      creatorMedias: [],
      panneau: PANNEAU_INITIATEUR,
      collecte: {
        medias: false,
        collab: false
      },
      user: props.user
    };
    this.modaleNouvelleOeuvre = this.modaleNouvelleOeuvre.bind(this);
  }

  afficherPanneauInitiateur() {
    this.setState({ panneau: PANNEAU_INITIATEUR });
  }

  afficherPanneauCollaborateur() {
    this.setState({ panneau: PANNEAU_COLLABORATEUR });
  }

  collecte(obj) {
    let collecte = this.state.collecte;
    if (obj.medias) {
      collecte.medias = true;
    }
    if (obj.collab) {
      collecte.collab = true;
    }
    this.setState({ collecte: collecte }, () => {
      let _collecte = this.state.collecte;
      if (_collecte.medias && _collecte.collab) {
        this.setState({ patience: false });
      }
    });
  }

  componentWillMount() {
    try {
      this.setState({
        collecte: {
          medias: false,
          collabs: false
        }
      });
      this.setState({ patience: true }, () => {
        Auth.currentSession().then(session => {
          let USER_ID = session.idToken.payload.sub;

          axios
            .get(`http://api.smartsplit.org:8080/v1/rightholders`)
            .then(res => {
              let _rHParID = {};
              res.data.forEach(e => {
                e.name = `${e.firstName} ${e.lastName} (${e.artistName})`;
                _rHParID[e.rightHolderId] = e;
              });
              this.setState({ rightHolders: _rHParID });
            })
            .catch(err => {
              console.log(err)
            })

          axios
            .get(`http://api.smartsplit.org:8080/v1/media/liste-createur/${USER_ID}`)
            .then(res => {
              // Associe la liste des médias créés ou les médias pour lesquels une proposition est créée,
              // dans les deux cas, par l'usager.
              this.setState({ creatorMedias: res.data }, ()=>this.setState({ patience: false }))
            })
            .catch(err => console.log(err))

          axios
            .get(`http://api.smartsplit.org:8080/v1/media/liste-collaborations/${USER_ID}`)
            .then(res => {
              // Associe la liste des médias créés ou les médias pour lesquels une proposition est créée,
              // dans les deux cas, par l'usager.
              this.setState({ collabMedias: res.data }, ()=>this.setState({ patience: false }))
            })
            .catch(err => console.log(err))
        })
      })
    } catch (err) {
      console.log(err)
    }
  }

  modaleNouvelleOeuvre(ouvert = true) {
    this.setState({ modaleOeuvre: ouvert })
  }

  render() {
    let pochette = this.state.pochette ? "pochette" : "";

    let rendu;
    let that = this;

    function aucuneOeuvre() {
      return (
        <Translation>
          {t => (
            <div style={{ marginTop: "20px" }} className="ui three column grid">
              <br />
              <br />
              <br />
              <div className="illustration" style={{ textAlign: "center" }}>
                <div>
                  <img
                    style={{ fontSize: "3rem" }}
                    aria-label=""
                    className={"yeux"}
                    src={Yeux}
                    alt={"Yeux"}
                  />

                  <br />
                  <div className="medium-500-nomargin">
                    {t("flot.split.tableaudebord.vide.preambule")}
                  </div>
                  <div
                    className="medium-500-nomargin"
                    style={{ fontWeight: "100" }}
                  >
                    {t("flot.split.tableaudebord.vide.indication")} <br />
                    <div
                      className="cliquable"
                      style={{ color: "#0645AD" }}
                      onClick={e => {
                        //Cliquable = pointeur lien, classe écrite Vincent
                        that.modaleNouvelleOeuvre();
                      }}
                    >
                      {t("flot.split.tableaudebord.vide.indication-lien")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Translation>
      );
    }

    let souligneInitiateur, souligneCollaborateur;
    souligneInitiateur = this.state.panneau === PANNEAU_INITIATEUR;
    souligneCollaborateur = this.state.panneau === PANNEAU_COLLABORATEUR;

    let toggle = !this.state.pochette && (
      <Translation>
        {t => (
          <div style={{display: "inline"}}>
            <div style={{paddingBottom: "20px", display: "inline"}} className={`small-500${
                  souligneInitiateur ? "-color souligne" : " secondaire"
                } ${souligneInitiateur && pochette ? "pochette" : ""}`}>
              <span
                className={`cliquable`}
                onClick={() => {
                  this.afficherPanneauInitiateur()
                }}
                style={{ fontSize: "16px", color: souligneInitiateur ? "black" : "" }}
              >
                {t("flot.split.tableaudebord.pieces.0")}
              </span>
            </div>
            <div style={{paddingBottom: "20px", marginLeft: "40px", display: "inline"}} className={`small-500${
                  souligneCollaborateur ? "-color souligne" : " secondaire"
                } ${souligneCollaborateur && pochette ? "pochette" : ""}`}>
              <span
                className={`cliquable`}
                onClick={() => {
                  this.afficherPanneauCollaborateur()
                }}
                style={{ fontSize: "16px", color: souligneCollaborateur ? "black" : "" }}
              >
                {t("flot.split.tableaudebord.pieces.1")}
              </span>
            </div>
          </div>
        )}
      </Translation>
    );

    if (
      (!this.state.patience &&
        this.state.medias.length + this.state.creatorMedias.length === 0 &&
        this.state.panneau === PANNEAU_INITIATEUR) ||
      (!this.state.patience &&
        this.state.collabMedias.length === 0 &&
        this.state.panneau === PANNEAU_COLLABORATEUR)
    ) {
      // If no initiator musical pieces present for user
      rendu = aucuneOeuvre();
    } else {
      let tableauMedias = [];
      let _medias = {};
      if (
        this.state.medias.length + this.state.creatorMedias.length > 0 &&
        this.state.panneau === PANNEAU_INITIATEUR
      ) {
        tableauMedias = this.state.medias.map((elem, _idx) => {
          _medias[elem.mediaId] = elem;
          return (
            <LigneMedia
              pochette={this.state.pochette}
              key={elem.mediaId}
              media={elem}
              user={this.state.user}
              rightHolders={this.state.rightHolders}
            />
          );
        });
        tableauMedias = tableauMedias.concat(
          this.state.creatorMedias.map((elem, _idx) => {
            if (elem && elem.mediaId && !_medias[elem.mediaId]) {
              return (
                <LigneMedia
                  pochette={this.state.pochette}
                  key={`${elem.mediaId}_${_idx}`}
                  media={elem}
                  user={this.state.user}
                  rightHolders={this.state.rightHolders}
                />
              );
            } else {
              return null;
            }
          })
        );
      }
      if (
        this.state.collabMedias.length > 0 &&
        this.state.panneau === PANNEAU_COLLABORATEUR
      ) {
        tableauMedias = this.state.collabMedias.map((elem, _idx) => {
          return (
            elem !== undefined && (
              <LigneMedia
                pochette={this.state.pochette}
                key={`${elem.mediaId}_${elem._idx}`}
                media={elem}
                user={this.state.user}
                rightHolders={this.state.rightHolders}
              />
            )
          );
        });
      }
      rendu = <div style={{paddingLeft: "40px"}}>{tableauMedias}</div>;
    }

    return (
      <Translation>
        {t => (
          <div>
            {!this.state.patience && (
              <div>
                <div className="ui grid">
                  <div className="ui row">
                    <div className="heading2 fifteen wide column" style={{paddingLeft: "0rem", marginRight: "60px"}}>
                      {t("flot.split.tableaudebord.navigation.0")}
                      <div
                        className={`ui three wide column medium button ${pochette}`}
                        onClick={() => {
                          this.modaleNouvelleOeuvre();
                        }}
                        style={{
                          float: "right"
                        }}
                      >
                        {t("flot.split.tableaudebord.pieces.ajouter")}
                      </div>
                    </div>
                  </div>
                  <div className="ui row">
                    <div className="fifteen wide column">
                      <div className="medium-500" style={{marginLeft: "25px", borderBottom: "0.5px solid lightgrey", paddingBottom: "20px", marginBottom: "50px"}}>{toggle}</div>
                      {rendu}
                    </div>
                  </div>
                </div>
                <Modal
                  open={this.state.modaleOeuvre}
                  onClose={() => {
                    this.modaleNouvelleOeuvre(false);
                    if (this.state.audio) this.state.audio.stop();
                  }}
                  size="large"
                  closeIcon
                  closeOnDimmerClick={false}
                >
                  <Modal.Header>{t("flot.split.titre.creer")}</Modal.Header>
                  <Modal.Content>
                    <NouvelleOeuvre
                      pochette={this.state.pochette}
                      audio={this.state.audio}
                      parent={this}
                      user={this.state.user}
                    />
                  </Modal.Content>
                  <Modal.Actions>
                    <>
                      {this.state.mediaId && (
                        <AudioLecture
                          onRef={audio => {
                            this.setState({ audio: audio });
                          }}
                        />
                      )}
                    </>
                  </Modal.Actions>
                </Modal>
              </div>
            )}
            {this.state.patience && (
              <div className="ui active dimmer">
                <div className="ui text loader">{t("entete.encours")}</div>
              </div>
            )}
          </div>
        )}
      </Translation>
    );
  }
}
