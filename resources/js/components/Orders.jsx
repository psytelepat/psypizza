import React from 'react'

import { Link } from 'react-router-dom'
import { EyeFill } from 'react-bootstrap-icons'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Figure from 'react-bootstrap/Figure'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

import processResponse from './processResponse'
import PriceFormat from './PriceFormat'

class Orders extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            isLoaded: false,
            isError: null,
            orders: {}
        };
    }

    componentDidMount() {
        this.props.api_token ? this._loadOrdersWithToken() : this._loadOrders();
    }

    _loadOrdersWithToken() {
        this.setState({isLoading: true});
        fetch('/api/orders', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.props.api_token,
            }
        })
        .then(processResponse)
        .then((json) => {this.setState({isLoading: false, isLoaded: true, orders: json.data})})
        .catch(({message, json, response}) => { this.setState({isLoading: false, isError: message}); })
    }

    _loadOrders() {
        this.setState({isLoading: true});
        fetch('/orders', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then(processResponse)
        .then((json) => {this.setState({isLoading: false, isLoaded: true, orders: json})})
        .catch(({message, json, response}) => { this.setState({isLoading: false, isError: message}); })
    }

    render() {
        if (this.state.isLoading) {
            return <Container align="center">
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </Container>;
        }

        if(this.state.isError) {
            return <Container align="center">{this.state.isError}</Container>;
        }

        if(!this.state.isLoaded) {
            return null;
        }

        if(!this.state.orders.length) {
            return (
                <Container align="center">
                    <div className="h2 p-5">No orders to show.</div>
                </Container>
            );
        }

        const { is_admin } = this.props;

        return (
            <Container>
                <div className="h2 pb-3">Orders</div>
                {this.state.orders.map((order) => {
                    return (
                        <Row key={order.id} className="border-top pt-3 pb-3 border-secondary">
                            <Col>{order.number}<br/>{order.created_at}</Col>
                            <Col>{order.name} {order.surname}<br/>{order.email}<br/>{order.phone}</Col>
                            <Col><PriceFormat price={order.cart.cost} forceCurrency={order.cart.currency} /></Col>
                            <Col align="right"><Button as={Link} to={(is_admin ? '/admin' : '') + '/orders/' + order.id}><EyeFill /></Button></Col>
                        </Row>
                    );
                })}
            </Container>
        );
    }
}

export default Orders;