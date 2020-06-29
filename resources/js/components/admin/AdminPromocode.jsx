import React from 'react'

import { Link, useParams } from 'react-router-dom'

import { List as ListIcon } from 'react-bootstrap-icons'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import Figure from 'react-bootstrap/Figure'

import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'

import { Formik } from 'formik'
import * as yup from 'yup'

class AdminPromocode extends React.Component {
    constructor(props) {
        super(props);

        this.id = this.props.match.params.id;

        this.state = {
            isLoading: false,
            isLoaded: false,
            isError: false,
            model: {
                name: "",
                code: "",
                discount: 0,
                description: "",
                is_available: 0,
            },
        };
    }

    _fetchModel() {
        fetch('/api/promocodes/' + this.id)
        .then((response) => response.json())
        .then((json) => {
            this.setState({isLoading: false, isLoaded: true, model: json.data});
        })
        .catch((err) => {
            this.setState({isLoading: false, isError: err})
        });
    }

    componentDidMount() {
        if (this.id) {
            this.setState({isLoading: true}, this._fetchModel);
        }
    }

    saveForm(data) {
        const formData = new FormData();
        for (let k in data) formData.append(k, data[k]);
        if (this.id) formData.append('_method', 'PUT');

        this.setState({isLoading: true,},
            () => fetch('/api/promocodes/' + ( this.id ?? '' ), {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector("meta[name='csrf-token']").getAttribute('content'),
                },
                body: formData
            })
            .then((response) => response.json())
            .then((json) => {
                this.setState({isLoading: false, model: json.data});
                !this.id && this.props.history.push('/admin/promocodes/' + json.data.id);
            })
            .catch((err) => {
                this.setState({isLoading: false, isError: error})
            })
        );
    }

    _formScheme() {
        return yup.object({
            name: yup.string().required(),
            code: yup.string().required(),
            discount: yup.number().required(),
        });
    }

    render() {
        if (this.state.isLoading) {
            return  (
                <Container align="center">
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </Container>
            );
        }

        return (
            <Container>
                <h2>{this.id ? this.state.model.code : 'Create new product'}</h2>
                <Formik
                    validateOnBlur={false}
                    validateOnChange={false}
                    validationSchema={this._formScheme()}
                    onSubmit={this.saveForm.bind(this)}
                    initialValues={this.state.model}
                >
                {({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    values,
                    touched,
                    isValid,
                    errors,
                    setFieldValue,
                  }) => (
                    <Form>
                        <Form.Group as={Row}>
                            <Col sm="4">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" name="name" placeholder="Name" value={values.name} onChange={handleChange} />
                                <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                            </Col>
                            <Col sm="4">
                                <Form.Label>Code</Form.Label>
                                <Form.Control type="text" name="code" placeholder="Code" value={values.code} onChange={handleChange} />
                                <Form.Control.Feedback type="invalid">{errors.code}</Form.Control.Feedback>
                            </Col>
                            <Col sm="4">
                                <Form.Label>Discount</Form.Label>
                                <Form.Control type="text" name="discount" placeholder="Discount" value={values.discount} onChange={handleChange} />
                                <Form.Control.Feedback type="invalid">{errors.discount}</Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Col sm="12">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" name="description" placeholder="Description" rows="3" value={values.description} onChange={handleChange} />
                                <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Col sm="12">
                                <Form.Check 
                                    id="is_available"
                                    label="Active"
                                    name="is_available"
                                    onChange={event => setFieldValue('is_available', event.target.checked ? 1 : 0)}
                                    checked={!!values.is_available}
                                    isInvalid={!!errors.is_available}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mt-5">
                            <Col sm="6">
                                <Button variant="secondary" as={Link} to='/admin/promocodes'><ListIcon /> Back to list</Button>
                            </Col>
                            <Col sm="6" align="right">
                                <Button variant="primary" type="submit" onClick={handleSubmit}>{values.id ? 'Save changes' : 'Create new promocode'}</Button>
                            </Col>
                        </Form.Group>
                    </Form>
                )}
                </Formik>
            </Container>
        );
    }
}

export default AdminPromocode;