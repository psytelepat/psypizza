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

class AdminProduct extends React.Component {
    constructor(props) {
        super(props);

        this.id = this.props.match.params.id;

        this.state = {
            isLoading: false,
            isLoaded: false,
            isError: false,
            categories: [],
            model: {
                category_id: 1,
                name: "",
                slug: "",
                image: "",
                description: "",
                sku: "",
                ean13: "",
                price: 0,
                is_published: 0,
                in_stock: 0,
            },
        };
    }

    _fetchCategoriesList() {
        fetch('/api/product_categories')
        .then((response) => response.json())
        .then((json) => {
            this.setState({categories: json.data});
        })
        .catch((err) => {
        });
    }

    _fetchModel() {
        fetch('/api/products/' + this.id)
        .then((response) => response.json())
        .then((json) => {
            this.setState({isLoading: false, isLoaded: true, model: json.data});
        })
        .catch((err) => {
            this.setState({isLoading: false, isError: err})
        });
    }

    componentDidMount() {
        this._fetchCategoriesList();
        if (this.id) {
            this.setState({isLoading: true}, this._fetchModel);
        }
    }

    saveForm(data) {
        const formData = new FormData();
        for (let k in data) formData.append(k, data[k]);
        if (this.id) formData.append('_method', 'PUT');

        this.setState({isLoading: true,},
            () => fetch('/api/products/' + ( this.id ?? '' ), {
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
                !this.id && this.props.history.push('/admin/products/' + json.data.id);
            })
            .catch((err) => {
                this.setState({isLoading: false, isError: error})
            })
        );
    }

    _formScheme() {
        return yup.object({
            name: yup.string().required(),
            slug: yup.string().required(),
            price: yup.number().required().min(0.01, 'Price is too low'),
        });
    }

    render() {
        const { categories } = this.state;

        if (this.state.isLoading||!categories.length) {
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
                        <Form.Group as={Row}>
                            <Col sm="4">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" name="name" placeholder="Name" value={values.name} onChange={handleChange} />
                                <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                            </Col>
                            <Col sm="4">
                                <Form.Label>URL Slug</Form.Label>
                                <Form.Control type="text" name="slug" placeholder="URL slug" value={values.slug} onChange={handleChange} />
                                <Form.Control.Feedback type="invalid">{errors.slug}</Form.Control.Feedback>
                            </Col>
                            <Col sm="4">
                                <Form.Label>Category</Form.Label>
                                <Form.Control as="select" name="category_id" defaultValue={values.category_id} onChange={handleChange}>
                                    {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
                                </Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Col sm="4">
                                <Form.Label>SKU</Form.Label>
                                <Form.Control type="text" name="sku" placeholder="SKU" value={values.sku} onChange={handleChange} />
                                <Form.Control.Feedback type="invalid">{errors.sku}</Form.Control.Feedback>
                            </Col>
                            <Col sm="4">
                                <Form.Label>EAN13</Form.Label>
                                <Form.Control type="text" name="ean13" placeholder="EAN13" value={values.ean13} onChange={handleChange} />
                                <Form.Control.Feedback type="invalid">{errors.eam13}</Form.Control.Feedback>
                            </Col>
                            <Col sm="4">
                                <Form.Label>Price in EURO</Form.Label>
                                <Form.Control type="text" name="price" placeholder="Price" value={values.price} onChange={handleChange} />
                                <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Col sm="8">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" name="description" placeholder="Description" rows="3" value={values.description} onChange={handleChange} />
                                <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
                            </Col>
                            <Col sm="4" className="pt-5">
                                <Form.Check 
                                    id="is_published"
                                    label="Published"
                                    name="is_published"
                                    onChange={event => setFieldValue('is_published', event.target.checked ? 1 : 0)}
                                    checked={!!values.is_published}
                                    isInvalid={!!errors.is_published}
                                />
                                <Form.Check
                                    id="in_stock"
                                    label="In stock"
                                    name="in_stock"
                                    onChange={event => setFieldValue('in_stock', event.target.checked ? 1 : 0)}
                                    checked={!!values.in_stock}
                                    isInvalid={!!errors.in_stock}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Col sm="4">
                                <Form.File label="Upload image" accept="image/jpeg,image/jpg,image/png,.jpg,.jpeg,.png" onChange={(event) => setFieldValue("upload_image", event.currentTarget.files[0])}/>
                            </Col>
                            <Col sm="4">
                                {values.image && <Figure.Image src={'/storage/products/images/' + values.image} width="200" />}
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mt-5">
                            <Col sm="6">
                                <Button variant="secondary" as={Link} to='/admin/products'><ListIcon /> Return to list</Button>
                            </Col>
                            <Col sm="6" align="right">
                                <Button variant="primary" type="submit" onClick={handleSubmit}>{values.id ? 'Save changes' : 'Create new product'}</Button>
                            </Col>
                        </Form.Group>
                    </Form>
                )}
                </Formik>
            </Container>
        );
    }
}

export default AdminProduct;