import React from 'react'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom'

import { Cart as CartIcon, X as RemoveIcon } from 'react-bootstrap-icons'

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

import PriceFormat from './PriceFormat'

import { orderClear } from './actions'

class Cart extends React.Component {

    renderEmpty() {
        return (
            <Container align="center" className="p-5">
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
            <>
            <Container>
                <h3>Your cart</h3>
                <p>You have a brilliant taste! Did you forget something?</p>
                {this.props.products.map((product) => {
                    return (
                        <Row key={product.product_id} className="mb-5">
                            <Col sm="3">
                                {product.image && <Figure.Image src={'/storage/products/images/' + product.image} alt={product.name} className="float-left" />}
                            </Col>
                            <Col sm="6">
                                <p className="h4">{product.name}</p>
                                <PriceFormat as="div" className="h6" price={product.price} />
                                <p className="mt-3">{product.description}</p>
                                <Button variant="danger" size="sm" onClick={() => this.onAmountChange(product.product_id, 0)}><RemoveIcon size={16} /> Remove</Button>
                            </Col>
                            <Col sm="3" className="cart-product-amount">
                                <PriceFormat as="div" className="h5" price={product.cost} />
                                {product.discount > 0 && <p>Discount: <PriceFormat price={product.discount} /></p>}
                                <AmountControl className="mt-3" amount={product.amount} onChange={(amount) => this.onAmountChange(product.product_id, amount)} />
                            </Col>
                        </Row>
                    );
                })}
            </Container>
            <Container>
                <Row>
                    <Col>
                        <PriceFormat as="div" price={this.props.original_products_cost} prepend="Goods: " />
                        <PriceFormat as="div" price={this.props.delivery_price} prepend="Delivery: " />
                        {this.props.discount > 0 &&<PriceFormat as="div" price={this.props.discount} prepend="Discount: " />}
                        <PriceFormat as="div" className="h2" price={this.props.cost} prepend="Total: " />
                    </Col>
                </Row>
            </Container>
            </>
        );
    }

    render() {
        const { products, order } = this.props;
        const isEmpty = products.length < 1;
        
        if (order && order.id) {
            return (
                <Container align="center" className="pt-5 pb-5">
                    <div className="h3 pb-3">Thank you for your purchase!</div>
                    <p className="pb-3">Check your mailbox for a confirmation e-mail.</p>
                    <Figure.Image src='/images/purchase.gif' className="d-block" />
                    <Button as={Link} className="mt-3" to={"/orders/" + order.id + "/" + order.token} onClick={this.props.onClickViewOrder}>View order</Button>
                </Container>
            );
        }

        return (
            <Container fluid>
                {isEmpty ? this.renderEmpty() : this.renderFilled()}
                {!isEmpty && (
                <>
                    <Container className="mt-5">
                        <Row>
                            <Col sm={12} lg={6} className="delivery-methods-form">
                                <DeliveryMethodsForm setDeliveryMethod={this.props.setDeliveryMethod} />
                            </Col>
                            <Col sm={12} lg={6} className="promocode-form">
                                <PromocodeForm setPromocode={this.props.setPromocode} removePromocode={this.props.removePromocode} />
                            </Col>
                        </Row>
                    </Container>
                    <OrderForm placeOrder={this.props.placeOrder} />
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
        original_products_cost: data.original_products_cost,
        products_cost: data.products_cost,
        delivery_price: data.delivery_price,
        original_cost: data.original_cost,
        discount: data.discount,
        cost: data.cost,
        order: state.order,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onClickViewOrder: id => {
            dispatch(orderClear())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);