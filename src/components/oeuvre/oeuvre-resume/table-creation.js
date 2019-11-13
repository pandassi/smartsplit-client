import React from "react";
import TableGauche from "./table-gauche";
import moment from "moment";
import { Translation } from "react-i18next";
import { type } from "os";

export default class TableCreation extends React.Component {

  constructor(props) {
    super(props)
    this.rangees = this.rangees.bind(this)

    this.ROLE_AUTEUR = props.roles.songwriter
    this.ROLE_COMPOSITEUR = props.roles.composer
    this.ROLE_ARRANGEUR = props.roles.remixer
    this.ROLE_EDITEUR = props.roles.publisher

    this.auteurs = []
    this.compositeurs = []
    this.arrangeurs = []
    this.editeurs = []

    let parts  = props.media.rightHolders
    parts.forEach(_ad=>{
      let rhId = _ad.id
      _ad.roles.forEach(_r=>{
        switch(_r) {
          case this.ROLE_AUTEUR:
            this.auteurs.push(props.rightHolders[rhId])
            break
          case this.ROLE_COMPOSITEUR:
            this.compositeurs.push(props.rightHolders[rhId])
            break
          case this.ROLE_ARRANGEUR:
            this.arrangeurs.push(props.rightHolders[rhId])
            break
          case this.ROLE_EDITEUR:
            this.editeurs.push(props.rightHolders[rhId])
            break
          default:
        }
      })
    })

  }

  rangees(t, i18n) {

    return [
      {
        label: "Date de création",
        value: moment(this.props.media.creationDate).locale(i18n.lng.substring(0, 2)).format("LL")
      },      
      {
        label: "ISWC",
        helpIcon: true,
        value: this.props.media.iswc ? this.props.media.iswc.trim() : ""
      },
      {
        label: "Auteurs (paroles)",
        value: this.auteurs ? this.auteurs.map((a, idx)=>{
          if(a && idx < this.auteurs.length - 1) {
            return <span key={`auteurs_${a.rightHolderId}`}>{a.artistName}, </span>
          } else {
            return <span key={`auteurs_${a.rightHolderId}`}>{a.artistName}</span>
          }
        }) : []
      },
      {
        label: "Compositeurs (musique)",
        value: this.compositeurs.map((a, idx)=>{
          if(a && idx < this.compositeurs.length - 1) {
            return <span key={`compositeur_${a.rightHolderId}`}>{a.artistName}, </span>
          } else {
            return <span key={`compositeur_${a.rightHolderId}`}>{a.artistName}</span>
          }
        })
      },
      {
        label: "Arrangeurs (musique)",
        value: this.arrangeurs.map((a, idx)=>{
          if(a && idx < this.arrangeurs.length - 1) {
            return <span key={`arrangeurs_${a.rightHolderId}`}>{a.artistName}, </span>
          } else {
            return <span key={`arrangeurs_${a.rightHolderId}`}>{a.artistName}</span>
          }
        })
      },
      {
        label: "Éditeurs",
        value: this.editeurs.map((a, idx)=>{
          if(a && idx < this.editeurs.length - 1) {
            return <span key={`editeurs_${a.rightHolderId}`}>{a.artistName}, </span>
          } else {
            return <span key={`editeurs_${a.rightHolderId}`}>{a.artistName}</span>
          }
        })
      }
    ]
  }

  render() {
    return (
      <Translation>
        {
          (t, i18n) =>
            (<TableGauche title={"Création"} rows={this.rangees(t, i18n)} />)
        }
      </Translation>
    )
  }
}
