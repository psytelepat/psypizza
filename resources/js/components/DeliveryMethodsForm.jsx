import React from 'react';
import { connect } from 'react-redux';

import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'

import PriceFormat from './PriceFormat'

class DeliveryMethodsForm extends React.Component {
    render() {
        if(!this.props.isLoaded) {
            return null;
        }

        return (
            <>
            <h3>Choose a delivery method</h3>
            <p>You may pick up your order at the restaurant for free<br/> or get it by courier delivery for a reasonable fee.</p>
            <Nav variant="pills" activeKey={this.props.selected} onSelect={this.props.setDeliveryMethod}>
            {this.props.deliveryMethods.map((dm) => <Nav.Item key={dm.id}>
                <Nav.Link eventKey={dm.id}>{dm.name}<br/><PriceFormat price={dm.price} calc /></Nav.Link>
                </Nav.Item>)}
            </Nav>
            </>
        );
    }
}

const mapStateToProps = (state, props) => {
    const { deliveryMethods } = state;
    return {
        isLoaded: deliveryMethods.isLoaded,
        selected: deliveryMethods.selected,
        deliveryMethods: deliveryMethods.data,
    }
}

export default connect(mapStateToProps,null)(DeliveryMethodsForm);