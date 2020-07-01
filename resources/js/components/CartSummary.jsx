import React from 'react'

import { connect } from 'react-redux'

import { Link } from 'react-router-dom'

import { Cart as CartIcon } from 'react-bootstrap-icons';

import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'

import PriceFormat from './PriceFormat'

class CartSummary extends React.Component {

    renderLoading() {
        return <Spinner animation="border" variant="primary" size="sm" />;
    }

    renderEmpty() {
        return <></>;
    }

    renderFilled() {
        const itemsCount = this.props.data.products.reduce((x, y) => x + y.amount, 0);
        const statusString = itemsCount + ' item' + (itemsCount > 1 ? 's' : '') + ' for ';
        
        return (
            <>
            <strong>
            {statusString}
            <PriceFormat price={this.props.data.products_cost} />
            </strong>
            <Button as={Link} to="/cart" size="sm" variant="success" className="ml-3 d-inline-block">
                <CartIcon /> Order
            </Button>
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
            <div className="cart-summary">
                {this.props.isLoading ? this.renderLoading() : (this.props.data.products.length > 0 ? this.renderFilled() : this.renderEmpty())}
            </div>
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

export default connect(mapStateToProps, null)(CartSummary);