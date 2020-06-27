import React from 'react'
import { connect } from 'react-redux'
import Button from 'react-bootstrap/Button'
import { cartSetProduct, cartRemoveProduct } from './actions';
import { Cart, CartCheck, Plus, Dash } from 'react-bootstrap-icons';

import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

class Product extends React.Component {
    constructor(props, context) {
        super(props, context);
        
        this.state = {
            amount: props.amount,
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            amount: nextProps.amount,
        };
    }

    onPlus() {
        let amount = this.state.amount + 1;
        this.setState({amount: amount})
        this.props.setToCart(this.props.product.id, amount);
    }

    onMinus() {
        let amount = this.props.amount - 1;
        if (amount > 0) {
            this.setState({amount: amount})
            this.props.setToCart(this.props.product.id, amount);
        } else if (amount == 0) {
            this.setState({amount: amount})
            this.props.removeFromCart(this.props.product.id);
        }
    }

    onChange() {
        this.setState({amount: parseInt(amount)})
    }

    onBlur(event) {
        let amount = this.state;
        if (amount > 0) {
            this.setState({amount: amount})
            this.props.setToCart(this.props.product.id, amount);
        } else if (amount == 0) {
            this.setState({amount: amount})
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
                        <span>€ {price}</span>
                        { 
                            this.props.amount
                            ?
                            <InputGroup size="sm" style={{width: "100px"}} className="float-right align-middle">
                                <InputGroup.Prepend>
                                        <Button variant="success" onClick={this.onMinus.bind(this)}><Dash /></Button>
                                </InputGroup.Prepend>
                                <FormControl type="number" ref={this.inputRef} value={this.state.amount} onChange={this.onChange.bind(this)} onBlur={this.onBlur.bind(this)} />
                                <InputGroup.Append>
                                    <Button variant="success" onClick={this.onPlus.bind(this)}><Plus /></Button>
                                </InputGroup.Append>
                            </InputGroup>
                            :
                            <Button variant="success" size="sm" title={name} onClick={this.onPlus.bind(this)} className="float-right align-middle"><Cart /></Button>
                        }
                    </Card.Footer>
                </Card>
            </Col>
        );
    }
}

const mapStateToProps = (state, props) => {

    let cartProduct = null;
    if(state.cart && state.cart.data && state.cart.data.products && state.cart.data.products.length > 0) {
        cartProduct = state.cart.data.products.reduce((x, y) => (y.product_id == props.product.id) ? y : (x && (x.product_id == props.product.id) ? x : null));
    }

    return {
        amount: cartProduct ? cartProduct.amount : 0,
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

export default connect(mapStateToProps, null)(Product);