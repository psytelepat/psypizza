import React from 'react'

import { Pencil as EditIcon, TrashFill as DeleteIcon, PlusCircleFill as AddIcon } from 'react-bootstrap-icons'

import { connect } from 'react-redux'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import Figure from 'react-bootstrap/Figure'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'

import { Link } from 'react-router-dom'

import processResponse from '../processResponse'

class AdminCategories extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            isLoaded: false,
            isError: false,
            models: [],
        };

        this.deleteModel = this.deleteModel.bind(this);
    }

    _fetchModelList() {
        fetch('/api/product_categories', {
            headers: this.props.headers,
        })
        .then(processResponse)
        .then((json) => {
            this.setState({isLoading: false, isLoaded: true, models: json.data});
        })
        .catch(({message, json, response }) => {
            this.setState({isLoading: false})
        });
    }

    componentDidMount() {
        this.setState({isLoading: true}, this._fetchModelList);
    }

    deleteModel(id) {
        let model = this.state.models.reduce((x, y) => (y.id == id) ? y : x);
        if (!model) return;
        if (confirm('Delete category "' + model.name + '"')) {
            fetch('/api/product_categories/' + id, {
                method: 'DELETE',
                headers: this.props.headers,
            })
            .then(processResponse)
            .then((json) => {
                this.setState({isLoading: false});
            })
            .catch(({message, json, response }) => {
                this.setState({isLoading: false})
            });
        }
    }

    renderModel(model) {
        return (
            <Row key={model.id} className="mb-3">
                <Col>{model.image && <Figure.Image src={'/storage/product_categories/images/' + model.image} />}</Col>
                <Col>
                    <div className="h3">{model.name}</div>
                    <p>{model.description}</p>
                </Col>
                <Col align="right">
                    <Button size="sm" as={Link} to={'/admin/product_categories/'+model.id}><EditIcon /></Button>
                    <Button size="sm" className="ml-2" variant="danger" onClick={() => this.deleteModel(model.id)}><DeleteIcon /></Button>
                </Col>
            </Row>
        );
    }

    render() {
        const { isLoaded, models } = this.state;

        if (!isLoaded||!models.length) {
            return  <Container align="center">
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    </Container>
        }

        return (
            <Container>
                <div className="h2 pb-3">Categories</div>
                <Row className="mb-5">
                    <Col sm="6" align="right">
                    </Col>
                    <Col sm="6" align="right">
                        <Button variant="primary" as={Link} to='/admin/product_categories/create'>
                            <AddIcon /> Add category
                        </Button>
                    </Col>
                </Row>
                {models.map(this.renderModel.bind(this))}
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps, null)(AdminCategories);