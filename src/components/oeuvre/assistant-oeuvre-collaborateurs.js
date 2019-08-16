/**
 * Saisie du collaborateur principal de l'oeuvre
 */

import React, { Component } from "react"
import { Translation } from 'react-i18next'

import { DateInput } from 'semantic-ui-calendar-react';

import '../../assets/scss/assistant-form.scss';

class PageAssistantOeuvreDescription extends Component {

    constructor(props) {
        super(props);

        const ROLES = require('../../assets/listes/roles.json');
        const INSTRUMENTS = require(`../../assets/listes/${ props.i18n.lng.substring(0, 2) }/instruments.json`).instruments;

        let _roles = ROLES;

        this.persons = [
            {
                key: 1,
                text: 'Gros Bidule',
                value: 1
            },
            {
                key: 2,
                text: 'Machin Chouette',
                value: 2
            },
            {
                key: 3,
                text: 'Souffler Danslecou',
                value: 3
            },
        ];

        // Charger la liste des instruments dans les rôles
        // Structure d'un élément d'option de liste Formik : [Clé|key;Texte|text;Valeur|value]
        INSTRUMENTS.forEach((elem) => {
            let id = `R${ ROLES.length + 1 }`
            _roles.push({
                key: id,
                text: elem.nom,
                value: id
            })
        })

        this.state = {
            pctProgression: props.pctProgression,
            roles: _roles,
            dateCreation: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.pctProgression !== nextProps.pctProgression) {
            this.setState({ pctProgression: nextProps.pctProgression })
        }
    }

    setDateCreation = (event, { value }) => {
        this.setState({ dateCreation: value });
    };

    render() {
        return (
            <Translation>
                {
                    (t) =>
                        <React.Fragment>
                            <div className="ui container assistant-container">
                                <div className="ui grid">
                                    <div
                                        className="ui sixteen wide mobile eight wide tablet eight wide computer column"
                                    >
                                        <h1 className="section-name">
                                            <span className="section-icon"></span>

                                            <span className="section-label">Création</span>
                                        </h1>

                                        <h2 className="question">
                                            Qui a participé à la création de { this.props.songTitle }
                                        </h2>

                                        <p className="section-description">
                                            C’est ici que tu indiques qui a contribué à la création de cette pièce.
                                        </p>

                                        <label for="date_creation">Date de création</label>
                                        <DateInput
                                            name="date"
                                            placeholder="Ajouter une date..."
                                            value={this.state.dateCreation}
                                            onChange={this.setDateCreation}
                                        />

                                        {/*<Dropdown
                                            placeholder='State'
                                            fluid
                                            multiple
                                            search
                                            selection
                                            options={this.persons}
                                        />*/ }
                                    </div>
                                </div>
                            </div>
                        </React.Fragment>
                }
            </Translation>
        )
    }
}

export default PageAssistantOeuvreDescription
