import React from 'react'

import Product from './Product'

import { connect } from 'react-redux'

class Products extends React.Component {
    renderProducts() {
        return this.props.data.filter(product => product.category_id == this.props.selectedCategoryId)
            .map((product) => <Product
                key={product.id}
                product={product}
                setToCart={this.props.setToCart}
                removeFromCart={this.props.removeFromCart}
            />);
    }

    render() {
        const { isLoaded } = this.props;
        return (
            <section className="container menu">
                <div className="row products">
                { isLoaded ? this.renderProducts() : 'Loading...' }
                </div>
            </section>
        );
    }
}

const mapStateToProps = state => {
    return {
        selectedCategoryId: state.categories.selected,
        isLoading: state.products.isLoading,
        isLoaded: state.products.isLoaded,
        isError: state.products.isError,
        data: state.products.data,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddToCart: (id, amount) => {
            dispatch(addToCart(id, amount));
        },
        onRemoveFromCart: (id) => {
            dispatch(removeFromCart(id, amount));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);