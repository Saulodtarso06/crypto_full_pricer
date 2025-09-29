# Crypto Full Pricer - V1.0.0

**Crypto Full Pricer** É um painel web interativo feito em React que exibe cotações em tempo real de criptomoedas populares (como Bitcoin, Ethereum, Dogecoin, Litecoin e Solana) usando dados da API pública CoinGecko.

---

## Funcionalidades

- 🔁 Atualização automática de preços em tempo real
- 📊 Exibição de:
  - Nome e símbolo da moeda
  - Ícone/logo da moeda
  - Cotação atual
  - Variação de preço em 24h e 7 dias
  - Volume de negociação
  - Market Cap
  - Gráfico Sparkline (mini-histórico)
- 🔍 Filtros por nome, valor e variação
- 📂 Botão de "Selecionar todas / nenhuma"
- 📤 Exportação para Excel (.xlsx) e CSV
- 💡 Suporte a múltiplas moedas (personalizável)

---

## Tecnologias Utilizadas

### Frontend
- **React.js**
- **Chart.js** 
- **Bootstrap 5**
- **HTML5 / CSS3 / JavaScript**

### Backend
- **Node.js + Express** (para APIs locais ou controle de autenticação)
- Integração com **CoinGecko API** e demais API's públicas de criptomoedas.89

- `xlsx` para exportação de planilhas
- `dotenv` para variáveis sensíveis

---

### Pré-requisitos

- Node.js v16+
- npm ou yarn

---

## Demonstração da tela

<div align="center">
  <img src="src/assets/tela_print.PNG" 
  width="1280px">
   <em>Painel principal</em>
</div>

---

## Como Rodar o Projeto Localmente

### Passos

```bash
# 1. Clone o repositório
git clone https://github.com/Saulodtarso06/crypto_full_pricer.git

# 2. Acesse o diretório do projeto
cd crypto-full-pricer

# 3. Instale as dependências
npm install

# 4. Rode o projeto
npm start
```
---
## 📁 Estrutura do Projeto
```
crypto_full_pricer_V1.0.0/
├── public/
├── src/
│   ├── components/
│   │   ├── CryptoCard.jsx      # Card individual de criptomoeda
│   │   ├── CryptoChart.jsx     # Mini gráfico (sparkline)
│   │   └── Header.jsx          # Cabeçalho do painel
│   ├── services/
│   │   └── api.js              # Conexão com API CoinGecko
│   ├── utils/
│   │   └── format.js           # Helpers de formatação
│   ├── App.css
│   ├── App.js
│   └── index.js

```
---
## Próximas atualizações

* Adicionar o gráfico sparkline com CryptoChart

* Criar botão de exportar CSV

* Implementar auto atualização dos dados

* Personalizar com temas escuros/claro, ícones, etc.
---
### Este projeto foi inicializado com [Create React App](https://github.com/facebook/create-react-app).

### Scripts Disponíveis para rodar no diretório do projeto:

### `npm start`

Executa o aplicativo no modo de desenvolvimento.\
Abra [http://localhost:3000](http://localhost:3000) para visualizá-lo no seu navegador.

A página será recarregada quando você fizer alterações.\
Você também pode ver erros de lint no console.

### `npm test`

Inicia o executor de testes no modo de observação interativo.\
Consulte a seção sobre [execução de testes](https://facebook.github.io/create-react-app/docs/running-tests) para obter mais informações.

### `npm run build`

Cria o aplicativo para produção na pasta `build`.
Ele agrupa corretamente o React no modo de produção e otimiza a compilação para o melhor desempenho.

A compilação é minificada e os nomes dos arquivos incluem os hashes.

Seu aplicativo está pronto para ser implantado!

Consulte a seção sobre [implantação](https://facebook.github.io/create-react-app/docs/deployment) para obter mais informações.

### `npm run eject`

**Observação: esta é uma operação unidirecional. Depois de `ejetar`, você não pode voltar atrás!**

Se não estiver satisfeito com a ferramenta de compilação e as opções de configuração, você pode `ejetar` a qualquer momento. Este comando removerá a dependência de compilação única do seu projeto.

Em vez disso, ele copiará todos os arquivos de configuração e as dependências transitivas (webpack, Babel, ESLint, etc.) diretamente para o seu projeto, para que você tenha controle total sobre eles. Todos os comandos, exceto `eject`, continuarão funcionando, mas apontarão para os scripts copiados para que você possa ajustá-los. Neste ponto, você está por conta própria.

Você não precisa usar `eject`. O conjunto de recursos selecionados é adequado para implantações de pequeno e médio porte, e você não deve se sentir obrigado a usá-lo. No entanto, entendemos que esta ferramenta não seria útil se você não pudesse personalizá-la quando estiver pronto para usá-la.

## Autor do projeto
Saulo de Tarso - Desenvolvedor Fullstack Jr.

🔗Linkedin: https://www.linkedin.com/in/saulo-de-tarso-8a2b00133/

📧 saulo.detarso06@yahoo.com.br

⚠ Este projeto foi desenvolvido com objetivo didáticos, use com responbilidade !!!.