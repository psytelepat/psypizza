import { combineReducers } from 'redux'

import {
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
    CART_SET,
    CART_REMOVE,
} from './actions'



const defaultCategoriesState = {
    isLoading: false,
    isLoaded: false,
    isError: null,
    data: null,
    selected: null
};

function categories(state = defaultCategoriesState, action) {
    switch (action.type) {
        case CATEGORIES_LOADING:
            return {
                ...state,
                isLoading: true,
            };
        case CATEGORIES_LOADED:
            const { data } = action.categories;
            return {
                ...state,
                isLoading: false,
                isLoaded: true,
                data: data,
                selected: data.length && data[0].id
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



const defaultProductsState = {
    isLoading: false,
    isLoaded: false,
    isError: null,
    data: null,
};

function products(state = defaultProductsState, action) {
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
                data: action.products.data,
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



const defaultCartState = {
    isLoading: false,
    isLoaded: false,
    isError: null,
    connections: 0,
    data: {
        products: [],
    },
};

function cart(state = defaultCartState, action) {
    let connections = state.connections - 1;
    switch (action.type) {
        case CART_LOADING:
            return {
                ...state,
                connections: state.connections + 1,
                isLoading: true,
            };
        case CART_LOADED:
            return {
                ...state,
                connections: connections,
                isLoading: connections > 0,
                isLoaded: true,
                data: action.cart.data,
            };
        case CART_ERROR:
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



const defaultDeliveryMethodsState = {
    isLoading: false,
    isLoaded: false,
    isError: null,
    data: null,
    selected: null
};

function deliveryMethods(state = defaultDeliveryMethodsState, action) {
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



const psyPizzaReducer = combineReducers({
    categories,
    products,
    cart,
    deliveryMethods,
});

export default psyPizzaReducer;