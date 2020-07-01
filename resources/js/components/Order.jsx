import React from 'react'

import { Link } from 'react-router-dom'
import { List as ListIcon } from 'react-bootstrap-icons'

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
        this.props.api_token ? this._loadOrderWithToken() : this._loadOrder();
    }

    _loadOrderWithToken() {
        this.setState({isLoading: true});
        fetch('/api/orders/' + this.id + '?order_token=' + (this.order_token ?? ""), {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.props.api_token,
            }
        })
        .then(processResponse)
        .then((json) => {this.setState({isLoading: false, isLoaded: true, data: json.data})})
        .catch(({message, json, response}) => { this.setState({isLoading: false, isError: message}); })
    }

    _loadOrder() {
        this.setState({isLoading: true});
        fetch('/orders/' + this.id + '/' + (this.order_token ?? ""), {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then(processResponse)
        .then((json) => {this.setState({isLoading: false, isLoaded: true, data: json})})
        .catch(() => {this.setState({isLoading: false})})
    }

    renderDetails(order) {
        return (
            <>
            <strong>{order.name} {order.surname}</strong><br/>
            <strong>{order.email}</strong><br/>
            <strong>{order.phone}</strong><br/>
            Address: <strong>{order.address}</strong>
            </>
        );
    }

    renderTotals(cart) {
        const { currency, promocode, delivery_method } = cart;
        return (
            <>
            {!!promocode && <>Promocode: {promocode.code} (-{promocode.discount}%)<br/></>}
            Goods: <PriceFormat price={cart.original_products_cost} forceCurrency={currency} /><br/>
            {cart.discount > 0 && <>Discount: <PriceFormat price={cart.discount} forceCurrency={currency} /><br/></>}
            Delivery: <PriceFormat price={cart.delivery_price} forceCurrency={currency} /> ({delivery_method.name})<br/>
            Total: <strong><PriceFormat price={cart.cost} forceCurrency={currency} /></strong>
            </>
        );
    }

    renderProducts(products, currency) {
        return <Container>
                <div className="h4 mb-3">Shopping list</div>
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

        const { is_admin } = this.props;
        const order = this.state.data;
        const { cart } = order;
        const { products } = cart;

        return(
            <>
            <Container align="center" className="pb-3">
                <h1>Order {order.number}</h1>
                <p>{order.created_at}</p>
            </Container>
            <Container className="mb-5">
                <div className="h4 mb-3">Details</div>
                <Row>
                    <Col>{this.renderDetails(order)}</Col>
                    <Col>{this.renderTotals(cart)}</Col>
                </Row>
            </Container>
            {this.renderProducts(products, cart.currency)}
            {!this.order_token && <Container align="center" className="pb-5">
                <Button as={Link} to={(is_admin ? '/admin' : '') + '/orders'}><ListIcon /> Back to list</Button>
            </Container>}
            </>
        );
    }
}

export default Order;