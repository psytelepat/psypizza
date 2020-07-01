import React from 'react'
import { connect } from 'react-redux'
import { categoriesSelect } from './actions'

import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Col from 'react-bootstrap/Col'
import Figure from 'react-bootstrap/Figure'

class ProductCategories extends React.Component {
    render() {
        const { isLoaded, data, selected } = this.props;

        if (!isLoaded) {
            return <></>;
        }

        return (
            <Container as="section" className="categories">
                <Nav fill={true} defaultActiveKey={data[0].id} onSelect={(eventKey) => this.props.onSelect(eventKey)}>
                {
                data.map(category => {
                    return (
                        <Nav.Item key={category.id}>
                            <Nav.Link eventKey={category.id}>
                                <Figure.Image src={'/storage/product_categories/images/' + category.image} width="100" className="mr-5" />
                                <span>{category.name}</span>
                            </Nav.Link>
                        </Nav.Item>
                    );
                })
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