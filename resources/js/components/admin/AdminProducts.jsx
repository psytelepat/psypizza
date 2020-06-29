import React from 'react'

import { Pencil as EditIcon, TrashFill as DeleteIcon, PlusCircleFill as AddIcon } from 'react-bootstrap-icons'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import Figure from 'react-bootstrap/Figure'

import { Link } from 'react-router-dom'

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
        fetch('/api/products')
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
        return <Row key={product.id} className="mb-3"> 
                    <Col sm="1">{product.image && <Figure.Image src={'/storage/products/images/' + product.image} width="100%" />}</Col>
                    <Col sm="4"><h5>{product.name}</h5><p>{product.description}</p></Col>
                    <Col sm="2" align="right"><h4>€ {product.price}</h4></Col>
                    <Col sm="5" align="right">
                        <Button as={Link} to={'/admin/products/'+product.id}><EditIcon /></Button>
                        <Button className="ml-2" variant="danger" onClick={() => deleteProduct(product.id)}><DeleteIcon /></Button>
                    </Col>
                </Row>
    }

    render() {
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
                <Row className="mb-5">
                    <Col align="center">
                        <Button variant="primary" as={Link} to='/admin/products/create'><AddIcon /> Add product</Button>
                    </Col>
                </Row>
                {products.map(this.renderProduct.bind(this))}
                <Row className="mt-5 mb-5">
                    <Col align="center">
                        <Button variant="primary" as={Link} to='/admin/products/create'><AddIcon /> Add product</Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default AdminProducts;