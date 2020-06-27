import React from 'react'
import { connect } from 'react-redux'

import Product from './Product'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

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
            <Container as="section" className="products">
                <Row>
                { isLoaded ? this.renderProducts() : 'Loading...' }
                </Row>
            </Container>
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