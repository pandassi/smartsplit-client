import React, { Component } from 'react';
import { Dropdown } from "semantic-ui-react";
import { ItemSelectionne } from "./item-selectionne";
import plusCircleGreen from '../../assets/svg/icons/plus-circle-green.svg';
import plusCircleOrange from '../../assets/svg/icons/plus-circle-orange.svg';

export class ChampSelectionMultiple extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedValues: this.props.value || [],
            dropdownValue: null
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.selectedValues !== prevState.selectedValues) {
            this.props.onChange(this.state.selectedValues);
        }
    }

    plusCircle() {
        return this.props.pochette ? plusCircleOrange : plusCircleGreen;
    }

    additionLabelClasses() {
        const pochetteClass = this.props.pochette ? ' pochette' : '';
        return 'addition-label' + pochetteClass;
    }

    unselectedItems() {
        return this.props.items.filter(this.isUnselectedItem);
    }

    isUnselectedItem = item => !this.isSelectedItem(item);
    isSelectedItem = item => this.state.selectedValues.includes(item.value);

    renderInputLabel() {
        return this.props.label ?
            (<div className="input-label">
                { this.props.label }
            </div>) :
            (<></>);
    }

    renderInputDescription() {
        return this.props.description ?
            (<p className="input-description">
                { this.props.description }
            </p>) :
            (<></>);
    }

    renderSelectedItems() {
        return this.state.selectedValues.map(value => {
            return (
                <ItemSelectionne
                    key={ value }
                    nom={ value }
                    onClick={ (event) => {
                        this.unselectItem(event, value);
                    } }
                />
            );
        });
    }

    handleChange = (event, { value }) => {
        event.preventDefault();
        this.selectItem(value);
    };

    handleAddItem = (event, { value }) => {
        this.selectItem(value);
    };

    selectItem(itemValue) {
        const selectedValues = [...this.state.selectedValues];

        if (!selectedValues.includes(itemValue)) {
            selectedValues.push(itemValue);
        }

        this.setState({
            selectedValues: selectedValues,
            dropdownValue: null
        });
    }

    unselectItem(event, unselectedValue) {
        event.preventDefault();
        const selectedValues = this.state.selectedValues.filter(value => value !== unselectedValue);

        this.setState({
            selectedValues: selectedValues,
            dropdownValue: null
        });
    }


    render() {
        return (
            <div className="champ">
                <label>
                    { this.renderInputLabel() }
                    { this.renderInputDescription() }
                    { this.renderSelectedItems() }

                    <Dropdown
                        placeholder={ this.props.placeholder }
                        fluid
                        search
                        selection
                        selectOnBlur={ false }
                        selectOnNavigation={ false }
                        allowAdditions
                        additionLabel={ <span className={ this.additionLabelClasses() }><img src={ this.plusCircle() }/> Ajouter comme instrument:</span> }
                        value={ this.state.dropdownValue }
                        options={ this.unselectedItems() }
                        onChange={ this.handleChange }
                        onAddItem={ this.handleAddItem }
                    />
                </label>
            </div>
        );
    }
}
