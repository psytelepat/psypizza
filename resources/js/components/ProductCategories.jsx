import React from 'react'
import { connect } from 'react-redux'

import { categoriesSelect } from './actions';

class ProductCategories extends React.Component {
    render() {
        const { isLoaded, isError, data, selected } = this.props;
        return (
            <div className="container">
            <div className="row categories">
            { isError }
            { isLoaded &&
                data.map(category => <div
                    key={category.id}
                    className={"btn btn-sm btn-" + (category.id == selected ? 'primary' : 'secondary')}
                    onClick={() => this.props.onSelect(category.id)}>{category.name}</div>)
            }
            </div>
            </div>
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