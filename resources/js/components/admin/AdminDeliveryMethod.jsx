import React from 'react'

import { Link, useParams } from 'react-router-dom'

import { List as ListIcon } from 'react-bootstrap-icons'

import { connect } from 'react-redux'

import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import { processResponse, processErrors } from '../processResponse'

import { Formik } from 'formik'
import * as yup from 'yup'

class AdminDeliveryMethod extends React.Component {
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
        fetch('/api/delivery_methods/' + this.id, {
            headers: this.props.headers,
        })
        .then(processResponse)
        .then((json) => {
            this.setState({isLoading: false, isLoaded: true, model: json.data});
        })
        .catch(({message, json, response }) => {
            this.setState({isLoading: false, isError: err})
        });
    }

    componentDidMount() {
        if (this.id) {
            this.setState({isLoading: true}, this._fetchModel);
        }
    }

    saveForm(data, { setErrors, setValues }) {
        const formData = new FormData();
        for (let k in data) formData.append(k, data[k]);
        if (this.id) {
            formData.append('_method', 'PUT');
            formData.append('id', this.id);
        }

        this.setState({isLoading: true,},
            () => fetch('/api/delivery_methods/' + ( this.id ?? '' ), {
                method: 'POST',
                headers: this.props.headers,
                body: formData
            })
            .then((response) => response.json())
            .then((json) => {
                this.setState({isLoading: false, isLoaded: true, model: json.data});
                if (!this.id){
                    this.id = json.data.id;
                    setValues && setValues(json.data);
                    this.props.history.push('/admin/delivery_methods/' + json.data.id);
                }
            })
            .catch(({ message, json, response }) => {
                this.setState({isLoading: false, isError: message})
                processErrors(json, setErrors);
            })
        );
    }

    _formScheme() {
        return yup.object({
            name: yup.string().required(),
            price: yup.number().required(),
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
                <h2>{this.id ? this.state.model.name : 'Create new delivery method'}</h2>
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
                        <Form.Row>
                            <Form.Group as={Col} sm="6" controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" name="name" required placeholder="Name"
                                    value={values.name} onChange={handleChange} isInvalid={!!errors.name} />
                                <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} sm="6" controlId="price">
                                <Form.Label>Price</Form.Label>
                                <Form.Control type="text" name="price" required placeholder="Discount"
                                    value={values.price} onChange={handleChange} isInvalid={!!errors.price} />
                                <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} sm="12" controlId="description">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" name="description" placeholder="Description" rows="3"
                                    value={values.description} onChange={handleChange} isInvalid={!!errors.description} />
                                <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row className="mt-5">
                            <Col sm="6">
                                <Button variant="secondary" as={Link} to='/admin/delivery_methods'><ListIcon /> Back to list</Button>
                            </Col>
                            <Col sm="6" align="right">
                                <Button variant="primary" type="submit" onClick={handleSubmit}>
                                    {values.id ? 'Save changes' : 'Create new delivery method'}
                                </Button>
                            </Col>
                        </Form.Row>
                    </Form>
                )}
                </Formik>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps, null)(AdminDeliveryMethod);