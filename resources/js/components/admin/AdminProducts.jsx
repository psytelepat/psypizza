import React from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'

import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'

class AdminProducts extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            isLoaded: false,
            isError: false,
            products: null,
            editingProduct: null,
            createProductMode: false,
        };
    }

    _fetchProductsList() {
        fetch('/api/products?page=1&per_page=5')
        .then((response) => response.json())
        .then((json) => {
            this.setState({isLoading: false, isLoaded: true, products: json.data});
        })
        .catch((err) => {
            this.setState({isLoading: false})
        });
    }

    componentDidMount() {
        this.setState({isLoading: true}, this._fetchProductsList);
    }

    editProduct(id) {
        let product = this.state.products.reduce((x, y) => (y.id == id) ? y : x);
        if (product) {
            this.setState({editingProduct: product});
        } else {
            console.log('product not found');
        }
    }

    deleteProduct(id) {
        let product = this.state.products.reduce((x, y) => (y.id == id) ? y : x);
        if (product) {
            if (confirm('Delete product "'+product.name+'"')) {
                fetch('/api/products/' + id, {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': document.querySelector("meta[name='csrf-token']").getAttribute('content'),
                    }
                })
                .then((response) => response.json())
                .then((json) => {
                    this.setState({isLoading: false});
                })
                .catch((err) => {
                    this.setState({isLoading: false})
                });
            }
        } else {
            console.log('product not found');
        }
    }

    renderProduct(product) {
        let editProduct = this.editProduct.bind(this);
        let deleteProduct = this.deleteProduct.bind(this);
        return <Row key={product.id}> 
                    <Col sm="1"><Image src="/images/pizza.jpg" width="100%" /></Col>
                    <Col sm="4"><h5>{product.name}</h5><p>{product.description}</p></Col>
                    <Col sm="2" align="right"><h4>€ {product.price}</h4></Col>
                    <Col sm="5" align="right">
                        <Button onClick={() => editProduct(product.id)}>Edit</Button>
                        {' '}
                        <Button variant="danger" onClick={() => deleteProduct(product.id)}>Delete</Button>
                    </Col>
                </Row>
    }

    renderList() {
        const { isLoaded, products } = this.state;

        if (!isLoaded||!products) {
            return  <Container>
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    </Container>
        }

        return (
            <Container>
                {products.map(this.renderProduct.bind(this))}
                <Row>
                    <Col>
                        <Button variant="primary" onClick={() => this.setState({createProductMode: true})}>Add new product</Button>
                    </Col>
                </Row>
            </Container>
        );
    }

    onChange(event) {
        this.setState({
            editingProduct: {
                ...this.state.editingProduct,
                [event.target.name]: event.target.value,
            }
        });
    }

    onCheckChange(event) {
        this.setState({
            editingProduct: {
                ...this.state.editingProduct,
                [event.target.name]: event.target.checked,
            }
        });
    }

    saveForm() {
        let id = this.state.editingProduct.id,
            body = JSON.stringify(this.state.editingProduct);

        fetch('/api/products/' + id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector("meta[name='csrf-token']").getAttribute('content'),
            },
            body: body
        })
        .then((response) => response.json())
        .then((json) => {
            this.setState({isLoading: false, editingProduct: null, createProductMode: false});
        })
        .catch((err) => {
            this.setState({isLoading: false})
        });
    }

    cancelForm() {
        this.setState({editingProduct:false, editingProduct:null});
    }

    renderForm() {
        const { editingProduct } = this.state;

        const categories = [
            {id: 1, name: 'Pizza'},
            {id: 2, name: 'Salads'},
            {id: 3, name: 'Beverages'},
        ];

        return (
            <Container>
                <Form>
                    <h2>Product editing form</h2>
                    <Form.Group>
                        <Form.Label>Category</Form.Label>
                        <Form.Control as="select" name="category_id" defaultValue={editingProduct?editingProduct.category_id:categories[0].id} onChange={this.onChange.bind(this)}>
                            {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Row>
                            <Col sm="6">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" name="name" placeholder="Product name" value={editingProduct?editingProduct.name:""} onChange={this.onChange.bind(this)} />
                            </Col>
                            <Col sm="6">
                                <Form.Label>URL Slug</Form.Label>
                                <Form.Control type="text" name="slug" placeholder="Product slug" value={editingProduct?editingProduct.slug:""} onChange={this.onChange.bind(this)} />
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" name="description" rows="3" value={editingProduct?editingProduct.description:""} onChange={this.onChange.bind(this)} />
                    </Form.Group>
                    <Form.Group>
                        <Row>
                            <Col sm="6">
                                <Form.Label>SKU</Form.Label>
                                <Form.Control type="text" name="sku" placeholder="Product SKU" value={editingProduct?editingProduct.sku:""} onChange={this.onChange.bind(this)} />
                            </Col>
                            <Col sm="6">
                                <Form.Label>EAN13</Form.Label>
                                <Form.Control type="text" name="ean13" placeholder="Product EAN13" value={editingProduct?editingProduct.ean13:""} onChange={this.onChange.bind(this)} />
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group>
                        <Form.File label="Upload image" />
                    </Form.Group>
                    <Form.Group>
                        <Row>
                            <Col sm="4">
                                <Form.Control type="text" name="price" placeholder="Product price" value={editingProduct?editingProduct.price:""} onChange={this.onChange.bind(this)} />
                            </Col>
                            <Col sm="4">
                                <Form.Check 
                                    type="checkbox"
                                    id="productForm.is_published"
                                    label="Published"
                                    checked={editingProduct?editingProduct.is_published:false}
                                    onChange={this.onCheckChange.bind(this)}
                                />
                            </Col>
                            <Col sm="4">
                                <Form.Check 
                                    type="checkbox"
                                    id="productForm.in_stock"
                                    label="In stock"
                                    checked={editingProduct?editingProduct.in_stock:false}
                                    onChange={this.onCheckChange.bind(this)}
                                />
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group>
                        <Row>
                            <Col sm="6">
                                <Button variant="primary" onClick={this.saveForm.bind(this)}>Save</Button>
                            </Col>
                            <Col sm="6" align="right">
                                <Button variant="secondary" onClick={this.cancelForm.bind(this)}>Cancel</Button>
                            </Col>
                        </Row>
                    </Form.Group>
                </Form>
            </Container>
        );
    }

    render() {
        const { editingProduct, createProductMode } = this.state;
        return editingProduct||createProductMode ? this.renderForm() : this.renderList();
    }
}

export default AdminProducts;