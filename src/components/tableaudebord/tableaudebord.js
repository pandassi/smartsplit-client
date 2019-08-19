import React, {Component} from 'react'

// Composantes
import Navigation from './tableaudebord-navigation'
import Panneau from './tableaudebord-panneau'
import Entete from '../entete/entete'

// CSS
import './tableaudebord.css'
import 'react-confirm-alert/src/react-confirm-alert.css'
import { Auth } from 'aws-amplify'
import { toast } from 'react-toastify'

import Login from '../auth/Login'
import { confirmAlert } from 'react-confirm-alert'
import { Translation } from 'react-i18next';

export default class TableauDeBord extends Component {

    constructor(props) {
        super(props)
        this.state = {
            navigation: 0
        }
    }

    componentWillMount() {
        Auth.currentAuthenticatedUser()
        .then(res=>{
            this.setState({user: res})
        })
        .catch(err=>{
            toast.error(err.message)
            confirmAlert({
                title: `Connexion obligatoire`,
                message: `Tu dois être connecté pour accéder au tableau de bord`,
                closeOnClickOutside: false,
                style: {
                        position: "relative",
                        width: "640px",
                        height: "660px",
                        margin: "0 auto",
                        background: "#FFFFFF",
                        border: "1px solid rgba(0, 0, 0, 0.5)",
                        boxSizing: "border-box",
                        boxShadow: "inset 0px -1px 0px #DCDFE1"
                    },
                customUI: ({ onClose }) => 
                    <Translation>
                        {
                            (t) =>
                                <Login message={t('connexion.titre.tdb')} fn={(user)=>{
                                    this.setState({user: user}, ()=>{                                
                                        onClose()
                                        // Ré-exécute la vérification de la connexion
                                        Auth.currentAuthenticatedUser()
                                        .then(res=>{
                                            this.setState({user: res})
                                        })
                                        .catch(err=>{
                                            toast.error(err.message)
                                        })
                                    })
                                }} /
                        >}
                    </Translation>
            })
        })
    }

    render() {
        
        if(this.state.user) {
            let contenu = (<div className="ui eleven wide column"></div>)
            let entete = (<Entete contenu={contenu} profil={this.state.user} />)
            return (
                <div className="tdb--cadre ui row">
                    <Navigation parent={this} />
                    <Panneau entete={entete} selection={this.state.navigation} />
                </div>                
            )
        } else {
            return (
                <div className="tdb--cadre ui row accueil">
                </div>
            )
        }
        
    }

}