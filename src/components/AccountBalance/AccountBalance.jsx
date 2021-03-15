import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Section = styled.section `
    font-size: 2rem;
    text-align: center;
    margin-bottom: 2rem;
    line-height: 3rem;
    display: inline-block;

`
const Button = styled.button `
    margin: 0 8px;
`
const BalanceToggleButton = styled(Button)`
    width: 150px;
`

const Balance = styled.div `
    min-width: 250px;
    margin: 0.5rem 0 0 2.5rem
    font-size: 1.5em;
    vertical-align: middle;
    text-align: left;
`
var formatter = Intl.NumberFormat('en-us', {
    style: 'currency',
    currency: 'USD'
});

export default function AccountBalance(props){

   const changeButtonstate = (event) => {
      event.preventDefault();
      props.handleDisplayChange(props.showBalance);
       
   }

   const updateBalance = (event) => {
      event.preventDefault();
      props.handleBalanceChange();
    
 } 


        const buttonText = props.showBalance ? 'Hide Balance': 'Show Balance';
        let content = '\u00A0';
        if (props.showBalance){
            content= <>{formatter.format(props.amount)} </>;
        }
        const buttonclass = 'btn ' + (props.showBalance ? 'btn-warning' : 'btn-info')
        const buttonclass2 = 'btn btn-success'
    
        return (
        <>
            <Balance>{content}</Balance>
            <Section>
                <BalanceToggleButton onClick={changeButtonstate} className={buttonclass}>{buttonText}</BalanceToggleButton>
                <Button onClick={updateBalance} className={buttonclass2}><i className="fas fa-helicopter"></i> Add Funds </Button>
            </Section>

        </>
        );
    
}

AccountBalance.propTypes = { 
    amount: PropTypes.number.isRequired
}

