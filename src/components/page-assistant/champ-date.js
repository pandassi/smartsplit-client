import React, { Component } from 'react';
import { DateInput } from "semantic-ui-calendar-react";
import { Translation } from 'react-i18next';
import '../../assets/scss/page-assistant/champ.scss';
import TitreChamp from "./titre-champ";
import CalendarIcon from '../../assets/svg/icons/calendar.svg';

export default class ChampDate extends Component {
    render() {
        return (
            <Translation>
                {
                    (t, i18n) =>
                        <label className="champ">
                            <TitreChamp
                                label={ this.props.label }
                                description={ this.props.description }
                            />

                            <DateInput
                                localization={ String(i18n.lng).substr(0, 2) }
                                placeholder={ t('flot.documenter.date-placeholder') }
                                value={ this.props.value }
                                onChange={ (event, { value }) => this.props.onChange(value) }
                                icon="calendar outline"
                            />
                        </label>
                }
            </Translation>
        );
    }
}
