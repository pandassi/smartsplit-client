import React, { Component } from 'react'
import { Translation } from 'react-i18next'
import axios from 'axios'
import { Auth } from 'aws-amplify';
import { toast } from 'react-toastify'
import LigneMedia from './tableaudebord-ligne-media'
import { Modal } from 'semantic-ui-react';
import NouvelleOeuvre from './tableaudebord-nouvelle-oeuvre';
import AudioLecture from '../oeuvre/audio-lecture';
import Yeux from "../../assets/images/yeux.png";


const PANNEAU_INITIATEUR = 1, PANNEAU_COLLABORATEUR = 0

// Retrait des doublons
// cleanArray removes all duplicated elements
// https://www.unicoda.com/?p=579
function cleanArray(array) {
    var i, j, len = array.length, out = [], obj = {};
    for (i = 0; i < len; i++) {
        obj[array[i]] = 0;
    }
    for (j in obj) {
        out.push(j);
    }
    return out;
}


export default class ListePieces extends Component {

    constructor(props) {
        super(props)
        this.state = {
            pochette: props.pochette,
            medias: [],
            collabMedias: [],
            creatorMedias: [],
            panneau: PANNEAU_INITIATEUR,
            collecte: {
                medias: false,
                collab: false
            },
            user: props.user
        }
        this.modaleNouvelleOeuvre = this.modaleNouvelleOeuvre.bind(this)
    }

    afficherPanneauInitiateur() {
        this.setState({ panneau: PANNEAU_INITIATEUR })
    }

    afficherPanneauCollaborateur() {
        this.setState({ panneau: PANNEAU_COLLABORATEUR })
    }

    collecte(obj) {
        let collecte = this.state.collecte
        if (obj.medias) {
            collecte.medias = true
        }
        if (obj.collab) {
            collecte.collab = true
        }
        this.setState({ collecte: collecte }, () => {
            let _collecte = this.state.collecte
            if (_collecte.medias && _collecte.collab) {
                this.setState({ patience: false })
            }
        })
    }

    componentWillMount() {

        try {

            this.setState({
                collecte: {
                    medias: false,
                    collabs: false
                }
            })
            this.setState({ patience: true }, () => {
                Auth.currentSession().then(
                    session => {
                        let that = this
                        let USER_ID = session.idToken.payload.sub

                        // 1. Récupérer tous les médias
                        let initiatorMediaIds = []
                        let collabMediaIds = []

                        // Médias depuis les propositions
                        axios.get('http://dev.api.smartsplit.org:8080/v1/proposal')
                            .then((res) => {

                                res.data.forEach(function (item) {
                                    if (item.initiator.id === USER_ID) {
                                        initiatorMediaIds.push(item.mediaId) // If initiator
                                    }
                                    else if (item.initiator.id === undefined) {
                                        toast.error("Initiator undefined")
                                    }
                                    if ((JSON.stringify(item.rightsSplits)).includes(USER_ID)) {
                                        collabMediaIds.push(item.mediaId) // If collaborator
                                    } else if (item.rightsSplits === undefined) {
                                        toast.error("rightsSplits object error")
                                    }
                                })

                                initiatorMediaIds = cleanArray(initiatorMediaIds)
                                collabMediaIds = cleanArray(collabMediaIds)

                                let _medias = [];
                                let ii = '';
                                let _collabMedias = [];
                                let jj = '';

                                initiatorMediaIds.forEach(async function (element) {
                                    const res = await axios.get('http://dev.api.smartsplit.org:8080/v1/media/' + element)
                                    if (res.data.Item) {
                                        _medias.push(res.data.Item)
                                    }
                                    ii++
                                    if (initiatorMediaIds.length === ii) {
                                        that.setState({ medias: _medias })
                                    }
                                    that.collecte({ medias: true })
                                })

                                collabMediaIds.forEach(async function (elm) {
                                    const res = await axios.get('http://dev.api.smartsplit.org:8080/v1/media/' + elm)
                                    if (res.data.Item) {
                                        _collabMedias.push(res.data.Item)
                                    }
                                    jj++
                                    if (collabMediaIds.length === jj) {
                                        that.setState({ collabMedias: _collabMedias })
                                    }
                                    that.collecte({ collab: true })
                                })

                                if (initiatorMediaIds.length === 0) {
                                    that.collecte({ medias: true })
                                }

                                if (collabMediaIds.length === 0) {
                                    that.collecte({ collab: true })
                                }

                            })
                            .catch((error) => {
                                toast.error(error.message)
                            })

                        // Médias depuis les médias
                        let _cM = []
                        axios.get('http://dev.api.smartsplit.org:8080/v1/media')
                            .then(res => {
                                let kk = 0
                                res.data.forEach(m => {
                                    // Si l'usager est le créateur il peut voir l'oeuvre
                                    if (USER_ID === m.creator) {
                                        _cM.push(m)
                                    }
                                    kk++
                                    if (kk === res.data.length) {
                                        this.setState({ creatorMedias: _cM })
                                    }
                                })
                            })
                            .catch(err => console.log(err))

                    })
            })


        } catch (err) {
            console.log(err)
        }
    }

