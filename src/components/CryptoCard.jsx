
//import React, { useEffect, useState } from 'react';
import React, { useState } from 'react';
import { Card, Spinner } from 'react-bootstrap';
//

/*const CryptoCard = ({ coin }) => {
  return (
    <Card className="m-2 w-100 shadow-sm">
      <Card.Body>
        <Card.Title>{coin.Nome} ({coin.Símbolo})</Card.Title>
        <Card.Text>
          <strong>Preço:</strong> R$ {coin.Preço.toLocaleString('pt-BR')} <br />
          <strong>Variação 24h:</strong>{' '}
          <span className={coin.Variação_24h >= 0 ? 'text-success' : 'text-danger'}>
            {coin.Variação_24h}%
          </span><br />
          <strong>Market Cap:</strong> R$ {coin.MarketCap.toLocaleString('pt-BR')}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
*/

const CryptoCard = ({ symbol }) => {
    const [data] = useState(null);
    const [loading] = useState(true);
    if (loading) {
        return (
            <Card className="m-2 w-100 text-center">
                <Card.Body>
                    <Spinner animation="border" variant="primary" />
                </Card.Body>
            </Card>
        );
    }

    if (!data || !data.market_data) {
        return (
            <Card className="m-2 w-100 text-center">
                <Card.Body>
                    <span className="text-danger">Erro ao carregar dados da moeda.</span>
                </Card.Body>
            </Card>
        );
    }

    const price = data.market_data.current_price.brl;
    const change24h = data.market_data.price_change_percentage_24h;
    const marketCap = data.market_data.market_cap.brl;

    return (
        <Card className="m-2 w-100 shadow-sm">
            <Card.Body>
                <Card.Title className="d-flex align-items-center justify-content-between">
                    <span>
                        <img
                            src={data.image.thumb}
                            alt={`${data.name} logo`}
                            className="me-2"
                            style={{ width: '24px', height: '24px' }}
                        />
                        {data.name} ({data.symbol.toUpperCase()})
                    </span>
                </Card.Title>
                <Card.Text>
                    <strong>Preço:</strong> R$ {price.toLocaleString('pt-BR')} <br />
                    <strong>Variação 24h:</strong>{' '}
                    <span className={change24h >= 0 ? 'text-success' : 'text-danger'}>
                        {typeof change24h === 'number' ? change24h.toFixed(2) : '--'}%
                    </span>
                    <br />
                    <strong>Market Cap:</strong> R$ {marketCap.toLocaleString('pt-BR')}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}
export default CryptoCard;
