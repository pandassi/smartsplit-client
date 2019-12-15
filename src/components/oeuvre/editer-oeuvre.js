/**
 * Assistant de saisie de la description d'une oeuvre
 */
import React, { Component } from "react";
import { Wizard } from "semantic-ui-react-formik";
import axios from "axios";

import moment from "moment";

// Pages de l'assistant
import PageCreation from "./page-creation";
import PageInterpretation from "./page-interpretation";
import PageInformationsGenerales from "./page-informations-generales";
import PageParoles from "./page-paroles";
import PageLiens from "./page-liens";
import PageEnregistrement from "./page-enregistrement";
import PageFichiers from "./page-fichiers";
// Alertes
import { toast } from "react-toastify";
// Traduction
import { Translation } from "react-i18next";
import { Navbar } from "../navigation/navbar";

import { Auth } from "aws-amplify";

import ModaleConnexion from "../auth/Connexion";

// Modèle

class EditerOeuvre extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rightHolders: [],
      endModalOpen: false,
      modaleConnexion: false,
      mediaId: props.mediaId
    };
  }

  componentWillMount() {
    Auth.currentAuthenticatedUser()
      .then(response => {
        if (this.state.mediaId) {
          axios
            .get(
              `http://api.smartsplit.org:8080/v1/media/${this.state.mediaId}`
            )
            .then(res => {
              if (res.data.Item) {
                let media = res.data.Item;
                if (response.username === media.creator) {
                  this.setState({ media: media }, () =>
                    this.fetchApiRightHolders()
                  );
                  this.setState({ user: response });
                } else {
                  window.location.href = `/oeuvre/${media.mediaId}/resume`;
                }
              }
            });
        } else {
          this.setState({ user: response });
          this.fetchApiRightHolders();
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({ modaleConnexion: true });
      });
  }

  nouvelAyantDroit(rightHolders, fnSetValues, nouveau, role) {
    let _rHs = rightHolders;
    _rHs.push({ id: nouveau, roles: [role] });
    fnSetValues("rightHolders", _rHs);
    // recharger les ayant-droits
    this.fetchApiRightHolders();
  }

  fetchApiRightHolders() {
    axios
      .get("http://api.smartsplit.org:8080/v1/rightHolders")
      .then(response => {
        // Ordonnancement simple uuid -> nom d'artiste
        let assocUuidArtiste = {};
        response.data.forEach(e => {
          assocUuidArtiste[e.rightHolderId] =
            e.artistName || `${e.firstName} ${e.lastName}`;
        });
        this.setState({ assocUuidArtiste: assocUuidArtiste }, () =>
          this.setState({ rightHolders: response.data })
        );
      })
      .catch(error => {
        toast.error(error.message);
      });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.audio !== nextProps.audio) {
      this.setState({ audio: nextProps.audio });
    }
  }

  getInitialValues() {
    let _m = this.state.media;
    let valeurs = {};

    if (!_m) {
      valeurs = {
        mediaId: this.state.mediaId,
        title: "",
        album: "",
        artist: "",
        cover: "false",
        rightHolders: [],
        jurisdiction: "",
        lyrics: {
          text: "",
          languages: [],
          access: "private"
        },
        isrc: "",
        iswc: "",
        upc: "",
        msDuration: "",
        duration: "",
        bpm: "",
        influence: "",
        genre: "",
        secondaryGenres: [],
        socialMediaLinks: [],
        streamingServiceLinks: [],
        pressArticleLinks: [],
        playlistLinks: [],
        creationDate: "",
        modificationDate: "",
        publishDate: "",
        publisher: "",
        studio: "",
        studioAddress: "",
        label: "",
        labelAddress: "",
        distributor: "",
        distributorAddress: "",
        rightsSplit: {},
        files: {
          cover: {
            file: null,
            access: "private"
          },
          audio: {
            file: null,
            access: "private"
          },
          score: {
            file: null,
            access: "private"
          },
          midi: {
            file: null,
            access: "private"
          }
        }
      };
    } else {
      let lyrics = _m.lyrics;

      if (lyrics && lyrics.text) lyrics.text = lyrics.text.trim();

      valeurs = {
        mediaId: this.state.mediaId,
        title: _m.title ? _m.title.trim() : "",
        album: _m.album ? _m.album.trim() : "",
        artist: _m.artist ? _m.artist.trim() : "",
        cover: _m.cover ? _m.cover : false,
        rightHolders: _m.rightHolders ? _m.rightHolders : [],
        jurisdiction: _m.jurisdiction ? _m.jurisdiction.trim() : "",
        lyrics: lyrics,
        isrc: _m.isrc ? _m.isrc.trim() : "",
        iswc: _m.iswc ? _m.iswc.trim() : "",
        upc: _m.upc ? _m.upc.trim() : "",
        msDuration: _m.msDuration ? _m.msDuration.trim() : "",
        bpm: _m.bpm ? _m.bpm.trim() : "",
        influence: _m.influence ? _m.influence.trim() : "",
        genre: _m.genre ? _m.genre.trim() : "",
        secondaryGenres: _m.secondaryGenre || [],
        socialMediaLinks: _m.socialMediaLinks || [],
        streamingServiceLinks: _m.streamingServiceLinks || [],
        pressArticleLinks: _m.pressArticleLinks || [],
        playlistLinks: _m.playlistLinks || [],
        creationDate: _m.creationDate
          ? moment(_m.creationDate)
              .locale("en")
              .format("L")
          : moment()
              .locale("en")
              .format("L"),
        modificationDate: _m.modificationDate ? _m.modificationDate.trim() : "",
        publishDate: _m.publishDate ? _m.publishDate.trim() : "",
        publisher: _m.publisher ? _m.publisher.trim() : "",
        studio: _m.studio ? _m.studio.trim() : "",
        studioAddress: _m.studioAddress ? _m.studioAddress.trim() : "",
        label: _m.label ? _m.label.trim() : "",
        labelAddress: _m.labelAddress ? _m.labelAddress.trim() : "",
        distributor: _m.distributor ? _m.distributor.trim() : "",
        distributorAddress: _m.distributorAddress
          ? _m.distributorAddress.trim()
          : "",
        files: _m.files
      };
    }
    return valeurs;
  }

  onPageChanged = value => {
    const newProgressPercentage = this.pageProgressPercentages[value] || 100;

    this.setState({
      progressPercentage: newProgressPercentage
    });

    window.scrollTo(0, 0);
  };

  onSubmit = (values, actions, t) => {
    this.setState({
      endModalOpen: true
    });
    axios
      .post("http://api.smartsplit.org:8080/v1/media", values)
      .then(response => {
        actions.setSubmitting(false);
        window.location.href = `/oeuvre/${this.state.mediaId}/resume`;
      })
      .catch(error => {
        console.log(error);
      });
  };

  boutonsCouleurPochette() {
    let boutons = document.getElementsByClassName("ui right floated button");
    for (var i = 0; i < boutons.length; i++) {
      boutons[i].style.backgroundColor = "#F2724A";
    }
  }

  renduPage(i18n) {
    let page;
    switch (this.props.pageNo) {
      case "1":
        page = (
          <Wizard.Page>
            <PageCreation
              pochette={this.props.pochette}
              i18n={i18n}
              rightHolders={this.state.rightHolders}
              assocUuidArtiste={this.state.assocUuidArtiste}
              parent={this}
            />
          </Wizard.Page>
        );
        break;
      case "2":
        page = (
          <Wizard.Page>
            <PageInterpretation
              pochette={this.props.pochette}
              i18n={i18n}
              rightHolders={this.state.rightHolders}
              assocUuidArtiste={this.state.assocUuidArtiste}
              parent={this}
            />
          </Wizard.Page>
        );
        break;
      case "3":
        page = (
          <Wizard.Page>
            <PageEnregistrement
              pochette={this.props.pochette}
              i18n={i18n}
              rightHolders={this.state.rightHolders}
              assocUuidArtiste={this.state.assocUuidArtiste}
              parent={this}
            />
          </Wizard.Page>
        );
        break;
      case "4":
        page = (
          <Wizard.Page>
            <PageFichiers
              pochette={this.props.pochette}
              i18n={i18n}
              rightHolders={this.state.rightHolders}
              assocUuidArtiste={this.state.assocUuidArtiste}
              parent={this}
            />
          </Wizard.Page>
        );
        break;
      case "5":
        page = (
          <Wizard.Page>
            <PageInformationsGenerales
              pochette={this.props.pochette}
              i18n={i18n}
            />
          </Wizard.Page>
        );
        break;
      case "6":
        page = (
          <Wizard.Page>
            <PageParoles i18n={i18n} pochette={this.props.pochette} />
          </Wizard.Page>
        );
        break;
      case "7":
        page = (
          <Wizard.Page>
            <PageLiens pochette={this.props.pochette} />
          </Wizard.Page>
        );
        break;
      default:
        break;
    }
    return page;
  }

  render() {
    if (this.state.user && this.state.media) {
      return (
        <Translation>
          {(t, i18n) => (
            <>
              <Navbar
                songTitle={this.state.title}
                pochette={this.props.pochette}
                progressPercentage={this.state.progressPercentage}
                profil={this.state.user}
              />
              {this.state.rightHolders && this.props.pageNo && (
                <>
                  <Wizard
                    initialValues={this.getInitialValues()}
                    onPageChanged={this.onPageChanged}
                    onSubmit={this.onSubmit}
                    buttonLabels={{
                      previous: t("navigation.precedent"),
                      next: t("navigation.suivant"),
                      submit: t("navigation.envoi")
                    }}
                    debug={false}
                  >
                    {this.renduPage(i18n)}
                  </Wizard>
                </>
              )}
              {this.props.pochette &&
                document.getElementsByClassName("ui right floated button")
                  .length > 0 &&
                this.boutonsCouleurPochette()}
            </>
          )}
        </Translation>
      );
    } else {
      return (
        <ModaleConnexion parent={this} isOpen={this.state.modaleConnexion} />
      );
    }
  }
}

export default EditerOeuvre;
