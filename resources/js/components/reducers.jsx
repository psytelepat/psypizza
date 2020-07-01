import { combineReducers } from 'redux'

import {
    USER_LOADING,
    USER_LOADED,
    USER_ERROR,
    CATEGORIES_LOADING,
    CATEGORIES_LOADED,
    CATEGORIES_ERROR,
    CATEGORIES_SELECT,
    PRODUCTS_LOADING,
    PRODUCTS_LOADED,
    PRODUCTS_ERROR,
    DELIVERY_METHODS_LOADING,
    DELIVERY_METHODS_LOADED,
    DELIVERY_METHODS_ERROR,
    CART_LOADING,
    CART_LOADED,
    CART_ERROR,
    CART_SET_PRODUCT,
    CART_REMOVE_PRODUCT,
    CART_SET_PROMOCODE,
    CART_REMOVE_PROMOCODE,
    ORDER_PLACING,
    ORDER_PLACED,
    ORDER_ERROR,
    ORDER_CLEAR,
} from './actions'



function user(state = {
    isLoading: false,
    isLoaded: false,
    isError: null,
    data: null,
}, action) {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true,
            };
        case USER_LOADED:
            return {
                ...state,
                isLoading: false,
                isLoaded: true,
                data: action.user,
            };
        case USER_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: action.error,
            };
        default:
            return state;
    }
}


function categories(state = {
    isLoading: false,
    isLoaded: false,
    isError: null,
    data: null,
    selected: null
}, action) {
    switch (action.type) {
        case CATEGORIES_LOADING:
            return {
                ...state,
                isLoading: true,
            };
        case CATEGORIES_LOADED:
            const { categories } = action;
            return {
                ...state,
                isLoading: false,
                isLoaded: true,
                data: categories,
                selected: categories.length && categories[0].id
            };
        case CATEGORIES_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: action.error,
            };
        case CATEGORIES_SELECT:
            return {
                ...state,
                selected: action.id
            };
            return
        default:
            return state;
    }
}



function products(state = {
    isLoading: false,
    isLoaded: false,
    isError: null,
    data: null,
}, action) {
    switch (action.type) {
        case PRODUCTS_LOADING:
            return {
                ...state,
                isLoading: true,
            };
        case PRODUCTS_LOADED:
            return {
                ...state,
                isLoading: false,
                isLoaded: true,
                data: action.products,
            };
        case PRODUCTS_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: action.error,
            };
        default:
            return state;
    }
}



function cart(state = {
    isLoading: false,
    isLoaded: false,
    isError: null,
    connections: 0,
    data: {
        currency: 'EUR',
        exchange_rate: 1,
        delivery_method_id: 1,
        products: [],
    },
}, action) {
    let connections = state.connections - 1;
    switch (action.type) {
        case CART_LOADING:
            return {
                ...state,
                connections: state.connections + 1,
                isLoading: true,
            };
        case CART_SET_PRODUCT:
            let products = [...state.data.products],
                found = -1;

            for (let i = 0; i < products.length; i++) {
                if (products[i].product_id == action.id) {
                    found = i;
                    break;
                }
            }

            if (found >= 0) {
                products[found].amount = action.amount;
            }

            return {
                ...state,
                data: {
                    ...state.data,
                    products: products,
                }
            }
        case CART_REMOVE_PRODUCT:
            return {
                ...state,
                data: {
                    ...state.data,
                    products: state.data.products.filter((product) => product.product_id != action.id)
                }
            }
        case CART_LOADED:
            return {
                ...state,
                connections: connections,
                isLoading: connections > 0,
                isLoaded: true,
                data: action.cart,
            };
        case CART_ERROR:
            console.log(action.error);
            return {
                ...state,
                connections: connections,
                isLoading: connections > 0,
                isError: action.error,
            };
        default:
            return state;
    }
}



function deliveryMethods(state = {
    isLoading: false,
    isLoaded: false,
    isError: null,
    data: null,
    selected: null
}, action) {
    switch (action.type) {
        case DELIVERY_METHODS_LOADING:
            return {
                ...state,
                isLoading: true,
            };
        case DELIVERY_METHODS_LOADED:
            return {
                ...state,
                isLoading: false,
                isLoaded: true,
                data: action.deliveryMethods.data,
            };
        case DELIVERY_METHODS_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: action.error,
            };
        default:
            return state;
    }
}



function order(state = {
    isLoading: false,
    isError: null,
    id: null,
    token: null,
    number: null,
    created_at: null,
}, action) {
    switch (action.type) {
        case ORDER_PLACING:
            return {
                ...state,
                isLoading: true,
            };
        case ORDER_PLACED:
            return {
                ...state,
                isLoading: false,
                id: action.order.id,
                token: action.order.token,
                number: action.order.number,
                created_at: action.order.created_at,
            };
        case ORDER_ERROR:
            let isError = null,
                errors = null;

            if (typeof action.error == 'string') {
                isError = action.error;
            } else {
                isError = action.error.message;
                ( typeof action.setErrors == 'function' ) && action.setErrors(action.error.errors);
            }

            return {
                ...state,
                isLoading: false,
                isError: isError
            };
        case ORDER_CLEAR:
            return {
                ...state,
                id: null,
                token: null,
                number: null,
                created_at: null,
            }
        default:
            return state;
    }
}


const psyPizzaReducer = combineReducers({
    user,
    categories,
    products,
    cart,
    deliveryMethods,
    order,
});

export default psyPizzaReducer;