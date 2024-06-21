import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Botao from '../components/Botao';
import Titulo from '../components/Titulo';

function Home() {
  const [usuarios, setUsuarios] = useState([]);
  const [erro, setErro] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [nome, setNome] = useState("");

  useEffect(() => {
    if (nome !== "" && nome.length > 3 && !isLoading) {
      setUsuarios(usuarios.filter(usuario => usuario.nome.toLowerCase().includes(nome.toLowerCase())));
    } else if (isLoading || nome.length === 0) {
      axios.get(`http://localhost:3000/usuarios`)
        .then(res => {
          setUsuarios(res.data);
          setIsLoading(false);
        })
        .catch(err => {
          setErro("Não foi possível carregar a lista de usuários.");
        });
    }
  }, [isLoading, nome]);

  function mascararEmail(email) {
    let emailMascarado = email[0];
    let mostrarCaracter = false;

    for (let i = 1; i < email.length; i++) {
      if (email[i] === '@') {
        mostrarCaracter = true;
      }

      emailMascarado += mostrarCaracter ? email[i] : '*';
    }

    return emailMascarado;
  }

  function inativarUsuario(id) {
    axios.patch(`http://localhost:3000/usuarios/${id}`, { ativo: 0 })
      .then(res => {
        setIsLoading(true);
      })
      .catch(err => {
        setErro("Não foi possível atualizar os dados do usuário.");
      });
  }

  function ativarUsuario(id) {
    axios.patch(`http://localhost:3000/usuarios/${id}`, { ativo: 1 })
      .then(res => {
        setIsLoading(true);
      })
      .catch(err => {
        setErro("Não foi possível atualizar os dados do usuário.");
      });
  }

  function removerUsuario(id) {
    axios.delete(`http://localhost:3000/usuarios/${id}`)
      .then(res => {
        setIsLoading(true);
      })
      .catch(err => {
        setErro("Não foi possível remover o usuário.");
      });
  }

  function atualizaNome(event) {
    setNome(event.target.value);
  }

  if (isLoading) {
    return <h1>Carregando</h1>;
  } else {
    return (
      <>
        <div className='row'>
          <div className='col-3'>
            <label htmlFor="_nome">Nome</label>
            <input type="text" id="_nome" placeholder="Digite para pesquisar" className='form-control' onChange={atualizaNome} value={nome} />
          </div>
          <div className='col'>
            <div className='d-flex align-items-end justify-content-end'>
              <Link to={"/cadastro"} className="btn btn-primary">Novo registro</Link>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <Titulo>Usuários Cadastrados</Titulo>
            {erro && <div className='alert alert-danger'>{erro}</div>}
            <table className='table table-striped'>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nome</th>
                  <th>Cargo</th>
                  <th>Usuário GH</th>
                  <th>E-mail</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map(usuario => (
                  <tr key={usuario.id}>
                    <td>{usuario.id}</td>
                    <td>{usuario.nome}</td>
                    <td>{usuario.cargo}</td>
                    <td>{usuario.login}</td>
                    <td>{mascararEmail(usuario.email)}</td>
                    <td>
                      {usuario.ativo === 1 && <Botao tipo="danger" acao={() => inativarUsuario(usuario.id)}>Desativar</Botao>}
                      {usuario.ativo === 0 && <Botao tipo="success" acao={() => ativarUsuario(usuario.id)}>Ativar</Botao>}
                      <Botao tipo="danger" acao={() => removerUsuario(usuario.id)}>Excluir</Botao>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
}

export default Home;
