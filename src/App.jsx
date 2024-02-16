import React, { useState } from 'react';

export function App() {
  const tabu = {
    display: 'flex',
    flexDirection: 'column'
  };
  const tabuLinha = {
    display: 'flex',
    flexDirection: 'row'
  };
  const casa = {
    width: 100,
    height: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    cursor: 'pointer',
    fontSize: 60, 
    border: '1px solid #000'
  };

  const jogoInicial = [['', '', ''], ['', '', ''], ['', '', '']];
  const [jogo, setJogo] = useState(jogoInicial);
  const [simboloAtual, setSimboloAtual] = useState('x');
  const [jogando, setJogando] = useState(true);
  const [empate, setEmpate] = useState(false);

  const tabuleiro = (j) => {
    return (
      <div style={tabu}>
        <div style={tabuLinha}>
          <div style={casa} data-pos='00' onClick={(e) => joga(e)}>{j[0][0]}</div>
          <div style={casa} data-pos='01' onClick={(e) => joga(e)}>{j[0][1]}</div>
          <div style={casa} data-pos='02' onClick={(e) => joga(e)}>{j[0][2]}</div>
        </div>
        <div style={tabuLinha}>
          <div style={casa} data-pos='10' onClick={(e) => joga(e)}>{j[1][0]}</div>
          <div style={casa} data-pos='11' onClick={(e) => joga(e)}>{j[1][1]}</div>
          <div style={casa} data-pos='12' onClick={(e) => joga(e)}>{j[1][2]}</div>
        </div>
        <div style={tabuLinha}>
          <div style={casa} data-pos='20' onClick={(e) => joga(e)}>{j[2][0]}</div>
          <div style={casa} data-pos='21' onClick={(e) => joga(e)}>{j[2][1]}</div>
          <div style={casa} data-pos='22' onClick={(e) => joga(e)}>{j[2][2]}</div>
        </div>
      </div>
    );
  };

  const BtnJogarNovamente = () => {
    if (!jogando || empate) {
      return <button onClick={() => reiniciar()}>Jogar novamente</button>;
    }
  };

  const verificaVitoria = () => {
    let pontos = 0;
    let vitoria = false;

    // Check rows
    for (let l = 0; l < 3; l++) {
      pontos = 0;
      for (let c = 0; c < 3; c++) {
        if (jogo[l][c] === simboloAtual) {
          pontos++;
        }
      }
      if (pontos >= 3) {
        vitoria = true;
        break;
      }
    }

    // Check columns
    pontos = 0;
    for (let c = 0; c < 3; c++) {
      pontos = 0;
      for (let l = 0; l < 3; l++) {
        if (jogo[l][c] === simboloAtual) {
          pontos++;
        }
      }
      if (pontos >= 3) {
        vitoria = true;
        break;
      }
    }

    // Check diagonals
    pontos = 0;
    for (let d = 0; d < 3; d++) {
      if (jogo[d][d] === simboloAtual) {
        pontos++;
      }
    }
    if (pontos >= 3) {
      vitoria = true;
    }

    pontos = 0;
    let l = 0;
    for (let c = 2; c >= 0; c--) {
      if (jogo[l][c] === simboloAtual) {
        pontos++;
      }
      l++;
    }
    if (pontos >= 3) {
      vitoria = true;
    }

    return vitoria;
  };

  const trocaJogador = () => {
    setSimboloAtual(simboloAtual === 'x' ? 'o' : 'x'); 
  };

  const retPos = (e) => {
    const p = e.target.getAttribute('data-pos');  
    const pos = [parseInt(p.substring(0, 1)), parseInt(p.substring(1, 2))];
    return pos;
  };

  const verificaEspacoVazio = (e) => {  
    if (jogo[retPos(e)[0]][retPos(e)[1]] === '') {
      return true;
    } else {
      return false;
    }
  };

  const joga = (e) => {
    if (jogando) {
      if (verificaEspacoVazio(e)) {
        jogo[retPos(e)[0]][retPos(e)[1]] = simboloAtual;  
        trocaJogador();
        if (verificaVitoria()) {
          trocaJogador();
          alert('Jogador ' + simboloAtual + ' Venceu!');  
          setJogando(false);
        }
      } else {
        alert('Este espaço não está disponível, escolha outro');  
      }
    }
  };

  const reiniciar = () => {
    setJogando(true);
    setJogo(jogoInicial);
    setSimboloAtual('x');
    setEmpate(true);
  };

  return (
    <div>
      {tabuleiro(jogo)}
      {BtnJogarNovamente()}
    </div>
  );
}
