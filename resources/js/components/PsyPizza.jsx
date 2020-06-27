import React from 'react'
import { render } from 'react-dom'

import { connect } from 'react-redux'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import psyPizzaReducer from './reducers'

const store = createStore(psyPizzaReducer)

import {
    categoriesLoading, categoriesError, categoriesLoaded,
    productsLoading, productsError, productsLoaded,
    cartLoading, cartLoaded, cartError, cartSetProduct, cartRemoveProduct,
} from './actions';

import FirstScreen from './FirstScreen'
import CartSummary from './CartSummary'
import ProductCategories from './ProductCategories'
import Products from './Products'
import Footer from './Footer'

class PsyPizza extends React.Component {
    _requestHeaders() {
        return {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector("meta[name='csrf-token']").getAttribute('content'),
        };
    }
    
    componentDidMount() {
        this._loadCategories();
        this._loadProducts();
        this._loadCart();
    }

    _loadCategories() {
        store.dispatch(categoriesLoading());

        fetch('/api/product_categories', {
            method: 'GET',
            headers: this._requestHeaders(),
        })
        .then((response) => response.json())
        .then((json) => store.dispatch(categoriesLoaded(json)))
        .catch((err) => store.dispatch(categoriesError(err)))
    }

    _loadProducts() {
        store.dispatch(productsLoading());

        fetch('/api/products', {
            method: 'GET',
            headers: this._requestHeaders(),
        })
        .then((response) => response.json())
        .then((json) => store.dispatch(productsLoaded(json)))
        .catch((err) => store.dispatch(productsError(err)))
    }

    _loadCart() {
        store.dispatch(cartLoading());

        fetch('/cart.json', {
            method: 'GET',
            headers: this._requestHeaders(),
        })
        .then((response) => response.json())
        .then((json) => store.dispatch(cartLoaded(json)))
        .catch((err) => store.dispatch(cartError(err)))
    }

    setToCart(id, amount) {
        store.dispatch(cartLoading());

        fetch('/cart/set.json', {
            method: 'POST',
            headers: this._requestHeaders(),
            body: JSON.stringify({id: id, amount: amount}),
        })
        .then((response) => response.json())
        .then((json) => store.dispatch(cartLoaded(json)))
        .catch((err) => store.dispatch(cartError(err)))
    }

    removeFromCart(id) {
        store.dispatch(cartLoading());

        fetch('/cart/remove.json', {
            method: 'POST',
            headers: this._requestHeaders(),
            body: JSON.stringify({id: id}),
        })
        .then((response) => response.json())
        .then((json) => store.dispatch(cartLoaded(json)))
        .catch((err) => store.dispatch(cartError(err)))
    }

    flushCart() {
        store.dispatch(cartLoading());

        fetch('/cart/flush.json', {
            method: 'GET',
            headers: this._requestHeaders(),
        })
        .then((response) => response.json())
        .then((json) => store.dispatch(cartLoaded(json)))
        .catch((err) => store.dispatch(cartError(err)))
    }

    render() {
        return (
            <div className="wrapper">
                <FirstScreen />
                <CartSummary flushCart={this.flushCart.bind(this)} />
                <ProductCategories />
                <Products setToCart={this.setToCart.bind(this)} removeFromCart={this.removeFromCart.bind(this)} />
                <Footer />
            </div>
        );
    }
}

export default PsyPizza;

if (document.getElementById('psypizza')) {
    render(
        <Provider store={store}>
            <PsyPizza />
        </Provider>,
        document.getElementById('psypizza')
    )
}
