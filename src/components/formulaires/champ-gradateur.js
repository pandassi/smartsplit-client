import React, { Component } from 'react'
import { Wizard } from 'semantic-ui-react-formik'
import { Form } from 'semantic-ui-react';

export default class ChampGradateurAssistant extends Component {

    constructor(props) {
        super(props)
        this.state = {
            etiquette: props.etiquette,
            pourcent: props.pourcent,
            modele: props.modele
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.etiquette !== nextProps.etiquette) {
            this.setState({etiquette: nextProps.etiquette})
        }
    }

    render() {
        return(
            <Wizard.Field
                name={this.state.modele}
                component={Form.Input}
                componentProps={{
                    label: this.state.etiquette,
                    value: `${this.state.pourcent}`,
                    min: 0,
                    max: 100,
                    step: 0.1,
                    type: "range"
                }}
            />
        )        
    }
}