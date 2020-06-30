// cart
export const CART_LOADING = 'CART_LOADING'
export const CART_LOADED = 'CART_LOADED'
export const CART_ERROR = 'CART_ERROR'
export const CART_SET_PRODUCT = 'CART_SET_PRODUCT'
export const CART_REMOVE_PRODUCT = 'CART_REMOVE_PRODUCT'
export const CART_SET_PROMOCODE = 'CART_SET_PROMOCODE'
export const CART_REMOVE_PROMOCODE = 'CART_REMOVE_PROMOCODE'

export function cartLoading() {                 return { type: CART_LOADING }; }
export function cartLoaded(cart) {              return { type: CART_LOADED, cart }; }
export function cartError(error) {              return { type: CART_ERROR, error }; }
export function cartSetProduct(id, amount) {    return { type: CART_SET_PRODUCT, id, amount }; }
export function cartRemoveProduct(id, amount) { return { type: CART_REMOVE_PRODUCT, id }; }
export function cartSetPromocode(code) {        return { type: CART_SET_PROMOCODE, code }; }
export function cartRemovePromocode() {         return { type: CART_REMOVE_PROMOCODE }; }


// categories
export const CATEGORIES_LOADING = 'CATEGORIES_LOADING'
export const CATEGORIES_LOADED = 'CATEGORIES_LOADED'
export const CATEGORIES_ERROR = 'CATEGORIES_ERROR'
export const CATEGORIES_SELECT = 'CATEGORIES_SELECT'

export function categoriesLoading() {           return { type: CATEGORIES_LOADING }; }
export function categoriesLoaded(categories) {  return { type: CATEGORIES_LOADED, categories }; }
export function categoriesError(error) {        return { type: CATEGORIES_ERROR, error }; }
export function categoriesSelect(id) {          return { type: CATEGORIES_SELECT, id }; }



// products
export const PRODUCTS_LOADING = 'PRODUCTS_LOADING'
export const PRODUCTS_LOADED = 'PRODUCTS_LOADED'
export const PRODUCTS_ERROR = 'PRODUCTS_ERROR'

export function productsLoading() {             return { type: PRODUCTS_LOADING }; }
export function productsLoaded(products) {      return { type: PRODUCTS_LOADED, products }; }
export function productsError(error) {          return { type: PRODUCTS_ERROR, error }; }



// delivery methods
export const DELIVERY_METHODS_LOADING = 'DELIVERY_METHODS_LOADING'
export const DELIVERY_METHODS_LOADED = 'DELIVERY_METHODS_LOADED'
export const DELIVERY_METHODS_ERROR = 'DELIVERY_METHODS_ERROR'
export const DELIVERY_METHODS_SELECT = 'DELIVERY_METHODS_SELECT'

export function deliveryMethodsLoading() {                  return { type: DELIVERY_METHODS_LOADING }; }
export function deliveryMethodsLoaded(deliveryMethods) {    return { type: DELIVERY_METHODS_LOADED, deliveryMethods }; }
export function deliveryMethodsError(error) {               return { type: DELIVERY_METHODS_ERROR, error }; }
export function deliveryMethodsSelect(id) {                 return { type: DELIVERY_METHODS_SELECT, id }; }



// order
export const ORDER_PLACING = 'ORDER_PLACING'
export const ORDER_PLACED = 'ORDER_PLACED'
export const ORDER_ERROR = 'ORDER_ERROR'

export function orderPlacing() {                return { type: ORDER_PLACING }; }
export function orderPlaced(order) {            return { type: ORDER_PLACED, order }; }
export function orderError(error, setErrors) {  return { type: ORDER_ERROR, error, setErrors }; }


