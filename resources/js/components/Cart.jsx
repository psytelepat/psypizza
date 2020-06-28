import React from 'react'
import { connect } from 'react-redux'

import { Cart as CartIcon } from 'react-bootstrap-icons'

import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Figure from 'react-bootstrap/Figure'

import Spinner from 'react-bootstrap/Spinner'
import AmountControl from './AmountControl'

import PromocodeForm from './PromocodeForm'
import OrderForm from './OrderForm'
import DeliveryMethodsForm from './DeliveryMethodsForm'

class Cart extends React.Component {

    renderEmpty() {
        return (
            <Container align="center">
                <h3>Your shopping cart is empty right now</h3>
                <p>Please put something into your cart by clicking <Button size="sm" variant="success"><CartIcon /></Button> button on the product card to proceed.</p>
            </Container>
        );
    }

    onAmountChange(id, amount) {
        if (amount > 0) {
            this.props.setToCart(id, amount);
        } else {
            this.props.removeFromCart(id);
        }
    }

    renderFilled() {
        return (
            <Container>
                <h3>Your cart</h3>
                <p>You have a brilliant taste! Did you forget something?</p>
                {this.props.products.map((product) => {
                    return (
                        <Row key={product.product_id} className="mb-5">
                            <Col sm="3">
                                <Figure.Image src="/images/pizza.jpg" width={100} alt={product.name} className="float-left" />
                            </Col>
                            <Col sm="9">
                                
                                <p className="h4">{product.name}</p>

                                <p className="h5">€{product.cost}</p>
                                <p className="h6">€{product.price}</p>
                                {product.discount > 0 && <p>Discount: €{product.discount}</p>}

                                <AmountControl amount={product.amount} onChange={(amount) => this.onAmountChange(product.product_id, amount)} />
                            </Col>
                        </Row>
                    );
                })}
            </Container>
        );
    }

    render() {
        const { products } = this.props;
        const isEmpty = products.length < 1;

        return (
            <Container fluid>
                {isEmpty ? this.renderEmpty() : this.renderFilled()}
                {!isEmpty && (
                <>
                    <Container className="mt-5">
                        <Row>
                            <Col sm={12} lg={6}>
                                <PromocodeForm setPromocode={this.props.setPromocode} removePromocode={this.props.removePromocode} />
                            </Col>
                            <Col sm={12} lg={6}>
                                <DeliveryMethodsForm setDeliveryMethod={this.props.setDeliveryMethod} />
                            </Col>
                        </Row>
                    </Container>
                    <OrderForm />
                </>
                )}
            </Container>
        );
    }
}

const mapStateToProps = (state, props) => {
    const { data } = state.cart;
    return {
        products: data.products,
        original_cost: data.original_cost,
        discount: data.discount,
        cost: data.cost,
    }
}

export default connect(mapStateToProps, null)(Cart);