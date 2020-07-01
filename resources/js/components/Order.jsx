import React from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Figure from 'react-bootstrap/Figure'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

import processResponse from './processResponse'
import PriceFormat from './PriceFormat'

class Order extends React.Component {

    constructor(props) {
        super(props);

        this.id = props.match.params.id;
        this.order_token = props.match.params.order_token;

        this.state = {
            isLoading: false,
            isLoaded: false,
            data: {}
        };
    }

    componentDidMount() {
        this._loadOrder();
    }

    _loadOrder() {
        this.setState({isLoading: true});
        fetch('/api/orders/' + this.id + '?order_token=' + this.order_token, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then(processResponse)
        .then((json) => {this.setState({isLoading: false, isLoaded: true, data: json.data})})
        .catch((err) => {this.setState({isLoading: false})})
    }

    renderDetails(order) {
        return (
            <Container className="mb-5">
                <h4>Details</h4>
                <Row><Col>{order.name} {order.surname}</Col></Row>
                <Row><Col>{order.email}</Col></Row>
                <Row><Col>{order.phone}</Col></Row>
                <Row><Col>{order.address}</Col></Row>
            </Container>
        );
    }

    renderTotals(cart) {
        const { currency, promocode, delivery_method } = cart;
        return (
            <Container className="mb-5">
                <Row><Col>Promocode: {promocode.code} (-{promocode.discount}%)</Col></Row>
                <Row><Col>Goods: <PriceFormat price={cart.original_products_cost} forceCurrency={currency} /></Col></Row>
                <Row><Col>Discount: <PriceFormat price={cart.discount} forceCurrency={currency} /></Col></Row>
                <Row><Col>Delivery: <PriceFormat price={cart.delivery_price} forceCurrency={currency} /> ({delivery_method.name})</Col></Row>
                <Row><Col>Total: <PriceFormat price={cart.cost} forceCurrency={currency} /></Col></Row>
            </Container>
        );
    }

    renderProducts(products, currency) {
        return <Container>
                <h4>Shopping list</h4>
            {products.map((product) => {
                    return (
                        <Row key={product.product_id} className="mb-5">
                            <Col sm="3">
                                {product.image && <Figure.Image src={'/storage/products/images/' + product.image} alt={product.name} className="float-left" />}
                            </Col>
                            <Col sm="6">
                                <p className="h4">{product.name}</p>
                                <PriceFormat as="div" className="h6" price={product.price} forceCurrency={currency} prepend={product.amount + " × "} />
                                <p className="mt-3">{product.description}</p>
                            </Col>
                            <Col sm="3">
                                <PriceFormat as="div" className="h5" price={product.cost} forceCurrency={currency} />
                                {product.discount > 0 && <p>Discount: <PriceFormat price={product.discount} forceCurrency={currency} /></p>}
                            </Col>
                        </Row>
                    );
                })}
        </Container>;
    }

    render() {
        if (!this.state.isLoaded) {
            return <Container align="center">
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </Container>;
        }

        const order = this.state.data;
        const { cart } = order;
        const { products } = cart;

        return(
            <>
            {this.renderDetails(order)}
            {this.renderTotals(cart)}
            {this.renderProducts(products, cart.currency)}
            </>
        );
    }
}

export default Order;