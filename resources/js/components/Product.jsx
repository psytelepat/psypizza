import React from 'react'
import { connect } from 'react-redux'
import Button from 'react-bootstrap/Button'
import { cartSetProduct, cartRemoveProduct } from './actions';
import { Cart as CartIcon } from 'react-bootstrap-icons';

import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import AmountControl from './AmountControl'

class Product extends React.Component {

    onAmountChange(amount) {
        if (amount > 0) {
            this.props.setToCart(this.props.product.id, amount);
        } else {
            this.props.removeFromCart(this.props.product.id);
        }
    }

    render() {
        const { id, name, description, price } = this.props.product;
        const image = "/images/pizza.jpg";

        return (
            <Col lg={3} md={4} sm={6} xs={12} style={{paddingBottom: "30px"}}>
                <Card className="product-card h-100" bg="dark">
                    <Card.Img variant="top" src={image} />
                    <Card.Body>
                        <Card.Title>{name}</Card.Title>
                        <Card.Text>{description}</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <span>€{price}</span>
                        { 
                            this.props.amount > 0
                            ?
                            <AmountControl className="float-right align-middle" amount={this.props.amount} onChange={this.onAmountChange.bind(this)} />
                            :
                            <Button variant="success" size="sm" title={name} onClick={() => this.onAmountChange(1)} className="float-right align-middle"><CartIcon /></Button>
                        }
                    </Card.Footer>
                </Card>
            </Col>
        );
    }
}

const mapStateToProps = (state, props) => {

    let amount = 0;
    if(state.cart.data.products.length > 0) {
        for (let i = 0; i < state.cart.data.products.length; i++) {
            if (state.cart.data.products[i].product_id == props.product.id) {
                amount = state.cart.data.products[i].amount;
                break;
            }
        }
    }

    return {
        amount: amount,
    }
}

export default connect(mapStateToProps, null)(Product);