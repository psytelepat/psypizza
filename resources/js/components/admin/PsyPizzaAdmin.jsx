import React from 'react'
import { render } from 'react-dom'

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import AdminProducts from './AdminProducts'
import AdminProduct from './AdminProduct'
import AdminCategory from './AdminCategory'
import AdminCategories from './AdminCategories'
import AdminPromocode from './AdminPromocode'
import AdminPromocodes from './AdminPromocodes'
import AdminDeliveryMethod from './AdminDeliveryMethod'
import AdminDeliveryMethods from './AdminDeliveryMethods'

import Order from '../Order'
import Orders from '../Orders'

import { connect, Provider } from 'react-redux'
import { createStore } from 'redux'
import psyPizzaAdminReducer from './reducers'
const store = createStore(psyPizzaAdminReducer)

import processResponse from '../processResponse'

import {
    loginLogging,
    loginLogged,
    loginFailed,
    headersSet,
} from './actions';

class PsyPizzaAdmin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
        };
    }

    componentDidMount() {
        this.checkLogged(localStorage.getItem('api_token'));
    }

    checkLogged(api_token) {
        store.dispatch(loginLogging());
        fetch('/api/login', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + api_token,
                'X-CSRF-TOKEN': document.querySelector("meta[name='csrf-token']").getAttribute('content'),
            },
        })
        .then(processResponse)
        .then((json) => {
            if (json.user.is_admin) {
                store.dispatch(loginLogged(api_token, json.user));
            } else {
                store.dispatch(loginFailed(err, json));
            }
        })
        .catch((err, json) => store.dispatch(loginFailed(err, json)));
    }

    attempLogin() {
        store.dispatch(loginLogging());
        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector("meta[name='csrf-token']").getAttribute('content'),
            },
            body: JSON.stringify({email: this.state.email, password: this.state.password}),
        })
        .then(processResponse)
        .then((json) => {
            if (json.user.is_admin) {
                localStorage.setItem('api_token', json.token);
                store.dispatch(loginLogged(json.token, json.user));
            } else {
                store.dispatch(loginFailed(err, json));
            }
        })
        .catch((err, json) => store.dispatch(loginFailed(err, json)));
    }

    onChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    render() {
        if (this.props.isLogging) {
            return <Container align="center" className="mt-5">
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </Container>;
        }

        if (!this.props.isLogged) {
            return (
                <Form as={Container}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="email">
                            <Form.Label>E-mail</Form.Label>
                            <Form.Control type="email" placeholder="E-mail" required name="email" value={this.state.email} onChange={this.onChange.bind(this)} />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" required name="password" value={this.state.password} onChange={this.onChange.bind(this)} />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Button type="submit" onClick={this.attempLogin.bind(this)}>Login</Button>
                        </Form.Group>
                    </Form.Row>
                </Form>
            );
        }

        return (
            <Router>
                <Navbar variant="dark" className="mb-3">
                    <Container>
                        <Navbar.Brand href="/admin">psyPizza Admin</Navbar.Brand>
                        <Navbar.Toggle aria-controls="nabvar" />
                        <Navbar.Collapse id="navbar">
                            <Nav>
                                <Nav.Item><Nav.Link as={Link} to="/admin">Orders</Nav.Link></Nav.Item>
                                <Nav.Item><Nav.Link as={Link} to="/admin/products">Products</Nav.Link></Nav.Item>
                                <Nav.Item><Nav.Link as={Link} to="/admin/product_categories">Categories</Nav.Link></Nav.Item>
                                <Nav.Item><Nav.Link as={Link} to="/admin/promocodes">Promocodes</Nav.Link></Nav.Item>
                                <Nav.Item><Nav.Link as={Link} to="/admin/delivery_methods">Delivery methods</Nav.Link></Nav.Item>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <Switch>
                    <Route path="/admin/delivery_methods/create" component={AdminDeliveryMethod} />
                    <Route path="/admin/delivery_methods/:id" component={AdminDeliveryMethod} />
                    <Route path="/admin/delivery_methods" component={AdminDeliveryMethods}></Route>
                    
                    <Route path="/admin/promocodes/create" component={AdminPromocode} />
                    <Route path="/admin/promocodes/:id" component={AdminPromocode} />
                    <Route path="/admin/promocodes" component={AdminPromocodes}></Route>
                    
                    <Route path="/admin/product_categories/create" component={AdminCategory} />
                    <Route path="/admin/product_categories/:id" component={AdminCategory} />
                    <Route path="/admin/product_categories" component={AdminCategories}></Route>
                    
                    <Route path="/admin/products/create" component={AdminProduct} />
                    <Route path="/admin/products/:id" component={AdminProduct} />
                    <Route path="/admin/products" component={AdminProducts}></Route>
                    
                    <Route path="/admin/orders/:id" component={(props) => <Order is_admin={true} user={this.props.user} api_token={this.props.api_token} {...props} />} />
                    <Route path="/admin/orders" component={(props) => <Orders is_admin={true} user={this.props.user} api_token={this.props.api_token} {...props} />}></Route>
                    <Route path="/admin" component={(props) => <Orders is_admin={true} user={this.props.user} api_token={this.props.api_token} {...props} />}></Route>
                    
                    <Route path="*">404 Not found</Route>
                </Switch>
            </Router>
        );
    }
}

const mapStateToProps = (state) => {
    return state;
}

PsyPizzaAdmin = connect(mapStateToProps, null)(PsyPizzaAdmin);
export default PsyPizzaAdmin;

if (document.getElementById('psypizza-admin')) {
    render(
        <Provider store={store}>
            <PsyPizzaAdmin />
        </Provider>,
        document.getElementById('psypizza-admin')
    )
}
