import React from 'react';
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
//import { v4 as uuidv4} from 'uuid'
const COIN_COUNT = 10;

class App extends React.Component {
  state = {
    balance: 10000,
    coinData: [
        /* {
          name: 'Bitcoin',
          ticker: 'BTC',
          price: 9999.99,
          balance: 0.5,
        },
        {
          name: 'Ethereum',
          ticker: 'ETH',
          price: 299.99,
          balance: 32.0,
        },
        {
          name: 'Tether',
          ticker: 'USDT',
          price: 1.0,
          balance: 0,
        },
        {
          name: 'Ripple',
          ticker:'XRP',
          price: 0.2,
          balance: 1000, 
        },
        {
          name: 'Bitcoin Cash',
          ticker:'BCH',
          price: 298.99,
          balance:0,
        }
*/
          // <Coin name="Bitcoin" ticker= "BTC" price = {9999.99} /> 
          // <Coin name="Ethereum" ticker= "ETH" price = {299.99} /> 
          // <Coin name="Tether" ticker="USDT" price={1.0}/>
          // <Coin name="Ripple" ticker="XRP" price={0.2}/>

    ],
    showBalance: true
  }
  componentDidMount = async() => {
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
        price: parseFloat(Number(coin.quotes.USD.price).toFixed(4)),
      };
    })
    //Retrieve the prices
    this.setState({coinData: coinPriceData});
  
  }

  handleRefresh = (valueChangeTicker) => {
   const newCoinData = this.state.coinData.map(function({ticker, name, price, balance, oldBalance}){
    let newPrice = price; 
    if (valueChangeTicker === ticker ) {
      const randomPercentage = 0.995 + Math.random() * 0.01;   
         newPrice = newPrice * randomPercentage
      }
      return {
        ticker,
        name,
        price: newPrice,
        balance,
      }
      });
 
      this.setState({ coinData: newCoinData});
  }
  handleDisplayChange = () => {
    this.setState(function(oldState) {
      return{
        ...oldState,
        showBalance: !oldState.showBalance
      }
  
  });
}
  render(){
    return (
      <Div>
        <Header />
        <AccountBalance amount = {this.state.balance} 
         showBalance={this.state.showBalance} 
         handleDisplayChange ={this.handleDisplayChange}/>
        <CoinList coinData = {this.state.coinData} 
         handleRefresh={this.handleRefresh}
         showBalance={this.state.showBalance} />
      </Div>
    );
  }
}

export default App;
