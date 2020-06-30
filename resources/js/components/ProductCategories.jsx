import React from 'react'
import { connect } from 'react-redux'
import { categoriesSelect } from './actions'

import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'

class ProductCategories extends React.Component {
    render() {
        const { isLoaded, isError, data, selected } = this.props;
        return (
            <Container as="section" className="categories">
                <Nav>
            { isError }
            { isLoaded &&
                data.map(category => <Nav.Item
                    key={category.id}
                    size="sm"
                    variant={category.id == selected ? 'primary' : 'secondary'}
                    onClick={() => this.props.onSelect(category.id)}>{category.name}</Nav.Item>)
            }
                </Nav>
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