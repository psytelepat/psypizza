import React from 'react'
import { connect } from 'react-redux'
import { categoriesSelect } from './actions'

import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'

class ProductCategories extends React.Component {
    render() {
        const { isLoaded, data, selected } = this.props;

        if (!isLoaded) {
            return <></>;
        }

        return (
            <Container as="section" className="categories mb-5">
                <Nav variant="pills" fill={true} defaultActiveKey={data[0].id} onSelect={(eventKey) => this.props.onSelect(eventKey)}>
                {
                data.map(category => <Nav.Item key={category.id}>
                    <Nav.Link
                        eventKey={category.id}
                        className="p-3 h5"
                        variant={category.id == selected ? 'primary' : 'secondary'}>
                        {category.name}</Nav.Link>
                    </Nav.Item>)
                }
                </Nav>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return state.categories;
}

const mapDispatchToProps = dispatch => {
    return {
        onSelect: id => {
            dispatch(categoriesSelect(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCategories);