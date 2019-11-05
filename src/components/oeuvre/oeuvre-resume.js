import React from 'react';
import { Translation } from "react-i18next";
import { Navbar } from "./oeuvre-resume/navbar";
import Entete from "./oeuvre-resume/entete";
import Corps from "./oeuvre-resume/corps";
import axios from 'axios';
import { Auth } from 'aws-amplify';

export default class OeuvreResume extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            mediaId: props.mediaId            
        }
    }

    componentWillMount() {
        axios.get(`http://dev.api.smartsplit.org:8080/v1/media/${this.props.mediaId}`)
        .then(res=>{
            let _m = res.data.Item
            console.log(_m)
            this.setState({media: _m},
                ()=>{
                    axios.get('http://dev.api.smartsplit.org:8080/v1/rightHolders')
                    .then(response => {
                        let _adParUuid = { }
                        response.data.forEach(e => {
                          _adParUuid[e.rightHolderId] = e
                        })
                        this.setState({ rightHolders: _adParUuid });
                    })
                    .catch(error => {                        
                    });
                })
        })
        Auth.currentAuthenticatedUser()
        .then(res=>{
            this.setState({user: res})
        })
        .catch(err=>console.log(err))
    }

    render() {
        if(this.state.media && this.state.user && this.state.rightHolders) {
            return (
                <Translation>
                    {
                        (t) =>
                            <>
                                <Navbar media={this.state.media} profil={this.state.user} />
                                <Entete media={this.state.media} rightHolders={this.state.rightHolders} />
                                <Corps media={this.state.media} rightHolders={this.state.rightHolders} />
                            </>
                    }
                </Translation>
            )
        } else {
            return (<></>)
        }    
    }
}
