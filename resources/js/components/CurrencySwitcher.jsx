import React from 'react'
import { connect } from 'react-redux'

import Nav from 'react-bootstrap/Nav'

class CurrencySwitch extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeKey: 'EUR'
        }
    }

    onSelect(key) {
        this.setState({activeKey: key})
        this.props.setCurrency(key);
    }

    render() {
        return (
            <Nav className="currency-switcher" variant="pills" defaultActiveKey="EUR" activeKey={this.state.activeKey} onSelect={this.onSelect.bind(this)}>
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
        currency: state.cart.currency,
        exchangeRate: state.cart.exchange_rate,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSelect: id => {
            dispatch(categoriesSelect(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrencySwitch);