import React from 'react'
import { connect } from 'react-redux'
import { cartSetProduct, cartRemoveProduct } from './actions';

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
            <div className="col-sm-3 product">
                <div className="info">
                    <div className="image"><img src={image} /></div>
                    <div className="title">{name}</div>
                    <p className="description">{description}</p>
                </div>
                <div className="controls">
                    { 
                        cartProduct
                        ?
                        <button className="btn btn-sm btn-primary" onClick={() => this.props.removeFromCart(id)}>Remove from cart</button>
                        :
                        <button className="btn btn-sm btn-primary" onClick={() => this.props.setToCart(id, 1)}>Add to cart</button>
                    }
                </div>
            </div>
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