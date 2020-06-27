import React from 'react'

import { connect } from 'react-redux'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

class Cart extends React.Component {
    render() {
        const data = this.props.data;
        const isVisible = data && data.products.length > 0;

        let itemsCount = 0;
        isVisible && data.products.reduce((x,y) => itemsCount += y.amount);

        return (
            <Container fluid className="cart">
                {isVisible && data.products.length + ' products ('+itemsCount+') costs ' + data.cost }
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoading: state.cart.isLoading,
        isLoaded: state.cart.isLoaded,
        isError: state.cart.isError,
        data: state.cart.data,
    }
}

const mapDispatchToProps = dispatch => {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);