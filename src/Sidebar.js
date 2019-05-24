import React from "react"
import Aba from "./Aba"
import "./Sidebar.css"
import {url_v3} from "./App"
import axios from "axios";

class Sidebar extends React.Component {

    constructor() {
        super()
        this.getState = this.getState.bind(this)
        this.state = {
            isLoggedIn: false,
            role: "Aluno",
        }
    }

    getState(event) {
        const url = url_v3+'login';
        axios.get(url, { user: this.state.user, password: this.state.password })
        .then(function(response) {
            console.log(response.data)
            this.setState({isLoggedIn : response.data.isLoggedIn, role : response.data.role})
        })
        .catch(error => {
            alert(error)
        });
    }

    render () {

        this.getState()
        if (this.state.isLoggedIn) {
            return (
                <div>
                    <ul className="sidebarAba">
                        <li className="sidebarHeader">MENU</li>
                        <li><Aba name="Log Out" nameHtml="./Logout.html"/></li>
                        <li><Aba name="Agendamentos" nameHtml="./Agendamento.html"/></li>
                        <li><Aba name="Perfil" nameHtml="./Perfil.html"/></li>
                        <li><Aba name="Configurações" nameHtml="./Configuracoes.html"/></li>
                    </ul>
                </div>
            )
        } else {
            return (
                <div>
                    <ul className="sidebarAba">
                        <li className="sidebarHeader">MENU</li>
                        <li><Aba name="Login" nameHtml="./Login.html"/></li>
                        <li><Aba name="Cadastro" nameHtml="./Cadastro.html"/></li>
                    </ul>
                </div>
            )
        }
            
    }
}

export default Sidebar