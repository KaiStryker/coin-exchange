import React, {useState, useEffect} from 'react';
import CoinList from './components/CoinList/CoinList';
import AccountBalance from './components/AccountBalance/AccountBalance'
import Header from './components/Header/Header'
import styled from 'styled-components'
import axios from 'axios'

const Div = styled.div `
  text-align: center;
  background-color: rgb(55, 119, 119);
  color: #cccccc;
`

const COIN_COUNT = 10;
const formatPrice = price => parseFloat(Number(price.toFixed(4)));

function App (props){
  
  const [balance,setBalance] = useState(10000);
  const [coinData,setCoinData] = useState([]);
  const [showBalance,setshowBalance] = useState(true);

  const componentDidMount = async() => {
    const response = await axios.get('https://api.coinpaprika.com/v1/coins')
    const coinIds = response.data.slice(0, COIN_COUNT).map(coin => coin.id);
    const tickerUrl ='https://api.coinpaprika.com/v1/tickers/';
    const promises = coinIds.map(id => axios.get(tickerUrl + id));
    const coinData = await Promise.all(promises)
    const coinPriceData = coinData.map(function(response){
      const coin = response.data;
      return {
        key: coin.id,
        name: coin.name,
        ticker: coin.symbol,
        balance:0,
        price: formatPrice(coin.quotes.USD.price),
      };
    })
    //Retrieve the prices
    setCoinData(coinPriceData);
  }

  useEffect(() => {
    if (coinData.length === 0){
      componentDidMount();
      }
    }
  )

  const handleRefresh = async (valueChangeId) => {
    const tickerUrl =`https://api.coinpaprika.com/v1/tickers/${valueChangeId}`;
    const response = await axios.get(tickerUrl);
    const newPrice = formatPrice(response.data.quotes.USD.price);
    const newCoinData = coinData.map(function(values){
    let newValues = { ...values};
    if (valueChangeId === values.key ) {
        newValues.price = newPrice;  
      }
      return newValues;
      });
      setCoinData(newCoinData);
  }

  const handleDisplayChange = () => {
    setshowBalance(oldValue => !oldValue);
}

  const handleBalanceChange = () => {
    setBalance(balance + 2000);
  }

    return (
      <Div>
        <Header />
        <AccountBalance amount = {balance} 
         showBalance={showBalance} 
         handleDisplayChange ={handleDisplayChange}
         handleBalanceChange = {handleBalanceChange}/>
        <CoinList coinData = {coinData} 
         handleRefresh={handleRefresh}
         showBalance={showBalance} />
      </Div>
    );
}

export default App;
