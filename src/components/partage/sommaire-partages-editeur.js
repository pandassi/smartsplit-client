import React, { Component } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { withTranslation } from 'react-i18next'
import 'react-confirm-alert/src/react-confirm-alert.css'
import "../../assets/scss/tableaudebord/tableaudebord.scss";
import Login from '../auth/Login'
import { Accordion } from 'semantic-ui-react'
import AssistantPartageEditeur from './assistant-partage-editeur'
import PartageSommaireEditeur from './partage-sommaire-editeur'
import { Modal } from 'semantic-ui-react'
import {Identite, config, AyantsDroit, journal} from '../../utils/application'
import { FlecheBasSVG, FlecheHautSVG } from '../svg/SVG.js'

const NOM = "SommairePartagesEditeur"

class SommairePartagesEditeur extends Component {

    constructor(props) {
        super(props)
        this.state = {
            proposition: props.proposition            
        }
        this.initialisation = this.initialisation.bind(this)
        this.clic = this.clic.bind(this)
        this.creerNouvelle = this.creerNouvelle.bind(this)        
    }

    componentWillMount() {
        if(Identite.usager) {
            this.setState({ user: Identite.usager }, ()=>{this.initialisation()})            
        } else {
            this.setState({ modaleConnexion: true })
        }
    }

    initialisation() {
        let _rAd = AyantsDroit.ayantsDroit[this.state.user.username]        
        this.setState({ ayantDroit: _rAd }, async () => {
            try {
                let res = await axios.get(`${config.API_URL}splitShare/${this.state.proposition.uuid}/${this.state.user.username}`)
                this.setState({ activeIndex: res.data.length - 1 })
                this.setState({ propositions: res.data })
            } catch(err) {
                journal.error(NOM, err)
            }            
        })
    }

    creerNouvelle = (ouvert = true) => {
        this.setState({creerNouveauPartage: ouvert})
    }

    clic = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({ activeIndex: newIndex })
    }

    render() {

        const t = this.props.t
        if (this.state.propositions) {
            let propositions = []        
            let _p0
            // Trouver _p0, la proposition la plus récente
            this.state.propositions.forEach(elem => {
                if (!_p0 || _p0._d < elem._d) { _p0 = elem }
            })
            propositions = this.state.propositions.map((elem, idx) => {    
                const accordionIsOpen = idx === this.state.activeIndex;
                journal.debug(NOM, `État : ${elem.etat}`)
                return (
                    <div key={`sommaire_${idx}`}>
                        <div className="ui row">
                            <Accordion.Title active={this.state.activeIndex === idx} index={idx} onClick={this.clic}>
                            <div className="fleche">
                                {accordionIsOpen ? <FlecheHautSVG /> : <FlecheBasSVG />}
                            </div>
                            <div className="version">
                            &nbsp; Version {idx + 1} <span className={( elem.etat  === 'ACCEPTE') ? "sommaire-approuve" : ( elem.etat  === 'REFUSE') ? "sommaire-desaprouve" : ( elem.etat  === 'PRET') ? "sommaire-envoie" : "sommaire-attente"}>
                                {t( `flot.split.etat.${elem.etat}`)} 
                            </span>                               
                                </div>
                            </Accordion.Title>
                            <Accordion.Content active={this.state.activeIndex === idx} style={{padding: "1rem 0rem 0rem"}}>                                    
                                                                          
                                        <PartageSommaireEditeur idx={idx} ayantDroit={this.state.ayantDroit} part={elem} proposition={this.state.proposition} />
                                    
                                                                   
                            </Accordion.Content>
                        </div>
                    </div>
                )
            })
            propositions = propositions.reverse()
            let nouveauDisabled = false
            if (this.state.propositions.length > 0) {
                let _p = this.state.propositions[this.state.propositions.length - 1]
                _p0 = _p
                if (_p.etat !== 'REFUSE') {
                    nouveauDisabled = true
                }
                if (_p.etat === 'BROUILLON' || _p.etat === 'PRET') {
                    nouveauDisabled = false
                }
                if (_p.etat === 'ACCEPTE') {
                    nouveauDisabled = false
                }
            }
            if(this.state.propositions.length === 0 || this.state.jetonApi) {
                nouveauDisabled = true
            }        
            let that = this
            return (                
                <>
                    { (this.state.creerNouveauPartage || this.state.propositions.length === 0) &&
                        <div className="ui row">
                            <AssistantPartageEditeur 
                                sansentete
                                propositionId={this.state.proposition.uuid}
                                version={propositions.length}
                                className="ui twelve wide column" 
                                soumettre={()=>{
                                    this.creerNouvelle(false)
                                    window.location.reload()
                                }} />
                        </div>
                    }
                    { !this.state.creerNouveauPartage &&
                        <div className="ui row">                            
                            {
                                !nouveauDisabled && (
                                    <div className={`ui medium button`} onClick={
                                        () => {
                                            this.creerNouvelle()
                                        }
                                    }>
                                        {t('flot.split.documente-ton-oeuvre.proposition.nouvelle')}
                                    </div>
                                )
                            }
                            <div className="ui row">
                                <div className="ui two wide column" />
                                <Accordion fluid styled>
                                    {propositions}
                                </Accordion>
                                <div className="ui two wide column" />
                            </div>                                                                      
                            {
                                this.state.proposition && this.state.proposition.etat === "VOTATION" && !this.state.jetonApi && (
                                    <script language="javascript">
                                        setTimeout(()=>{
                                            toast.warn(t('flot.split.documente-ton-oeuvre.proposition.voter-avec-jeton'))
                                        })
                                    </script>
                                )
                            }
                        </div>                            
                    }
                    <Modal
                        open={this.state.modaleConnexion}
                        closeOnEscape={false}
                        closeOnDimmerClick={false}
                        onClose={this.props.close}
                        size="small" >
                        <br /><br /><br />
                        <Login fn={() => {
                            if(Identite.usager) {
                                that.setState({ user: Identite.usager })
                            }                            
                        }} />
                    </Modal>
                </>                    
            )
        } else {
            return (
                <div></div>
            )
        }
    }
}
export default withTranslation()(SommairePartagesEditeur)