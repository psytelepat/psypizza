import React from 'react';

import { connect } from 'react-redux';

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

class PromocodeForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            promocode_id: props.promocode,
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
        this.props.removePromocode();
    }

    render() {
        return (
            <Form>
                <Form.Row>
                    {this.state.promocode_id ?
                        <Form.Group as={Col}>
                            <Button onClick={this.removePromocode.bind(this)}>Remove promocode</Button>
                        </Form.Group>
                        :
                        <>
                        <Form.Group as={Col}>
                            <Form.Control type="text" placeholder="Promo code" value={this.state.promocode} onChange={this.onPromocodeChange.bind(this)} />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Button onClick={this.setPromocode.bind(this)} disabled={this.props.isLoading}>Apply promocode</Button>
                        </Form.Group>
                        </>
                    }
                </Form.Row>
            </Form>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        isLoading: state.cart.isLoading,
        promocode_id: state.cart.data.promocode_id,
    };
}

export default connect(mapStateToProps, null)(PromocodeForm);