import React from 'react';

import { connect } from 'react-redux';

import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Col'
import Col from 'react-bootstrap/Col'

class PromocodeForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            promocode_id: props.promocode_id,
            promocode: ""
        }
    }


    static getDerivedStateFromProps(props, state) {
        return {
            isLoading: props.isLoading,
            promocode_id: props.promocode_id,
        };
    }

    onPromocodeChange(event) {
        this.setState({promocode: event.target.value});
    }

    setPromocode() {
        this.props.setPromocode(this.state.promocode);
    }

    removePromocode() {
        if (confirm('Remove promo code?')) {
            this.props.removePromocode();
        }
    }

    render() {
        return (
            <>
            <h3>Add promo code</h3>
            <p>You could apply a promo code here if you have one<br/> to get a sweet discount.</p>
            <Form>
                <Form.Row>
                {this.props.promocode_id ?
                    <Form.Group>
                        <span className="h5 mr-3">{this.props.promocode.code} - {this.props.promocode.discount}%</span>
                        <Button variant="danger" onClick={this.removePromocode.bind(this)}>Remove</Button>
                    </Form.Group>
                    :
                    <>
                    <Form.Group className="mr-3">
                        <Form.Control type="text" placeholder="Promo code" value={this.state.promocode} onChange={this.onPromocodeChange.bind(this)} />
                    </Form.Group>
                    <Form.Group>
                        <Button variant="primary" onClick={this.setPromocode.bind(this)} disabled={this.props.isLoading}>Apply promocode</Button>
                    </Form.Group>
                    </>
                }
                </Form.Row>
            </Form>
            </>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        isLoading: state.cart.isLoading,
        promocode_id: state.cart.data.promocode_id,
        promocode: state.cart.data.promocode,
    };
}

export default connect(mapStateToProps, null)(PromocodeForm);