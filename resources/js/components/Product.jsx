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
            amountFocused: false,
            skipDerived: false,
        };

        this.debounceTimeout = null;
        this.updateAmountFromState = this.updateAmountFromState.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        return {
            amount: (props.cartLoading || state.skipDerived) ? state.amount : props.amount,
            skipDerived: false,
        };
    }

    onPlus() {
        let amount = this.state.amount + 1;
        this.setState({amount: amount, skipDerived: true})
        this.requestAdmountUpdateDebounced();
    }

    onMinus() {
        let amount = this.state.amount - 1;
        if (amount > 0) {
            this.setState({amount: amount, skipDerived: true});
            this.requestAdmountUpdateDebounced();
        } else if (amount == 0) {
            this.setState({amount: amount, skipDerived: true});
            this.requestAdmountUpdateDebounced();
        }
    }

    requestAdmountUpdateDebounced() {
        if (this.debounceTimeout) {
            clearTimeout(this.debounceTimeout);
            this.debounceTimeout = null;
        }

        this.debounceTimeout = setTimeout(this.updateAmountFromState, 350);
    }

    updateAmountFromState() {
        if (this.state.amount > 0) {
            this.props.setToCart(this.props.product.id, this.state.amount);
        } else {
            this.props.removeFromCart(this.props.product.id);
        }
    }

    onChange(event) {
        this.setState({amount: parseInt(event.target.value)||"", skipDerived: true})
    }

    onFocus(event) {
        this.setState({amountFocused: true})
    }

    onBlur(event) {
        let amount = parseInt(event.target.value)||0;
        if (amount > 0) {
            this.setState({amount: amount, amountFocused: false, skipDerived: true})
            this.requestAdmountUpdateDebounced();
        } else if (amount == 0) {
            this.setState({amount: amount, amountFocused: false, skipDerived: true})
            this.requestAdmountUpdateDebounced();
        } else {
            this.setState({amountFocused: false})
        }
    }

    render() {
        const { id, name, description, price } = this.props.product;
        const image = "/images/pizza.jpg";
        const showAmountInput = this.state.amountFocused || this.state.amount > 0;

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
                            showAmountInput
                            ?
                            <InputGroup size="sm" style={{width: "100px"}} className="float-right align-middle">
                                <InputGroup.Prepend>
                                        <Button variant="success" onClick={this.onMinus.bind(this)}><Dash /></Button>
                                </InputGroup.Prepend>
                                <FormControl type="number" value={this.state.amount} onChange={this.onChange.bind(this)} onFocus={this.onFocus.bind(this)} onBlur={this.onBlur.bind(this)} />
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
        cartLoading: state.cart.isLoading,
        amount: amount,
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