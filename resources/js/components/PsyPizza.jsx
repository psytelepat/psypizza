import React from 'react'
import { render } from 'react-dom'

import { connect, Provider } from 'react-redux'
import { createStore } from 'redux'
import psyPizzaReducer from './reducers'

const store = createStore(psyPizzaReducer)

import {
    categoriesLoading, categoriesError, categoriesLoaded,
    productsLoading, productsError, productsLoaded,
    deliveryMethodsLoading, deliveryMethodsLoaded, deliveryMethodsError, deliveryMethodsSelect,
    cartLoading, cartLoaded, cartError, cartSetProduct, cartRemoveProduct,
} from './actions';

import FirstScreen from './FirstScreen'
import CurrencySwitcher from './CurrencySwitcher'
import Cart from './Cart'
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
        this._loadDeliveryMethods();
    }

    _processResponse(response){
        if (response.ok) {
            return response.json();
        } else {
            return new Promise((resolve, reject) => {
                response.json()
                .then((json) => {reject(json.message)})
                .catch(() => {reject(response.statusText)});
            });
        }
    }

    _loadCategories() {
        store.dispatch(categoriesLoading());

        fetch('/api/product_categories', {
            method: 'GET',
            headers: this._requestHeaders(),
        })
        .then(this._processResponse)
        .then((json) => store.dispatch(categoriesLoaded(json)))
        .catch((err) => store.dispatch(categoriesError(err)));
    }

    _loadProducts() {
        store.dispatch(productsLoading());

        fetch('/api/products', {
            method: 'GET',
            headers: this._requestHeaders(),
        })
        .then(this._processResponse)
        .then((json) => store.dispatch(productsLoaded(json)))
        .catch((err) => store.dispatch(productsError(err)))
    }

    _loadDeliveryMethods() {
        store.dispatch(deliveryMethodsLoading());

        fetch('/api/delivery_methods', {
            method: 'GET',
            headers: this._requestHeaders(),
        })
        .then(this._processResponse)
        .then((json) => store.dispatch(deliveryMethodsLoaded(json)))
        .catch((err) => store.dispatch(deliveryMethodsError(err)))
    }

    _loadCart() {
        store.dispatch(cartLoading());

        fetch('/cart.json', {
            method: 'GET',
            headers: this._requestHeaders(),
        })
        .then(this._processResponse)
        .then((json) => store.dispatch(cartLoaded(json)))
        .catch((err) => store.dispatch(cartError(err)))
    }

    setDeliveryMethod(id) {
        store.dispatch(cartLoading());

        fetch('/cart/delivery_method.json', {
            method: 'POST',
            headers: this._requestHeaders(),
            body: JSON.stringify({id: id}),
        })
        .then(this._processResponse)
        .then((json) => store.dispatch(cartLoaded(json)))
        .catch((err) => store.dispatch(cartError(err)))
    }

    setToCart(id, amount) {
        store.dispatch(cartSetProduct(id, amount));
        store.dispatch(cartLoading());

        fetch('/cart/set.json', {
            method: 'POST',
            headers: this._requestHeaders(),
            body: JSON.stringify({id: id, amount: amount}),
        })
        .then(this._processResponse)
        .then((json) => store.dispatch(cartLoaded(json)))
        .catch((err) => store.dispatch(cartError(err)))
    }

    removeFromCart(id) {
        store.dispatch(cartRemoveProduct(id));
        store.dispatch(cartLoading());

        fetch('/cart/remove.json', {
            method: 'POST',
            headers: this._requestHeaders(),
            body: JSON.stringify({id: id}),
        })
        .then(this._processResponse)
        .then((json) => store.dispatch(cartLoaded(json)))
        .catch((err) => store.dispatch(cartError(err)))
    }

    flushCart() {
        store.dispatch(cartLoading());

        fetch('/cart/flush.json', {
            method: 'GET',
            headers: this._requestHeaders(),
        })
        .then(this._processResponse)
        .then((json) => store.dispatch(cartLoaded(json)))
        .catch((err) => store.dispatch(cartError(err)))
    }

    setPromocode(code) {
        store.dispatch(cartLoading());

        fetch('/cart/promocode.json', {
            method: 'POST',
            headers: this._requestHeaders(),
            body: JSON.stringify({code: code}),
        })
        .then(this._processResponse)
        .then((json) => store.dispatch(cartLoaded(json)))
        .catch((err) => store.dispatch(cartError(err)))
    }

    removePromocode() {
        store.dispatch(cartLoading());

        fetch('/cart/promocode.json', {
            method: 'DELETE',
            headers: this._requestHeaders(),
        })
        .then(this._processResponse)
        .then((json) => store.dispatch(cartLoaded(json)))
        .catch((err) => store.dispatch(cartError(err)))
    }

    setCurrency(currency) {
        store.dispatch(cartLoading());

        fetch('/cart/currency.json', {
            method: 'POST',
            headers: this._requestHeaders(),
            body: JSON.stringify({currency: currency}),
        })
        .then(this._processResponse)
        .then((json) => store.dispatch(cartLoaded(json)))
        .catch((err) => store.dispatch(cartError(err)))
    }

    placeOrder(data) {
        store.dispatch(cartLoading());

        fetch('/cart/place_order.json', {
            method: 'POST',
            headers: this._requestHeaders(),
            body: JSON.stringify(data),
        })
        .then(this._processResponse)
        .then((json) => store.dispatch(cartLoaded(json)))
        .catch((err) => store.dispatch(cartError(err)))
    }

    render() {
        return (
            <div className="wrapper">
                <FirstScreen />
                <CurrencySwitcher setCurrency={this.setCurrency.bind(this)} />
                <CartSummary flushCart={this.flushCart.bind(this)} />
                <ProductCategories />
                <Products setToCart={this.setToCart.bind(this)} removeFromCart={this.removeFromCart.bind(this)} />
                <Cart
                    setToCart={this.setToCart.bind(this)}
                    removeFromCart={this.removeFromCart.bind(this)}
                    setPromocode={this.setPromocode.bind(this)}
                    removePromocode={this.removePromocode.bind(this)}
                    setDeliveryMethod={this.setDeliveryMethod.bind(this)}
                    placeOrder={this.placeOrder.bind(this)}
                />
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
