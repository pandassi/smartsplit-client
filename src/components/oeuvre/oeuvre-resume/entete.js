import React from "react";
import placeholder from "../../../assets/images/placeholder.png";
import "../../../assets/scss/oeuvre-resume/entete.scss";

import editIcon from "../../../assets/svg/icons/edit.svg";
import { Translation } from "react-i18next";
import moment from "moment";
import axios from "axios"

export default class Entete extends React.Component {
  
  constructor(props){
    super(props)
    this.state = {
      media: props.media,
      acces: props.acces
    }
    this.avatars = []
    let _avatars = {}
    this.state.media.rightHolders.forEach(r=>{
      
      if(!this.avatars[r.id]) {        
        let nom, prenom, nomArtiste, avatar, uuid
        if(props.rightHolders[r.id]) {        
          uuid = props.rightHolders[r.id].rightHolderId   
          nom = props.rightHolders[r.id].lastName
          prenom = props.rightHolders[r.id].firstName
          nomArtiste = props.rightHolders[r.id].artistName
          avatar = `https://smartsplit-images.s3.us-east-2.amazonaws.com/${props.rightHolders[r.id].avatarImage}`
        } else {
          uuid = " "
          nom = " "
          prenom = " "
          nomArtiste = " "
          avatar = `https://smartsplit-images.s3.us-east-2.amazonaws.com/image.jpg`
        }
        _avatars[r.id] = {nom, prenom, nomArtiste, avatar, uuid}
      }
     
    })

    Object.keys(_avatars).forEach(a=>this.avatars.push(_avatars[a]))
  }  

  renderAvatars() {

    const maxDisplayedAvatars = 5;
    const displayedAvatars = Math.min(maxDisplayedAvatars, this.avatars.length);
    const undisplayedAvatars = this.avatars.length - displayedAvatars;   

    let _avatars = this.avatars
      .slice(0, maxDisplayedAvatars)
      .map((avatar, index) => {
        const zIndex = displayedAvatars + 2 - index;
        return (
          <div key={`avatar_${index}`} className={"avatar"} style={{ zIndex }}>
            <img src={avatar.avatar} alt={`${avatar.prenom} ${avatar.nom} ${avatar.nomArtiste ? `(${avatar.nomArtiste})` : ""}`} title={`${avatar.prenom} ${avatar.nom} ${avatar.nomArtiste ? `(${avatar.nomArtiste})` : ""}`} />
          </div>
        );
      })      

      if(this.avatars.length >= maxDisplayedAvatars) {

        let autres = ""
        this.avatars.slice(maxDisplayedAvatars, this.avatars.length).forEach(e=>{
          autres = autres + `${e.prenom} ${e.nom} ${e.nomArtiste ? `(${e.nomArtiste})` : ""}\n`
        })

        _avatars = _avatars.concat([
          <div key={`more-tag-avatar`} className={"more-tag"}  title={autres} >+{undisplayedAvatars}
          </div>
        ])
      }

      return _avatars

  }

  getMedia() {
    axios.get(`http://api.smartsplit.org:8080/v1/media/${this.state.media.mediaId}`)
    .then(res => {
        let media = res.data.Item
        this.setState({ media: media })
    })
  }

  majTitre() {
    let titre = document.getElementById('titre').value
    axios.patch(`http://api.smartsplit.org:8080/v1/media/${this.state.media.mediaId}/title`, {
        mediaId: this.state.media.mediaId,
        title: titre
    })
    .then(() => {
        this.getMedia()
    })
  }

  editerTitre(edition) {
      this.setState({ editerTitre: edition })
  }

  render() {

    this.ROLE_GRAPHISTE = "45745c60-7b1a-11e8-9c9c-2d42b21b1a43"
    this.graphistes = []
    
    let illustrateurs

    if(this.state.media) {      
      let parts  = this.state.media.rightHolders
      parts.forEach(_ad=>{
        let rhId = _ad.id
        _ad.roles.forEach(_r=>{
          switch(_r) {          
            case this.ROLE_GRAPHISTE:
              this.graphistes.push(this.props.rightHolders[rhId])
              break
            default:
          }
        })
      })

      illustrateurs = this.graphistes.map((r, idx)=>{
        if(r && idx < this.graphistes.length - 1) {
            return <span key={`graphistes_${r.rightHolderId}`}>{r.artistName}, </span>
          } else {
            return <span key={`graphistes_${r.rightHolderId}`}>{r.artistName}</span>
          }
      })

    }

    let imageSrc = placeholder

    if(this.state.media.files && this.state.media.files.cover && this.state.media.files.cover.files && this.state.media.files.cover.files.length > 0) {
      this.state.media.files.cover.files.forEach(e=>{
        if(e.access === 'public') {
          imageSrc = `https://smartsplit-artist-storage.s3.us-east-2.amazonaws.com/${this.state.media.mediaId}/cover/${e.file}`
        }
      })      
    }

    return (
      <Translation>
        {(t, i18n) => (
          <header className="entete">
            <div className={"ui container flex"}>
              <div className="other-info">
                <img
                  className={"song-image"}
                  src={imageSrc}
                  width="144"
                  heigth="144"
                  alt={this.state.media.title}
                />
                <br/>
                {
                  illustrateurs.length > 0 && (
                    <>{t('oeuvre.par')}{" "}{illustrateurs}</>
                  )
                }                
              </div>              

              <div className={"song-info"}>                

                {
                  this.state.editerTitre &&
                  (
                    <div className="ui input">
                      <input
                          size="50"
                          id="titre"
                          type="text"
                          placeholder="Saisir un titre"
                          defaultValue={this.state.media.title}
                          onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                  this.majTitre()
                                  this.editerTitre(false)
                              }
                          }}
                      ></input>
                      <i
                          onClick={() => {
                              this.majTitre();
                              this.editerTitre(false)
                          }}
                          className="save alternate icon grey big"
                          style={{
                              cursor: "pointer",
                              paddingTop: "5px",
                              paddingLeft: "5px"
                          }}>
                      </i>
                    </div>
                  )
                }
                {
                  !this.state.editerTitre &&
                  (
                    <h1>{`${this.state.media.title}`}&nbsp;&nbsp;&nbsp;
                      {
                       this.props.edition && (
                        <img
                          src={editIcon}
                          alt="Éditer le titre"
                          onClick={() => {
                            this.editerTitre(true)
                          }}
                          className="pencil alternate icon grey"
                          style={{ cursor: "pointer" }}>
                        </img>
                       ) 
                      }                      
                    </h1>
                  )
                }

                <div className={"artist-line"}>
                  <div className={"left"}>
                    <span className={"tag"}>{t("oeuvre.piece")}</span>
                    {t("oeuvre.par")} <span>{this.state.media.artist}</span>{" "}
                  </div>

                  <div className={"right"}>
                    <div className={"avatars"}>{this.renderAvatars()}</div>
                  </div>
                </div>

                <div className={"header-divider"}></div>

                <div className={"other-info"}>
                  {t("oeuvre.creePar")} <span>{this.props.rightHolders[this.state.media.creator].artistName}</span> &middot; Mis
                  à jour {i18n.lng &&
                      moment(this.state.media.modificationDate ? this.state.media.modificationDate : this.state.media.creationDate)
                        .locale(i18n.lng.substring(0, 2))
                        .fromNow()}
                </div>
              </div>
            </div>
          </header>
        )}
      </Translation>
    );
  }
}
