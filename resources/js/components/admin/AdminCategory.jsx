import React from 'react'

import { Link, useParams } from 'react-router-dom'

import { List as ListIcon } from 'react-bootstrap-icons'

import { connect } from 'react-redux'

import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import Figure from 'react-bootstrap/Figure'
import Form from 'react-bootstrap/Form'

import processResponse from '../processResponse'

import { Formik } from 'formik'
import * as yup from 'yup'

class AdminCategory extends React.Component {
    constructor(props) {
        super(props);

        this.id = this.props.match.params.id;

        this.state = {
            isLoading: false,
            isLoaded: false,
            isError: false,
            model: {
                name: "",
                slug: "",
                image: "",
                description: "",
                is_published: 0,
            },
        };
    }

    _fetchModel() {
        fetch('/api/product_categories/' + this.id, {
            headers: this.props.headers,
        })
        .then(processResponse)
        .then((json) => {
            this.setState({isLoading: false, isLoaded: true, model: json.data});
        })
        .catch((err, json) => {
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
            () => fetch('/api/product_categories/' + ( this.id ?? '' ), {
                method: 'POST',
                headers: this.props.headers,
                body: formData
            })
            .then(processResponse)
            .then((json) => {
                this.setState({isLoading: false, model: json.data});
                !this.id && this.props.history.push('/admin/product_categories/' + json.data.id);
            })
            .catch((err, json) => {
                this.setState({isLoading: false, isError: error})
            })
        );
    }

    _formScheme() {
        return yup.object({
            name: yup.string().required(),
            slug: yup.string().required(),
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
                <h2>{this.id ? this.state.model.name : 'Create new product'}</h2>
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
                            <Form.Group as={Col} sm="4" controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" name="name" required placeholder="Name"
                                    value={values.name} onChange={handleChange} isInvalid={!!errors.name} />
                                <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} sm="4" controlId="slug">
                                <Form.Label>URL Slug</Form.Label>
                                <Form.Control type="text" name="slug" required placeholder="URL slug"
                                    value={values.slug} onChange={handleChange} isInvalid={!!errors.slug} />
                                <Form.Control.Feedback type="invalid">{errors.slug}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} sm="4">
                                <Form.Check 
                                    id="is_published"
                                    label="Published"
                                    name="is_published"
                                    onChange={event => setFieldValue('is_published', event.target.checked ? 1 : 0)}
                                    checked={!!values.is_published}
                                    isInvalid={!!errors.is_published}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} sm="8" controlId="description">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" name="description" placeholder="Description" rows="3"
                                    value={values.description} onChange={handleChange} isInvalid={!!errors.description} />
                                <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} sm="4" className="pt-5">

                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} sm="4">
                                <Form.File label="Upload image" accept="image/jpeg,image/jpg,image/png,.jpg,.jpeg,.png"
                                    onChange={(event) => setFieldValue("upload_image", event.currentTarget.files[0])} />
                            </Form.Group>
                            <Form.Group as={Col} sm="4">
                                {values.image && <Figure.Image src={'/storage/product_categories/images/' + values.image} width="200" />}
                            </Form.Group>
                        </Form.Row>
                        <Form.Row className="mt-5">
                            <Form.Group as={Col} sm="6">
                                <Button variant="secondary" as={Link} to='/admin/product_categories'><ListIcon /> Back to list</Button>
                            </Form.Group>
                            <Form.Group as={Col} sm="4" align="right">
                                <Button variant="primary" type="submit" onClick={handleSubmit}>
                                    {values.id ? 'Save changes' : 'Create new category'}
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

const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps, null)(AdminCategory);