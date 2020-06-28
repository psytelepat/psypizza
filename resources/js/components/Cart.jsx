import React from 'react'
import { connect } from 'react-redux'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Spinner from 'react-bootstrap/Spinner'
import AmountControl from './AmountControl'

import PromocodeForm from './PromocodeForm'
import OrderForm from './OrderForm'
import DeliveryMethodsForm from './DeliveryMethodsForm'

class Cart extends React.Component {

    renderEmpty() {
        return <Container>Empty cart.</Container>;
    }

    onAmountChange(id, amount) {
        if (amount > 0) {
            this.props.setToCart(id, amount);
        } else {
            this.props.removeFromCart(id);
        }
    }

    renderFilled() {
        return <Container>
            {this.props.products.map((product) => {
            return  <Row key={product.product_id}>
                        <Col sm="1">
                            {product.product_id}
                        </Col>
                        <Col sm="1">
                            €{product.price}
                        </Col>
                        <Col sm="3">
                            <AmountControl amount={product.amount} onChange={(amount) => this.onAmountChange(product.product_id, amount)} />
                        </Col>
                        <Col sm="1">
                            €{product.cost}
                        </Col>
                        <Col sm="3">

                        </Col>
                    </Row>;
            })}
        </Container>;
    }

    render() {
        const { isLoading, isLoaded, products } = this.props;
        const content = products.length ? this.renderFilled() : this.renderEmpty();
        return (
            <Container fluid>
                {content}
                <PromocodeForm setPromocode={this.props.setPromocode} removePromocode={this.props.removePromocode} />
                <DeliveryMethodsForm setDeliveryMethod={this.props.setDeliveryMethod} />
                <OrderForm />
            </Container>
        );
    }
}

const mapStateToProps = (state, props) => {

    const { cart } = state;

    return {
        isLoading: cart.isLoading,
        isLoaded: cart.isLoaded,
        products: cart.data.products,
        original_cost: cart.data.original_cost,
        discount: cart.data.discount,
        cost: cart.data.cost,
    }
}

// const mapDispatchToProps = dispatch => {
//     return {
//         onSetToCart: (id, amount) => {
//             dispatch(cartSetProduct(id, amount));
//         },
//         onRemoveFromCart: (id) => {
//             dispatch(removeFromCart(id));
//         },
//     }
// }

export default connect(mapStateToProps, null)(Cart);