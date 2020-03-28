import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';
import logoImg from '../../assets/logo.svg';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUF] = useState('');

    const history = useHistory();

    const handleRegister = async e => {
        e.preventDefault();
        const data = {name, email, whatsapp, city, uf};
        const response = await api.post('ongs', data);
        try {
            alert(`Seu ID de acesso: ${response.data.id}`);            
            history.push('/');
        } catch (error) {
            alert('Erro no cadastro, tente novamente.');
        }
    };

    const setMask = number => {
        if(number.length === 11){
            const cleaned = number.replace(/\D/g, '');
            let regex = /^([^\s]{2})([^\s]{5})([^\s]{4})$/g;
            let match = regex.exec(cleaned);
            if (match) {
                match.shift();
                const value = ['(', match[0], ') ', match[1], '-', match[2]].join('');
                setWhatsapp(value);
            }
            return;
        }
    }

    return(
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>
                    <Link to="/" className="back-link">
                        <FiArrowLeft size={16} color="#e02041"/>
                        Voltar para home
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input placeholder="Nome da ONG" value={name} onChange={e => setName(e.target.value)}/>
                    <input type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)}/>
                    <input placeholder="WhatsApp" value={whatsapp} maxLength="11" onChange={e => {setWhatsapp(e.target.value); setMask(e.target.value);}}/>
                    <div className="input-group">
                        <input placeholder="Cidade" value={city} onChange={e => setCity(e.target.value)}/>
                        <input placeholder="UF" maxLength="2" style={{width: 80}} value={uf} onChange={e => setUF(e.target.value)}/>
                    </div>
                    <button className="button" type="submit">
                        Cadastrar
                    </button>
                </form>
            </div>
        </div>
    )
}