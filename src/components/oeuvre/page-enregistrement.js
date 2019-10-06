import React from "react";
import { Translation } from "react-i18next";
import Page from "../page-assistant/page";
import RecordGreen from "../../assets/svg/icons/record-green.svg";
import RecordOrange from "../../assets/svg/icons/record-orange.svg";
import Colonne from "../page-assistant/colonne";
import Entete from "../page-assistant/entete";
import "../../assets/scss/assistant-form.scss";
import ChampSelectionMultipleAyantDroit from "../page-assistant/champ-selection-multiple-ayant-droit";
import RightHolderOptions from "../page-assistant/right-holder-options";
import ChampTexte from "../page-assistant/champ-texte";
import FormulaireDateSortie from "../page-assistant/formulaire-date-sortie";
import {
  addRightHolderIfMissing,
  getRightHolderIdsByRole,
  hasRoles,
  updateRole
} from "../page-assistant/right-holder-helpers";
import * as roles from "../../assets/listes/role-uuids.json";
import {SauvegardeAutomatiqueMedia} from "./SauvegardeAutomatique";

export default class PageEnregistrement extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      directors: getRightHolderIdsByRole(
        roles.director,
        props.values.rightHolders
      ),
      soundRecordists: getRightHolderIdsByRole(
        roles.soundRecordist,
        props.values.rightHolders
      ),
      mixEngineers: getRightHolderIdsByRole(
        roles.mixEngineer,
        props.values.rightHolders
      ),
      masterEngineers: getRightHolderIdsByRole(
        roles.masterEngineer,
        props.values.rightHolders
      ),
      producers: getRightHolderIdsByRole(
        roles.producer,
        props.values.rightHolders
      )
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.directors !== prevState.directors ||
      this.state.soundRecordists !== prevState.soundRecordists ||
      this.state.mixEngineers !== prevState.mixEngineers ||
      this.state.masterEngineers !== prevState.masterEngineers ||
      this.state.producers !== prevState.producers
    ) {
      const recordingRightHolderIds = this.state.directors
        .concat(this.state.soundRecordists)
        .concat(this.state.mixEngineers)
        .concat(this.state.masterEngineers)
        .concat(this.state.producers);

      const updatedRightHolders = recordingRightHolderIds
        .reduce(addRightHolderIfMissing, [...this.props.values.rightHolders])
        .map(this.getUpdatedRightHolder)
        .filter(hasRoles);

      this.props.setFieldValue("rightHolders", updatedRightHolders);
    }
  }

  getUpdatedRightHolder = rightHolder => {
    const rightHolderRoles = rightHolder.roles || [];
    const id = rightHolder.id || null;

    const directorRoles = updateRole(
      roles.director,
      this.state.directors,
      id,
      rightHolderRoles
    );
    const soundRecordistRoles = updateRole(
      roles.soundRecordist,
      this.state.soundRecordists,
      id,
      directorRoles
    );
    const mixEngineerRoles = updateRole(
      roles.mixEngineer,
      this.state.mixEngineers,
      id,
      soundRecordistRoles
    );
    const masterEngineerRoles = updateRole(
      roles.masterEngineer,
      this.state.masterEngineers,
      id,
      mixEngineerRoles
    );
    const newRoles = updateRole(
      roles.producer,
      this.state.producers,
      id,
      masterEngineerRoles
    );

    return Object.assign({}, rightHolder, { roles: newRoles });
  };

  rightHolderOptions() {
    return RightHolderOptions(this.props.rightHolders);
  }

  icon() {
    return this.props.pochette ? RecordOrange : RecordGreen;
  }

  render() {
    return (
      <Translation>
        {t => (
          <Page pochette={this.props.pochette}>
            <SauvegardeAutomatiqueMedia etat={true} values={this.props.values} interval={20000} />
            <Colonne>
              <Entete
                pochette={this.props.pochette}
                icon={this.icon()}
                label={t(
                  "flot.split.documente-ton-oeuvre.documenter.entete.enregistrement"
                )}
                question={t(
                  "flot.split.documente-ton-oeuvre.documenter.titre3"
                )}
                description={t(
                  "flot.split.documente-ton-oeuvre.documenter.titre3-description"
                )}
              />

              <h3 className="section-title">
                {t(
                  "flot.split.documente-ton-oeuvre.documenter.entete.enregistrement"
                )}
              </h3>

              <ChampSelectionMultipleAyantDroit
                pochette={this.props.pochette}
                items={this.rightHolderOptions()}
                label={t(
                  "flot.split.documente-ton-oeuvre.documenter.realisation"
                )}
                createLabel={t(
                  "flot.split.documente-ton-oeuvre.documenter.collabo"
                )}
                description={t(
                  "flot.split.documente-ton-oeuvre.documenter.realisation-description"
                )}
                placeholder={t(
                  "flot.split.documente-ton-oeuvre.documenter.realisation-placeholder"
                )}
                value={this.state.directors}
                onChange={ids => this.setState({ directors: ids })}
              />

              <ChampSelectionMultipleAyantDroit
                pochette={this.props.pochette}
                items={this.rightHolderOptions()}
                label={t("flot.split.documente-ton-oeuvre.documenter.son")}
                createLabel={t(
                  "flot.split.documente-ton-oeuvre.documenter.collabo"
                )}
                description={t(
                  "flot.split.documente-ton-oeuvre.documenter.son-description"
                )}
                placeholder={t(
                  "flot.split.documente-ton-oeuvre.documenter.son-placeholder"
                )}
                value={this.state.soundRecordists}
                onChange={ids => this.setState({ soundRecordists: ids })}
              />

              <ChampSelectionMultipleAyantDroit
                pochette={this.props.pochette}
                items={this.rightHolderOptions()}
                label={t("flot.split.documente-ton-oeuvre.documenter.mix")}
                createLabel={t(
                  "flot.split.documente-ton-oeuvre.documenter.collabo"
                )}
                description={t(
                  "flot.split.documente-ton-oeuvre.documenter.mix-description"
                )}
                placeholder={t(
                  "flot.split.documente-ton-oeuvre.documenter.mix-placeholder"
                )}
                value={this.state.mixEngineers}
                onChange={ids => this.setState({ mixEngineers: ids })}
              />

              <ChampSelectionMultipleAyantDroit
                pochette={this.props.pochette}
                items={this.rightHolderOptions()}
                label={t("flot.split.documente-ton-oeuvre.documenter.master")}
                createLabel={t(
                  "flot.split.documente-ton-oeuvre.documenter.collabo"
                )}
                description={t(
                  "flot.split.documente-ton-oeuvre.documenter.master-description"
                )}
                placeholder={t(
                  "flot.split.documente-ton-oeuvre.documenter.master-placeholder"
                )}
                value={this.state.masterEngineers}
                onChange={ids => this.setState({ masterEngineers: ids })}
              />

              <ChampTexte
                pochette={this.props.pochette}
                label={t("flot.split.documente-ton-oeuvre.documenter.studio")}
                description={t(
                  "flot.split.documente-ton-oeuvre.documenter.studio-description"
                )}
                placeholder={t(
                  "flot.split.documente-ton-oeuvre.documenter.studio-placeholder"
                )}
                value={this.props.values.studio}
                onChange={value => this.props.setFieldValue("studio", value)}
              />

              <ChampTexte
                pochette={this.props.pochette}
                placeholder={t(
                  "flot.split.documente-ton-oeuvre.documenter.studio-adresse"
                )}
                value={this.props.values.studioAddress}
                onChange={value =>
                  this.props.setFieldValue("studioAddress", value)
                }
              />

              <ChampSelectionMultipleAyantDroit
                pochette={this.props.pochette}
                items={this.rightHolderOptions()}
                label={t(
                  "flot.split.documente-ton-oeuvre.documenter.production"
                )}
                createLabel={t(
                  "flot.split.documente-ton-oeuvre.documenter.collabo"
                )}
                description={t(
                  "flot.split.documente-ton-oeuvre.documenter.production-description"
                )}
                placeholder={t(
                  "flot.split.documente-ton-oeuvre.documenter.production-placeholder"
                )}
                value={this.state.producers}
                onChange={ids => this.setState({ producers: ids })}
              />

              <ChampTexte
                label={t("flot.split.documente-ton-oeuvre.documenter.codeiswc")}
                description={t(
                  "flot.split.documente-ton-oeuvre.documenter.codeiswc-description"
                )}
                placeholder={t(
                  "flot.split.documente-ton-oeuvre.documenter.codeiswc-placeholder"
                )}
                value={this.props.values.isrc}
                placeholder={"XX-XXX-00-0000"}
                onChange={value => this.props.setFieldValue("isrc", value)}
              />

              <div className="section-divider"></div>

              <h3 className="section-title">
                {t("flot.split.documente-ton-oeuvre.documenter.entete.sortie")}
              </h3>

              <ChampTexte
                pochette={this.props.pochette}
                label={t(
                  "flot.split.documente-ton-oeuvre.documenter.etiquette"
                )}
                description={t(
                  "flot.split.documente-ton-oeuvre.documenter.etiquette-description"
                )}
                placeholder={t(
                  "flot.split.documente-ton-oeuvre.documenter.etiquette-placeholder"
                )}
                value={this.props.values.label}
                onChange={value => this.props.setFieldValue("label", value)}
              />

              <ChampTexte
                pochette={this.props.pochette}
                placeholder={t(
                  "flot.split.documente-ton-oeuvre.documenter.etiquette-adresse"
                )}
                value={this.props.values.labelAddress}
                onChange={value =>
                  this.props.setFieldValue("labelAddress", value)
                }
              />

              <ChampTexte
                pochette={this.props.pochette}
                label={t(
                  "flot.split.documente-ton-oeuvre.documenter.distribution"
                )}
                description={t(
                  "flot.split.documente-ton-oeuvre.documenter.distribution-description"
                )}
                placeholder={t(
                  "flot.split.documente-ton-oeuvre.documenter.distribution-placeholder"
                )}
                value={this.props.values.distributor}
                onChange={value =>
                  this.props.setFieldValue("distributor", value)
                }
              />

              <ChampTexte
                pochette={this.props.pochette}
                placeholder={t(
                  "flot.split.documente-ton-oeuvre.documenter.distribution-adresse"
                )}
                value={this.props.values.distributorAddress}
                onChange={value =>
                  this.props.setFieldValue("distributorAddress", value)
                }
              />

              <FormulaireDateSortie
                value={this.props.values.publishDate}
                onChange={value =>
                  this.props.setFieldValue("publishDate", value)
                }
              />

              <ChampTexte
                label={t("flot.split.documente-ton-oeuvre.documenter.codeupc")}
                description={t(
                  "flot.split.documente-ton-oeuvre.documenter.codeupc-description"
                )}
                placeholder={t(
                  "flot.split.documente-ton-oeuvre.documenter.codeupc-placeholder"
                )}
                value={this.props.values.upc}
                onChange={value => this.props.setFieldValue("upc", value)}
              />
            </Colonne>
          </Page>
        )}
      </Translation>
    );
  }
}
