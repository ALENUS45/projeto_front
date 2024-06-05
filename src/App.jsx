import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // Estados para guardar informações sobre o personagem
  const [dados, setDados] = useState(null);
  const [idAtual, setIdAtual] = useState(1);
  const [valorEntrada, setValorEntrada] = useState(1);
  const [numeroEpisodios, setNumeroEpisodios] = useState(0);

  // Efeito que é executado quando o ID do personagem atual muda
  useEffect(() => {
    buscarDados(idAtual);
  }, [idAtual]);

  // Função para buscar informações de um personagem da API
  const buscarDados = (id) => {
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Resposta da rede não foi ok');
        }
        return response.json();
      })
      .then(data => {
        // Atualiza os estados com as informações do personagem
        setDados(data);
        setNumeroEpisodios(data.episode.length);
      })
      .catch(error => console.error('Erro ao buscar:', error));
  };

  // Função para lidar com o clique no botão "Anterior"
  const handleBotaoAnteriorClick = () => {
    if (idAtual > 1) {
      const novoId = idAtual - 1;
      setIdAtual(novoId);
      setValorEntrada(novoId);
    }
  };

  // Função para lidar com o clique no botão "Próximo"
  const handleBotaoProximoClick = () => {
    const novoId = idAtual + 1;
    setIdAtual(novoId);
    setValorEntrada(novoId);
  };

  // Função para lidar com o clique no botão "Buscar"
  const handleBotaoBuscarClick = () => {
    const id = parseInt(valorEntrada, 10);
    if (!isNaN(id) && id > 0) {
      setIdAtual(id);
    }
  };

  // Função para lidar com a mudança no input de busca
  const handleMudancaEntrada = (event) => {
    setValorEntrada(event.target.value);
  };

  return (
    // Renderização condicional do conteúdo se houver informações disponíveis
    <div className="centrado-container">
      {dados && (
        <div className="container">
          <div className="imagem">
            <img src={dados.image} alt="Imagem" id="imagem" />
            <h2 id="nome">{dados.name}</h2>
          </div>
          <div className="informacoes">
            <p id="status">Status: {dados.status}</p>
            <p id="especie">Espécie: {dados.species}</p>
            <p id="genero">Gênero: {dados.gender}</p>
            <p id="origem">Origem: {dados.origin.name}</p>
            <p id="localizacao">Localização: {dados.location.name}</p>
            <p id="criado">Criado em: {new Date(dados.created).toLocaleDateString('pt-BR')}</p>
            <p id="id">ID: {dados.id}</p>
            <p id="numero-episodios">Número de Episódios: {numeroEpisodios}</p>
          </div>
        </div>
      )}
      {/* Botões de navegação e input de busca */}
      <div className="container-botoes">
        <button id="botao-anterior" onClick={handleBotaoAnteriorClick}>Anterior</button>
        <button id="botao-proximo" onClick={handleBotaoProximoClick}>Próximo</button>
      </div>
      <div className="container-busca">
        <input
          type="number"
          id="entrada-id"
          placeholder="Buscar pelo ID"
          value={valorEntrada}
          onChange={handleMudancaEntrada}
        />
        <button id="botao-buscar" onClick={handleBotaoBuscarClick}>Buscar</button>
      </div>
    </div>
  );
}

export default App;
