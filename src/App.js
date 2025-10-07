import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Table, Button, Form } from "react-bootstrap";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";

function App() {
  const [coins, setCoins] = useState([]);
  const [selectedCoins, setSelectedCoins] = useState([]);
  const [filter, setFilter] = useState({ name: "", minValue: "", variation: "" });

  // ✅ Busca as 10 principais moedas
  useEffect(() => {
    async function fetchCoins() {
      try {
        const res = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              order: "market_cap_desc",
              per_page: 10,
              page: 1,
              sparkline: true,
            },
          }
        );
        setCoins(res.data);
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
      }
    }
    fetchCoins();
  }, []); // ✅ sem dependências

  // ✅ Filtragem simples
  const filteredCoins = coins.filter((coin) => {
    const matchName = coin.name.toLowerCase().includes(filter.name.toLowerCase());
    const matchValue =
      filter.minValue === "" || coin.current_price >= Number(filter.minValue);
    const matchVar =
      filter.variation === "" ||
      Math.abs(coin.price_change_percentage_24h) >= Number(filter.variation);
    return matchName && matchValue && matchVar;
  });

  // ✅ Selecionar ou desmarcar todas
  const toggleSelectAll = () => {
    if (selectedCoins.length === filteredCoins.length) {
      setSelectedCoins([]);
    } else {
      setSelectedCoins(filteredCoins.map((c) => c.id));
    }
  };

  const toggleSelect = (id) => {
    setSelectedCoins((prev) =>
      prev.includes(id) ? prev.filter((coinId) => coinId !== id) : [...prev, id]
    );
  };

  // ✅ Exportar para Excel apenas selecionadas
  const exportToExcel = () => {
    const selectedData = coins.filter((c) => selectedCoins.includes(c.id));
    if (selectedData.length === 0) {
      alert("Nenhuma moeda selecionada!");
      return;
    }
    const worksheet = XLSX.utils.json_to_sheet(
      selectedData.map((coin) => ({
        Nome: coin.name,
        Símbolo: coin.symbol.toUpperCase(),
        Preço: coin.current_price,
        "Variação 24h": coin.price_change_percentage_24h,
        "Market Cap": coin.market_cap,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Criptos");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(data, "crypto_full_pricer.xlsx");
  };

  return (
    <Container className="my-4">
      <Row className="mb-3">
        <Col>
          <h2 className="text-center">💰 Crypto Full Pricer</h2>
        </Col>
      </Row>

      {/* Filtros */}
      <Row className="mb-4">
        <Col md={4} className="mb-2">
          <Form.Control
            placeholder="Filtrar por nome"
            value={filter.name}
            onChange={(e) => setFilter({ ...filter, name: e.target.value })}
          />
        </Col>
        <Col md={4} className="mb-2">
          <Form.Control
            type="number"
            placeholder="Valor mínimo em USD"
            value={filter.minValue}
            onChange={(e) => setFilter({ ...filter, minValue: e.target.value })}
          />
        </Col>
        <Col md={4} className="mb-2">
          <Form.Control
            type="number"
            placeholder="Variação mínima (%) 24h"
            value={filter.variation}
            onChange={(e) => setFilter({ ...filter, variation: e.target.value })}
          />
        </Col>
      </Row>

      {/* Botões principais */}
      <Row className="mb-3">
        <Col className="d-flex gap-2">
          <Button variant="primary" onClick={toggleSelectAll}>
            {selectedCoins.length === filteredCoins.length
              ? "Desmarcar todas"
              : "Selecionar todas"}
          </Button>
          <Button variant="success" onClick={exportToExcel}>
            Exportar Excel
          </Button>
        </Col>
      </Row>

      {/* Tabela */}
      <Row>
        <Col>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th></th>
                <th>Nome</th>
                <th>Preço (USD)</th>
                <th>Variação 24h (%)</th>
                <th>Market Cap</th>
                <th>Gráfico (sparkline)</th>
              </tr>
            </thead>
            <tbody>
              {filteredCoins.map((coin) => (
                <tr key={coin.id}>
                  <td>
                    <Form.Check
                      type="checkbox"
                      checked={selectedCoins.includes(coin.id)}
                      onChange={() => toggleSelect(coin.id)}
                    />
                  </td>
                  <td>
                    <img
                      src={coin.image}
                      alt={coin.name}
                      width="20"
                      className="me-2"
                    />
                    {coin.name} ({coin.symbol.toUpperCase()})
                  </td>
                  <td>${coin.current_price.toLocaleString()}</td>
                  <td
                    style={{
                      color: coin.price_change_percentage_24h > 0 ? "green" : "red",
                    }}
                  >
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </td>
                  <td>${coin.market_cap.toLocaleString()}</td>
                  <td>
                    <div style={{ width: "150px", height: "50px" }}>
                      <Line
                        data={{
                          labels: coin.sparkline_in_7d.price.map((_, i) => i),
                          datasets: [
                            {
                              data: coin.sparkline_in_7d.price,
                              borderColor: "blue",
                              borderWidth: 1,
                              pointRadius: 0,
                              tension: 0.3,
                            },
                          ],
                        }}
                        options={{
                          responsive: true,
                          plugins: { legend: { display: false } },
                          scales: { x: { display: false }, y: { display: false } },
                        }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
