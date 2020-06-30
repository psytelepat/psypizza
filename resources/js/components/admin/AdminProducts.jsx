import React from 'react'

import { Pencil as EditIcon, TrashFill as DeleteIcon, PlusCircleFill as AddIcon } from 'react-bootstrap-icons'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

import { Link } from 'react-router-dom'

import Form from 'react-bootstrap/Form'

class AdminProducts extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            isLoaded: false,
            isError: false,
            models: [],
            categories: [],
            category_id: 1,
        };

        this.deleteModel = this.deleteModel.bind(this);
    }

    _fetchCategoriesList() {
        fetch('/api/product_categories')
        .then((response) => response.json())
        .then((json) => {
            this.setState({categories: json.data, category_id: json.data[0].id}, this._fetchModelList());
        })
        .catch((err) => {
        });
    }

    _fetchModelList() {
        fetch('/api/products?category_id='+this.state.category_id)
        .then((response) => response.json())
        .then((json) => {
            this.setState({isLoading: false, isLoaded: true, models: json.data});
        })
        .catch((err) => {
            this.setState({isLoading: false})
        });
    }

    componentDidMount() {
        this.setState({isLoading: true}, this._fetchCategoriesList);
    }

    deleteModel(id) {
        let model = this.state.models.reduce((x, y) => (y.id == id) ? y : x);
        if (model) {
            if (confirm('Delete product "' + model.name + '"')) {
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
                    this._fetchModelList()
                })
                .catch((err) => {
                    this.setState({isLoading: false})
                });
            }
        } else {
            console.log('model not found');
        }
    }

    renderModel(model) {
        return (
            <Col key={model.id} lg={3} md={4} sm={6} xs={12} style={{paddingBottom: "30px"}}>
                <Card className="h-100" bg="dark">
                    {model.image && <Card.Img variant="top" src={'/storage/products/images/' + model.image} />}
                    <Card.Body>
                        <Card.Title>{model.name}</Card.Title>
                        <Card.Text>{model.description}</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        € {model.price}
                        <div className="float-right">
                            <Button size="sm" as={Link} to={'/admin/products/'+model.id}><EditIcon /></Button>
                            <Button size="sm" className="ml-2" variant="danger" onClick={() => this.deleteModel(model.id)}><DeleteIcon /></Button>
                        </div>
                    </Card.Footer>
                </Card>
            </Col>
        );
    }

    handleCategoryChange(event) {
        this.setState({category_id: event.target.value}, this._fetchModelList)
    }

    render() {
        const { isLoaded, models, categories } = this.state;

        if (!isLoaded||!models.length||!categories.length) {
            return  <Container align="center">
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    </Container>
        }

        return (
            <Container>
                <Row className="mb-5">
                    <Col sm="6">
                        <Form.Control as="select" name="category_id" defaultValue={this.state.category_id}
                            onChange={this.handleCategoryChange.bind(this)}>
                            {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
                        </Form.Control>
                    </Col>
                    <Col sm="6" align="right">
                        <Button variant="primary" as={Link} to='/admin/products/create'>
                            <AddIcon /> Add product
                        </Button>
                    </Col>
                </Row>
                <Row>
                {models.map(this.renderModel.bind(this))}
                </Row>
            </Container>
        );
    }
}

export default AdminProducts;