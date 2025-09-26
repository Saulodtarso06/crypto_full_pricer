import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { unparse } from 'papaparse';
import * as XLSX from 'xlsx';
import { exportToExcel } from './utils/exportToExcel';

const App = () => {
  const coinList = ['ethereum-classic', 'bitcoin', 'dogecoin', 'litecoin', 'solana'];
  const [coinData, setCoinData] = useState([]);
  const [selectedCoins, setSelectedCoins] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [minChange, setMinChange] = useState(0);

  useEffect(() => {
    const fetchCoins = async () => {
      const responses = await Promise.all(
        coinList.map(id => axios.get(`https://api.coingecko.com/api/v3/coins/${id}`))
      );

      const parsedData = responses.map(res => {
        const data = res.data;
        return {
          id: data.id,
          Nome: data.name,
          Símbolo: data.symbol.toUpperCase(),
          Preço: data.market_data.current_price.brl,
          Variação_24h: data.market_data.price_change_percentage_24h?.toFixed(2) || 0,
          MarketCap: data.market_data.market_cap.brl,
        };
      });

      setCoinData(parsedData);
      setSelectedCoins(parsedData.map(coin => coin.id));
    };

    fetchCoins();
  }, [coinList]);

  const handleCheckboxChange = (id) => {
    setSelectedCoins((prev) =>
      prev.includes(id) ? prev.filter((coinId) => coinId !== id) : [...prev, id]
    );
  };

  const exportToCSV = (data, filename = 'dados_criptomoedas.csv') => {
    const csv = unparse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, filename);
  };

  const exportToExcel = (data, filename = 'dados_criptomoedas.xlsx') => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Criptomoedas');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const file = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(file, filename);
  };

  const filteredCoins = coinData
    .filter((coin) => selectedCoins.includes(coin.id))
    .filter((coin) =>
      coin.Nome.toLowerCase().includes(searchTerm) ||
      coin.Símbolo.toLowerCase().includes(searchTerm)
    )
    .filter((coin) => coin.Preço >= minPrice)
    .filter((coin) => parseFloat(coin.Variação_24h) >= minChange);

  return (
    <div className="App">
      <div className="container mt-4">
        <h2 className="mb-3">Crypto Full_Pricer</h2>

        {/* Filtros */}
        <div className="row mb-3">
          <div className="col-md-6 mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="🔍 Filtrar por nome ou símbolo"
              onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
            />
          </div>
          <div className="col-md-3 mb-2">
            <input
              type="number"
              className="form-control"
              placeholder="Valor mínimo (R$)"
              onChange={(e) => setMinPrice(parseFloat(e.target.value) || 0)}
            />
          </div>
          <div className="col-md-3 mb-2">
            <input
              type="number"
              className="form-control"
              placeholder="Variação mínima 24h (%)"
              onChange={(e) => setMinChange(parseFloat(e.target.value) || 0)}
            />
          </div>
        </div>

        {/* Checkboxes e botões */}
        <div className="row mb-3">
          <div className="col-md-8">
            <div className="mb-2">
              <button className="btn btn-outline-primary btn-sm me-2" onClick={() => setSelectedCoins(coinData.map(c => c.id))}>Selecionar todas</button>
              <button className="btn btn-outline-danger btn-sm" onClick={() => setSelectedCoins([])}>Limpar seleção</button>
            </div>
            {coinData.map((coin) => (
              <div className="form-check form-check-inline" key={coin.id}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={selectedCoins.includes(coin.id)}
                  onChange={() => handleCheckboxChange(coin.id)}
                  id={`check-${coin.id}`}
                />
                <label className="form-check-label" htmlFor={`check-${coin.id}`}>{coin.Nome}</label>
              </div>
            ))}
          </div>

          <div className="col-md-4 text-end">
            <button className="btn btn-success mt-2" onClick={() => exportToCSV(filteredCoins)} disabled={filteredCoins.length === 0}>📄 Exportar CSV</button>
            <button className="btn btn-warning mt-2 ms-2" onClick={() => exportToExcel(filteredCoins)} disabled={filteredCoins.length === 0}>📊 Exportar Excel</button>
          </div>
        </div>

        {/* Cards */}
        <div className="row">
          {filteredCoins.map((coin) => (
            <div key={coin.id} className="col-12 col-md-6 col-lg-4 d-flex">
              <div className="card mb-4 w-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{coin.Nome} ({coin.Símbolo})</h5>
                  <p className="card-text">
                    <strong>Preço:</strong> R$ {coin.Preço.toLocaleString('pt-BR')}<br />
                    <strong>Variação 24h:</strong>{' '}
                    <span className={coin.Variação_24h >= 0 ? 'text-success' : 'text-danger'}>
                      {coin.Variação_24h}%
                    </span><br />
                    <strong>Market Cap:</strong> R$ {coin.MarketCap.toLocaleString('pt-BR')}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
