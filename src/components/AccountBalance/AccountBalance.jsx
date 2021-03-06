import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Section = styled.section `
    font-size: 2rem;
    text-align: left;
    padding: 1.5rem, 0rem, 1.5rem, 5rem;
`


export default class AccountBalance extends Component {
    
    constructor(props){
        super(props);
        this.changeButtonstate = this.changeButtonstate.bind(this);
        }
       
    
  
   changeButtonstate(event) {
      event.preventDefault();
      this.props.handleDisplayChange(this.props.showBalance);
       
   } 
    
    
    
    render() {
        const buttonText = this.props.showBalance ? 'Hide Balance': 'Show Balance';
        let content = null;
        if (this.props.showBalance){
        content= <>Balance: ${this.props.amount} </>;
    }
        return (
            <Section>
                {content} 
                <button onClick={this.changeButtonstate}>{buttonText}</button>
            </Section>
            
        )
    }
}

AccountBalance.propTypes = { 
    amount: PropTypes.number.isRequired
}

