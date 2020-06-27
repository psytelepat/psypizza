import React from 'react'
import { connect } from 'react-redux'
import Button from 'react-bootstrap/Button'
import { cartSetProduct, cartRemoveProduct } from './actions';

import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'

class Product extends React.Component {
    render() {
        const { id, name, description, amount } = this.props.product;
        const image = "/images/pizza.jpg";

        let cartProduct = null;
        if (
            this.props.cart &&
            typeof this.props.cart.data != 'undefined' && this.props.cart.data &&
            typeof this.props.cart.data.products != 'undefined' && this.props.cart.data.products
        ) {
            for (var i in this.props.cart.data.products) {
                if (this.props.cart.data.products[i].product_id == id) {
                    cartProduct = this.props.cart.data.products[i];
                    break;
                }
            }
        }

        return (
            <Col lg={3} md={4} sm={6} xs={12}>
                <div className="product">
                    <div className="info">
                        <div className="image"><Image src={image} /></div>
                        <div className="title">{name}</div>
                        <p className="description">{description}</p>
                    </div>
                </div>
                <div className="controls">
                    { 
                        cartProduct
                        ?
                        <Button size="sm" variant="secondary" onClick={() => this.props.removeFromCart(id)}>Remove from cart</Button>
                        :
                        <Button size="sm" variant="primary" onClick={() => this.props.setToCart(id, 1)}>Add to cart</Button>
                    }
                </div>
            </Col>
        );
    }
}

const mapStateToProps = state => {
    return {
        cart: state.cart,
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