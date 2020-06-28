import React from 'react';
import { connect } from 'react-redux';

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import { Formik } from 'formik'
import * as yup from 'yup'

class OrderForm extends React.Component {

    constructor(props) {
        super(props);
    }

    _formScheme() {
        return yup.object({
            name: yup.string().required().matches(/^[A-Za-z\s\-]+$/, 'Invalid characters'),
            surname: yup.string().matches(/^[A-Za-z\s\-]+$/, 'Invalid characters'),
            email: yup.string().email().required(),
            phone: yup.string().matches(/^(\+|)[0-9\s\-]+$/, 'Phone number is not valid'),
            address: yup.string().required(),
            agreement: yup.bool().required(),
        });
    }

    render() {
        return (
            <Formik
                    validateOnBlur={false}
                    validateOnChange={false}
                    validationSchema={this._formScheme()}
                    onSubmit={this.props.submitOrderForm}
                    initialValues={{
                        name: "",
                        surname: "",
                        email: "",
                        phone: "",
                        address: "",
                        agreement: false
                    }}
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
                        <Form.Group controlId="name">
                            <Form.Control type="text" name="name" required placeholder="Name" value={values.name} onChange={handleChange} isInvalid={!!errors.name} />
                            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="surname">
                            <Form.Control type="text" name="surname" placeholder="Surname" value={values.surname} onChange={handleChange} isInvalid={!!errors.surname} />
                            <Form.Control.Feedback type="invalid">{errors.surname}</Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group controlId="email">
                            <Form.Control type="email" name="email" required placeholder="E-mail" value={values.email} onChange={handleChange} isInvalid={!!errors.email} />
                            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="phone">
                            <Form.Control type="phone" name="phone" required placeholder="Phone" value={values.phone} onChange={handleChange} isInvalid={!!errors.phone} />
                            <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group controlId="address">
                            <Form.Control type="text" name="address" required placeholder="Address" value={values.address} onChange={handleChange} isInvalid={!!errors.address} />
                            <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group controlId="agreement_check">
                            <Form.Check type="checkbox" label="Agree to terms and conditions" required name="agreement" onChange={handleChange} isInvalid={!!errors.agreement} feedback={errors.terms} />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Button variant="primary" type="submit">Submit</Button>
                    </Form.Row>
                </Form>
              )}
            </Formik>
        );
    }
}

export default OrderForm;