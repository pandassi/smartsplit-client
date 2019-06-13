import React, { Component } from 'react'
import { Wizard } from 'semantic-ui-react-formik'
import { Form } from 'semantic-ui-react';

function required(value) {
    const result = value ? undefined : "Une sélection dans cette liste est obligatoire"
    return result
}

export class ChampListeAssistant extends Component {

    constructor(props) {
        super(props)
        this.state = {
            etiquette: props.etiquette,
            indication: props.indication,
            modele: props.modele,
            autoFocus: props.autoFocus,
            requis: props.requis,
            fluid: props.fluid,
            multiple: props.multiple,
            recherche: props.recherche,
            selection: props.selection,
            options: props.options
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.etiquette !== nextProps.etiquette) {
            this.setState({etiquette: nextProps.etiquette})
        }
        if (this.props.indication !== nextProps.indication) {
            this.setState({indication: nextProps.indication})
        }
        if (this.props.options !== nextProps.options) {
            this.setState({options: nextProps.options})
        }
        if (this.props.requis !== nextProps.requis) {
            this.setState({requis: nextProps.requis})
        }
    }

    render() {
        return(
            <Wizard.Field
                name={this.state.modele}
                component={Form.Dropdown}                
                componentProps={{
                    label: this.state.etiquette,
                    placeholder: this.state.indication,
                    required: this.state.requis,
                    autoFocus: this.state.autoFocus,
                    fluid: this.state.fluid,
                    multiple: this.state.multiple,
                    search: this.state.recherche,
                    selection: this.state.selection,
                    options: this.state.options
                }}
                validate={this.state.requis && required}
            />
        )        
    }

}