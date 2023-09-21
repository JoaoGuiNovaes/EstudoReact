import { useState } from 'react';
import { FiSearch } from 'react-icons/fi'
import './style.css'
import api from './services/api'

function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState({})

  async function handleSearch() {
    if (input == '') {
      alert("preecha algum cep")
      return
    }
    try {
      const response = await api.get(`${input}/json`)
      setCep(response.data)
      setInput('')
    } catch (error) {
      alert("Esse cep não existe")
      setInput('')
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador de CEP</h1>
      <div className="containerInput">
        <input
          type="text"
          placeholder="digite seu cep ..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="buttonSearch" onClick={handleSearch}><FiSearch size={25} color='#FFF' /></button>
      </div>
      <main className='main'>
        <h2>CEP: {cep.cep} </h2>
        <span>Rua: {cep.logradouro}</span>
        <span>Complemento: {cep.complemento}</span>
        <span>Bairro: {cep.bairro}</span>
        <span>Cidade: {cep.localidade} {cep.uf}</span>
        <span>Estado: {cep.uf}</span>
      </main>
    </div>
  );
}

export default App;
