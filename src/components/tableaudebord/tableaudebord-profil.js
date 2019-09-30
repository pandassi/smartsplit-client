import React, { Component } from "react";
import { Translation } from "react-i18next";

export default class MonProfil extends Component {
  render() {
    return (
      <Translation>
        {t => (
          <div>
            <h1>{t("flot.split.tableaudebord.navigation.1")}</h1>
          </div>
        )}
      </Translation>
    );
  }
}
