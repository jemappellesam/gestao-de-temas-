import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Cadastro() {
  const navigate = useNavigate();
  const [erros, setErros] = useState({});
  const [usuario, setUsuario] = useState({
    nome: "",
    tipo: "",
    email: "",
    login: "",
    telefone: ""
  });

  function handleNome(event) {
    const { value } = event.target;
    let nomeInvalido = value.length < 3 || !value.trim().includes(" ");

    setErros({
      ...erros,
      nome: nomeInvalido ? "Digite o nome completo do usuário" : undefined
    });

    setUsuario({
      ...usuario,
      nome: value
    });
  }

  function handleLogin(event) {
    const { value } = event.target;
    setUsuario({
      ...usuario,
      login: value
    });
  }

  function handleEmail(event) {
    const { value } = event.target;
    let emailInvalido = value.length < 3 || !value.includes("@");

    setErros({
      ...erros,
      email: emailInvalido ? "Digite o e-mail completo do usuário" : undefined
    });

    setUsuario({
      ...usuario,
      email: value
    });
  }

  function handleTipo(event) {
    const { value } = event.target;
    setUsuario({
      ...usuario,
      tipo: value
    });
  }

  function handleTelefone(event) {
    const { value } = event.target;
    let telefoneInvalido = value.length < 14 || !/\(\d{2}\) \d{4,5}-\d{4}/.test(value);

    setErros({
      ...erros,
      telefone: telefoneInvalido ? "Insira o telefone no padrão (99) 99999-9999" : undefined
    });

    setUsuario({
      ...usuario,
      telefone: value
    });
  }

  function submitForm(event) {
    event.preventDefault();
    if (!erros.nome && !erros.email && !erros.telefone && usuario.tipo && usuario.login) {
      axios.post('http://localhost:3000/usuarios', usuario)
        .then(res => {
          alert("Salvo com sucesso!");
          navigate("/");
        }).catch(err => {
          alert("Erro ao salvar usuário");
        });
    }
  }

  return (
    <div>
      <div className="row">
        <div className="col">
          <h1>Página de cadastro de usuários</h1>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <form onSubmit={submitForm}>
            <div className="row my-3">
              <div className="col">
                <label htmlFor="_nome">Nome</label>
                <input type="text" id="_nome" value={usuario.nome} className="form-control" onChange={handleNome} />
                {erros.nome && <span className="text-danger">{erros.nome}</span>}
              </div>
              <div className="col">
                <label htmlFor="_login">Login</label>
                <input type="text" id="_login" value={usuario.login} className="form-control" onChange={handleLogin} />
                {erros.login && <span className="text-danger">{erros.login}</span>}
              </div>
              <div className="col">
                <label htmlFor="_email">E-mail</label>
                <input type="text" id="_email" value={usuario.email} className="form-control" onChange={handleEmail} />
                {erros.email && <span className="text-danger">{erros.email}</span>}
              </div>
            </div>
            <div className="row my-3">
              <div className="col">
                <label htmlFor="_tipo">Tipo</label>
                <select className="form-select" id="_tipo" onChange={handleTipo} value={usuario.tipo}>
                  <option value="" disabled>Selecione</option>
                  <option value="Aluno">Aluno</option>
                  <option value="Funcionário">Funcionário</option>
                  <option value="Professor">Professor</option>
                </select>
              </div>
              <div className="col">
                <label htmlFor="_telefone">Telefone</label>
                <input type="text" id="_telefone" value={usuario.telefone} className="form-control" onChange={handleTelefone} />
                {erros.telefone && <span className="text-danger">{erros.telefone}</span>}
              </div>
            </div>
            <div className="row">
              <div className="col">
                <button type="submit" className="btn btn-secondary">Cadastrar</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Cadastro;
