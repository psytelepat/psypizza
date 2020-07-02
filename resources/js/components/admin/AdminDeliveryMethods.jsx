import React from 'react'

import { Pencil as EditIcon, X as DeleteIcon, PlusCircleFill as AddIcon } from 'react-bootstrap-icons'

import { connect } from 'react-redux'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import { Link } from 'react-router-dom'

import processResponse from '../processResponse'

class AdminDeliveryMethods extends React.Component {
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
        fetch('/api/delivery_methods', {
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
        if(confirm('Delete delivery method "' + model.name + '"')) {
            fetch('/api/delivery_methods/' + id, {
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
                <Col>{model.name}</Col>
                <Col>{model.description}</Col>
                <Col>€ {model.price}</Col>
                <Col align="right">
                    <Button size="sm" as={Link} to={'/admin/delivery_methods/'+model.id} title="Edit"><EditIcon /></Button>
                    <Button size="sm" className="ml-2" variant="danger" onClick={() => this.deleteModel(model.id)} title="Delete"><DeleteIcon /></Button>
                </Col>
            </Row>
        );
    }

    render() {
        const { isLoaded, models } = this.state;

        if (!isLoaded||!models.length) {
            return (
                <Container align="center">
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </Container>
            );
        }

        return (
            <Container>
                <div className="h2 pb-3">Delivery methods</div>
                <Row className="mb-5">
                    <Col sm="6" align="right">
                    </Col>
                    <Col sm="6" align="right">
                        <Button variant="primary" as={Link} to='/admin/delivery_methods/create'>
                            <AddIcon /> Add delivery method
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

export default connect(mapStateToProps, null)(AdminDeliveryMethods);