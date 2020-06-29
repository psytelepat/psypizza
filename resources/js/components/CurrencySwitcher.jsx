import React from 'react'
import { connect } from 'react-redux'

import Nav from 'react-bootstrap/Nav'

class CurrencySwitch extends React.Component {
    onSelect(key) {
        this.props.setCurrency(key);
    }

    render() {
        return (
            <Nav className="currency-switcher"
                variant="pills"
                defaultActiveKey={this.props.currency}
                activeKey={this.props.currency}
                onSelect={this.onSelect.bind(this)}
            >
                <Nav.Item><Nav.Link eventKey="EUR">€</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link eventKey="USD">$</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link eventKey="RUB">₽</Nav.Link></Nav.Item>
            </Nav>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoading: state.cart.isLoading,
        currency: state.cart.data.currency,
        exchangeRate: state.cart.data.exchange_rate,
    }
}

export default connect(mapStateToProps, null)(CurrencySwitch);