import React from 'react'

import { Link, useParams } from 'react-router-dom'

import { List as ListIcon } from 'react-bootstrap-icons'

import { connect } from 'react-redux'

import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import Figure from 'react-bootstrap/Figure'
import Form from 'react-bootstrap/Form'

import { processResponse, processErrors } from '../processResponse'

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
        fetch('/api/product_categories', {
            headers: this.props.headers,
        })
        .then(processResponse)
        .then((json) => {
            this.setState({categories: json.data});
        })
        .catch((err, json) => {
        });
    }

    _fetchModel() {
        fetch('/api/products/' + this.id, {
            headers: this.props.headers,
        })
        .then(processResponse)
        .then((json) => {
            this.setState({isLoading: false, isLoaded: true, model: json.data});
        })
        .catch(({err, json, response}) => {
            this.setState({isLoading: false, isError: err})
        });
    }

    componentDidMount() {
        this._fetchCategoriesList();
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
        formData.append('api_token', localStorage.getItem('api_token'));

        this.setState({isLoading: true,},
            () => fetch('/api/products/' + ( this.id ?? '' ), {
                method: 'POST',
                headers: this.props.headers,
                body: formData
            })
            .then(processResponse)
            .then((json) => {
                this.setState({isLoading: false, isLoaded: true, model: json.data});
                if (!this.id){
                    this.id = json.data.id;
                    setValues && setValues(json.data);
                    this.props.history.push('/admin/products/' + json.data.id);
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
            slug: yup.string().required(),
            price: yup.number().required().min(0.01, 'Price is too low'),
        });
    }

    render() {
        const { categories } = this.state;

        if ((this.id&&!this.state.isLoaded)||!categories.length) {
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
                            <Form.Group as={Col} sm="4" controlId="category_id">
                                <Form.Label>Category</Form.Label>
                                <Form.Control as="select" name="category_id" required defaultValue={values.category_id}
                                    onChange={handleChange} isInvalid={!!errors.category_id}>
                                    {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} sm="4" controlId="sku">
                                <Form.Label>SKU</Form.Label>
                                <Form.Control type="text" name="sku" placeholder="SKU"
                                    value={values.sku} onChange={handleChange} isInvalid={!!errors.sku} />
                                <Form.Control.Feedback type="invalid">{errors.sku}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} sm="4" controlId="ean13">
                                <Form.Label>EAN13</Form.Label>
                                <Form.Control type="text" name="ean13" placeholder="EAN13"
                                    value={values.ean13} onChange={handleChange} isInvalid={!!errors.ean13} />
                                <Form.Control.Feedback type="invalid">{errors.eam13}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} sm="4" controlId="price">
                                <Form.Label>Price in EURO</Form.Label>
                                <Form.Control type="text" name="price" required placeholder="Price"
                                    value={values.price} onChange={handleChange} isInvalid={!!errors.price} />
                                <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} sm="8" controlId="description">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" name="description" placeholder="Description" rows="3"
                                    value={values.description} onChange={handleChange} isInvalid={!!errors.description} />
                                <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
                            </Form.Group>
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
                        </Form.Row>
                        <Form.Row>
                            <Col sm="4">
                                <Form.File label="Upload image" accept="image/jpeg,image/jpg,image/png,.jpg,.jpeg,.png"
                                    onChange={(event) => setFieldValue("upload_image", event.currentTarget.files[0])}/>
                            </Col>
                            <Col sm="4">
                                {values.image && <Figure.Image src={'/storage/products/images/' + values.image} width="200" />}
                            </Col>
                        </Form.Row>
                        <Form.Row className="mt-5">
                            <Col sm="6">
                                <Button variant="secondary" as={Link} to='/admin/products'><ListIcon /> Back to list</Button>
                            </Col>
                            <Col sm="6" align="right">
                                <Button variant="primary" type="submit" onClick={handleSubmit}>
                                    {values.id ? 'Save changes' : 'Create new product'}
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

export default connect(mapStateToProps, null)(AdminProduct);