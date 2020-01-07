import React from 'react';
import { Translation } from "react-i18next";
import { Navbar } from "./oeuvre-resume/navbar";
import Entete from "./oeuvre-resume/entete";
import Corps from "./oeuvre-resume/corps";
import axios from 'axios';
import { Auth } from 'aws-amplify';
import roles from '../../assets/listes/role-uuids'

const ACCES_SECRET = 2, ACCES_ADMIN = 3

export default class OeuvreResume extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            mediaId: props.mediaId,
            pochette: props.pochette,
            jeton: props.jeton
        }
    }

    componentWillMount() {        
        
        Auth.currentAuthenticatedUser()
        .then(res=>{
            this.setState({user: res})
        })
        .catch(err=>console.log(err))
        .finally(()=>{
            if(this.props.jeton) {
                axios.post(`http://api.smartsplit.org:8080/v1/media/decodeMedia`, {jeton: this.props.jeton})
                .then(res=>{                    
                    if(res.data.mediaId && res.data.acces) {
                        this.setState({acces: res.data.acces}, ()=>{
                            this.setState({mediaId: res.data.mediaId}, ()=>this.getMedia())
                        })                        
                    }
                })
                .catch(err=>console.log(err))
            } else {
                if(this.props.mediaId) {
                    this.getMedia()
                }                
            }
        })

    }

    getMedia() {
        axios.get(`http://api.smartsplit.org:8080/v1/media/${this.state.mediaId}`)
        .then(res=>{
            let _m = res.data.Item            
            this.setState({media: _m},
                ()=>{
                    axios.get('http://api.smartsplit.org:8080/v1/rightHolders')
                    .then(response => {
                        let _adParUuid = { }
                        response.data.forEach(e => {
                          _adParUuid[e.rightHolderId] = e
                        })
                        this.setState({ rightHolders: _adParUuid });
                    })
                    .catch(error => {                        
                    });
                })
        })
    }

    render() {
        if(this.state.media && this.state.rightHolders) {

            let membreEquipe = false
            if(this.state.user) {
                if(this.state.user.username === this.state.media.creator) {
                    membreEquipe = true
                } else {
                    let _rH = this.state.media.rightHolders
                    Object.keys(_rH).forEach(e=>{                    
                        if(_rH[e].id === this.state.user.username) {
                            membreEquipe = true
                        }
                    })
                }
            }

            if(this.state.acces === ACCES_ADMIN) {
                membreEquipe = true
            }

            return (
                <Translation>
                    {
                        (t) =>
                            <>
                                <Navbar membreEquipe={membreEquipe} acces={this.state.acces} media={this.state.media} profil={this.state.user} pochette={this.state.pochette} />
                                <Entete edition={ (this.state.user && this.state.user.username === this.state.media.creator) || this.state.acces === ACCES_ADMIN ? true : false} media={this.state.media} rightHolders={this.state.rightHolders} />
                                <Corps jeton={this.props.jeton} membreEquipe={membreEquipe} acces={this.state.acces} edition={ (this.state.user && this.state.user.username === this.state.media.creator) || this.state.acces === ACCES_ADMIN ? true : false} media={this.state.media} rightHolders={this.state.rightHolders} roles={roles} pochette={this.state.pochette} />
                            </>
                    }
                </Translation>
            )
        } else {
            return (<></>)
        }    
    }
}
