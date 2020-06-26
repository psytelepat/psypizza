import React from 'react'

import { connect } from 'react-redux'

class Cart extends React.Component {
    render() {
        const data = this.props.data;

        return (
            <div className="cart">
                {data && data.products.length}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoading: state.cart.isLoading,
        isLoaded: state.cart.isLoaded,
        isError: state.cart.isError,
        data: state.cart.data,
    }
}

const mapDispatchToProps = dispatch => {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);