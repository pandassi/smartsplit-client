import React, {Component} from 'react'

import MenuProfil from './menu-profil'
import BoutonConnexion from './bouton-connexion'

import { Translation } from 'react-i18next'

export default class Entete extends Component {

    constructor(props) {
        super(props)
        this.state = {
            navigation: props.navigation,
            contenu: props.contenu,
            profil: props.profil
        }
    }

    render() {

        let nav = this.props.navigation && (<i style={{margin: "7px"}} className="arrow left icon big grey cliquable" onClick={()=>{window.location.href = `${this.state.navigation}`}}></i>)

        return (
            <Translation>
                {
                    t=>
                        <div className="ui three column grid">
                            <div className="ui row">
                                <div className="ui one wide column">
                                    {nav}
                                </div>                                
                                {this.state.contenu}
                                <div className="ui three wide column" style={{textAlign: "right"}}>
                                    {this.state.profil && <MenuProfil user={this.state.profil} />}
                                    {!this.state.profil && <BoutonConnexion />}
                                </div>                                
                            </div>
                        </div>
                }
            </Translation>
        )
    }

}