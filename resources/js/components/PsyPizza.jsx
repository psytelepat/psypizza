import React from 'react'
import { render } from 'react-dom'

import { BrowserRouter as Router, Switch, Route, Link, useHistory } from 'react-router-dom'

import { connect, Provider } from 'react-redux'
import { createStore } from 'redux'
import psyPizzaReducer from './reducers'

import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Toast from 'react-bootstrap/Toast'

import { processResponse, processErrors } from './processResponse'

const store = createStore(psyPizzaReducer)

import {
    userLoading, userError, userLoaded,
    categoriesLoading, categoriesError, categoriesLoaded,
    productsLoading, productsError, productsLoaded,
    deliveryMethodsLoading, deliveryMethodsLoaded, deliveryMethodsError, deliveryMethodsSelect,
    cartLoading, cartLoaded, cartError, cartSetProduct, cartRemoveProduct,
    orderPlacing, orderPlaced, orderError,
} from './actions';

import FirstScreen from './FirstScreen'
import CurrencySwitcher from './CurrencySwitcher'
import Cart from './Cart'
import CartSummary from './CartSummary'
import ProductCategories from './ProductCategories'
import Products from './Products'
import Order from './Order'
import Orders from './Orders'
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
        this._start();
        this._loadProducts();
    }

    _start() {
        store.dispatch(categoriesLoading());
        store.dispatch(deliveryMethodsLoading());
        store.dispatch(cartLoading());
        store.dispatch(userLoading());

        fetch('/start.json', {
            method: 'GET',
            headers: this._requestHeaders(),
        })
        .then(processResponse)
        .then((json) => {
            store.dispatch(userLoaded(json.user));
            store.dispatch(categoriesLoaded(json.categories));
            store.dispatch(deliveryMethodsLoaded(json.delivery_methods));
            store.dispatch(cartLoaded(json.cart));
        })
        .catch(({message, json, response}) => {
            store.dispatch(userError(message, json));
            store.dispatch(categoriesError(message, json));
            store.dispatch(deliveryMethodsError(message, json));
            store.dispatch(cartError(message, json));
        });
    }

    _loadUser() {
        store.dispatch(userLoading());

        fetch('/user.json', {
            method: 'GET',
            headers: this._requestHeaders(),
        })
        .then(processResponse)
        .then((json) => store.dispatch(userLoaded(json)))
        .catch(({message, json, response}) => store.dispatch(userError(message, json)))
    }

    _loadCategories() {
        store.dispatch(categoriesLoading());

        fetch('/api/product_categories', {
            method: 'GET',
            headers: this._requestHeaders(),
        })
        .then(processResponse)
        .then((json) => store.dispatch(categoriesLoaded(json.data)))
        .catch(({message, json, response}) => store.dispatch(categoriesError(message, json)));
    }

    _loadProducts() {
        store.dispatch(productsLoading());

        fetch('/api/products', {
            method: 'GET',
            headers: this._requestHeaders(),
        })
        .then(processResponse)
        .then((json) => store.dispatch(productsLoaded(json.data)))
        .catch(({message, json, response}) => store.dispatch(productsError(message, json)))
    }

    _loadDeliveryMethods() {
        store.dispatch(deliveryMethodsLoading());

        fetch('/api/delivery_methods', {
            method: 'GET',
            headers: this._requestHeaders(),
        })
        .then(processResponse)
        .then((json) => store.dispatch(deliveryMethodsLoaded(json.data)))
        .catch(({message, json, response}) => store.dispatch(deliveryMethodsError(message, json)))
    }

    _loadCart() {
        store.dispatch(cartLoading());

        fetch('/cart.json', {
            method: 'GET',
            headers: this._requestHeaders(),
        })
        .then(processResponse)
        .then((json) => store.dispatch(cartLoaded(json.data)))
        .catch(({message, json, response}) => store.dispatch(cartError(message, json)))
    }

    setDeliveryMethod(id) {
        store.dispatch(cartLoading());
        store.dispatch(deliveryMethodsSelect(id));

        fetch('/cart/delivery_method.json', {
            method: 'POST',
            headers: this._requestHeaders(),
            body: JSON.stringify({id: id}),
        })
        .then(processResponse)
        .then((json) => store.dispatch(cartLoaded(json.data)))
        .catch(({message, json, response}) => store.dispatch(cartError(message, json)))
    }

    setToCart(id, amount) {
        store.dispatch(cartSetProduct(id, amount));
        store.dispatch(cartLoading());

        fetch('/cart/set.json', {
            method: 'POST',
            headers: this._requestHeaders(),
            body: JSON.stringify({id: id, amount: amount}),
        })
        .then(processResponse)
        .then((json) => store.dispatch(cartLoaded(json.data)))
        .catch(({message, json, response}) => store.dispatch(cartError(message, json)))
    }

    removeFromCart(id) {
        store.dispatch(cartRemoveProduct(id));
        store.dispatch(cartLoading());

        fetch('/cart/remove.json', {
            method: 'POST',
            headers: this._requestHeaders(),
            body: JSON.stringify({id: id}),
        })
        .then(processResponse)
        .then((json) => store.dispatch(cartLoaded(json.data)))
        .catch(({message, json, response}) => store.dispatch(cartError(message, json)))
    }

    flushCart() {
        store.dispatch(cartLoading());

        fetch('/cart/flush.json', {
            method: 'GET',
            headers: this._requestHeaders(),
        })
        .then(processResponse)
        .then((json) => store.dispatch(cartLoaded(json.data)))
        .catch(({message, json, response}) => store.dispatch(cartError(message, json)))
    }

    setPromocode(code) {
        store.dispatch(cartLoading());

        fetch('/cart/promocode.json', {
            method: 'POST',
            headers: this._requestHeaders(),
            body: JSON.stringify({code: code}),
        })
        .then(processResponse)
        .then((json) => store.dispatch(cartLoaded(json.data)))
        .catch(({message, json, response}) => store.dispatch(cartError(message, json)))
    }

    removePromocode() {
        store.dispatch(cartLoading());

        fetch('/cart/promocode.json', {
            method: 'DELETE',
            headers: this._requestHeaders(),
        })
        .then(processResponse)
        .then((json) => store.dispatch(cartLoaded(json.data)))
        .catch(({message, json, response}) => store.dispatch(cartError(message, json)))
    }

    setCurrency(currency) {
        store.dispatch(cartLoading());

        fetch('/cart/currency.json', {
            method: 'POST',
            headers: this._requestHeaders(),
            body: JSON.stringify({currency: currency}),
        })
        .then(processResponse)
        .then((json) => store.dispatch(cartLoaded(json.data)))
        .catch(({message, json, response}) => store.dispatch(cartError(message, json)))
    }

    placeOrder(data, { setErrors }) {
        store.dispatch(orderPlacing());

        fetch('/cart/place_order.json', {
            method: 'POST',
            headers: this._requestHeaders(),
            body: JSON.stringify(data),
        })
        .then(processResponse)
        .then((json) => {
            store.dispatch(orderPlaced(json));
            this._loadCart();
        })
        .catch(({message, json, response}) => {
            store.dispatch(orderError(message))
            processErrors(json, setErrors)
        })
    }

    logout() {
        fetch('/logout', {
            method: 'POST',
            headers: this._requestHeaders(),
        })
        .then((response) => {
            if (response.ok) {
                window.location = '/';
            }
        });
    }

    render() {
        return (
            <Router>
                <CurrencySwitcher setCurrency={this.setCurrency.bind(this)} />
                <Navbar sticky="top" variant="dark" className="mb-3 bg-dark" expand="sm">
                    <Container>
                        <Navbar.Brand as={Link} to="/">psyPizza</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-nabvar-auto" />
                        <Navbar.Collapse id="basic-nabvar-auto">
                            <Nav>
                                <Nav.Item><Nav.Link as={Link} to="/">Menu</Nav.Link></Nav.Item>
                                <Nav.Item><Nav.Link as={Link} to="/cart">Cart</Nav.Link></Nav.Item>
                                { this.props.user.data ? (
                                    <>
                                    <Nav.Item><Nav.Link as={Link} to="/orders">Orders</Nav.Link></Nav.Item>
                                    <Nav.Item><Nav.Link onClick={this.logout.bind(this)}>Logout</Nav.Link></Nav.Item>
                                    </>
                                ) : (
                                    <>
                                    <Nav.Item><Nav.Link href="/login">Login</Nav.Link></Nav.Item>
                                    <Nav.Item><Nav.Link href="/register">Register</Nav.Link></Nav.Item>
                                    </>
                                )}

                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <Switch>
                    <Route path="/orders/:id/:order_token" component={Order} />
                    <Route path="/orders/:id" component={Order} />
                    <Route path="/orders" component={Orders} />
                    <Route path="/cart" component={(props) => <Cart
                            {...props}
                            setToCart={this.setToCart.bind(this)}
                            removeFromCart={this.removeFromCart.bind(this)}
                            setPromocode={this.setPromocode.bind(this)}
                            removePromocode={this.removePromocode.bind(this)}
                            setDeliveryMethod={this.setDeliveryMethod.bind(this)}
                            placeOrder={this.placeOrder.bind(this)}
                        />}>
                    </Route>
                    <Route path="/">
                        <CartSummary flushCart={this.flushCart.bind(this)} />
                        <ProductCategories />
                        <Products setToCart={this.setToCart.bind(this)} removeFromCart={this.removeFromCart.bind(this)} />
                    </Route>
                    <Route path="*">404 Not found</Route>
                </Switch>
                <Footer />
            </Router>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
}

PsyPizza = connect(mapStateToProps, null)(PsyPizza);
export default PsyPizza;

if (document.getElementById('psypizza')) {
    render(
        <Provider store={store}>
            <PsyPizza />
        </Provider>,
        document.getElementById('psypizza')
    )
}
