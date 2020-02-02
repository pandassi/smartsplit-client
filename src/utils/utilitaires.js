const CONTEXTE_WEB = "1", CONTEXTE_NATIF = "2"

export default class Utilitaires {    

    constructor(contexte) {
        this.contexte = contexte
    }

    naviguerVersAccueil() {
        if(this.contexte === CONTEXTE_WEB) {
            window.location.href = `/accueil`
        }
        if(this.contexte === CONTEXTE_NATIF) {            
        }
    }

    naviguerVersSommaire(mediaId) {
        if(this.contexte === CONTEXTE_WEB) {
            window.location.href = `/oeuvre/${mediaId}/resume`
        }
        if(this.contexte === CONTEXTE_NATIF) {            
        }
    }

    naviguerVersSommaireOeuvre(mediaId, invitationsEnvoyees = false) {
        if(this.contexte === CONTEXTE_WEB) {            
            window.location.href = `/oeuvre/sommaire/${mediaId}?i=1`;
        }
        if(this.contexte === CONTEXTE_NATIF) {            
        }
    }    

    naviguerVersDocumentation(mediaId) {
        if(this.contexte === CONTEXTE_WEB) {
            window.location.href = `/documenter/${mediaId}`
        }
        if(this.contexte === CONTEXTE_NATIF) {            
        }
    }

    naviguerVersPoursuivreDocumentation(uuid) {
        if(this.contexte === CONTEXTE_WEB) {
            window.location.href = `/partager/existant/${uuid}`
        }
        if(this.contexte === CONTEXTE_NATIF) {            
        }
    }

    naviguerVersEnvoyerAuxCollaborateurs(mediaId) {
        if(this.contexte === CONTEXTE_WEB) {
            window.location.href = `/partager/${mediaId}/envoyer`
        }
        if(this.contexte === CONTEXTE_NATIF) {            
        }
    }

    naviguerVersEditerProposition(uuid, pageNo) {
        if(this.contexte === CONTEXTE_WEB) {
            window.location.href = `/editer-partage/${uuid}/${pageNo}`
        }
        if(this.contexte === CONTEXTE_NATIF) {            
        }
    }

    naviguerVersSommairePartage(mediaId) {
        if(this.contexte === CONTEXTE_WEB) {
            window.location.href = `/partager/${mediaId}`
        }
        if(this.contexte === CONTEXTE_NATIF) {            
        }
    }

    naviguerVersNouveauPartage(mediaId) {        
        if(this.contexte === CONTEXTE_WEB) {
            window.location.href = `/partager/nouveau/${mediaId}`
        }
        if(this.contexte === CONTEXTE_NATIF) {            
        }
    }

    naviguerVersPoursuivrePartage(uuid) {
        if(this.contexte === CONTEXTE_WEB) {
            window.location.href = `/partager/existant/${uuid}`
        }
        if(this.contexte === CONTEXTE_NATIF) {            
        }        
    }
    
}