    modaleNouvelleOeuvre(ouvert = true) {
        this.setState({ modaleOeuvre: ouvert })
    }

    render() {

        let pochette = this.state.pochette ? "pochette" : ""

        let rendu
        let that = this

        function aucuneOeuvre() {
            return (
                <Translation>
                    {
                        t =>

                            <div style={{ marginTop: "20px" }} className="ui three column grid">


                                <br />
                                <br />
                                <br />
                                <div className="illustration" style={{ textAlign: 'center' }}>
                                    <div>
                                        <img
                                            style={{ fontSize: "3rem" }}
                                            aria-label=""
                                            className={"yeux"}
                                            src={Yeux}
                                            alt={"Yeux"}
                                        />

                                        <br />
                                        <div className="medium-500-nomargin">{t('flot.split.tableaudebord.vide.preambule')}</div>
                                        <div className="medium-500-nomargin" style={{ fontWeight: '100' }}>
                                            {t('flot.split.tableaudebord.vide.indication')} <br />
                                            <div className="cliquable" style={{ color: "#0645AD" }} onClick={e => { //Cliquable = pointeur lien, classe écrite Vincent
                                                that.modaleNouvelleOeuvre()
                                            }}>{t('flot.split.tableaudebord.vide.indication-lien')}</div>

                                        </div>

                                    </div>
                                </div>

                            </div>

                    }
                </Translation>
            )
        }

        let souligneInitiateur, souligneCollaborateur
        souligneInitiateur = this.state.panneau === PANNEAU_INITIATEUR
        souligneCollaborateur = this.state.panneau === PANNEAU_COLLABORATEUR

        let toggle = !this.state.pochette && (
            <Translation>
                {
                    t =>
                        <div>
                            <div className="ui row">
                                <div className="ui one wide column" style={{ fontSize: "16px" }} />
                                <div className="ui twelve wide column">
                                    <span className={`cliquable small-500${souligneInitiateur ? '-color souligne' : ''} ${souligneInitiateur && pochette ? "pochette" : ""}`} onClick={() => { this.afficherPanneauInitiateur() }} style={{ fontSize: "16px" }}>{t('flot.split.tableaudebord.pieces.0')}</span>&nbsp;&nbsp;
                                    <span className={`cliquable small-500${souligneCollaborateur ? '-color souligne' : ''} ${souligneCollaborateur && pochette ? "pochette" : ""}`} onClick={() => { this.afficherPanneauCollaborateur() }} style={{ fontSize: "16px" }}>{t('flot.split.tableaudebord.pieces.1')}</span>
                                </div>
                                <div className="ui one wide column" />
                            </div>
                        </div>
                }
            </Translation>
        )

        if (
            (!this.state.patience && (this.state.medias.length + this.state.creatorMedias.length) === 0 && this.state.panneau === PANNEAU_INITIATEUR) ||
            (!this.state.patience && this.state.collabMedias.length === 0 && this.state.panneau === PANNEAU_COLLABORATEUR)
        ) {  // If no initiator musical pieces present for user
            rendu = aucuneOeuvre()
        } else {
            let tableauMedias = []
            let _medias = {}
            if (this.state.medias.length + this.state.creatorMedias.length > 0 && this.state.panneau === PANNEAU_INITIATEUR) {

                tableauMedias = this.state.medias.map((elem, _idx) => {
                    _medias[elem.mediaId] = elem
                    return (
                        <LigneMedia pochette={this.state.pochette} key={elem.mediaId} media={elem} user={this.state.user} />
                    )
                })
                tableauMedias = tableauMedias.concat(
                    this.state.creatorMedias.map((elem, _idx) => {
                        if (elem && elem.mediaId && !_medias[elem.mediaId]) {
                            return (
                                <LigneMedia pochette={this.state.pochette} key={`${elem.mediaId}_${elem._idx}`} media={elem} user={this.state.user} />
                            )
                        } else {
                            return null
                        }
                    })
                )
            }
            if (this.state.collabMedias.length > 0 && this.state.panneau === PANNEAU_COLLABORATEUR) {
                tableauMedias = this.state.collabMedias.map((elem, _idx) => {
                    return (
                        elem !== undefined && <LigneMedia pochette={this.state.pochette} key={`${elem.mediaId}_${elem._idx}`} media={elem} user={this.state.user} />
                    )
                })
            }
            rendu = (
                <>
                    {tableauMedias}
                </>
            )
        }

        return (
            <Translation>
                {
                    t =>
                        <div>
                            {
                                !this.state.patience && (
                                    <div>
                                        <div className="ui grid">
                                            <div className="ui row">
                                                <div className="heading2 ten wide column">{t('flot.split.tableaudebord.navigation.0')}
                                                    <div className={`ui three wide column medium button ${pochette}`}
                                                        onClick={() => { this.modaleNouvelleOeuvre() }}
                                                        style={{
                                                            position: "absolute",
                                                            left: "100%",
                                                            width: "30%"
                                                        }}>
                                                        {t('flot.split.tableaudebord.pieces.ajouter')}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="ui row">
                                                <div className="ui nine wide column" />
                                            </div>
                                            <div className="ui row">
                                                <div className="fifteen wide column">
                                                    <div className="medium-500">{toggle}</div>
                                                    <br />
                                                    {rendu}
                                                </div>
                                            </div>
                                        </div>
                                        <Modal
                                            open={this.state.modaleOeuvre}
                                            onClose={() => { this.modaleNouvelleOeuvre(false); if (this.state.audio) this.state.audio.stop() }}
                                            size="large"
                                            closeIcon
                                            closeOnDimmerClick={false}
                                        >
                                            <Modal.Header>
                                                {t('flot.split.titre.creer')}
                                            </Modal.Header>
                                            <Modal.Content>
                                                <NouvelleOeuvre pochette={this.state.pochette} audio={this.state.audio} parent={this} user={this.state.user} />
                                            </Modal.Content>
                                            <Modal.Actions>
                                                <>
                                                    {this.state.mediaId &&
                                                        <AudioLecture onRef={
                                                            (audio) => { this.setState({ audio: audio }) }
                                                        } />
                                                    }
                                                </>
                                            </Modal.Actions>
                                        </Modal>
                                    </div>
                                )
                            }
                            {
                                this.state.patience && (
                                    <div className="ui active dimmer">
                                        <div className="ui text loader">{t('entete.encours')}</div>
                                    </div>
                                )
                            }
                        </div>
                }
            </Translation>
        )
    }
}


