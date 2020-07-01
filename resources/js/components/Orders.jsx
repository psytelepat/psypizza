import React from 'react'

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
        this._loadOrders();
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
        .catch((message, json) => { this.setState({isLoading: false, isError: message}); })
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

        return (
            <Container>
                {this.state.orders.map((order) => {
                    return (
                        <Row key={order.id}>
                            <Col>{order.id}</Col>
                            <Col>{order.number}</Col>
                            <Col>{order.name} {order.surname}</Col>
                            <Col>{order.email}</Col>
                            <Col>{order.phone}</Col>
                            <Col><PriceFormat price={order.cart.cost} forceCurrency={order.cart.currency} /></Col>
                        </Row>
                    );
                })}
            </Container>
        );
    }
}

export default Orders;