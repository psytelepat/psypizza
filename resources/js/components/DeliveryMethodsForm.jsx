import React from 'react';
import { connect } from 'react-redux';

import Nav from 'react-bootstrap/Nav'

class DeliveryMethodsForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        };
    }

    onSelect(key) {
        this.setState({activeKey: key})
        this.props.setDeliveryMethod(key);
    }

    render() {
        return <Nav variant="pills" defaultActiveKey="1" activeKey={this.state.activeKey} onSelect={this.onSelect.bind(this)}>
                <Nav.Item>
                    <Nav.Link eventKey="1">Courier delivery</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="2">Pick up at the restaurant</Nav.Link>
                </Nav.Item>
            </Nav>
    }
}

const mapStateToProps = (state, props) => {

    const { delivery_methods } = state;

    return {
        isLoaded: delivery_methods.isLoaded,
        delivery_methods: delivery_methods.data,
    }
}

export default DeliveryMethodsForm;