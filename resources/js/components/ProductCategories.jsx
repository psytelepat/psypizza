import React from 'react'
import { connect } from 'react-redux'
import { categoriesSelect } from './actions'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'

class ProductCategories extends React.Component {
    render() {
        const { isLoaded, isError, data, selected } = this.props;
        return (
            <Container as="section" className="categories">
            <Row>
            <Col>
                <ButtonGroup aria-label="Categories">
            { isError }
            { isLoaded &&
                data.map(category => <Button
                    key={category.id}
                    size="sm"
                    variant={category.id == selected ? 'primary' : 'secondary'}
                    onClick={() => this.props.onSelect(category.id)}>{category.name}</Button>)
            }
                </ButtonGroup>
            </Col>
            </Row>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoading: state.categories.isLoading,
        isLoaded: state.categories.isLoaded,
        isError: state.categories.isError,
        data: state.categories.data,
        selected: state.categories.selected,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSelect: id => {
            dispatch(categoriesSelect(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCategories);