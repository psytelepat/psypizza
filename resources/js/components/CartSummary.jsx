import React from 'react'

import { connect } from 'react-redux'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'

class CartSummary extends React.Component {

    renderLoading() {
        return <Spinner animation="border" variant="primary" size="sm" />;
    }

    renderEmpty() {
        return <>Empty cart.</>;
    }

    renderFilled() {
        const itemsCount = this.props.data.products.reduce((x, y) => x + y.amount, 0);
        const statusString = itemsCount + ' items for €' + this.props.data.cost;
        
        return (
            <>
            {statusString}<br />
            <Button size="sm" onClick={this.flushCart.bind(this)}>Flush cart</Button>
            </>
        );
    }

    flushCart() {
        if (confirm('Are you sure?')) {
            this.props.flushCart();
        }
    }

    render() {
        return (
            <div className="cart">
                {this.props.isLoading ? this.renderLoading() : (this.props.data.products.length > 0 ? this.renderFilled() : this.renderEmpty())}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        connections: state.cart.connections,
        isLoading: state.cart.isLoading,
        isLoaded: state.cart.isLoaded,
        isError: state.cart.isError,
        data: state.cart.data,
    }
}

const mapDispatchToProps = dispatch => {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(CartSummary);