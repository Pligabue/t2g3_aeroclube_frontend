import React from "react"
import { Redirect } from "react-router-dom";

import "./Cadastro.css"
import {url_v3} from "./App"
import axios from 'axios';

class Cadastro extends React.Component {
    
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            name: '',
            email: '',
            password: '',
            endereco: '',
            dataNascimento: '',
            cpf: '',
            numeroBreve: '',
            nomeInstituicao: '',
            nomeCurso: '',
            dataDiploma: '',
            role: '',
            redirect : false,
        };
    }

    handleChange(event) {
        this.setState({[event.target.name] : event.target.value})
    }

    handleSubmit(event){ 
        event.preventDefault();
        this.setState({"error": ''})

        const url = url_v3+'register';
        axios.post(url, {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            endereco: this.state.endereco,
            dataNascimento: this.state.dataNascimento,
            cpf: this.state.cpf,
            numeroBreve: this.state.numeroBreve,
            nomeInstituicao: this.state.nomeInstituicao,
            nomeCurso: this.state.nomeCurso,
            dataDiploma: this.state.dataDiploma,
            role: this.state.role,
        }).then(response => {
            if (response.data.error) {
                this.setState({"error": response.data.error})
            } else {
                alert(this.state.role + " cadastrado.")
            }
            this.setState({redirect : true})
        })
    };

    render () {
        if (this.state.redirect) 
            return(
                <Redirect to="/" />
            )
        else
            return (
                <div id = "cadastro">
                    <form className="telaCadastro" onSubmit={this.handleSubmit}>
                        <h1>Cadastrar Novo Usuário</h1>
                        
                        <label htmlFor="name">Nome:</label>
                        <input type="text" name="name" id="name" onChange={this.handleChange} required />
                        <br />

                        <label htmlFor="email">Email:</label>
                        <input type="email" name="email" id="email" onChange={this.handleChange} required />
                        <br />

                        <label className= "data" htmlFor="dataNascimento">Data de Nascimento:</label>
                        <input type="date" name="dataNascimento" id="dataNascimento" onChange={this.handleChange} required />
                        <br />

                        <label htmlFor="cpf">CPF:</label>
                        <input type="text" name="cpf" id="cpf" onChange={this.handleChange} required />
                        <br />

                        <label htmlFor="endereco">Endereço:</label>
                        <input type="text" name="endereco" id="endereco" onChange={this.handleChange} required />
                        <br />

                        <label htmlFor = "password">Senha:</label>
                        <input type="password" name="password" id="password"  onChange={this.handleChange} required />
                        <br />

                        <label htmlFor = "role">Tipo de Sócio:</label>
                        <select defaultValue="" name="role" id="role" onChange={this.handleChange} onClick={this.changeVisibility} required>
                            <option value="" disabled>Selecione</option>
                            <option value="Aluno">Aluno</option>
                            <option value="Piloto">Piloto</option>
                            <option value="Instrutor">Instrutor</option>
                        </select>
                        <br />

                        {(this.state.role === "Piloto" || this.state.role === "Instrutor") && 
                        <div>
                            <label htmlFor = "breve">Brevê:</label>
                            <input type="text" name="numeroBreve" id="numeroBreve"  onChange={this.handleChange} required />
                            <br />
                            
                            {(this.state.role === "Instrutor") &&
                            <div>
                                <label htmlFor="nomeInstituicao">Instituição de ensino:</label>
                                <input type="text" name="nomeInstituicao" id="nomeInstituicao"  onChange={this.handleChange} required />  
                                <br />

                                <label htmlFor="nomeCurso">Nome do curso:</label>
                                <input type="text" name="nomeCurso" id="nomeCurso"  onChange={this.handleChange} required />  
                                <br />

                                <label htmlFor="dataDiploma">Data do diploma:</label>
                                <input type="date" name="dataDiploma" id="dataDiploma"  onChange={this.handleChange} required />  
                                <br />
                            </div>}
                        </div>}


                        <button type="submit">Go</button>
                        <div className="error-message">{this.state.error}</div>
                    </form>
                </div>
            )
    }
}

export default Cadastro