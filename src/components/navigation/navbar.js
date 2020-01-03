import React, { Component } from "react";
import "../../assets/scss/navbar.scss";
import placeholder from "../../assets/images/placeholder.png";
import { Trackbar } from "./trackbar";
import { Translation } from "react-i18next";
import MenuProfil from "../entete/menu-profil";

export class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profil: props.profil,
      media: props.media
    }    
  }  

  componentWillReceiveProps(nextProps) {
    if(this.props.media !== nextProps.media) {
      this.setState({media: nextProps.media})
    }
  }

  render() {

    let imageSrc = placeholder
    if(this.state.media) {
      let elem = this.state.media
      if(elem.files && elem.files.cover && elem.files.cover.files.length > 0) {
          elem.files.cover.files.forEach(e=>{
              if(e.access === 'public') {
                imageSrc = `https://smartsplit-artist-storage.s3.us-east-2.amazonaws.com/${elem.mediaId}/cover/${e.file}`
              }
          })
      }
    }    

    return (
      <Translation>
        {(t, i18n) => (
          <>
            <div className="fixed-top">
              <div
                className={
                  "smartsplit-navbar " + (this.props.pochette ? "pochette" : "")
                }
              >
                <div className="left">
                  <div className="song-image">
                    <img alt="oeuvre" src={imageSrc} style={{marginRight: "15px", verticalAlign: "middle"}}/> {this.state.media && this.state.media.title}
                  </div>

                  <div className="song-title">
                    <em>{this.props.songTitle}</em>
                  </div>

                  <div className="documentation-label">Documentation</div>
                </div>

                <div className="right">
                  <div className="ui row">
                    {this.state.profil && (
                      <MenuProfil pochette={this.props.pochette} user={this.state.profil} />
                    )}
                  </div>
                </div>
              </div>

              <Trackbar
                percentage={this.props.progressPercentage}
                pochette={this.props.pochette}
              />
            </div>
            <div className="espace"></div>
          </>
        )}
      </Translation>
    );
  }
}
