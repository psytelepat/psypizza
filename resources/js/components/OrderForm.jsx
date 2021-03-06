import React from 'react';
import { connect } from 'react-redux';

import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'

import { Formik } from 'formik'
import * as yup from 'yup'

class OrderForm extends React.Component {

    _formScheme() {
        return yup.object({
            name: yup.string().required().matches(/^[A-Za-z\s\-]+$/, 'Invalid characters'),
            surname: yup.string().matches(/^[A-Za-z\s\-]+$/, 'Invalid characters'),
            email: yup.string().email().required(),
            phone: yup.string().required().matches(/^(\+|)[0-9\s\-\(\)]+$/, 'Phone number is not valid'),
            address: this.props.requires_address ? yup.string().required() : null,
            agreement: yup.bool().required().oneOf([true], 'The terms and conditions must be accepted'),
        });
    }

    render() {

        const { isLoading, isError, errors } = this.props;

        const initialValues = {
            name: this.props.user ? (this.props.user.name||"") : "",
            surname: this.props.user ? (this.props.user.surname||"") : "",
            email: this.props.user ? (this.props.user.email||"") : "",
            phone: this.props.user ? (this.props.user.phone||"") : "",
            address: this.props.user ? (this.props.user.address||"") : "",
            agreement: false
        };

        return (
            <Container className="mt-5">
                <h3>Order form</h3>
                <p>Please fill in the form below and click "Place order" button to complete your purchase.</p>
            <Formik
                    validateOnBlur={false}
                    validateOnChange={false}
                    validationSchema={this._formScheme()}
                    onSubmit={this.props.placeOrder}
                    initialValues={initialValues}
                >
            {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                touched,
                isValid,
                errors,
              }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} sm="6" controlId="name">
                            <Form.Control type="text" name="name" required placeholder="Name" value={values.name} onChange={handleChange} isInvalid={!!errors.name} />
                            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} sm="6" controlId="surname">
                            <Form.Control type="text" name="surname" placeholder="Surname" value={values.surname} onChange={handleChange} isInvalid={!!errors.surname} />
                            <Form.Control.Feedback type="invalid">{errors.surname}</Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} sm="6" controlId="email">
                            <Form.Control type="email" name="email" required placeholder="E-mail" value={values.email} onChange={handleChange} isInvalid={!!errors.email} />
                            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} sm="6" controlId="phone">
                            <Form.Control type="phone" name="phone" required placeholder="Phone" value={values.phone} onChange={handleChange} isInvalid={!!errors.phone} />
                            <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    {this.props.requires_address ?
                        <Form.Row>
                            <Form.Group as={Col} sm="12" controlId="address">
                                <Form.Control type="text" name="address" required placeholder="Address" value={values.address} onChange={handleChange} isInvalid={!!errors.address} />
                                <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row> : null
                    }
                    <Form.Row>
                        <Form.Group as={Col} sm="12" align="center" controlId="agreement_check">
                            <Form.Check label="Agree to terms and conditions" required name="agreement" checked={values.agreement} onChange={handleChange} isInvalid={!!errors.agreement} feedback={errors.agreement} />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} sm="12" align="center">
                            <Button variant="primary" type="submit" disabled={this.props.isLoading||this.props.cartLoading||this.props.order.isLoading}>
                                {this.props.isLoading||this.props.cartLoading||this.props.order.isLoading ? <Spinner animation="border" variant="secondary" size="sm" /> : "Place order"}
                            </Button>
                        </Form.Group>
                    </Form.Row>
                </Form>
              )}
            </Formik>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        cartLoading: state.cart.isLoading,
        order: state.order,
        user: state.user.data,
        requires_address: state.cart.data.delivery_method.requires_address,
    };
}

export default connect(mapStateToProps, null)(OrderForm);