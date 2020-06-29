import React from 'react'
import { render } from 'react-dom'

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'


import Dashboard from './Dashboard'
import AdminProducts from './AdminProducts'
import AdminProduct from './AdminProduct'
import AdminCategory from './AdminCategory'
import AdminCategories from './AdminCategories'
import AdminPromocode from './AdminPromocode'
import AdminPromocodes from './AdminPromocodes'
import AdminDeliveryMethod from './AdminDeliveryMethod'
import AdminDeliveryMethods from './AdminDeliveryMethods'

class PsyPizzaAdmin extends React.Component {
    _requestHeaders() {
        return {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector("meta[name='csrf-token']").getAttribute('content'),
        };
    }

    render() {
        return (
            <Router>
              <div>
                <Navbar variant="dark" className="mb-3">
                    <Navbar.Brand href="#">psyPizza Admin Panel</Navbar.Brand>
                    <Navbar.Toggle aria-controls="nabvar" />
                    <Navbar.Collapse id="navbar">
                        <Nav>
                            <Nav.Item><Nav.Link as={Link} to="/admin">Dashboard</Nav.Link></Nav.Item>
                            <Nav.Item><Nav.Link as={Link} to="/admin/products">Products</Nav.Link></Nav.Item>
                            <Nav.Item><Nav.Link as={Link} to="/admin/product_categories">Categories</Nav.Link></Nav.Item>
                            <Nav.Item><Nav.Link as={Link} to="/admin/promocodes">Promocodes</Nav.Link></Nav.Item>
                            <Nav.Item><Nav.Link as={Link} to="/admin/delivery_methods">Delivery Methods</Nav.Link></Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
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
                    <Route path="/admin" component={Dashboard}></Route>
                    <Route path="*">
                        404 Not found
                    </Route>
                </Switch>
              </div>
            </Router>
        );
    }
}

export default PsyPizzaAdmin;

if (document.getElementById('psypizza-admin')) {
    render(
        <PsyPizzaAdmin />,
        document.getElementById('psypizza-admin')
    )
}
